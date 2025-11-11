import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log(foods);

  useEffect(() => {
    fetch("https://food-for-all-server-gamma.vercel.app/all-foods")
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
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Available Foods
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            {/* Food Image */}
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5 flex flex-col gap-3">
              {/* Food Name */}
              <h3 className="text-xl font-semibold text-gray-900">
                {food.name}
              </h3>

              {/* Donator Info */}
              <div className="flex items-center gap-3 mt-2 mb-2">
                <img
                  src={food.userPhoto || "/default-user.png"}
                  alt={food.userName || "Donator"}
                  className="w-10 h-10 rounded-full object-cover border"
                />
                <p className="text-gray-700 font-medium">
                  {food.username || "Anonymous"}
                </p>
              </div>

              {/* Quantity & Location */}
              <div className="flex justify-between text-gray-600 text-sm mb-2">
                <span>Quantity: {food.quantity}</span>
                <span>Pickup: {food.location}</span>
              </div>

              {/* Expire Date */}
              <p className="text-red-600 font-medium mb-4 text-sm">
                Expires:{" "}
                {food.expireDate
                  ? new Date(food.expireDate).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* View Details Button */}
              <Link
                to={`/foods/${food._id}`}
                className="w-full text-center py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AvailableFoods;
