// src/pages/PackageDetails/TourGuides.jsx
const TourGuides = ({ guides }) => {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Meet Our Tour Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {guides.map(guide => (
            <div key={guide._id} className="bg-white p-6 rounded-lg shadow-md">
              <img src={guide.photo} alt={guide.name} className="rounded-full w-24 h-24 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-center">{guide.name}</h3>
              <p className="text-center">{guide.specialty}</p>
              <button className="block mx-auto text-blue-600 mt-2">View Profile</button>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default TourGuides;
  