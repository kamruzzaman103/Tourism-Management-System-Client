// src/pages/Home.jsx
import Banner from "../components/home/Banner";
import Overview from "../components/home/Overview";
import TouristStories from "../components/home/TouristStories";
import WhyTravelWithUs from "../components/home/WhyTravelWithUs";
import TopDestinations from "../components/home/TopDestinations";
import TourismGuideTabs from "../components/home/TourismGuideTabs";

const Home = () => {
  return (
    <div>
      <Banner />
      <Overview />
      <TourismGuideTabs />
      <TouristStories />
      <WhyTravelWithUs />
      <TopDestinations />
    </div>
  );
};

export default Home;
