import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import OurMission from "./OurMission";
import FeaturedFoods from "./FeaturedFoods";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <FeaturedFoods/>
      <HowItWorks />
      <OurMission />
    </div>
  );
};

export default Home;
