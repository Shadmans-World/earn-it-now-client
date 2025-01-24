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
  
  const [dbUser] = useDbUser();

  const workers = dbUser.role === "worker";
  const admin = dbUser.role === "admin";
  const buyers = dbUser.role === 'buyer'
 

  return (
    <div className="flex">
      <div className="w-64 min-h-[calc(100vh-86.6px)] bg-orange-400">
        <ul className="menu space-y-4 p-4">
          {admin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome className="text-2xl" />{" "}
                  <span className="text-[1rem]">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-user">
                  <FaUsers className="text-2xl" />{" "}
                  <span className="text-[1rem]">Manage User</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-task">
                  <FaTasks className="text-2xl" />{" "}
                  <span className="text-[1rem]">Manage Task</span>
                </NavLink>
              </li>
            </>
          )}

          {workers && (
            <>
              <li>
                <NavLink to="/dashboard/workerHome">
                  {" "}
                  <FaHome className="text-2xl" />
                  <span className="text-[1rem]">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/worker-task">
                  {" "}
                  <FaTasks className="text-2xl" />
                  <span className="text-[1rem]">Task List</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/worker-submission">
                  {" "}
                  <AiOutlineFileDone className="text-2xl" />
                  <span className="text-[1rem]">My Submission</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/worker-withdrawal">
                  {" "}
                  <BiMoneyWithdraw className="text-2xl" />
                  <span className="text-[1rem]">My Withdrawals</span>
                </NavLink>
              </li>
            </>
          )}

          {buyers && (
            <>
              <li>
                <NavLink to="/dashboard/buyerHome">
                  {" "}
                  <FaHome className="text-2xl" />
                  <span className="text-[1rem]">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/buyer-addTask">
                  {" "}
                  <FaTasks className="text-2xl" />
                  <span className="text-[1rem]">Add New Task</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/buyer-task">
                  {" "}
                  <MdTask className="text-2xl" />
                  <span className="text-[1rem]">My Task's </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/purchaseCoin">
                  {" "}
                  <FaCoins className="text-2xl" />
                  <span className="text-[1rem]">Purchase Coin</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* MAin Dashboard Content */}
      <div className="w-full">
        <Outlet />
        {/* <Footer/> */}
      </div>
    </div>
  );
};

export default Dashboard;
