import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import logo from "../assets/Bijoux.png";
import './NavigationBar.css';

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
            {/* <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand"><img src={logo} alt="Logo" /></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <UserComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                            <li className="nav-item">
                                <Link className='nav-link' to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/diamond-price-list'>Diamond price list</Link>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to="/build-your-own/choose-setting">Build your own</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/custom-design'>Request a custom design</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
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
                                    <a className="nav-link mx-lg-2 active" aria-current="page" href="/">HOME</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/diamond-price-list">DIAMOND PRICE LIST</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/custom-design">CUSTOM DESIGN</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="/build-your-own/choose-setting">BUILD JEWELERY</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link mx-lg-2" href="#">PROFILE</a>
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
            {/* END NAVBAR */}
        </>
    )

}

export default NavigationBar;