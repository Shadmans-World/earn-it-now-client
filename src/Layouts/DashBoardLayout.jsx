import React from 'react';
import DashboardNavbar from '../Components/Navbar/DashboardNavbar';
import { Helmet } from 'react-helmet-async';
import Dashboard from '../Pages/Dashboard/Dashboard';


const DashBoardLayout = () => {
    
    return (
        <div>
            <Helmet>
                <title>Dashboard || EIN</title>
            </Helmet>
            <DashboardNavbar></DashboardNavbar>
            <Dashboard/>
        </div>
    );
};

export default DashBoardLayout;