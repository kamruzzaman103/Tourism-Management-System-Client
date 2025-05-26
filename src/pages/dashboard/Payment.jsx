import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51RSk1kQa5zhTgXmMPVVb2JOzFNxi6LmW5QUXdQ7dhTT8gZMCNncxMT0H0JWMj9fSzLf8xRWjsduoYHFsj5em1kzg00mAKISNMQ');

const Payment = () => {
  const { id } = useParams();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm bookingId={id} />
      </Elements>
    </div>
  );
};

export default Payment;
