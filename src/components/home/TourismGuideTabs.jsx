// src/components/home/TourismGuideTabs.jsx
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TourismGuideTabs = () => {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/packages/random")
      .then(res => res.json())
      .then(data => setPackages(data));

    fetch("http://localhost:5000/guides/random")
      .then(res => res.json())
      .then(data => setGuides(data));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-5">Travel Highlights</h2>
      <Tabs>
        <TabList>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {packages.map(pkg => (
              <div key={pkg._id} className="border rounded p-4 shadow">
                <img src={pkg.image} alt={pkg.title} className="rounded h-40 w-full object-cover" />
                <h3 className="text-xl font-semibold mt-2">{pkg.title}</h3>
                <p className="text-gray-600">{pkg.tourType}</p>
                <p className="font-bold text-blue-600">${pkg.price}</p>
                <Link to={`/packages/${pkg._id}`} className="btn btn-sm mt-2">View Details</Link>
              </div>
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {guides.map(guide => (
              <div key={guide._id} className="border rounded p-4 shadow">
                <img src={guide.photo} alt={guide.name} className="rounded-full w-24 h-24 mx-auto" />
                <h3 className="text-xl font-semibold mt-2 text-center">{guide.name}</h3>
                <p className="text-gray-600 text-center">{guide.expertise}</p>
                <Link to={`/guides/${guide._id}`} className="btn btn-sm mt-2 block mx-auto">View Profile</Link>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TourismGuideTabs;
