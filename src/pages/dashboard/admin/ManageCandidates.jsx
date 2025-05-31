// import { useEffect, useState } from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import { toast } from 'react-hot-toast';

// const ManageCandidates = () => {
//   const axiosSecure = useAxiosSecure();
//   const [candidates, setCandidates] = useState([]);

//   const fetchCandidates = async () => {
//     const { data } = await axiosSecure.get('/candidates');
//     setCandidates(data);
//   };

//   useEffect(() => {
//     fetchCandidates();
//   }, []);

//   const handleAccept = async (id) => {
//     try {
//       await axiosSecure.patch(`/candidates/accept/${id}`);
//       toast.success('Candidate accepted');
//       fetchCandidates();
//     } catch (err) {
//       toast.error('Failed to accept');
//     }
//   };

//   const handleReject = async (id) => {
//     const confirm = window.confirm('Are you sure to reject this candidate?');
//     if (!confirm) return;
//     try {
//       await axiosSecure.delete(`/candidates/reject/${id}`);
//       toast.success('Candidate rejected');
//       fetchCandidates();
//     } catch (err) {
//       toast.error('Failed to reject');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Manage Candidates</h2>
//       <div className="overflow-x-auto">
//         <table className="table w-full bg-white">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Candidate</th>
//               <th>Email</th>
//               <th>Bio</th>
//               <th>Portfolio</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {candidates.map((c, index) => (
//               <tr key={c._id}>
//                 <td>{index + 1}</td>
//                 <td>{c.user?.name}</td>
//                 <td>{c.user?.email}</td>
//                 <td>{c.bio}</td>
//                 <td>
//                   <a href={c.portfolio} className="text-blue-500 underline" target="_blank" rel="noreferrer">
//                     Portfolio
//                   </a>
//                 </td>
//                 <td>
//                   <button onClick={() => handleAccept(c._id)} className="btn btn-success btn-sm mr-2">
//                     Accept
//                   </button>
//                   <button onClick={() => handleReject(c._id)} className="btn btn-error btn-sm">
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {candidates.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-4 text-gray-500">
//                   No applications found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageCandidates;




// src/pages/dashboard/admin/ManageCandidates.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageCandidates = () => {
  const token = localStorage.getItem('token');

  const axiosSecure = axios.create({
    baseURL: 'https://tourism-management-system-server.onrender.com/api', // ⛳ তোমার API এর base URL এখানে বসাও
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(token);
  

  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const { data } = await axiosSecure.get('/candidates');
      setCandidates(data);
    } catch (err) {
      toast.error("Failed to fetch candidates");
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleAccept = async (id) => {
    try {
      await axiosSecure.patch(`/candidates/accept/${id}`);
      toast.success('Candidate accepted');
      fetchCandidates();
    } catch (err) {
      toast.error('Failed to accept');
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm('Are you sure to reject this candidate?');
    if (!confirmReject) return;

    try {
      await axiosSecure.delete(`/candidates/reject/${id}`);
      toast.success('Candidate rejected');
      fetchCandidates();
    } catch (err) {
      toast.error('Failed to reject');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Candidates</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-white">
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Portfolio</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 ? (
              candidates.map((c, index) => (
                <tr key={c._id}>
                  <td>{index + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.bio}</td>
                  <td>
                    <a
                      href={c.cvLink}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Portfolio
                    </a>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAccept(c._id)}
                      className="btn btn-success btn-sm mr-2"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(c._id)}
                      className="btn btn-error btn-sm"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCandidates;
