import React from "react";
import { FaUpload, FaSearch, FaHandHoldingHeart } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUpload className="w-10 h-10 text-green-600 mb-4" />,
      title: "Post Food",
      description: "Donate your extra food by posting it on our platform for those in need.",
    },
    {
      icon: <FaSearch className="w-10 h-10 text-green-600 mb-4" />,
      title: "Find Food",
      description: "Browse available foods in your area and find what you need quickly.",
    },
    {
      icon: <FaHandHoldingHeart className="w-10 h-10 text-green-600 mb-4" />,
      title: "Collect Food",
      description: "Connect with the donator and safely collect your food.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
