import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/all-foods")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched foods:", data);
        // Filter only available foods
        const availableFoods = data.filter(
          (food) => food.status === "Available"
        );
        setFoods(availableFoods);
      })
      .catch((err) => console.error("Failed to fetch foods:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Available Foods</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-xl transition"
          >
            {/* Food Image */}
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Food Name */}
            <h3 className="text-xl font-semibold text-gray-800">{food.name}</h3>

            {/* Donator Info */}
            <div className="flex items-center mt-2 mb-4">
              <img
                src={food.userPhoto || "/default-user.png"}
                alt={food.username || "Donator"}
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <p className="text-gray-700 font-medium">
                {food.username || "Anonymous"}
              </p>
            </div>

            {/* Quantity */}
            <p className="text-gray-600 mb-2">Quantity: {food.quantity}</p>

            {/* Pickup Location */}
            <p className="text-gray-600 mb-2">Pickup: {food.location}</p>

            {/* Expire Date */}
            <p className="text-red-600 font-medium mb-4">
              Expires: {new Date(food.expire_date).toLocaleDateString()}
            </p>

            {/* View Details Button */}
            <Link
              to={`/foods/${food._id}`}
              className="w-full inline-block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableFoods;
