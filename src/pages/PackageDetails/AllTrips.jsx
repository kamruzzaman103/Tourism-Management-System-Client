// pages/AllTrips.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllTrips = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/packages")
      .then(res => res.json())
      .then(data => setPackages(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Tour Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map(pkg => (
          <div key={pkg._id} className="border rounded p-4 shadow">
            <img src={pkg.image} alt={pkg.name} className="h-48 w-full object-cover mb-2 rounded" />
            <h3 className="text-xl font-semibold">{pkg.name}</h3>
            <p className="text-gray-600">${pkg.price}</p>
            <Link to={`/packages/${pkg._id}`} className="text-blue-600 mt-2 inline-block underline">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default AllTrips;
