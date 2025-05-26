// // src/pages/Login.jsx
// import { useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const Login = () => {
//   const { login, googleLogin } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     try {
//       await login(email, password);
//       toast.success("Login successful");
//       navigate(from, { replace: true });
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleGoogle = async () => {
//     try {
//       const result = await googleLogin();
//       const { displayName, email, photoURL } = result.user;
//       await fetch("http://localhost:5000/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: displayName, email, photo: photoURL, role: "tourist" }),
//       });
//       toast.success("Google Login Success");
//       navigate(from, { replace: true });
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
//         <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
//         <button type="submit" className="btn w-full mb-2">Login</button>
//       </form>
//       <button onClick={handleGoogle} className="btn btn-outline w-full">Login with Google</button>
//     </div>
//   );
// };

// export default Login;



import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const saveToken = async (email) => {
    try {
      const res = await axios.post("http://localhost:5000/jwt", { email });
      localStorage.setItem("token", res.data.token); // ✅ Save token
    } catch (error) {
      console.error("JWT token fetch error:", error);
      toast.error("Failed to retrieve token");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await login(email, password);
      await saveToken(email); // ✅ Get token after login
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const result = await googleLogin();
      const { displayName, email, photoURL } = result.user;

      // ✅ Save user in DB (optional)
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName, email, photo: photoURL, role: "tourist" }),
      });

      await saveToken(email); // ✅ Get token after Google login
      toast.success("Google Login Success");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
        <button type="submit" className="btn w-full mb-2">Login</button>
      </form>
      <button onClick={handleGoogle} className="btn btn-outline w-full">Login with Google</button>
    </div>
  );
};

export default Login;
