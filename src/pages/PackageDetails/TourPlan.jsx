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
