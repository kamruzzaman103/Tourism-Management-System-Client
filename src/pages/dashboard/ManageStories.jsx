import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // তোমার auth context

const ManageStories = () => {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();  // current logged-in user

  const fetchStories = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('https://tourism-management-system-server.onrender.com/api/stories/my-stories', {  // সব স্টোরি আনছে
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (user?.email) {
        // ইউজারের email দিয়ে ফিল্টার
        const filteredStories = res.data.filter(story => story.email === user.email);
        setStories(filteredStories);
      } else {
        setStories([]); // বা শুধু empty array রাখতে পারো
      }
    } catch (err) {
      console.error('Failed to fetch stories:', err);
      Swal.fire('Error', 'You must be logged in to view your stories.', 'error');
    }
  };

  useEffect(() => {
    fetchStories();
  }, [user]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem('token');

        const res = await axios.delete(`https://tourism-management-system-server.onrender.com/api/stories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.deletedCount > 0) {
          Swal.fire('Deleted!', 'Story has been deleted.', 'success');
          fetchStories();
        }
      } catch (err) {
        console.error('Failed to delete story:', err);
        Swal.fire('Error', 'Failed to delete story.', 'error');
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stories.map((story) => (
        <div key={story._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{story.title}</h2>
          <p className="text-gray-600">{story.description.slice(0, 100)}...</p>
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {story.images.map((img, i) => (
              <img
                key={i}
                src={`https://tourism-management-system-server.onrender.com/uploads/stories/${img}`}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
          <div className="mt-4 flex gap-4">
            <Link to={`/dashboard/update-story/${story._id}`}>
              <button className="bg-green-600 text-white px-3 py-1 rounded">Edit</button>
            </Link>
            <button
              onClick={() => handleDelete(story._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageStories;
