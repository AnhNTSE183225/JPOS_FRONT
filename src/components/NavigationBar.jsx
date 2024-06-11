import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from "../assets/textLogo.png";
import styles from '/src/css/NavigationBar.module.css';

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
            <div className='nav-item'>
                <Link className={`${styles[`nav-login`]} nav-login`} to='/login'>LOGIN/REGISTER</Link>
            </div>
        )
    } else {
        return (
            <div className="nav-item dropdown">
                <div className={`${styles['nav-link']} nav-link dropdown-toggle`} role="button" aria-expanded="false" onClick={handleDropdown}>
                    {sessionStorage.getItem('name')}
                </div>
                <ul className={dropDown == false ? "dropdown-menu" : "dropdown-menu show"}>
                    <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                </ul>
            </div>
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
            {/* className="navbar navbar-expand-xl fixed-top" */}
            <nav className={`${styles['navbar']} navbar navbar-expand-xl fixed-top`}>
                <div className="container-fluid">
                    <Link to='/' className={`${styles['navbar-brand']} navbar-brand`}><img src={logo} alt="Logo" style={{ width: '16vw', height: 'auto' }} /></Link>

                    <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img src={logo} alt="Logo" style={{ width: '95px', height: 'auto' }} /></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <Link className={`${styles[`nav-link`]} nav-link mx-lg-2 active`} aria-current="page" to="/">HOME</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`${styles['nav-link']} nav-link mx-lg-2`} to="/diamond-price-list">DIAMOND PRICE LIST</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`${styles[`nav-link`]} nav-link mx-lg-2`} to="/custom-design">CUSTOM DESIGN</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`${styles[`nav-link`]} nav-link mx-lg-2`} to="/build-your-own/choose-setting">BUILD JEWELERY</Link>
                                </li>
                                {
                                    sessionStorage.getItem('customer_id') !== null
                                        ? <li className="nav-item">
                                            <Link className={`${styles[`nav-link`]} nav-link mx-lg-2`} to="/profile">PROFILE</Link>
                                        </li>
                                        : <>
                                        </>
                                }

                            </ul>
                        </div>
                    </div>
                    <div className='navbar-bar'>
                        <div className={`${styles['login-button']} login-button`}>
                            <UserComponent loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
                        </div>
                    </div>
                    <button className={styles['navbar-toggler'] + " navbar-toggler"} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </>
    )

}

export default NavigationBar;