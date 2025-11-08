import React from "react";
import { FaUtensils, FaUsers, FaHeart } from "react-icons/fa";

const OurMission = () => {
  const stats = [
    { icon: <FaUtensils className="w-8 h-8 text-green-600" />, label: "Foods Shared", value: 1200 },
    { icon: <FaUsers className="w-8 h-8 text-green-600" />, label: "Donors", value: 350 },
    { icon: <FaHeart className="w-8 h-8 text-green-600" />, label: "Food Requests", value: 900 },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Mission Text Section */}
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            Our mission is to reduce food waste and provide meals to those in need. 
            We connect donors with people who require food, creating a caring community. 
            Join us to make a positive impact in your community.
          </p>
          <img
            src="https://i.ibb.co/6yQsR4X/mission-image.jpg"
            alt="Our Mission"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded shadow hover:shadow-lg transition">
              {stat.icon}
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}+</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMission;
