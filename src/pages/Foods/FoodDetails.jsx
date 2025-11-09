import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext) || {};
  const [food, setFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contact: "",
  });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!food) return;
    fetch(`http://localhost:3000/food-requests/${food._id}`)
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  }, [food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to request food.");

    const requestData = {
      ...formData,
      foodId: food._id,
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    };

    try {
      const res = await fetch("http://localhost:3000/food-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      if (res.ok) {
        alert("Request submitted!");
        setShowModal(false);
        setFormData({ location: "", reason: "", contact: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit request.");
    }
  };

  const handleRequest = async (requestId, action) => {
    try {
      const res = await fetch(
        `http://localhost:3000/food-requests/${requestId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );

      if (res.ok) {
        alert(`Request ${action}ed!`);
        setRequests((prev) =>
          prev.map((r) =>
            r._id === requestId
              ? { ...r, status: action === "accept" ? "accepted" : "rejected" }
              : r
          )
        );

        if (action === "accept") {
          setFood((prev) => ({ ...prev, status: "donated" }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!food)
    return <p className="text-center mt-10">Loading food details...</p>;

const isOwner = user?.email && food?.userEmail && user.email === food.userEmail;


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
      <p className="text-gray-500 mb-6">Status: {food.status}</p>

      {!isOwner && (
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Request Food
        </button>
      )}

      {/* Modal for Food Request */}
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

      {/* Food Requests Table */}
      {isOwner && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Food Requests</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.name}</td>
                    <td>{req.userEmail}</td>
                    <td>{req.location}</td>
                    <td>{req.reason}</td>
                    <td>{req.contact}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleRequest(req._id, "accept")}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRequest(req._id, "reject")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No requests yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default FoodDetails;
