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
      fetch(
        `https://food-for-all-server-gamma.vercel.app/my-foods?email=${user.email}`
      )
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
        fetch(`https://food-for-all-server-gamma.vercel.app/foods/${id}`, {
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm sm:text-base">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">
                  Image
                </th>
                <th className="px-3 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">
                  Name
                </th>
                <th className="px-3 sm:px-4 py-3 text-left font-semibold whitespace-nowrap hidden sm:table-cell">
                  Description
                </th>
                <th className="px-3 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">
                  Qty
                </th>
                <th className="px-3 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">
                  Status
                </th>
                <th className="px-3 sm:px-4 py-3 text-left font-semibold whitespace-nowrap hidden sm:table-cell">
                  Location
                </th>
                <th className="px-3 sm:px-4 py-3 text-left font-semibold whitespace-nowrap">
                  Expires
                </th>
                <th className="px-3 sm:px-4 py-3 text-center font-semibold whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {foods.map((food) => (
                <tr
                  key={food._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Image */}
                  <td className="px-3 sm:px-4 py-3">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md border"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-3 sm:px-4 py-3 font-medium text-gray-800 whitespace-nowrap">
                    {food.name}
                  </td>

                  {/* Description (hidden on small screens) */}
                  <td className="px-3 sm:px-4 py-3 text-gray-600 text-xs sm:text-sm hidden sm:table-cell">
                    {food.description.length > 40
                      ? food.description.slice(0, 40) + "..."
                      : food.description}
                  </td>

                  {/* Quantity */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    {food.quantity}
                  </td>

                  {/* Status */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        food.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : food.status === "Donated"
                          ? "bg-gray-200 text-gray-600"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {food.status}
                    </span>
                  </td>

                  {/* Location (hidden on mobile) */}
                  <td className="px-3 sm:px-4 py-3 text-gray-700 hidden sm:table-cell">
                    {food.location}
                  </td>

                  {/* Expire date */}
                  <td className="px-3 sm:px-4 py-3 text-red-600 text-xs sm:text-sm whitespace-nowrap">
                    {food.expireDate
                      ? new Date(food.expireDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="px-3 sm:px-4 py-3 text-center whitespace-nowrap">
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Link
                        to={`/update-food/${food._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold shadow"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs sm:text-sm font-semibold shadow"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default ManageMyFoods;
