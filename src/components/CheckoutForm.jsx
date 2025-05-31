import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutForm = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState('');
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchBookingAndCreateIntent = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const bookingRes = await axios.get(`https://tourism-management-system-server.onrender.com/api/bookings/${bookingId}`);
        console.log('Booking API Response:', bookingRes.data);
  
        const foundBooking = Array.isArray(bookingRes.data)
          ? bookingRes.data.find(b => b._id === bookingId)
          : bookingRes.data;
  
        if (!foundBooking || !foundBooking.price) {
          setError('Booking data or price not found');
          setBooking(null);
          setClientSecret('');
          return;
        }
  
        setBooking(foundBooking);
  
        const paymentIntentRes = await axios.post(
          'https://tourism-management-system-server.onrender.com/api/payment/create-payment-intent',
          {
            amount: foundBooking.price,
          }
        );
  
        setClientSecret(paymentIntentRes.data.clientSecret);
      } catch (err) {
        console.error('Error fetching booking or creating payment intent:', err);
        setError('Failed to fetch booking or create payment intent');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchBookingAndCreateIntent();
  }, [bookingId]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    setIsProcessing(true);
    try {
      const card = elements.getElement(CardElement);
      const { paymentMethod, error: methodError } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (methodError) {
        alert(methodError.message);
        setIsProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

      if (confirmError) {
        alert(confirmError.message);
        setIsProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await axios.put(`https://tourism-management-system-server.onrender.com/api/bookings/payment-success/${bookingId}`, {
          transactionId: paymentIntent.id,
        });

        alert('Payment successful!');
        window.location.href = '/dashboard/my-bookings';
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded shadow max-w-md mx-auto">
      {isLoading ? (
        <p>Loading booking details...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : (
        <>
          <CardElement className="p-2 border border-gray-300 rounded" />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full disabled:opacity-50"
            disabled={!stripe || !booking || isProcessing}
          >
            {isProcessing ? 'Processing...' : `Pay $${booking?.price}`}
          </button>
        </>
      )}
    </form>
  );
};

export default CheckoutForm;
