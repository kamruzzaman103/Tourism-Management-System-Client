import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/stories/${id}`, { withCredentials: true })
      .then(res => setStory(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleDeleteImage = async (imageName) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/stories/remove-image/${id}`, { imageName }, { withCredentials: true });
      if (res.data.modifiedCount > 0) {
        setStory((prev) => ({
          ...prev,
          images: prev.images.filter((img) => img !== imageName),
        }));
        Swal.fire("Deleted!", "Image removed successfully", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    newImages.forEach((img) => formData.append('images', img));

    try {
      await axios.patch(`http://localhost:5000/api/stories/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      Swal.fire("Updated!", "Story updated successfully", "success");
      navigate('/dashboard/manage-stories');
    } catch (err) {
      console.error(err);
    }
  };

  if (!story) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold">Update Story</h2>
      <input name="title" defaultValue={story.title} required className="w-full border p-2 rounded" />
      <textarea name="description" defaultValue={story.description} rows="5" className="w-full border p-2 rounded" />

      <label className="block font-semibold">Current Images:</label>
      <div className="flex gap-4 overflow-x-auto">
        {story.images.map((img, i) => (
          <div key={i} className="relative">
            <img src={`http://localhost:5000/uploads/stories/${img}`} alt="" className="w-24 h-24 rounded object-cover" />
            <button
              type="button"
              onClick={() => handleDeleteImage(img)}
              className="absolute top-0 right-0 bg-red-600 text-white px-1 text-xs rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <label className="block font-semibold">Add New Images:</label>
      <input type="file" name="images" multiple accept="image/*" onChange={(e) => setNewImages([...e.target.files])} />

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Update Story</button>
    </form>
  );
};

export default UpdateStory;
