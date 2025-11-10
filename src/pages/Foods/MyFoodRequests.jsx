import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-food-requests?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setRequests(data))
        .catch((err) => console.error("Failed to fetch requests:", err));
    }
  }, [user]);
  console.log(requests);
  if (!user)
    return (
      <p className="text-center mt-10">Please log in to see your requests.</p>
    );

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        My Food Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven't requested any food yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-gradient-to-r from-white to-gray-50 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={
                    req.image || "https://via.placeholder.com/400x200?text=Food"
                  }
                  alt={req.name || "Food"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {req.name || "Food Name"}
                </h3>

                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Location:</span> {req.location}
                </p>
                <p className="text-gray-600 text-sm mb-1">
                  <span className="font-medium">Reason:</span> {req.reason}
                </p>
                <p className="text-gray-600 text-sm mb-3">
                  <span className="font-medium">Contact:</span> {req.contact}
                </p>

                {/* Status Badge */}
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                    req.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : req.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyFoodRequests;
