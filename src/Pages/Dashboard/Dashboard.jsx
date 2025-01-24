import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";


import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { FaCoins, FaHome, FaTasks, FaUsers } from "react-icons/fa";
import useDbUser from "../../Hooks/useDbUser";
import { AiOutlineFileDone } from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdTask } from "react-icons/md";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Dashboard = () => {


  const axiosSecure = useAxiosSecure()
  const [dashUsers, setDashUsers] = useState([]);
    const [dbUser] = useDbUser()
  useEffect(() => {
    axiosSecure
      .get("/users")
      .then((res) => {
        setDashUsers(res.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  const workers = dbUser.role === 'worker'
 const admin = dbUser.role ==='admin'
  const buyers = dashUsers.filter((buyer) => buyer.role === "buyer");

  return (
    <div className="flex">
      <div className="w-64 min-h-[calc(100vh-86.6px)] bg-orange-400">
        <ul className="menu space-y-4 p-4">
            {admin && (
                <>
                <li><NavLink  to='/adminHome'><FaHome className="text-2xl" /> <span className="text-[1rem]">Home</span></NavLink></li>
                <li><NavLink  to='/manage-user'><FaUsers className="text-2xl" /> <span className="text-[1rem]">Manage User</span></NavLink></li>
                <li><NavLink  to='/manage-task'><FaTasks className="text-2xl" /> <span className="text-[1rem]">Manage Task</span></NavLink></li>
                </>
                
            )}


        </ul>
      </div>

      {/* MAin Dashboard Content */}
      <div className="flex flex-col">
        <Outlet />
        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default Dashboard;
