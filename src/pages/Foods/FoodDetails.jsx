import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const FoodDetails = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  const { user } = useContext(AuthContext) || {};

  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to request food!");
      return;
    }

    const requestData = {
      ...formData,
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      foodId: food._id,
    };

    try {
      const res = await fetch("http://localhost:3000/food-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (res.ok) {
        alert("Food request submitted successfully!");
        setShowModal(false);
        setFormData({ location: "", reason: "", contact: "" });
      } else {
        alert("Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!food) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h2 className="text-3xl font-bold mb-2">{food.name}</h2>
      <p className="text-gray-600 mb-4">{food.description}</p>
      <p className="text-green-700 font-medium mb-6">
        Serves: {food.quantity} people
      </p>

      <button
        onClick={() => setShowModal(true)}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Request Food
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Request This Food
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Write your location"
                className="w-full border rounded p-2"
                required
              />
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Why need food?"
                className="w-full border rounded p-2"
                rows="3"
                required
              ></textarea>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact No."
                className="w-full border rounded p-2"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FoodDetails;
