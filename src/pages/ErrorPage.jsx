import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-emerald-100 text-center p-4">
      <img
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="404 Not Found"
        className="w-72 md:w-96 mb-8 drop-shadow-lg"
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-emerald-700">
        404 - Page Not Found
      </h1>

      <p className="text-gray-600 text-lg mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
