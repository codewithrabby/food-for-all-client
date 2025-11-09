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

  if (!user) return <p className="text-center mt-10">Please log in to see your requests.</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Food Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">You haven't requested any food yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th>Food Name</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.foodName || req.foodId}</td> 

{/* -----------------------------------------food name field add korte hobe db te................ */}


                  <td>{req.location}</td>
                  <td>{req.reason}</td>
                  <td>{req.contact}</td>
                  <td>{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyFoodRequests;
