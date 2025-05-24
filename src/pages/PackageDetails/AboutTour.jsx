// src/pages/PackageDetails/AboutTour.jsx
const AboutTour = ({ description }) => {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">About The Tour</h2>
        <p className="text-lg text-gray-700">{description}</p>
      </section>
    );
  };
  
  export default AboutTour;
  