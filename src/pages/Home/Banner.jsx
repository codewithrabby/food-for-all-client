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
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://i.ibb.co.com/cKh0VJCw/banner.webp')",
        }}
      />

      <div className="absolute inset-0 bg-black/20 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full text-center">
        <div
          data-aos="fade-up"
          className="bg-white/20 backdrop-blur-md rounded-3xl p-10 md:p-16 shadow-lg border border-white/20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Welcome to <span className="text-green-500">Food For All</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-4">
            Discover available meals near you, share surplus food, and join our
            mission to fight hunger.
          </p>

          <p className="text-md sm:text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Whether you want to donate extra food or find a meal, our platform
            connects generous hearts with those in need. Reduce food waste,
            support your community, and make a difference today.
          </p>

          <Link
            to="/available-foods"
            className="inline-block px-8 py-4 bg-green-600/90 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700/90 transition transform hover:-translate-y-1"
          >
            View All Foods
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
