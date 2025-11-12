import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const FoodDetails = () => {
  const { id } = useParams();

  const { user } = useContext(AuthContext) || {};

  const [food, setFood] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  useEffect(() => {
    fetch(`https://food-for-all-server-gamma.vercel.app/foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched food:", data);
        setFood(data);
      })
      .catch((err) => console.error("Error fetching food:", err));
  }, [id]);

  useEffect(() => {
    if (!food) return;
    fetch(
      `https://food-for-all-server-gamma.vercel.app/food-requests/${food._id}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched requests:", data);
        setRequests(data);
      })
      .catch((err) => console.error("Error fetching requests:", err));
  }, [food]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please log in to request food.");

    const { _id, userEmail, username, ...rest } = food;

    const requestData = {
      ...formData,
      foodId: food._id,
      userEmail: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      ...rest,
    };

    try {
      const res = await fetch(
        "https://food-for-all-server-gamma.vercel.app/food-requests",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        }
      );

      if (res.ok) {
        alert("Request submitted successfully!");
        setShowModal(false);
        setFormData({ location: "", reason: "", contact: "" });
      } else {
        alert("Failed to submit request.");
      }
    } catch (err) {
      console.error("Request error:", err);
      alert("Failed to submit request.");
    }
  };
  // ......................................

  const isOwner =
    user?.email && food?.userEmail && user.email === food.userEmail;

  useEffect(() => {
    if (!user?.email || !isOwner) return;

    fetch(
      `https://food-for-all-server-gamma.vercel.app/requests-for-my-foods?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched my foods' requests:", data);
        setRequests(data);
      })
      .catch((err) => console.error("Error fetching my foods' requests:", err));
  }, [user, isOwner]);

  // ..............................................

  const handleRequest = async (requestId, action) => {
    try {
      const res = await fetch(
        `https://food-for-all-server-gamma.vercel.app/food-requests/${requestId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action }),
        }
      );

      if (res.ok) {
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

        alert(action === "accept" ? "Request accepted!" : "Request rejected!");
      }
    } catch (err) {
      console.error("Error updating request:", err);
    }
  };

  if (!food)
    return <p className="text-center mt-10">Loading food details...</p>;

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <img
        src={food.image}
        alt={food.name}
        className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
      />
      <h2 className="text-3xl font-bold mb-2">{food.name}</h2>
      <p className="text-gray-600 mb-2">{food.description}</p>
      <p className="text-gray-600 mb-2">Pickup: {food.location}</p>
      <p className="text-green-700 font-medium mb-2">
        Serves: {food.quantity} people
      </p>
      <p className="text-gray-500 mb-2">Status: {food.status}</p>
      <p className="text-red-600 font-medium mb-6">
        Expires:{" "}
        {food.expireDate
          ? new Date(food.expireDate).toLocaleDateString()
          : "N/A"}
      </p>

      {!isOwner && (
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mb-6"
        >
          Request Food
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
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
                placeholder="Why do you need food?"
                className="w-full border rounded p-2"
                rows="3"
                required
              />
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
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

      {isOwner && (
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            Food Requests
          </h3>

          <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
            <table className="hidden md:table min-w-full bg-white">
              <thead className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Location
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Reason
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Contact
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="py-3 px-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {requests.length > 0 ? (
                  requests.map((req, index) => (
                    <tr
                      key={req._id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-green-50 transition duration-200`}
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-800">
                        {req.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {req.userEmail}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {req.location}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700 max-w-xs truncate">
                        {req.reason}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {req.contact}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                            req.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : req.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {req.status === "pending" ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleRequest(req._id, "accept")}
                              className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md shadow"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRequest(req._id, "reject")}
                              className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm italic">
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-gray-500 italic text-sm"
                    >
                      No requests yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="md:hidden divide-y divide-gray-200">
              {requests.length > 0 ? (
                requests.map((req) => (
                  <div
                    key={req._id}
                    className="p-4 bg-white hover:bg-green-50 transition duration-200"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">
                        {req.name}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold capitalize ${
                          req.status === "accepted"
                            ? "bg-green-100 text-green-700"
                            : req.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {req.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">
                      <strong>Email:</strong> {req.userEmail}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {req.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Reason:</strong> {req.reason}
                    </p>
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>Contact:</strong> {req.contact}
                    </p>

                    {req.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRequest(req._id, "accept")}
                          className="flex-1 px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md shadow"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequest(req._id, "reject")}
                          className="flex-1 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-gray-500 italic text-sm">
                  No requests yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FoodDetails;
