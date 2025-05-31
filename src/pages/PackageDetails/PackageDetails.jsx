import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Gallery from './Gallery';
import AboutTour from './AboutTour';
import TourPlan from './TourPlan';
import TourGuides from './TourGuides';
import BookingForm from './BookingForm';
import AllTrips from './AllTrips';
import TourGuideProfile from './TourGuideProfile';

const PackageDetails = () => {
  const { id } = useParams();
  const [packageInfo, setPackageInfo] = useState(null);
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`https://tourism-management-system-server.onrender.com/api/packages/${id}`);
        setPackageInfo(response.data.package);
        setGuides(response.data.guides);
      } catch (error) {
        console.error("Failed to fetch package details", error);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (!packageInfo) return <div>Loading...</div>;

  return (
    <div className="px-6 py-12">
      <Gallery images={packageInfo.galleryImages} />
      <AboutTour description={packageInfo.about} />
      <TourPlan plan={packageInfo.tourPlan} />
      <TourGuides guides={guides} />
      <BookingForm
        packageName={packageInfo.packageName}
        price={packageInfo.price}
        tourGuideEmail={packageInfo.tourGuideEmail}
        guides={guides}
      />
      <AllTrips></AllTrips>
      <TourGuideProfile></TourGuideProfile>
    </div>
  );
};

export default PackageDetails;
