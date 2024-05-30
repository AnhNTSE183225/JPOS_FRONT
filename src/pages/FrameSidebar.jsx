import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Sidebar from '../components/Sidebar';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const FrameSidebar = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const loggedInUser = sessionStorage.getItem('name');
            if (!loggedInUser) {
                navigate('/login');
            }
        }, 60000); // checks every 60 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, []); // Empty dependency array ensures this runs once on mount


    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row'>
                    <div className='col-md-2 col-xs-12 px-0'>
                        <Sidebar />
                    </div>
                    <div className='col-md-10 col-xs-12'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrameSidebar;