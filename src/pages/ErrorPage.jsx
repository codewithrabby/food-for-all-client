import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center p-4">
      <img
        src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
        alt="404 Not Found"
        className="w-80 md:w-96 mb-8"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-800">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for does not exist.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
