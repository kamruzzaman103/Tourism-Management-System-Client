import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const { register, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[A-Z])(?=.*[a-z]).{6,}/.test(password)) {
      toast.error("Password must be at least 6 chars, include upper & lowercase");
      setLoading(false);
      return;
    }

    try {
      // 1. Firebase Register
      const result = await register(email, password);
      await updateUserProfile(name, photo);

      // 2. Save User to Database
      await fetch("https://tourism-management-system-server.onrender.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          photo,
          role: "tourist",
        }),
      });

      // 3. Get Token and Save to LocalStorage
      const tokenRes = await fetch("https://tourism-management-system-server.onrender.com/jwt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const tokenData = await tokenRes.json();
      if (tokenData.token) {
        localStorage.setItem("token", tokenData.token);
        toast.success("Registered and Logged in");
        navigate("/dashboard");
      } else {
        toast.error("Token generation failed");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Name" className="input input-bordered w-full mb-3" required />
        <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full mb-3" required />
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
        <button type="submit" className="btn w-full" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
