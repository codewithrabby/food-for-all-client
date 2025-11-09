import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo + Name */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://i.ibb.co.com/tTbMLBxG/logo2.png"
            alt="Logo"
            className="w-12 h-12 rounded-full shadow-md"
          />
          <span className="font-extrabold text-gray-800 text-lg hover:text-green-600 transition">
            Food For All
          </span>
        </Link>

        {/* Center: Copyright Section */}
        <p className="text-sm text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} Food For All. All rights reserved.
        </p>

        {/* Right: Social Media Links Section */}
        <div className="flex items-center gap-5 text-gray-600">
          <a
            href="https://www.facebook.com/mdgolamrabbydev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow hover:bg-blue-100 hover:text-blue-600 transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://x.com/mdgolamrabbyDev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow hover:bg-blue-100 hover:text-blue-400 transition"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://www.instagram.com/mdgolamrabbywebdeveloper/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow hover:bg-pink-100 hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
