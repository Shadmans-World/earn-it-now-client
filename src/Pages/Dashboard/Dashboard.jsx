import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { FaCoins, FaHistory, FaHome, FaTasks, FaUsers } from "react-icons/fa";
import useDbUser from "../../Hooks/useDbUser";
import { AiOutlineFileDone } from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdTask } from "react-icons/md";
import Footer from "../../Components/Footer/Footer"
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Dashboard = () => {
  
  const [dbUsers,currentUser] = useDbUser();

  const workers = currentUser.role === "worker";
  const admin = currentUser.role === "admin";
  const buyers = currentUser.role === 'buyer'
 const location = useLocation()
 

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-64 md:min-h-[calc(100vh-86.6px)] bg-orange-400">
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
                <NavLink to="/dashboard/admin/manage-user">
                  <FaUsers className="text-2xl" />{" "}
                  <span className="text-[1rem]">Manage User</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-task">
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
              <li>
                <NavLink to="/dashboard/purchaseHistory">
                  {" "}
                  <FaHistory className="text-2xl" />
                  <span className="text-[1rem]">Purchase History</span>
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* MAin Dashboard Content */}
      <div className="w-full">
        {
          location.pathname === '/dashboard' ? <>
          <div className="flex justify-center mt-10 min-h-[calc(100vh-335.6px)]">
          <h2 className="text-2xl "><span className="text-yellow-500">Welcome</span> {currentUser.name}!</h2>
          </div>
          </> : <>
          <div className="min-h-[calc(100vh-294.6px)]">
          <Outlet />
          </div>
          
          </>
        }
        <Footer/>
        
      </div>

    </div>
  );
};

export default Dashboard;
