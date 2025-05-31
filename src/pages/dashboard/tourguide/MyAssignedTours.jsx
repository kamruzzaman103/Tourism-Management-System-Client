import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; 
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
