import React from "react";
import { IoNotifications } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const DashboardNavbar = () => {
    const links = <>
    <li>Available Coins</li>
    <li>User Image</li>
    <li><NavLink>Available Coins</NavLink></li>
    <li><NavLink></NavLink></li>

    </>
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="navbar-end flex gap-2 items-center">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center mb-2r">
                <NavLink className="px-2 border-r-2">Available Coin</NavLink>
                
                <NavLink className="px-2">User Image</NavLink>
            </div>
            <div className="flex gap-2 items-center">
                <NavLink className="px-2 border-r-2">User Role</NavLink>
                <NavLink className="px-2">User Name</NavLink>
            </div>
          </div>
          <div className="">
          <button><IoNotifications className="text-3xl" /></button>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardNavbar;
