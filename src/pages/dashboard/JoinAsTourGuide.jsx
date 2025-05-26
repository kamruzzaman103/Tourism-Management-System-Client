
// import { useAuth } from "../../context/AuthContext";
// import axios from "axios";
// import Swal from "sweetalert2";

// const JoinAsTourGuide = () => {
//   const { user } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const title = form.title.value;
//     const reason = form.reason.value;
//     const cvLink = form.cvLink.value;

//     const application = {
//       userId: user._id,
//       name: user.displayName,
//       email: user.email,
//       photo: user.photoURL,
//       title,
//       reason,
//       cvLink,
//       status: "Pending",
//       appliedAt: new Date(),
//     };

//     try {
//       await axios.post("http://localhost:5000/api/tour-guide-applications", application, {
//         withCredentials: true,
//       });
//       Swal.fire("Success!", "Your application has been submitted!", "success");
//       form.reset();
//     } catch (error) {
//       console.error(error);
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">Join as Tour Guide</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="title"
//           placeholder="Application Title"
//           required
//           className="w-full border p-2 rounded"
//         />
//         <textarea
//           name="reason"
//           placeholder="Why do you want to be a tour guide?"
//           required
//           rows={4}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="url"
//           name="cvLink"
//           placeholder="CV Link (Google Drive/Portfolio)"
//           required
//           className="w-full border p-2 rounded"
//         />
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit Application</button>
//       </form>
//     </div>
//   );
// };

// export default JoinAsTourGuide;



import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const JoinAsTourGuide = () => {
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const reason = form.reason.value;
    const cvLink = form.cvLink.value;

    const application = {
      userId: user._id,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      title,
      reason,
      cvLink,
      status: "Pending",
      appliedAt: new Date(),
    };

    // 🔐 Get token from localStorage
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/tour-guide-applications", application, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Success!", "Your application has been submitted!", "success");
      form.reset();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Join as Tour Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Application Title"
          required
          className="w-full border p-2 rounded"
        />
        <textarea
          name="reason"
          placeholder="Why do you want to be a tour guide?"
          required
          rows={4}
          className="w-full border p-2 rounded"
        />
        <input
          type="url"
          name="cvLink"
          placeholder="CV Link (Google Drive/Portfolio)"
          required
          className="w-full border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit Application</button>
      </form>
    </div>
  );
};

export default JoinAsTourGuide;
