import React, { useEffect } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <footer
      data-aos="fade-up"
      className="bg-gray-50 text-gray-700 border-t border-gray-200 mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          to="/"
          className="flex items-center gap-3"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <img
            src="https://i.ibb.co.com/tTbMLBxG/logo2.png"
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
          />
          <span className="font-extrabold text-gray-800 text-lg hover:text-green-600 transition">
            Food For All
          </span>
        </Link>

        <p
          className="text-sm text-gray-500 text-center md:text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          &copy; {new Date().getFullYear()} Food For All. All rights reserved.
        </p>

        <div
          className="flex items-center gap-5 text-gray-600"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <a
            href="https://www.facebook.com/mdgolamrabbydev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow hover:bg-blue-100 hover:text-blue-600 transition transform hover:scale-110"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/mdgolamrabbyDev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow hover:bg-blue-100 hover:text-blue-400 transition transform hover:scale-110"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.instagram.com/mdgolamrabbywebdeveloper/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow hover:bg-pink-100 hover:text-pink-500 transition transform hover:scale-110"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
