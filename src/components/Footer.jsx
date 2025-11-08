import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo + Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/vk7zMRV/food-logo.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="font-bold text-gray-800">Food For All</span>
        </Link>

        {/* Center: Copyright Section */}
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Food For All. All rights reserved.
        </p>

        {/* Right: Social Media Links Section */}
        <div className="flex items-center gap-4 text-gray-600">
          <a
            href="https://www.facebook.com/mdgolamrabbydev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/mdgolamrabbyDev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.instagram.com/mdgolamrabbywebdeveloper/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
