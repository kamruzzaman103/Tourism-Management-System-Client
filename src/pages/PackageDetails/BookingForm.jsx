import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { AuthContext } from "../context/AuthProvider";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const BookingForm = ({ packageName, price,tourGuideEmail, guides }) => {
  const { user } = useAuth();
  const [date, setDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState("");

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book.");
      return;
    }

    const booking = {
      packageName,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price,
      tourGuideEmail,
      date,
      guide: selectedGuide,
      status: "pending"
    };

    try {
      await axios.post("https://tourism-management-system-server.onrender.com/api/bookings", booking);
      toast.success("Confirm your Booking");
      // Redirect to My Bookings (optional)
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    }
  };

  return (
    <div className="p-4 border shadow rounded">
      <h2 className="text-xl font-bold mb-2">Book This Tour</h2>
      <p><strong>Package:</strong> {packageName}</p>
      <p><strong>Name:</strong> {user?.displayName}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Price:</strong> ${price}</p>

      <label className="block mt-2">Select Date:</label>
      <DatePicker selected={date} onChange={(d) => setDate(d)} className="border p-2" />

      <label className="block mt-2">Select Guide:</label>
      <select onChange={(e) => setSelectedGuide(e.target.value)} className="w-full border p-2">
        {guides.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
      </select>

      <button onClick={handleBooking} className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
        Book Now
      </button>
    </div>
  );
};

export default BookingForm;
