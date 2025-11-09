import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
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
      userName: user.displayName,
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
    <section className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Add Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Food Image URL (ImgBB)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity (e.g., Serves 2 people)"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Pickup Location"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="expireDate"
          value={formData.expireDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional Notes"
          className="w-full border p-2 rounded"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add Food
        </button>
      </form>
    </section>
  );
};

export default AddFood;
