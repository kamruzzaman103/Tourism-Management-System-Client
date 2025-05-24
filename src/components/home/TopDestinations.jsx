// src/components/home/TopDestinations.jsx
const TopDestinations = () => {
    const destinations = [
      {
        name: "Santorini, Greece",
        image: "https://i.ibb.co/QX2WcLS/santorini.jpg",
      },
      {
        name: "Kyoto, Japan",
        image: "https://i.ibb.co/y6N09T6/kyoto.jpg",
      },
      {
        name: "Banff, Canada",
        image: "https://i.ibb.co/7n9sB1f/banff.jpg",
      },
    ];
  
    return (
      <div className="bg-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Top Destinations 2025</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {destinations.map((dest, index) => (
              <div key={index} className="rounded overflow-hidden shadow hover:shadow-lg transition">
                <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{dest.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default TopDestinations;
  