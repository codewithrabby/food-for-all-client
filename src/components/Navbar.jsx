import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/vk7zMRV/food-logo.png"
            alt="Logo"
            className="w-10 h-10 object-cover"
          />
          <h1 className="text-xl font-bold text-gray-800">Food For All</h1>
        </Link>

        {/* Middle: Menu Links */}
        <ul className="hidden md:flex items-center gap-6 text-gray-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-semibold text-gray-900" : "hover:text-gray-900"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/available-foods"
              className={({ isActive }) =>
                isActive ? "font-semibold text-gray-900" : "hover:text-gray-900"
              }
            >
              Available Foods
            </NavLink>
          </li>
        </ul>

        {/* Right: Login Button */}
        <div className="hidden md:flex">
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white px-4 py-4 flex flex-col gap-3">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-semibold text-gray-900" : "hover:text-gray-900"
              }
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/available-foods"
              className={({ isActive }) =>
                isActive ? "font-semibold text-gray-900" : "hover:text-gray-900"
              }
              onClick={() => setMenuOpen(false)}
            >
              Available Foods
            </NavLink>
          </li>
          <li>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
