import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useState } from 'react';

const BuildYourOwnNav = () => {

    return (
        <>            
        <Link to="/build-your-own/choose-diamond">Choose diamond</Link>
            <Link to="/build-your-own/choose-setting">Choose diamond</Link>
            <Link to="/build-your-own/complete-product">Choose diamond</Link>
            <p>
                This is navbar
            </p>
        </>
    );
}

export default BuildYourOwnNav;