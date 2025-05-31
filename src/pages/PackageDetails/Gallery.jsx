const Gallery = ({ galleryImages = [] }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <div key={index} className="w-full">
            <img
              src={image}
              alt="Tour Destination"
              className="w-full h-[250px] object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
  export default Gallery;