import React from 'react';
import DashboardNavbar from '../Components/Navbar/DashboardNavbar';
import { Helmet } from 'react-helmet-async';


const DashBoardLayout = () => {
    
    return (
        <div>
            <Helmet>
                <title>Dashboard || EIN</title>
            </Helmet>
            <DashboardNavbar></DashboardNavbar>
        </div>
    );
};

export default DashBoardLayout;