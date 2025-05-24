// pages/TourGuideProfile.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TourGuideProfile = () => {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/tour-guides/${id}`)
      .then(res => res.json())
      .then(data => setGuide(data));

    fetch(`http://localhost:5000/stories?guideId=${id}`)
      .then(res => res.json())
      .then(data => setStories(data));
  }, [id]);

  if (!guide) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <img src={guide.image} alt={guide.name} className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{guide.name}</h2>
          <p>{guide.bio}</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Stories by {guide.name}</h3>
      <ul className="list-disc ml-5">
        {stories.map(story => (
          <li key={story._id} className="mb-2">{story.title}</li>
        ))}
      </ul>
    </div>
  );
};
export default TourGuideProfile;
