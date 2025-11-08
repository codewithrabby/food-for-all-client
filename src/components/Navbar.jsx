import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { AuthContext } from "../context/AuthContext";

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
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-gray-900 border-b-2 border-blue-600"
              : "hover:text-blue-600 transition"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/available-foods"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-gray-900 border-b-2 border-blue-600"
              : "hover:text-blue-600 transition"
          }
        >
          Available Foods
        </NavLink>
      </li>

      {/* Private Links */}
      {user && (
        <>
          <li>
            <NavLink
              to="/add-food"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-gray-900 border-b-2 border-blue-600"
                  : "hover:text-blue-600 transition"
              }
            >
              Add Food
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/manage-foods"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-gray-900 border-b-2 border-blue-600"
                  : "hover:text-blue-600 transition"
              }
            >
              Manage My Foods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-requests"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-gray-900 border-b-2 border-blue-600"
                  : "hover:text-blue-600 transition"
              }
            >
              My Food Requests
            </NavLink>
          </li>
        </>
      )}
    </>
  );

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
        <ul className="hidden md:flex items-center gap-6 text-gray-700">{navLinks}</ul>

        {/* Right: User Profile / Login */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/Zm1wZXB/default-user.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md py-2">
                  <p className="px-4 py-2 text-sm text-gray-600 border-b">
                    {user.displayName || "User"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
          {navLinks}
          {!user ? (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://i.ibb.co/Zm1wZXB/default-user.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
                <span>{user.displayName}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
