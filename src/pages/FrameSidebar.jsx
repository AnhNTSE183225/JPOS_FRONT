import React, {useState} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import Sidebar from '../components/Sidebar';
import {Link, Outlet} from 'react-router-dom';

const FrameSidebar = () => {
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Sidebar/>
                    </div>
                    <div className='col-md-9'>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FrameSidebar;