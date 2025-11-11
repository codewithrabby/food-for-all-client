import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <section className="bg-gradient-to-r from-green-100 via-green-50 to-green-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative">
        <h1
          data-aos="zoom-in"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-6"
        >
          Welcome to{" "}
          <span className="text-green-700 drop-shadow-sm">Food For All</span>
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4"
        >
          Discover available meals near you, share surplus food, and join our
          mission to fight hunger.
        </p>

        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-md sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          Whether you want to donate extra food or find a meal, our platform
          connects generous hearts with those in need. Reduce food waste,
          support your community, and make a difference today.
        </p>

        <div data-aos="zoom-in-up" data-aos-delay="600">
          <Link
            to="/available-foods"
            className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
          >
            View All Foods
          </Link>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-delay="800"
          className="absolute top-20 left-1/2 transform -translate-x-1/2 w-[400px] h-[400px] bg-green-300 rounded-full blur-3xl opacity-20 -z-10"
        />
      </div>
    </section>
  );
};

export default Banner;
