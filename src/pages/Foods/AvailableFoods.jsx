import React, { useEffect, useState } from "react";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error("Failed to fetch foods:", err));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">🍽️ All Available Foods</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-xl transition"
          >
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{food.name}</h3>
            <p className="text-gray-600 mb-2">{food.description}</p>
            <p className="text-green-700 font-medium mb-4">
              Serves: {food.quantity} people
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableFoods;
