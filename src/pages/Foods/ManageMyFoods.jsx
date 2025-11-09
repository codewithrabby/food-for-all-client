import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/LoadingSpinner";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage My Foods</h2>

      {foods.length === 0 ? (
        <p className="text-center text-gray-500">You haven't added any foods yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td>
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{food.name}</td>
                  <td>{food.quantity}</td>
                  <td>{food.location}</td>
                  <td>{food.status}</td>
                  <td className="space-x-2">
                    <Link
                      to={`/update-food/${food._id}`}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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
