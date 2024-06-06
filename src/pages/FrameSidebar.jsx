import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../css/Sidebar.css';
const FrameSidebar = () => {

    const navigate = useNavigate();

    //Function to check if session has timed out
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
        <div className='body'>
            <Sidebar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default FrameSidebar;