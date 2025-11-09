import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    quantity: "",
    location: "",
    expireDate: "",
    notes: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...formData, quantity: Number(formData.quantity) };

    fetch(`http://localhost:3000/foods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Update response:", data);
        if (data.modifiedCount > 0 || data.acknowledged) {
          toast.success("Food updated successfully!");
          setTimeout(() => navigate("/manage-my-foods"), 1500);
        } else {
          toast.error("No changes made or update failed!");
        }
      })
      .catch(() => toast.error("Failed to update food."));
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold mb-6 text-center">Update Food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="expireDate"
          value={formData.expireDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Food
        </button>
      </form>
    </section>
  );
};

export default UpdateFood;
