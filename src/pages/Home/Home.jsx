import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import OurMission from "./OurMission";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <HowItWorks />
      <OurMission />
    </div>
  );
};

export default Home;
