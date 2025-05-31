import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); // Stores name, photo, role
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error("Failed to fetch user info:", err));
    }
  }, [user]);

  
    const [packages, setPackages] = useState([]);
  
    useEffect(() => {
      axios.get("https://tourism-management-system-server.onrender.com/api/packages")
        .then(res => setPackages(res.data))
        .catch(err => console.error("Error fetching packages:", err));
    }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-semibold hover:text-purple-600">
          Home
        </NavLink>
      </li>
      <li>
      <ul>
        {packages.length > 0 ? (
          packages.map((item) => (
            <li key={item._id}>
              <NavLink to={`/packages/${item._id}`}>Pakages</NavLink>
            </li>
          ))
        ) : (
          <li>Loading packages...</li>
        )}
      </ul>
      </li>
      <li>
        <NavLink to="/guides" className="font-semibold hover:text-purple-600">
          Tour Guides
        </NavLink>
      </li>
      <li>
        <NavLink to="/stories" className="font-semibold hover:text-purple-600">
          Stories
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className="font-semibold hover:text-purple-600">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold text-white">TourismSys</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex navbar-center">
          <ul className="menu menu-horizontal gap-6">{navLinks}</ul>
        </div>

        {/* Profile Section */}
        <div className="navbar-end hidden md:flex items-center gap-4">
          {!user ? (
            <div className="space-x-2">
              <Link to="/login" className="btn btn-sm bg-white text-purple-600 hover:bg-gray-100">Login</Link>
              <Link to="/register" className="btn btn-sm border-white text-white hover:bg-white hover:text-purple-600">Register</Link>
            </div>
          ) : (
            <div className="relative">
              <button onClick={() => setShowDropdown(!showDropdown)} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-white">
                  <img
                    src={userInfo?.photo || "https://i.ibb.co/yPfFws9/avatar.png"}
                    alt="avatar"
                  />
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-md shadow z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">{userInfo?.name || "User"}</p>
                    <p className="text-sm text-gray-500 capitalize">Role: {userInfo?.role || "tourist"}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="text-white w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black px-4 pb-4 rounded-b-md">
          <ul className="space-y-2 py-2">{navLinks}</ul>
          {!user ? (
            <div className="flex gap-2 mt-2">
              <Link to="/login" className="btn btn-sm w-full bg-purple-600 text-white">Login</Link>
              <Link to="/register" className="btn btn-sm w-full border-purple-600 text-purple-600">Register</Link>
            </div>
          ) : (
            <div className="mt-3 flex flex-col items-start space-y-1">
              <p className="font-semibold">{userInfo?.name || "User"}</p>
              <p className="text-sm text-gray-500 capitalize">Role: {userInfo?.role || "tourist"}</p>
              <button className="btn btn-sm bg-red-500 text-white mt-1" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
