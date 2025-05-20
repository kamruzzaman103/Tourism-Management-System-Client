// src/pages/ForgotPassword.jsx
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    try {
      await forgotPassword(email);
      toast.success("Check your email for reset instructions.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
        <button type="submit" className="btn w-full">Send Reset Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
