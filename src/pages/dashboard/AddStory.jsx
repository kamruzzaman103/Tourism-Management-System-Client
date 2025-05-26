
// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const AddStory = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || images.length === 0) {
//       return Swal.fire('Error', 'Please fill all fields and upload images.', 'error');
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     images.forEach((img) => formData.append('images', img));

//     const token = localStorage.getItem('token'); // ✅ get token from localStorage

//     try {
//       const res = await axios.post('http://localhost:5000/api/stories', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`, // ✅ set token in Authorization header
//         },
//       });

//       if (res.data.insertedId) {
//         Swal.fire('Success!', 'Story added successfully!', 'success');
//         navigate('/dashboard/manage-stories');
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire('Error', 'Failed to add story.', 'error');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Add Story</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full border px-3 py-2 mb-4"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Your Story..."
//           className="w-full border px-3 py-2 mb-4"
//           rows="5"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           className="mb-4"
//           onChange={handleImageChange}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStory;


// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const AddStory = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [images, setImages] = useState([]);
//   const navigate = useNavigate();

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !description || images.length === 0) {
//       return Swal.fire('Error', 'Please fill all fields and upload images.', 'error');
//     }

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     images.forEach((img) => formData.append('images', img));

//     const token = localStorage.getItem('token');     // ✅ Get JWT token
//     const email = localStorage.getItem('email');     // ✅ Get email

//     if (email) {
//       formData.append('email', email);              // ✅ Append email to formData
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/stories', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,         // ✅ Send token in Authorization header
//         },
//       });

//       if (res.data.insertedId) {
//         Swal.fire('Success!', 'Story added successfully!', 'success');
//         navigate('/dashboard/manage-stories');
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire('Error', 'Failed to add story.', 'error');
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-semibold mb-4">Add Story</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full border px-3 py-2 mb-4"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Your Story..."
//           className="w-full border px-3 py-2 mb-4"
//           rows="5"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           className="mb-4"
//           onChange={handleImageChange}
//         />
//         <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddStory;



import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';  // ✅ এখানে import করো

const AddStory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const { user } = useAuth();  // ✅ ইউজারের তথ্য নিলাম

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      return Swal.fire('Error', 'Please fill all fields and upload images.', 'error');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    images.forEach((img) => formData.append('images', img));

    const token = localStorage.getItem('token'); // token এটা যেমন ছিল তেমনই

    if (user?.email) {
      formData.append('email', user.email);  // ✅ email useAuth থেকে
    }

    try {
      const res = await axios.post('http://localhost:5000/api/stories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.insertedId) {
        Swal.fire('Success!', 'Story added successfully!', 'success');
        navigate('/dashboard/manage-stories');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to add story.', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-3 py-2 mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Your Story..."
          className="w-full border px-3 py-2 mb-4"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          multiple
          accept="image/*"
          className="mb-4"
          onChange={handleImageChange}
        />
        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStory;
