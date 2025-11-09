import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 via-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Welcome to Food For All
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-4">
          Discover available meals near you, share surplus food, and join our
          mission to fight hunger.
        </p>
        <p className="text-md sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Whether you want to donate extra food or find a meal, our platform
          connects generous hearts with those in need. Reduce food waste,
          support your community, and make a difference today.
        </p>
        <Link
          to="/available-foods"
          className="inline-block px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
        >
          View All Foods
        </Link>
      </div>
    </section>
  );
};

export default Banner;
