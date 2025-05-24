// src/components/home/WhyTravelWithUs.jsx
const WhyTravelWithUs = () => {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-10 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Why Travel With Us?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We are committed to providing the best experience for every traveler.
            Our local guides, secure packages, and 24/7 customer support ensure your journey is smooth, safe, and unforgettable.
          </p>
  
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
              <p>All our guides are certified locals with deep knowledge of each location's culture and history.</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Custom Packages</h3>
              <p>We offer tailor-made tour plans based on your preferences and budget.</p>
            </div>
            <div className="p-4 bg-white shadow rounded-lg">
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p>Our support team is available around the clock to assist you during your trip.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default WhyTravelWithUs;
  