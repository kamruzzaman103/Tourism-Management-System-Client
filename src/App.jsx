
import {BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
// import ForgotPassword from './pages/ForgotPassword'


function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content area between Navbar and Footer */}
      <main className="flex-grow">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        
          {/* <Route path="*" element={<NotFoundPage/>} /> */}
        </Routes>
      </main>
  
      {/* <Footer /> */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <Toaster position="top-right" />
    </div>
  )
}

export default App
