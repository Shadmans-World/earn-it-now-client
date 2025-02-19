import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaCoins, FaHistory, FaHome, FaTasks, FaUsers } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdTask } from "react-icons/md";
import Footer from "../../Components/Footer/Footer";
import useDbUser from "../../Hooks/useDbUser";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";

// Function to generate random data for both charts
const generateRandomData = () => {
  return Array.from({ length: 10 }, (_, index) => ({
    name: `Day ${index + 1}`,
    performance: Math.floor(Math.random() * 100) + 10,
    growth: Math.floor(Math.random() * 80) + 20,
  }));
};

const Dashboard = () => {
  const [dbUsers, currentUser] = useDbUser();
  const [chartData, setChartData] = useState(generateRandomData());
  const location = useLocation();

  const workers = currentUser.role === "worker";
  const admin = currentUser.role === "admin";
  const buyers = currentUser.role === "buyer";

  // Update chart data every second
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateRandomData());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 md:min-h-[calc(100vh-86.6px)] bg-orange-400">
        <ul className="menu space-y-4 p-4">
          {admin && (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome className="text-2xl" />
                  <span className="text-[1rem]">Admin Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-user">
                  <FaUsers className="text-2xl" />
                  <span className="text-[1rem]">Manage User</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/manage-task">
                  <FaTasks className="text-2xl" />
                  <span className="text-[1rem]">Manage Task</span>
                </NavLink>
              </li>
            </>
          )}

          {workers && (
            <>
              <li>
                <NavLink to="/dashboard/workerHome">
                  <FaHome className="text-2xl" />
                  <span className="text-[1rem]">Worker Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/worker-task">
                  <FaTasks className="text-2xl" />
                  <span className="text-[1rem]">Task List</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/worker-submission">
                  <AiOutlineFileDone className="text-2xl" />
                  <span className="text-[1rem]">My Submission</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/worker-withdrawal">
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
                  <FaHome className="text-2xl" />
                  <span className="text-[1rem]">Buyer Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/buyer-addTask">
                  <FaTasks className="text-2xl" />
                  <span className="text-[1rem]">Add New Task</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/buyer-task">
                  <MdTask className="text-2xl" />
                  <span className="text-[1rem]">My Task's </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/purchaseCoin">
                  <FaCoins className="text-2xl" />
                  <span className="text-[1rem]">Purchase Coin</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/purchaseHistory">
                  <FaHistory className="text-2xl" />
                  <span className="text-[1rem]">Purchase History</span>
                </NavLink>
              </li>
            </>
          )}

          <div className="divider pt-5 pb-2"></div>
          <li>
            <NavLink to="/">
              <FaHome className="text-2xl" />
              <span className="text-[1rem]">Home</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Dashboard Content */}
      <div className="w-full flex flex-col min-h-[calc(100vh-86.6px)]">
        {location.pathname === "/dashboard" ? (
          <div className="flex-grow flex items-center justify-center flex-col p-5">
            <h2 className="text-2xl mb-6 text-center">
              <span className="text-yellow-500">Welcome</span> {currentUser.name}!
            </h2>

            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-96 flex flex-col items-center border border-gray-200">
              <img
                src={currentUser.profilePhoto}
                alt={currentUser.name}
                className="w-32 h-32 rounded-full mb-4 shadow-md border-4 border-orange-500"
              />
              <p className="text-xl font-semibold text-gray-700">{currentUser.name}</p>
              <p className="text-sm text-gray-500 mb-2">{currentUser.email}</p>
            </div>

            {/* Chart Section */}
            <div className="mt-8 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Performance Line Chart */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Performance Over Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="performance" stroke="#ff7300" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Growth Bar Chart */}
              <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Weekly Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="growth" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow">
            <Outlet />
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
