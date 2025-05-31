import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext"; // ✅ তুমি যেখান থেকে useAuth নিয়ে আসো path টা মিলিয়ে নিও

const AddPackage = () => {
  const [tourGuides, setTourGuides] = useState([]);
  const [tourDate, setTourDate] = useState(new Date());
  const { user } = useAuth(); // ✅ ইউজার ইনফো নেওয়া হলো

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const res = await axios.get("https://tourism-management-system-server.onrender.com/api/users");
        setTourGuides(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load tour guides");
      }
    };
    fetchGuides();
  }, []);

  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to add a package");
      return;
    }

    const packageData = {
      packageName: data.packageName,
      price: Number(data.price),
      tourDate: tourDate.toISOString(),
      galleryImages: data.galleryImages.split(",").map((img) => img.trim()),
      about: data.about,
      tourPlan: [
        { day: "Day 1", plan: data.day1 },
        { day: "Day 2", plan: data.day2 }
      ],
      tourGuides: [data.tourGuideId],
      tourGuideEmail: tourGuides.find(g => g._id === data.tourGuideId)?.email || "",
      createdBy: user._id // ✅ backend চাইলে createdBy দিয়ে পাঠানো যায়
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post("https://tourism-management-system-server.onrender.com/api/packages/add", packageData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Package added successfully!");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add package");
    }
  };

  // ✅ ইউজার না থাকলে ফর্ম না দেখিয়ে বার্তা দেখানো
  if (!user) {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold text-xl">
        You must be logged in to access this page.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Tour Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            placeholder="Package Name"
            {...register("packageName", { required: "Package name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.packageName && <p className="text-red-600 text-sm">{errors.packageName.message}</p>}
        </div>

        <div>
          <input
            placeholder="Price"
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Tour Date</label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <input
            placeholder="Gallery Image URLs (comma separated)"
            {...register("galleryImages", { required: "At least one image URL is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.galleryImages && <p className="text-red-600 text-sm">{errors.galleryImages.message}</p>}
        </div>

        <div>
          <textarea
            placeholder="About the Tour"
            {...register("about", { required: "Tour description is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.about && <p className="text-red-600 text-sm">{errors.about.message}</p>}
        </div>

        <div>
          <input
            placeholder="Day 1 Plan"
            {...register("day1", { required: "Day 1 plan is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.day1 && <p className="text-red-600 text-sm">{errors.day1.message}</p>}
        </div>

        <div>
          <input
            placeholder="Day 2 Plan"
            {...register("day2", { required: "Day 2 plan is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.day2 && <p className="text-red-600 text-sm">{errors.day2.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Select Tour Guide</label>
          <select
            {...register("tourGuideId", { required: "Selecting a tour guide is required" })}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select a Tour Guide --</option>
            {tourGuides.map((guide) => (
              <option key={guide._id} value={guide._id}>
                {guide.name}
              </option>
            ))}
          </select>
          {errors.tourGuideId && <p className="text-red-600 text-sm">{errors.tourGuideId.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;
