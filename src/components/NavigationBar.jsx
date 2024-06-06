import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import logo from "../assets/Bijoux.png";
import './css/NavigationBar.css';

const UserComponent = (props) => {

    const [dropDown, setDropdown] = useState(false);

    const handleDropdown = () => {
        setDropdown(!dropDown);
    }

    const logout = () => {
        sessionStorage.clear();
        props.setLoggedIn(false);
    }

    if (!props.loggedIn) {
        return (
            <div className="nav-item">
                <Link className='nav-login' to='/login'>LOGIN/REGISTER</Link>
            </div>
        )
    } else {
        return (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" role="button" aria-expanded="false" onClick={handleDropdown}>
                    {sessionStorage.getItem('name')}
                </a>
                <ul className={dropDown == false ? "dropdown-menu" : "dropdown-menu show"}>
                    <li><Link className="dropdown-item" to='/profile'>View profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                </ul>
            </li>
        )
    }
}

const NavigationBar = () => {
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem('username') != null);
    const location = useLocation().pathname.split("/");

    useEffect(() => {
        setLoggedIn(sessionStorage.getItem('username') != null);
    }, [location]);

    return (
        <>
            <nav className="navbar navbar-expand-xl fixed-top">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand"><img src={logo} alt="Logo" style={{ width: '95px', height: 'auto' }} /></Link>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src={logo} alt="Logo" style={{ width: '95px', height: 'auto' }} /></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2 active" aria-current="page" to="/">HOME</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" to="/diamond-price-list">DIAMOND PRICE LIST</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" to="/custom-design">CUSTOM DESIGN</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" to="/build-your-own/choose-setting">BUILD JEWELERY</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link mx-lg-2" to="#">PROFILE</Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div className='navbar-bar'>
                        <div className="login-button"><UserComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></div>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </>
    )

}

export default NavigationBar;