import React, { useState } from "react";
import useProvider from "../../Hooks/useProvider";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { user, logOut } = useProvider();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const links = user ? (
    <>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/available Coin">Available Coin</NavLink>
      </li>
      <li>
        <NavLink to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Shadmans-World">
          Join as Developer
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Shadmans-World">
          Join as Developer
        </NavLink>
      </li>
    </>
  );

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Sign Out Successful");
        setIsDropdownOpen(false);
      })
      .catch((error) => {
        console.error("Sign Out", error.message);
      });
    // Close dropdown after logging out
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <ul className="flex items-center gap-2 relative">
              {/* Avatar and Username with Dropdown Trigger */}
              <li
                onClick={handleToggleDropdown}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                    <img src={user?.photoURL} alt="user profile photo" />
                  </div>
                </div>
                <span>{user.displayName}</span>
              </li>

              {/* Logout Button (Dropdown) */}
              {isDropdownOpen && (
                <button
                  onClick={handleLogout}
                  className="absolute right-0 top-12 rounded-md bg-red-500 py-1 px-4 text-center text-white hover:bg-red-600"
                >
                  Logout
                </button>
              )}
            </ul>
          ) : (
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
