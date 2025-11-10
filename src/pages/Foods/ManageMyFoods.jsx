import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

console.log(foods);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-foods?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setFoods(data))
        .catch((err) => console.error("Error fetching my foods:", err))
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Delete food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your food has been removed.", "success");
              setFoods((prev) => prev.filter((food) => food._id !== id));
            }
          });
      }
    });
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Manage My Foods
      </h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't added any foods yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{food.name}</h3>
                <p className="text-gray-600 mt-1">{food.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gray-700 font-medium">
                    Qty: {food.quantity}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      food.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : food.status === "Donated"
                        ? "bg-gray-200 text-gray-600"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {food.status}
                  </span>
                </div>
                <p className="text-gray-500 mt-2 text-sm">
                  Pickup: {food.location}
                </p>
                <p className="text-red-600 mt-1 text-sm">
                  Expires:{" "}
                  {food.expireDate
                    ? new Date(food.expireDate).toLocaleDateString()
                    : "N/A"}
                </p>
                <div className="mt-4 flex justify-between gap-2">
                  <Link
                    to={`/update-food/${food._id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ManageMyFoods;
