import React, { useEffect } from "react";
import { FaUpload, FaSearch, FaHandHoldingHeart } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorks = () => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const steps = [
    {
      icon: <FaUpload className="w-12 h-12 text-green-600 mb-4" />,
      title: "Post Food",
      description:
        "Donate your extra food by posting it on our platform for those in need.",
      animation: "fade-up-right",
    },
    {
      icon: <FaSearch className="w-12 h-12 text-green-600 mb-4" />,
      title: "Find Food",
      description:
        "Browse available foods in your area and find what you need quickly.",
      animation: "zoom-in",
    },
    {
      icon: <FaHandHoldingHeart className="w-12 h-12 text-green-600 mb-4" />,
      title: "Collect Food",
      description:
        "Connect with the donator and safely collect your food.",
      animation: "fade-up-left",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 via-green-100 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          data-aos="fade-down"
          className="text-4xl font-bold text-gray-800 mb-12"
        >
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              data-aos={step.animation}
              data-aos-delay={index * 200}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-green-100 relative group"
            >
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-green-100 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition duration-700"></div>

              {step.icon}
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div data-aos="fade-up" className="mt-14">
          <p className="text-gray-700 text-lg mb-4">
            Ready to make a difference?
          </p>
          <a
            href="/available-foods"
            className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:-translate-y-1"
          >
            Explore Foods
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
