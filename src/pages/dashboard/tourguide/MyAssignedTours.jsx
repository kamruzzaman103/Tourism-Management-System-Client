// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import { Button } from "flowbite-react";
// import Swal from "sweetalert2";

// const MyAssignedTours = () => {
//   const { user } = useContext(AuthContext);
//   const [axiosSecure] = useAxiosSecure();

//   const { data: assignedTours = [], refetch } = useQuery({
//     queryKey: ["assignedTours", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/assigned-tours?email=${user.email}`);
//       return res.data;
//     },
//   });

//   const handleAccept = async (id) => {
//     await axiosSecure.patch(`/assigned-tours/accept/${id}`);
//     Swal.fire("Accepted!", "Tour has been accepted", "success");
//     refetch();
//   };

//   const handleReject = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to reject this tour?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, reject it!",
//     });

//     if (confirm.isConfirmed) {
//       await axiosSecure.patch(`/assigned-tours/reject/${id}`);
//       Swal.fire("Rejected!", "Tour has been rejected", "success");
//       refetch();
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Assigned Tours</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <thead>
//             <tr>
//               <th>Package</th>
//               <th>Tourist</th>
//               <th>Date</th>
//               <th>Price</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignedTours.map((tour) => (
//               <tr key={tour._id}>
//                 <td>{tour.packageName}</td>
//                 <td>{tour.touristName}</td>
//                 <td>{tour.tourDate}</td>
//                 <td>${tour.price}</td>
//                 <td>{tour.status}</td>
//                 <td className="flex gap-2">
//                   <Button
//                     size="xs"
//                     disabled={tour.status !== "In Review"}
//                     onClick={() => handleAccept(tour._id)}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     size="xs"
//                     color="failure"
//                     disabled={tour.status !== "In Review"}
//                     onClick={() => handleReject(tour._id)}
//                   >
//                     Reject
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyAssignedTours;


// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";

// import { useAuth } from "../../../context/AuthContext";
// import { Button } from "../../../components/ui";
// import Swal from "sweetalert2";

// const MyAssignedTours = () => {
//   const { user } = useAuth();

//   // Get token from localStorage
//   const token = localStorage.getItem("access-token");

//   // Create axios instance with Authorization header
//   const axiosInstance = axios.create({
//     baseURL: "https://tourism-management-system-server.onrender.com", // <-- change this to your actual base URL
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const { data: assignedTours = [], refetch } = useQuery({
//     queryKey: ["assignedTours", user?.email],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`https://tourism-management-system-server.onrender.com/api/assigned-tours?email=${user.email}`);
//       return res.data;
//     },
//     enabled: !!user?.email, // only run if user email exists
//   });

//   const handleAccept = async (id) => {
//     await axiosInstance.patch(`https://tourism-management-system-server.onrender.com/api/assigned-tours/accept/${id}`);
//     Swal.fire("Accepted!", "Tour has been accepted", "success");
//     refetch();
//   };

//   const handleReject = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to reject this tour?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, reject it!",
//     });

//     if (confirm.isConfirmed) {
//       await axiosInstance.patch(`https://tourism-management-system-server.onrender.com/api/assigned-tours/reject/${id}`);
//       Swal.fire("Rejected!", "Tour has been rejected", "success");
//       refetch();
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Assigned Tours</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm text-left">
//           <thead>
//             <tr>
//               <th>Package</th>
//               <th>Tourist</th>
//               <th>Date</th>
//               <th>Price</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignedTours.map((tour) => (
//               <tr key={tour._id}>
//                 <td>{tour.packageName}</td>
//                 <td>{tour.touristName}</td>
//                 <td>{tour.tourDate}</td>
//                 <td>${tour.price}</td>
//                 <td>{tour.status}</td>
//                 <td className="flex gap-2">
//                   <Button
//                     size="xs"
//                     disabled={tour.status !== "In Review"}
//                     onClick={() => handleAccept(tour._id)}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     size="xs"
//                     color="failure"
//                     disabled={tour.status !== "In Review"}
//                     onClick={() => handleReject(tour._id)}
//                   >
//                     Reject
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyAssignedTours;


// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "../../../context/AuthContext";
// import { Button } from "../../../components/ui";
// import Swal from "sweetalert2";

// const MyAssignedTours = () => {
//   const { user } = useAuth();

//   // Get token from localStorage
//   const token = localStorage.getItem("access-token");

//   // Axios instance with Authorization header
//   const axiosInstance = axios.create({
//     baseURL: "https://tourism-management-system-server.onrender.com/api/assigned-tours", // Base path for assigned tours
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // Fetch assigned tours for logged-in user
//   const { data: assignedTours = [], refetch } = useQuery({
//     queryKey: ["assignedTours", user?._id],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/my-bookings");
//       return res.data;
//     },
//     enabled: !!user, // Only fetch if user exists
//   });

//   const handleAccept = async (id) => {
//     try {
//       await axiosInstance.patch(`/accept/${id}`);
//       Swal.fire("Accepted!", "Tour has been accepted.", "success");
//       refetch();
//     } catch (error) {
//       console.error("Accept failed", error);
//       Swal.fire("Error", "Could not accept the tour.", "error");
//     }
//   };

//   const handleReject = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to reject this tour?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, reject it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axiosInstance.patch(`/reject/${id}`);
//         Swal.fire("Rejected!", "Tour has been rejected.", "success");
//         refetch();
//       } catch (error) {
//         console.error("Reject failed", error);
//         Swal.fire("Error", "Could not reject the tour.", "error");
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Assigned Tours</h2>
//       {assignedTours.length === 0 ? (
//         <p>No assigned tours found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left">
//             <thead>
//               <tr>
//                 <th>Package</th>
//                 <th>Tourist</th>
//                 <th>Date</th>
//                 <th>Price</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignedTours.map((tour) => (
//                 <tr key={tour._id}>
//                   <td>{tour.packageName}</td>
//                   <td>{tour.touristName}</td>
//                   <td>{tour.tourDate}</td>
//                   <td>${tour.price}</td>
//                   <td>{tour.status}</td>
//                   <td className="flex gap-2">
//                     <Button
//                       size="xs"
//                       disabled={tour.status !== "In Review"}
//                       onClick={() => handleAccept(tour._id)}
//                     >
//                       Accept
//                     </Button>
//                     <Button
//                       size="xs"
//                       color="failure"
//                       disabled={tour.status !== "In Review"}
//                       onClick={() => handleReject(tour._id)}
//                     >
//                       Reject
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAssignedTours;


// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth } from "../../../context/AuthContext";
// import { Button } from "../../../components/ui";
// import Swal from "sweetalert2";

// const MyAssignedTours = () => {
//   const { user } = useAuth();
//   const token = localStorage.getItem("access-token");

//   const axiosInstance = axios.create({
//     baseURL: "https://tourism-management-system-server.onrender.com/api/assigned-tours",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const {
//     data: assignedTours = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["assignedTours", user?.email],
//     queryFn: async () => {
//       const res = await axiosInstance.get("/my-bookings");
//       return res.data;
//     },
//     enabled: !!user,
//   });

//   const handleAccept = async (id) => {
//     try {
//       await axiosInstance.patch(`/accept/${id}`);
//       Swal.fire("Accepted!", "Tour has been accepted.", "success");
//       refetch();
//     } catch (error) {
//       console.error("Accept failed", error);
//       Swal.fire("Error", "Could not accept the tour.", "error");
//     }
//   };

//   const handleReject = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to reject this tour?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, reject it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await axiosInstance.patch(`/reject/${id}`);
//         Swal.fire("Rejected!", "Tour has been rejected.", "success");
//         refetch();
//       } catch (error) {
//         console.error("Reject failed", error);
//         Swal.fire("Error", "Could not reject the tour.", "error");
//       }
//     }
//   };

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>

//       {isLoading ? (
//         <p className="text-center">Loading...</p>
//       ) : assignedTours.length === 0 ? (
//         <p className="text-center">No assigned tours found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left border rounded-lg shadow">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2">Package</th>
//                 <th className="p-2">Tourist</th>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {assignedTours.map((tour) => (
//                 <tr key={tour._id} className="border-t hover:bg-gray-50">
//                   <td className="p-2">{tour.packageName}</td>
//                   <td className="p-2">{tour.touristName}</td>
//                   <td className="p-2">{formatDate(tour.date || tour.tourDate)}</td>
//                   <td className="p-2">${tour.price}</td>
//                   <td className="p-2 capitalize">{tour.status}</td>
//                   <td className="p-2 flex gap-2">
//                     <Button
//                       size="xs"
//                       disabled={tour.status !== "pending"}
//                       onClick={() => handleAccept(tour._id)}
//                     >
//                       Accept
//                     </Button>
//                     <Button
//                       size="xs"
//                       color="failure"
//                       disabled={tour.status !== "pending"}
//                       onClick={() => handleReject(tour._id)}
//                     >
//                       Reject
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyAssignedTours;





import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ SweetAlert2 import
import { useAuth } from "../../../context/AuthContext";

export default function MyAssignedTours() {
  const { user } = useAuth();
  const userEmail = user?.email;

  const [assignedTours, setAssignedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get(`https://tourism-management-system-server.onrender.com/api/assigned-tours/${userEmail}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAssignedTours(res.data);
        } else {
          setAssignedTours([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch assigned tours", err);
        setAssignedTours([]);
      })
      .finally(() => setLoading(false));
  }, [userEmail]);

  const handleAccept = async (id) => {
    try {
      const res = await axios.patch(`https://tourism-management-system-server.onrender.com/api/assigned-tours/accept/${id}`);
      updateLocalStatus(id, res.data.status);
      Swal.fire({
        icon: "success",
        title: "Tour Accepted",
        text: "You have successfully accepted the tour.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error accepting tour:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to accept the tour.",
      });
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to reject this tour?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.patch(`/api/assigned-tours/reject/${id}`);
      updateLocalStatus(id, res.data.status);
      Swal.fire({
        icon: "success",
        title: "Tour Rejected",
        text: "The tour has been rejected.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error rejecting tour:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to reject the tour.",
      });
    }
  };

  const updateLocalStatus = (id, newStatus) => {
    setAssignedTours((prev) =>
      prev.map((tour) =>
        tour._id === id ? { ...tour, status: newStatus } : tour
      )
    );
  };

  if (loading) return <p>Loading assigned tours...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Assigned Tours</h2>
      {assignedTours.length === 0 ? (
        <p>No assigned tours found.</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Package Name</th>
              <th className="border px-4 py-2">Tourist Name</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedTours.map((tour) => {
              const normalizedStatus = tour.status?.trim().toLowerCase();
              return (
                <tr key={tour._id}>
                  <td className="border px-4 py-2">{tour.packageName}</td>
                  <td className="border px-4 py-2">{tour.touristName}</td>
                  <td className="border px-4 py-2">
                    {new Date(tour.date).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">${tour.price}</td>
                  <td className="border px-4 py-2 capitalize">{tour.status}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleAccept(tour._id)}
                      disabled={normalizedStatus !== "in review"}
                      className={`px-3 py-1 rounded text-white ${
                        normalizedStatus === "in review"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(tour._id)}
                      disabled={normalizedStatus !== "in review"}
                      className={`px-3 py-1 rounded text-white ${
                        normalizedStatus === "in review"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
