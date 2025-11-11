import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated, useTrail } from "@react-spring/web";
const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch("https://food-for-all-server-gamma.vercel.app/foods")
      .then((res) => res.json())
      .then((data) => setFoods(data.slice(0, 6)))
      .catch((err) => console.error("Failed to fetch foods:", err));
  }, []);

  const headerSpring = useSpring({
    from: { opacity: 0, y: -40 },
    to: { opacity: 1, y: 0 },
    config: { tension: 120, friction: 14 },
  });

  const trail = useTrail(foods.length, {
    from: { opacity: 0, scale: 0.9, y: 30 },
    to: { opacity: 1, scale: 1, y: 0 },
    config: { mass: 1, tension: 180, friction: 16 },
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <animated.h2
        style={headerSpring}
        className="text-4xl font-bold text-center mb-12 text-gray-800"
      >
        Featured Foods
      </animated.h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {trail.map((style, index) => {
          const food = foods[index];
          if (!food) return null;
          return (
            <animated.div
              key={food._id}
              style={style}
              className="bg-white shadow-md hover:shadow-xl rounded-2xl p-5 border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {food.name}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-3">
                  {food.description}
                </p>
                <p className="text-green-700 font-medium mb-4">
                  Serves: {food.quantity} people
                </p>
              </div>

              <Link
                to={`/foods/${food._id}`}
                className="w-full text-center bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 shadow-md transition duration-300 mt-auto"
              >
                View Details
              </Link>
            </animated.div>
          );
        })}
      </div>

      <animated.div
        style={{
          opacity: headerSpring.opacity.to((o) => o * 0.9),
          transform: headerSpring.y.to((y) => `translateY(${y / 2}px)`),
        }}
        className="text-center mt-12"
      >
        <Link
          to="/available-foods"
          className="inline-block px-8 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 shadow-lg transition duration-300"
        >
          Show All Foods
        </Link>
      </animated.div>
    </section>
  );
};

export default FeaturedFoods;
