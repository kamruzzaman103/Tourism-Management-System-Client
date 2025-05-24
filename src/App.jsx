
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./pages/Home";
import PackageDetails from "./pages/PackageDetails/PackageDetails";
import DashboardLayout from "./layout/DashboardLayout";
import TouristProfile from "./pages/dashboard/TouristProfile";
// import ForgotPassword from './pages/ForgotPassword'


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content area between Navbar and Footer */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/packages/:id" element={<PackageDetails />} />

          {/* <Route path="*" element={<NotFoundPage/>} /> */}
          <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="tourist-profile" element={<TouristProfile />} />





            {/* Tourist 
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="add-stories" element={<AddStories />} />
            <Route path="manage-stories" element={<ManageStories />} />
            <Route path="join-tour-guide" element={<JoinAsTourGuide />} />

             Tour Guide 
            <Route path="assigned-tours" element={<AssignedTours />} />

             Admin 
            <Route path="admin/stats" element={<AdminStats />} />
            <Route path="admin/manage-users" element={<ManageUsers />} />
            <Route path="admin/manage-candidates" element={<ManageCandidates />} />
            <Route path="admin/add-package" element={<AddPackage />} /> */}

          </Route>
        </Routes>
      </main>

      {/* <Footer /> */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Toaster position="top-right" />
    </div>
  )
}

export default App
