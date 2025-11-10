import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    quantity: "",
    location: "",
    expireDate: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("You must be logged in to add food.");

    const dataToSend = {
      ...formData,
      username: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
    };

    try {
      const res = await fetch("http://localhost:3000/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        toast.success("Food added successfully!");
        setFormData({
          name: "",
          image: "",
          quantity: "",
          location: "",
          expireDate: "",
          notes: "",
        });
      } else {
        toast.error("Failed to add food.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding food.");
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Add Food
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Food Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Short Description"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          rows="3"
          required
        ></textarea>

        {/* Image URL */}
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Food Image URL (ImgBB)"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          required
        />

        {/* Quantity */}
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity (e.g., Serves 2 people)"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          required
        />

        {/* Pickup Location */}
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Pickup Location"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          required
        />

        {/* Expire Date */}
        <input
          type="date"
          name="expireDate"
          value={formData.expireDate}
          onChange={handleChange}
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          required
        />

        {/* Notes */}
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional Notes"
          className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
          rows="3"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition"
        >
          Add Food
        </button>
      </form>
    </section>
  );
};

export default AddFood;
