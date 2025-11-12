import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/available-foods"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-green-700 border-b-2 border-green-600"
              : "hover:text-green-600 transition"
          }
        >
          Available Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-food"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-green-700 border-b-2 border-green-600"
              : "hover:text-green-600 transition"
          }
        >
          Add Food
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manage-my-foods"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-green-700 border-b-2 border-green-600"
              : "hover:text-green-600 transition"
          }
        >
          Manage My Foods
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-food-requests"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-green-700 border-b-2 border-green-600"
              : "hover:text-green-600 transition"
          }
        >
          My Food Requests
        </NavLink>
      </li>
    </>
  );

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.ibb.co.com/tTbMLBxG/logo2.png"
              alt="Logo"
              className="w-10 h-10 object-cover hover:scale-110 transition-transform duration-300"
            />
            <h1 className="text-xl font-bold text-gray-800 hover:text-green-700 transition">
              Food For All
            </h1>
          </Link>
        </motion.div>

        <ul className="hidden md:flex items-center gap-6 text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-green-700 border-b-2 border-green-600"
                  : "hover:text-green-600 transition"
              }
            >
              Home
            </NavLink>
          </li>
          {user && navLinks}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-transform transform hover:-translate-y-1"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    user.photoURL || "https://i.ibb.co/Zm1wZXB/default-user.png"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-blue-400 hover:border-blue-600 transition"
                />
              </motion.button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-lg py-3"
                  >
                    <p className="px-4 py-2 text-gray-700 font-medium border-b">
                      {user.displayName || "User"}
                    </p>

                    <ul className="flex flex-col gap-2 px-4 py-2 text-gray-700">
                      {navLinks}
                    </ul>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 mt-1 hover:bg-red-50 text-red-600 font-semibold transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <HiOutlineX className="w-6 h-6 text-gray-800" />
            ) : (
              <HiOutlineMenu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white px-4 py-4 flex flex-col gap-3 border-t"
          >
            <NavLink to="/" className="hover:text-blue-600 transition">
              Home
            </NavLink>
            {user && navLinks}
            {!user ? (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
