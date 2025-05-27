// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../../context/AuthContext'; // your context for current user
// import { Dialog } from '@headlessui/react';

// const AdminProfile = () => {
//   const { user } = useAuth();
//   const [admin, setAdmin] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [form, setForm] = useState({ name: '', photo: '', phone: '', address: '' });

//   useEffect(() => {
//     axios.get(`/api/users/profile/${user.email}`)
//       .then(res => {
//         setAdmin(res.data);
//         setForm({
//           name: res.data.name,
//           photo: res.data.photo,
//           phone: res.data.phone || '',
//           address: res.data.address || ''
//         });
//       });
//   }, [user]);

//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:5000/api/users/profile/${user.email}`, form);
//     setIsOpen(false);
//     window.location.reload(); // reload profile
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">👋 Welcome, {admin?.name}</h2>
      
//       <div className="flex items-center gap-4 mb-6">
//         <img src={admin?.photo} alt="Profile" className="w-24 h-24 rounded-full" />
//         <div>
//           <p><strong>Email:</strong> {admin?.email}</p>
//           <p><strong>Role:</strong> {admin?.role}</p>
//           <p><strong>Phone:</strong> {admin?.phone}</p>
//           <p><strong>Address:</strong> {admin?.address}</p>
//         </div>
//       </div>

//       <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
//         ✏️ Edit Profile
//       </button>

//       {/* Edit Modal */}
//       <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 space-y-4">
//             <Dialog.Title className="text-lg font-bold">Edit Profile</Dialog.Title>
//             <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full p-2 border" placeholder="Name" />
//             <input value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} className="w-full p-2 border" placeholder="Photo URL" />
//             <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full p-2 border" placeholder="Phone" />
//             <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="w-full p-2 border" placeholder="Address" />
//             <div className="flex justify-end gap-2">
//               <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
//               <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminProfile;


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../../context/AuthContext';
// import { Dialog } from '@headlessui/react';

// const AdminProfile = () => {
//   const { user } = useAuth();
//   const [admin, setAdmin] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [form, setForm] = useState({ name: '', photo: '', phone: '', address: '' });

//   useEffect(() => {
//     // ✅ check if user and user.email exists
//     if (user?.email) {
//       axios.get(`http://localhost:5000/api/users/profile/${user.email}`)
//         .then(res => {
//           setAdmin(res.data);
//           setForm({
//             name: res.data.name || '',
//             photo: res.data.photo || '',
//             phone: res.data.phone || '',
//             address: res.data.address || ''
//           });
//         });
//     }
//   }, [user]);

//   const handleUpdate = async () => {
//     await axios.put(`http://localhost:5000/api/users/profile/${user.email}`, form);
//     setIsOpen(false);
//     window.location.reload();
//   };

//   if (!user) return <div className="text-center mt-10">Loading user...</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-semibold mb-4">👋 Welcome, {admin?.name}</h2>

//       <div className="flex items-center gap-4 mb-6">
//         <img src={admin?.photo} alt="Profile" className="w-24 h-24 rounded-full" />
//         <div>
//           <p><strong>Email:</strong> {admin?.email}</p>
//           <p><strong>Role:</strong> {admin?.role}</p>
//           <p><strong>Phone:</strong> {admin?.phone}</p>
//           <p><strong>Address:</strong> {admin?.address}</p>
//         </div>
//       </div>

//       <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
//         ✏️ Edit Profile
//       </button>

//       {/* Modal */}
//       <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 space-y-4">
//             <Dialog.Title className="text-lg font-bold">Edit Profile</Dialog.Title>
//             <input
//               value={form.name}
//               onChange={e => setForm({ ...form, name: e.target.value })}
//               className="w-full p-2 border"
//               placeholder="Name"
//             />
//             <input
//               value={form.photo}
//               onChange={e => setForm({ ...form, photo: e.target.value })}
//               className="w-full p-2 border"
//               placeholder="Photo URL"
//             />
//             <input
//               value={form.phone}
//               onChange={e => setForm({ ...form, phone: e.target.value })}
//               className="w-full p-2 border"
//               placeholder="Phone"
//             />
//             <input
//               value={form.address}
//               onChange={e => setForm({ ...form, address: e.target.value })}
//               className="w-full p-2 border"
//               placeholder="Address"
//             />
//             <div className="flex justify-end gap-2">
//               <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
//               <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default AdminProfile;


import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast'; // ✅ add this line

const AdminProfile = () => {
  const { user } = useAuth();
  const [admin, setAdmin] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: '', photo: '', phone: '', address: '' });

  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/api/users/profile/${user.email}`)
        .then(res => {
          setAdmin(res.data);
          setForm({
            name: res.data.name || '',
            photo: res.data.photo || '',
            phone: res.data.phone || '',
            address: res.data.address || ''
          });
        });
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/profile/${user.email}`, form);
      setIsOpen(false);
      toast.success(" Profile updated successfully!"); // ✅ show toast
      setTimeout(() => {
        window.location.reload(); // slight delay to show toast
      }, 1000);
    } catch (err) {
      toast.error(" Failed to update profile!");
    }
  };

  if (!user) return <div className="text-center mt-10">Loading user...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">👋 Welcome, {admin?.name}</h2>

      <div className="flex items-center gap-4 mb-6">
        <img src={admin?.photo} alt="Profile" className="w-24 h-24 rounded-full" />
        <div>
          <p><strong>Email:</strong> {admin?.email}</p>
          <p><strong>Role:</strong> {admin?.role}</p>
          <p><strong>Phone:</strong> {admin?.phone}</p>
          <p><strong>Address:</strong> {admin?.address}</p>
        </div>
      </div>

      <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
        ✏️ Edit Profile
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white rounded p-6 space-y-4">
            <Dialog.Title className="text-lg font-bold">Edit Profile</Dialog.Title>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border"
              placeholder="Name"
            />
            <input
              value={form.photo}
              onChange={e => setForm({ ...form, photo: e.target.value })}
              className="w-full p-2 border"
              placeholder="Photo URL"
            />
            <input
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full p-2 border"
              placeholder="Phone"
            />
            <input
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
              className="w-full p-2 border"
              placeholder="Address"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminProfile;
