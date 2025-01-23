import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const BasicLayout = () => {
  return (
    <div>
      <Navbar />

      <div className="min-h-[calc(100vh-297px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default BasicLayout;
