import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get('bookingId');
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    const saveTransaction = async () => {
      try {
        const res = await axios.patch(`https://tourism-management-system-server.onrender.com/api/bookings/payment/${bookingId}`, {
          transactionId,
        });

        if (res.data.modifiedCount > 0) {
          Swal.fire('Success!', 'Payment successful & status updated.', 'success');
          navigate('/dashboard/my-bookings');
        }
      } catch (error) {
        console.error('Transaction saving failed:', error);
        Swal.fire('Error!', 'Failed to update booking after payment.', 'error');
      }
    };

    if (bookingId && transactionId) {
      saveTransaction();
    }
  }, [bookingId, transactionId, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h2 className="text-2xl font-semibold text-green-600">Processing payment...</h2>
    </div>
  );
};

export default PaymentSuccess;
