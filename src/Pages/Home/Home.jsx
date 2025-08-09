import React from "react";

import SliderPage from "../Shared/SliderPage";
import usePageTitle from "../../hooks/usePageTitle";
import AdvertisedProperties from "./AdvertisedProperties";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import LatestUserReviews from "./LatestUserReviews";
import DiscoverNeighborhood from "./DiscoverNeighborhood ";
const Home = () => {
  usePageTitle("Home");

  return (
    <main>
      <SliderPage></SliderPage>
      <div className="max-w-screen-xl mx-auto">
        <AdvertisedProperties></AdvertisedProperties>
        <LatestUserReviews></LatestUserReviews>
        <Testimonials></Testimonials>
        <WhyChooseUs></WhyChooseUs>
        <DiscoverNeighborhood></DiscoverNeighborhood>
      </div>
    </main>
  );
};

export default Home;
