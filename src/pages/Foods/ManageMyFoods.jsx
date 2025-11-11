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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Image</th>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-semibold">Qty</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Location</th>
                <th className="px-4 py-3 text-left font-semibold">Expires</th>
                <th className="px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {foods.map((food) => (
                <tr
                  key={food._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </td>

                  <td className="px-4 py-3 font-medium">{food.name}</td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {food.description.length > 40
                      ? food.description.slice(0, 40) + "..."
                      : food.description}
                  </td>

                  <td className="px-4 py-3">{food.quantity}</td>

                  <td className="px-4 py-3">
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
                  </td>

                  <td className="px-4 py-3">{food.location}</td>

                  <td className="px-4 py-3 text-sm text-red-600">
                    {food.expireDate
                      ? new Date(food.expireDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="px-4 py-3 text-center flex flex-wrap gap-2 justify-center">
                    <Link
                      to={`/update-food/${food._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm shadow"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm shadow"
                    >
                      Delete
                    </button>
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
