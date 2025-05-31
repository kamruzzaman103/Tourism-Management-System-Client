


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Input, Textarea } from "@/components/ui";
// import { useAuth } from "../../context/AuthContext";

// export default function TouristProfile() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null); // null দিয়ে শুরু করছি
//   const [loading, setLoading] = useState(true); // loading state
//   const [editModal, setEditModal] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`)
//       .then(res => {
//         setProfile(res.data);
//         setFormData(res.data);
//       })
//       .catch(err => {
//         console.error("Failed to load profile:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [user]);

//   const handleEdit = () => {
//     axios.put(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`, formData)
//       .then(() => {
//         setProfile(formData);
//         setEditModal(false);
//       });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow text-center">
//         <p className="text-red-500">Failed to load profile data.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
//       <h2 className="text-xl font-semibold">Welcome, {profile.name}</h2>
//       <img src={profile.photo} alt="Profile" className="w-32 h-32 rounded-full my-4" />
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Role:</strong> {profile.role}</p>

//       <div className="flex gap-4 mt-4">
//         <Button onClick={() => setEditModal(true)}>Edit</Button>
//         <Button variant="outline" onClick={() => window.location.href = "/join-tour-guide"}>
//           Apply for Tour Guide
//         </Button>
//       </div>

//       <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Profile">
//         <div className="space-y-4">
//           <Input label="Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
//           <Input label="Photo URL" value={formData.photoURL || ''} onChange={e => setFormData({ ...formData, photoURL: e.target.value })} />
//           <Textarea label="Bio" value={formData.bio || ''} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
//           <Button onClick={handleEdit}>Save Changes</Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Input, Textarea } from "@/components/ui";
// import { useAuth } from "../../context/AuthContext";

// export default function TouristProfile() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editModal, setEditModal] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (!user?.email) return; // user ডাটা না থাকলে API কল করো না

//     setLoading(true);
//     axios
//       .get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`)
//       .then((res) => {
//         setProfile(res.data);
//         setFormData(res.data);
//       })
//       .catch((err) => {
//         console.error("Failed to load profile:", err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [user]);

//   const handleEdit = () => {
//     axios
//       .put(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`, formData)
//       .then(() => {
//         setProfile(formData);
//         setEditModal(false);
//       })
//       .catch((err) => {
//         console.error("Failed to update profile:", err);
//       });
//   };

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500 text-lg">Authenticating user...</p>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <p className="text-gray-500 text-lg">Loading profile...</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow text-center">
//         <p className="text-red-500">Failed to load profile data.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
//       <h2 className="text-xl font-semibold">Welcome, {profile.name}</h2>
//       <img
//         src={profile.photo}
//         alt="Profile"
//         className="w-32 h-32 rounded-full my-4"
//       />
//       <p>
//         <strong>Email:</strong> {profile.email}
//       </p>
//       <p>
//         <strong>Role:</strong> {profile.role}
//       </p>

//       <div className="flex gap-4 mt-4">
//         <Button onClick={() => setEditModal(true)}>Edit</Button>
//         <Button
//           variant="outline"
//           onClick={() => (window.location.href = "/join-tour-guide")}
//         >
//           Apply for Tour Guide
//         </Button>
//       </div>



//       <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
//         <div className="space-y-4">
//           <Input
//             label="Name"
//             value={formData.name || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//           />
//           <Input
//             label="Photo URL"
//             value={formData.photoURL || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, photoURL: e.target.value })
//             }
//           />
//           <Textarea
//             label="Bio"
//             value={formData.bio || ""}
//             onChange={(e) =>
//               setFormData({ ...formData, bio: e.target.value })
//             }
//           />
//           <Button onClick={handleEdit}>Save Changes</Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal, Input, Textarea } from "@/components/ui";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";

export default function TouristProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    axios
      .get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`)
      .then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  const handleEdit = () => {
    axios
      .put(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`, {
        name: formData.name,
        photo: formData.photo,
        bio: formData.bio,
      })
      .then((res) => {
        setProfile(res.data);
        setEditModal(false);
        toast.success("Profile updated successfully!");
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
        toast.error("Failed to update profile");
      });
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Authenticating user...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow text-center">
        <p className="text-red-500">Failed to load profile data.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold">Welcome, {profile.name}</h2>
      <img
        src={profile.photo}
        alt="Profile"
        className="w-32 h-32 rounded-full my-4"
      />
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>

      <div className="flex gap-4 mt-4">
        <Button onClick={() => setEditModal(true)}>Edit</Button>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/join-tour-guide")}
        >
          Apply for Tour Guide
        </Button>
      </div>

      <Modal isOpen={editModal} onClose={() => setEditModal(false)}>
        <div className="space-y-4">
          <Input
            label="Name"
            value={formData.name || ""}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <Input
            label="Photo URL"
            value={formData.photo || ""}
            onChange={(e) =>
              setFormData({ ...formData, photo: e.target.value })
            }
          />
          <Textarea
            label="Bio"
            value={formData.bio || ""}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
          />
          <Button onClick={handleEdit}>Save Changes</Button>
        </div>
      </Modal>
    </div>
  );
}







// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../context/AuthContext'; // your custom auth context
// import { Button, Modal, Input, Textarea } from "@/components/ui";

// const TouristProfile = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [form, setForm] = useState({});

//   useEffect(() => {
//     axios.get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`).then(res => {
//       setProfile(res.data);
//       setForm(res.data);
//     });
//   }, [user.email]);

//   const handleUpdate = () => {
//     axios.put(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`, form).then(res => {
//       setProfile(res.data);
//       setIsOpen(false);
//     });
//   };

//   return (
//     <div className="p-5 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-3">Welcome, {profile?.name}</h2>
//       <div className="bg-white p-4 rounded shadow">
//         <img src={profile?.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
//         <p><strong>Email:</strong> {profile?.email}</p>
//         <p><strong>Role:</strong> {profile?.role}</p>
//         <p><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>
//         <p><strong>Address:</strong> {profile?.address || 'N/A'}</p>

//         <div className="mt-4 flex gap-2">
//           <Button onClick={() => setIsOpen(true)}>Edit</Button>
//           <Button color="purple" onClick={() => window.location.href = '/dashboard/join-as-guide'}>
//             Apply for Tour Guide
//           </Button>
//         </div>
//       </div>

//       <Modal show={isOpen} onClose={() => setIsOpen(false)}>
//         <Modal.Header>Edit Profile</Modal.Header>
//         <Modal.Body>
//           <div className="space-y-2">
//             <input type="text" className="w-full p-2 border" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//             <input type="text" className="w-full p-2 border" placeholder="Photo URL" value={form.photoURL} onChange={(e) => setForm({ ...form, photoURL: e.target.value })} />
//             <input type="text" className="w-full p-2 border" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
//             <input type="text" className="w-full p-2 border" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleUpdate}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default TouristProfile;


























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Input, Textarea } from "@/components/ui"; // তুমি যদি daisyUI না use করো, তাহলে এখানকার UI component তুমি বানাতে হবে বা replace করো
// import { useAuth } from "../../context/AuthContext";

// export default function TouristProfile() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [editModal, setEditModal] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (user?._id) {
//       axios.get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`)
//         .then(res => {
//           setProfile(res.data);
//           setFormData(res.data);
//         })
//         .catch(err => console.error("Profile fetch error:", err));
//     }
//   }, [user]);

//   const handleEdit = () => {
//     axios.put(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`, formData)
//       .then(() => {
//         setProfile(formData);
//         setEditModal(false);
//       })
//       .catch(err => console.error("Update error:", err));
//   };

//   if (!profile) {
//     return <p className="text-center py-10">Loading profile...</p>;
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
//       <h2 className="text-xl font-semibold">Welcome, {profile.name}</h2>
//       <img src={profile.photoURL} alt="Profile" className="w-32 h-32 rounded-full my-4" />
//       <p><strong>Email:</strong> {profile.email}</p>
//       <p><strong>Role:</strong> {profile.role}</p>

//       <div className="flex gap-4 mt-4">
//         <Button onClick={() => setEditModal(true)}>Edit</Button>
//         <Button variant="outline" onClick={() => window.location.href = "/dashboard/join-tour-guide"}>
//           Apply for Tour Guide
//         </Button>
//       </div>

//       <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Profile">
//         <div className="space-y-4">
//           <Input label="Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
//           <Input label="Photo URL" value={formData.photoURL || ''} onChange={e => setFormData({ ...formData, photoURL: e.target.value })} />
//           <Textarea label="Bio" value={formData.bio || ''} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
//           <Button onClick={handleEdit}>Save Changes</Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Modal, Input, Textarea } from "@/components/ui";
// import { useAuth } from "../../context/AuthContext";
// // import { toast } from "react-toastify";
// import toast from "react-hot-toast";

// export default function TouristProfile() {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [editModal, setEditModal] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user?._id) {
//       axios.get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`)
//         .then(res => {
//           setProfile(res.data);
//           setFormData(res.data);
//           setLoading(false);
//         })
//         .catch(err => {
//           console.error("Profile fetch error:", err);
//           toast.error("Failed to load profile");
//           setLoading(false);
//         });
//     }
//   }, [user?._id]);

//   const handleEdit = () => {
//     if (!formData.name || !formData.photoURL) {
//       toast.warning("Name and Photo URL are required.");
//       return;
//     }

//     axios.put(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`, formData)
//       .then(res => {
//         setProfile(res.data);
//         toast.success("✅ Profile updated successfully!");
//         setEditModal(false);
//       })
//       .catch(err => {
//         console.error("Update error:", err);
//         toast.error("❌ Failed to update profile.");
//       });
//   };

//   if (loading) {
//     return <p className="text-center py-10">Loading profile...</p>;
//   }

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
//       <h2 className="text-xl font-semibold">Welcome, {profile?.name}</h2>
//       <img src={profile?.photo} alt="Profile" className="w-32 h-32 rounded-full my-4 object-cover" />
//       <p><strong>Email:</strong> {profile?.email}</p>
//       <p><strong>Role:</strong> {profile?.role}</p>
//       {profile?.bio && <p className="mt-2"><strong>Bio:</strong> {profile.bio}</p>}

//       <div className="flex gap-4 mt-4">
//         <Button onClick={() => setEditModal(true)}>Edit</Button>
//         <Button variant="outline" onClick={() => window.location.href = "/dashboard/join-tour-guide"}>
//           Apply for Tour Guide
//         </Button>
//       </div>

//       <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Profile">
//         <div className="space-y-4">
//           <Input label="Name" value={formData.name || ''} onChange={e => setFormData({ ...formData, name: e.target.value })} />
//           <Input label="Photo URL" value={formData.photoURL || ''} onChange={e => setFormData({ ...formData, photoURL: e.target.value })} />
//           <Textarea label="Bio" value={formData.bio || ''} onChange={e => setFormData({ ...formData, bio: e.target.value })} />
//           <Button onClick={handleEdit}>Save Changes</Button>
//         </div>
//       </Modal>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuth } from '../../hooks/useAuth'; // your custom auth context
// import { Button, Modal } from 'flowbite-react';

// const ManageProfile = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [form, setForm] = useState({});

//   useEffect(() => {
//     axios.get(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`).then(res => {
//       setProfile(res.data);
//       setForm(res.data);
//     });
//   }, [user.email]);

//   const handleUpdate = () => {
//     axios.put(`https://tourism-management-system-server.onrender.com/api/users/${user.email}`, form).then(res => {
//       setProfile(res.data);
//       setIsOpen(false);
//     });
//   };

//   return (
//     <div className="p-5 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-3">Welcome, {profile?.name}</h2>
//       <div className="bg-white p-4 rounded shadow">
//         <img src={profile?.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
//         <p><strong>Email:</strong> {profile?.email}</p>
//         <p><strong>Role:</strong> {profile?.role}</p>
//         <p><strong>Phone:</strong> {profile?.phone || 'N/A'}</p>
//         <p><strong>Address:</strong> {profile?.address || 'N/A'}</p>

//         <div className="mt-4 flex gap-2">
//           <Button onClick={() => setIsOpen(true)}>Edit</Button>
//           <Button color="purple" onClick={() => window.location.href = '/dashboard/join-as-guide'}>
//             Apply for Tour Guide
//           </Button>
//         </div>
//       </div>

//       <Modal show={isOpen} onClose={() => setIsOpen(false)}>
//         <Modal.Header>Edit Profile</Modal.Header>
//         <Modal.Body>
//           <div className="space-y-2">
//             <input type="text" className="w-full p-2 border" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
//             <input type="text" className="w-full p-2 border" placeholder="Photo URL" value={form.photoURL} onChange={(e) => setForm({ ...form, photoURL: e.target.value })} />
//             <input type="text" className="w-full p-2 border" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
//             <input type="text" className="w-full p-2 border" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleUpdate}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ManageProfile;
