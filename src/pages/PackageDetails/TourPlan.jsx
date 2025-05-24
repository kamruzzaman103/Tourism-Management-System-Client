// src/pages/PackageDetails/TourPlan.jsx
const TourPlan = ({ plan }) => {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tour Plan</h2>
        <ul className="list-disc pl-6 text-lg">
          {plan.map((day, index) => (
            <li key={index} className="mb-2">
              <strong>Day {index + 1}:</strong> {day}
            </li>
          ))}
        </ul>
      </section>
    );
  };
  
  export default TourPlan;
  