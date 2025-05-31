// src/layout/DashboardLayout.jsx
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";  // axios ইম্পোর্ট করো

const DashboardLayout = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://tourism-management-system-server.onrender.com/users/role/${user.email}`)
        .then(response => {
          setRole(response.data?.role);
        })
        .catch(error => {
          console.error("Error fetching role:", error);
          setRole(null); // error হলে role null করে দাও (optional)
        });
    }
  }, [user]);

 

  const touristLinks = (
    <>
      <li><NavLink to="/dashboard/tourist-profile" className="font-medium">Manage Profile</NavLink></li>
      <li><NavLink to="/dashboard/my-bookings">My Bookings</NavLink></li>
      <li><NavLink to="/dashboard/add-story">Add Stories</NavLink></li>
      <li><NavLink to="/dashboard/manage-stories">Manage Stories</NavLink></li>
      <li><NavLink to="/dashboard/join-tour-guide">Join as Tour Guide</NavLink></li>
    </>
  );

  const guideLinks = (
    <>
      <li><NavLink to="/dashboard/tourist-profile" className="font-medium">Manage Profile</NavLink></li>
      <li><NavLink to="/dashboard/assigned-tours">My Assigned Tours</NavLink></li>
      <li><NavLink to="/dashboard/add-story">Add Stories</NavLink></li>
      <li><NavLink to="/dashboard/manage-stories">Manage Stories</NavLink></li>
    </>
  );

  const adminLinks = (
    <>
      <li><NavLink to="/dashboard/admin/profile" className="font-medium">Manage Profile</NavLink></li>
      <li><NavLink to="/dashboard/admin/stats">Dashboard Stats</NavLink></li>
      <li><NavLink to="/dashboard/admin/manage-users">Manage Users</NavLink></li>
      <li><NavLink to="/dashboard/admin/manage-candidates">Manage Candidates</NavLink></li>
      <li><NavLink to="/dashboard/admin/add-package">Add Package</NavLink></li>
      <li><NavLink to="/dashboard/add-stories">Add Stories</NavLink></li>
      <li><NavLink to="/dashboard/manage-stories">Manage Stories</NavLink></li>
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-100 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          {role === "tourist" && touristLinks}
          {role === "tour-guide" && guideLinks}
          {role === "admin" && adminLinks}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
