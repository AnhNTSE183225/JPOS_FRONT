import React, { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Sidebar from '../components/Sidebar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
const FrameSidebar = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const loggedInUser = sessionStorage.getItem('name');
            if (!loggedInUser) {
                navigate('/login');
            }
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Sidebar />
            <Outlet />
        </>
    )
}

export default FrameSidebar;