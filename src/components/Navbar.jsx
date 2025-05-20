import { Link } from "react-router-dom";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn] = useState(false); // Replace with auth context

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        🌍 TravelVista
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/">Home</Link>
        <Link to="/community">Community</Link>
        <Link to="/about">About Us</Link>
        <Link to="/trips">Trips</Link>

        {isLoggedIn ? (
          <div className="relative group">
            <FaUserCircle className="text-2xl cursor-pointer" />
            <div className="absolute right-0 hidden group-hover:block bg-white shadow rounded p-4 w-48 z-50">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-500">john@example.com</p>
              <hr className="my-2" />
              <Link to="/dashboard" className="block">Dashboard</Link>
              <Link to="/offers" className="block">Offer Announcements</Link>
              <button className="block text-red-500 mt-2">Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
