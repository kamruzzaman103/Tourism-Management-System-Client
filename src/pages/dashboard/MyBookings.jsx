import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    if (!user?.email) return;

    axios
      .get(`https://tourism-management-system-server.onrender.com/api/bookings/${user.id}`) 
      .then((res) => {
        // শুধু logged-in user এর bookings filter করলাম
        const userBookings = res.data.filter(
          (booking) => booking.touristEmail === user.email
        );
        setBookings(userBookings);
      })
      .catch((error) => {
        console.error("Failed to fetch bookings:", error);
      });
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);

  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel this booking?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://tourism-management-system-server.onrender.com/api/bookings/${id}`)
          .then(() => {
            fetchBookings();
            Swal.fire('Cancelled!', 'Booking has been cancelled.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error', 'Failed to cancel booking.', 'error');
            console.error("Cancel error:", error);
          });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Package</th>
              <th className="p-3 text-left">Guide</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border-b">
                <td className="p-3">{booking.touristName}</td>
                <td className="p-3">{booking.tourGuideName}</td>
                <td className="p-3">{booking.date}</td>
                <td className="p-3">${booking.price}</td>
                <td className="p-3 capitalize">{booking.status}</td>
                <td className="p-3 space-x-2">
                  {booking.status === 'pending' ? (
                    <>
                      <Link to={`/dashboard/payment/${booking._id}`}>
                        <button className="bg-blue-600 text-white px-3 py-1 rounded">Pay</button>
                      </Link>
                      <button
                        onClick={() => handleCancel(booking._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-400">No Action</span>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBookings;
