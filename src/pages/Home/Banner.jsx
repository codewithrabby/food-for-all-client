import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 via-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4">
          Welcome to Food For All
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8">
          A platform to share and find available food in your community.  
          Helping reduce food waste and feed those in need.
        </p>
        <Link
          to="/available-foods"
          className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
        >
          View All Foods
        </Link>
      </div>
    </section>
  );
};

export default Banner;
