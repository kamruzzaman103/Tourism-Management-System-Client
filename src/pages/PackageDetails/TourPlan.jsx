// src/pages/PackageDetails/TourPlan.jsx
// const TourPlan = ({ plan }) => {
//     return (
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Tour Plan</h2>
//         <ul className="list-disc pl-6 text-lg">
//           {plan.map((day, index) => (
//             <li key={index} className="mb-2">
//               <strong>Day {index + 1}:</strong> {day}
//             </li>
//           ))}
//         </ul>
//       </section>
//     );
//   };
  
//   export default TourPlan;



const TourPlan = ({ plan = [] }) => {
  if (!plan.length) return <p>No tour plan available</p>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Tour Plan</h2>
      <div>
        {plan.map(({ day, plan, _id }) => (
          <div key={_id} className="mb-4 p-4 border rounded">
            <h3 className="font-bold">{day}</h3>
            <p>{plan}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourPlan;
