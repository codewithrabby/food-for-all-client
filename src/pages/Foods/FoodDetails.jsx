import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error("Failed to fetch food details:", err));
  }, [id]);

  if (!food) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{food.name}</h1>
      <p className="text-gray-700 mb-2">{food.description}</p>
      <p className="text-green-700 font-semibold mb-4">
        Serves: {food.quantity} people
      </p>
      <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
        Request This Food
      </button>
    </section>
  );
};

export default FoodDetails;
