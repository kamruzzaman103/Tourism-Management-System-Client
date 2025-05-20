// // src/components/Navbar.jsx
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useEffect, useState } from "react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     if (user) {
//       fetch(`http://localhost:5000/users/role/${user.email}`)
//         .then(res => res.json())
//         .then(data => setRole(data.role));
//     }
//   }, [user]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   const navLinks = (
//     <>
//       <li><NavLink to="/" className="font-medium">Home</NavLink></li>
//       <li><NavLink to="/packages" className="font-medium">Packages</NavLink></li>
//       <li><NavLink to="/guides" className="font-medium">Tour Guides</NavLink></li>
//       <li><NavLink to="/stories" className="font-medium">Stories</NavLink></li>
//       {user && <li><NavLink to="/dashboard" className="font-medium">Dashboard</NavLink></li>}
//     </>
//   );

//   return (
//     <div className="bg-white shadow sticky top-0 z-50">
//       <div className="navbar container mx-auto">
//         <div className="navbar-start">
//           <Link to="/" className="text-xl font-bold">TourismSys</Link>
//         </div>

//         <div className="navbar-center hidden md:flex">
//           <ul className="menu menu-horizontal gap-4">{navLinks}</ul>
//         </div>

//         <div className="navbar-end">
//           {!user ? (
//             <div className="space-x-2">
//               <Link to="/login" className="btn btn-sm">Login</Link>
//               <Link to="/register" className="btn btn-sm btn-outline">Register</Link>
//             </div>
//           ) : (
//             <div className="dropdown dropdown-end">
//               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                 <div className="w-10 rounded-full border">
//                   <img src={user.photoURL || "https://i.ibb.co/yPfFws9/avatar.png"} alt="avatar" />
//                 </div>
//               </label>
//               <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//                 <li><span className="font-semibold">{user.displayName}</span></li>
//                 <li><span className="text-sm text-gray-500 capitalize">Role: {role}</span></li>
//                 <li><button onClick={handleLogout}>Logout</button></li>
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useEffect, useState } from "react";
// import { Menu } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const [role, setRole] = useState(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   useEffect(() => {
//     if (user) {
//       fetch(`http://localhost:5000/users/role/${user.email}`)
//         .then(res => res.json())
//         .then(data => setRole(data.role));
//     }
//   }, [user]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   const navLinks = (
//     <>
//       <li><NavLink to="/" className="font-semibold hover:text-purple-600">Home</NavLink></li>
//       <li><NavLink to="/packages" className="font-semibold hover:text-purple-600">Packages</NavLink></li>
//       <li><NavLink to="/guides" className="font-semibold hover:text-purple-600">Tour Guides</NavLink></li>
//       <li><NavLink to="/stories" className="font-semibold hover:text-purple-600">Stories</NavLink></li>
//       {user && <li><NavLink to="/dashboard" className="font-semibold hover:text-purple-600">Dashboard</NavLink></li>}
//     </>
//   );

//   return (
//     <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow sticky top-0 z-50">
//       <div className="navbar container mx-auto px-4 py-2 flex justify-between items-center">
//         {/* Logo */}
//         <div className="navbar-start">
//           <Link to="/" className="text-2xl font-bold text-white">TourismSys</Link>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex navbar-center">
//           <ul className="menu  gap-6">{navLinks}</ul>
//         </div>

//         {/* User/Profile Section */}
//         <div className="navbar-end hidden md:flex items-center gap-3">
//           {!user ? (
//             <div className="space-x-2">
//               <Link to="/login" className="btn btn-sm bg-white text-purple-600 hover:bg-gray-100">Login</Link>
//               <Link to="/register" className="btn btn-sm border-white text-white hover:bg-white hover:text-purple-600">Register</Link>
//             </div>
//           ) : (
//             <div className="dropdown dropdown-end">
//               <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                 <div className="w-10 rounded-full border-2 border-white">
//                   <img src={user.photoURL || "https://i.ibb.co/yPfFws9/avatar.png"} alt="avatar" />
//                 </div>
//               </label>
//               <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white text-black rounded-box w-52">
//                 <li><span className="font-semibold">{user.displayName}</span></li>
//                 <li><span className="text-sm text-gray-500 capitalize">Role: {role}</span></li>
//                 <li><button onClick={handleLogout}>Logout</button></li>
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
//             <Menu className="text-white w-6 h-6" />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white text-black px-4 pb-4 rounded-b-md">
//           <ul className="space-y-2 py-2">{navLinks}</ul>
//           {!user ? (
//             <div className="flex gap-2 mt-2">
//               <Link to="/login" className="btn btn-sm w-full bg-purple-600 text-white">Login</Link>
//               <Link to="/register" className="btn btn-sm w-full border-purple-600 text-purple-600">Register</Link>
//             </div>
//           ) : (
//             <div className="mt-3">
//               <p className="font-semibold">{user.displayName}</p>
//               <p className="text-sm text-gray-500">Role: {role}</p>
//               <button className="btn btn-sm w-full mt-2 bg-red-500 text-white" onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react"; // Ensure this is installed or use react-icons

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // new

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/users/role/${user.email}`)
        .then(res => res.json())
        .then(data => setRole(data.role));
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = (
    <>
      <li><NavLink to="/" className="font-semibold hover:text-purple-600">Home</NavLink></li>
      <li><NavLink to="/packages" className="font-semibold hover:text-purple-600">Packages</NavLink></li>
      <li><NavLink to="/guides" className="font-semibold hover:text-purple-600">Tour Guides</NavLink></li>
      <li><NavLink to="/stories" className="font-semibold hover:text-purple-600">Stories</NavLink></li>
      {user && <li><NavLink to="/dashboard" className="font-semibold hover:text-purple-600">Dashboard</NavLink></li>}
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
          <ul className="menu menu-horizontal gap-6">{navLinks}</ul> {/* ✅ fixed horizontal menu */}
        </div>

        {/* User/Profile Section */}
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
                  <img src={user.photoURL || "https://i.ibb.co/yPfFws9/avatar.png"} alt="avatar" />
                </div>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-md shadow z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-500 capitalize">Role: {role}</p>
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

      {/* Mobile Menu Dropdown */}
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
              <p className="font-semibold">{user.displayName}</p>
              <p className="text-sm text-gray-500 capitalize">Role: {role}</p>
              <button className="btn btn-sm bg-red-500 text-white mt-1" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
