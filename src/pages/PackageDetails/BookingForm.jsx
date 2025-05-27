// // src/pages/PackageDetails/BookingForm.jsx
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// const BookingForm = ({ packageInfo, tourGuides }) => {
//   const [tourDate, setTourDate] = useState(null);
//   const [selectedGuide, setSelectedGuide] = useState(tourGuides[0]._id);

//   const handleBooking = () => {
//     // Handle booking submission (e.g., save booking to DB)
//     alert('Your booking is confirmed!');
//   };

//   return (
//     <section className="mb-8">
//       <h2 className="text-2xl font-semibold mb-4">Book This Tour</h2>
//       <form className="space-y-4" onSubmit={e => e.preventDefault()}>
//         <div className="flex justify-between">
//           <div className="w-1/2">
//             <label className="block text-lg font-medium mb-2">Tourist Name</label>
//             <input type="text" value="John Doe" className="w-full px-4 py-2 border rounded-md" readOnly />
//           </div>
//           <div className="w-1/2">
//             <label className="block text-lg font-medium mb-2">Email</label>
//             <input type="email" value="johndoe@example.com" className="w-full px-4 py-2 border rounded-md" readOnly />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium mb-2">Tour Date</label>
//           <DatePicker selected={tourDate} onChange={date => setTourDate(date)} className="w-full px-4 py-2 border rounded-md" />
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium mb-2">Tour Guide</label>
//           <select
//             value={selectedGuide}
//             onChange={e => setSelectedGuide(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md"
//           >
//             {tourGuides.map(guide => (
//               <option key={guide._id} value={guide._id}>{guide.name}</option>
//             ))}
//           </select>
//         </div>

//         <div className="text-center">
//           <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md" onClick={handleBooking}>
//             Book Now
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default BookingForm;
// components/BookingForm.jsx
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { AuthContext } from "../context/AuthProvider";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const BookingForm = ({ packageName, price, guides }) => {
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
      date,
      guide: selectedGuide,
      status: "pending"
    };

    try {
      await axios.post("http://localhost:5000/bookings", booking);
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
