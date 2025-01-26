import React from "react";
import { IoNotifications } from "react-icons/io5";
import useDbUser from "../../Hooks/useDbUser";

const DashboardNavbar = () => {
  const [dbUsers,currentUser] = useDbUser(); // Get the current user's data from the hook

  return (
    <div>
      <div className="navbar border-b-2 bg-base-100">
        {/* Navbar Start */}
        <div className="navbar-start hidden md:flex">
        <img src="/income.png" alt="" className="w-10 rounded-3xl"/>
          <a href="/" className="btn btn-ghost text-xl">EIN</a>
        </div>

        {/* Navbar End */}
        <div className="navbar-start md:navbar-end flex gap-4 items-center">
          {/* User Data */}
          <div className="flex flex-col items-start">
            <div className="flex gap-4 items-center mb-2">
              <div className="px-2 border-r-2">
                <span className="text-gray-600 font-medium">Available Coin:</span>
                <span className="text-primary font-bold ml-1">{currentUser?.coins || 0}</span>
              </div>
              <div className="px-2">
                <img
                  src={currentUser?.profilePhoto || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="px-2 border-r-2">
                <span className="text-gray-600 font-medium">Role:</span>
                <span className="font-bold ml-1">{currentUser?.role || "User"}</span>
              </div>
              <div className="px-2">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="font-bold ml-1">{currentUser?.name || "Guest"}</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <button>
            <IoNotifications className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
