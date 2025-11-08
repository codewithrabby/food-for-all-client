import React from "react";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <div className="flex flex-col">
      <Banner />
      <HowItWorks />
    </div>
  );
};

export default Home;
