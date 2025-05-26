import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutForm = ({ bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/bookings/${bookingId}`).then(res => {
      setBooking(res.data);
      return axios.post('http://localhost:5000/api/payment/create-payment-intent', {
        amount: res.data.tourPrice
      });
    }).then(res => {
      setClientSecret(res.data.clientSecret);
    });
  }, [bookingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (paymentIntent.status === 'succeeded') {
      axios.put(`http://localhost:5000/api/bookings/payment-success/${bookingId}`, {
        transactionId: paymentIntent.id
      }).then(() => {
        alert('Payment successful');
        window.location.href = '/dashboard/my-bookings';
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-5 rounded shadow">
      <CardElement />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded" disabled={!stripe}>
        Pay ${booking?.tourPrice}
      </button>
    </form>
  );
};

export default CheckoutForm;
