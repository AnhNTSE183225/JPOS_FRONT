import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';

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
            <li className="nav-item">
                <Link className='nav-link' to='/login'>Login/Register</Link>
            </li>
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
    }, location);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
                <div className="container-fluid">
                    <Link to='/' className="navbar-brand">LOGO</Link>
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
                            <li className="nav-item">
                                <Link className='nav-link' to='/custom-design'>Request a custom design</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default NavigationBar;