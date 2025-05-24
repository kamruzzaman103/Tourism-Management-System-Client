// src/components/home/Banner.jsx
const Banner = () => {
    return (
      <div className="h-[400px] bg-cover bg-center flex items-center justify-center text-white text-center" style={{ backgroundImage: 'url(https://i.ibb.co/BZFM9pW/tour-banner.jpg)' }}>
        <div className="bg-black bg-opacity-50 p-5 rounded">
          <h1 className="text-4xl font-bold">Explore the World with Us</h1>
          <p className="mt-2 text-lg">Discover beautiful destinations and make unforgettable memories.</p>
        </div>
      </div>
    );
  };
  
  export default Banner;
  