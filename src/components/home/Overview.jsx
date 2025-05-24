// src/components/home/Overview.jsx
const Overview = () => {
    return (
      <div className="container mx-auto text-center p-5">
        <h2 className="text-3xl font-bold mb-3">Why Choose Us?</h2>
        <video className="mx-auto rounded-lg" width="640" controls>
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          We provide curated tour packages with top-rated guides, unmatched experiences, and hassle-free travel planning.
        </p>
      </div>
    );
  };
  
  export default Overview;
  