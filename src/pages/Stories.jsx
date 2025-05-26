// src/components/home/TouristStories.jsx
import { useEffect, useState, useContext } from "react";
import { FacebookShareButton } from "react-share";
import { Link, useNavigate } from "react-router-dom";
import { useAuth  } from "../context/AuthContext";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const { user } = useAuth ();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/stories/random")
      .then(res => res.json())
      .then(data => setStories(data));
  }, []);

  const handleShare = (storyId) => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h2 className="text-3xl font-bold text-center">Stories</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map(story => (
          <div key={story._id} className="border rounded-lg p-4 shadow">
            <h3 className="text-xl font-semibold">{story.title}</h3>
            <p className="text-gray-600 my-2">{story.description}</p>
            <p className="text-sm text-gray-500">By: {story.author}</p>

            <div className="mt-3">
              {user ? (
                <FacebookShareButton url={`http://localhost:5173/stories/${story._id}`} quote={story.title}>
                  <button className="btn btn-sm bg-blue-600 text-white">Share on Facebook</button>
                </FacebookShareButton>
              ) : (
                <button onClick={() => handleShare(story._id)} className="btn btn-sm bg-blue-600 text-white">
                  Share on Facebook
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
