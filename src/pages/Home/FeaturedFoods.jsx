import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Failed to fetch foods:", err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Featured Foods
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl p-5 border border-gray-100 transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {food.name}
            </h3>
            <p className="text-gray-600 mb-3 line-clamp-3">
              {food.description}
            </p>
            <p className="text-green-700 font-medium mb-4">
              Serves: {food.quantity} people
            </p>
            <Link
              to={`/foods/${food._id}`}
              className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 shadow-md transition duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/available-foods"
          className="inline-block px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 shadow-lg transition duration-300"
        >
          Show All Foods
        </Link>
      </div>
    </section>
  );
};

export default FeaturedFoods;
