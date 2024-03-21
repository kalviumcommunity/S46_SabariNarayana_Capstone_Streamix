import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "@fontsource/koulen";

export const HomeNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mx-auto w-full bg-black text-white">
      <nav className="flex items-center justify-between p-4">
        <div className="logo font-myFont text-5xl">
          <a href="/">Streamix</a>
        </div>
        <div className="hidden md:flex">
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/featured"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }
              >
                Featured
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="hidden items-center md:flex">
          <Link
            to="/signin"
            className="mr-3 rounded-md px-4 py-2 text-white hover:border-2 hover:border-white "
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-md border-2 border-white bg-white px-4 py-2 text-black hover:bg-black hover:text-white"
          >
            Sign Up
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-4 p-4">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/featured"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }
                onClick={toggleMenu}
              >
                Featured
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "font-bold text-blue-500"
                    : "text-gray-500 hover:text-blue-500"
                }
                onClick={toggleMenu}
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
