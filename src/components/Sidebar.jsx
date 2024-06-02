import { useState } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const ListComponent = ({location}) => {
    let classStyle = {
        home: "nav-link text-white",
        request: "nav-link text-white",
        history: "nav-link text-white",
        yourRequest: "nav-link text-white"
    }

    if (location.includes('request')) {
        classStyle.request = "nav-link active";
    } else if (location.includes('history')) {
        classStyle.history = "nav-link active";
    } else if (location.includes('your-request')) {
        classStyle.yourRequest = "nav-link active";
    } else {
        classStyle.home = "nav-link active";
    }

    if (sessionStorage.getItem('staff_id') !== null) {
        return (
            <ul className="nav nav-pills flex-column mb-auto">
                <li>
                    <Link to="/profile/request" className={classStyle.request}>
                        Requests
                    </Link>
                </li>
                <li>
                    <Link to="/profile/history" className={classStyle.history}>
                        History
                    </Link>
                </li>
            </ul>
        )
    } else if (sessionStorage.getItem('customer_id') !== null) {
        return (
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/profile" className={classStyle.home} aria-current="page">
                        Home
                    </Link>
                    <Link to="/profile/your-request" className={classStyle.yourRequest}>
                        Your requests
                    </Link>
                </li>
            </ul>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation().pathname.split('/');
    const [dropdown, setDropdown] = useState(false);

    const handleDropdown = () => {
        setDropdown(!dropdown);
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark w-100">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Sidebar</span>
            </a>
            <hr />
            <ListComponent location={location}/>
            <hr />
            <div className="dropdown">
                <a style={{
                    cursor: 'pointer'
                }} className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" aria-expanded="false" onClick={handleDropdown}>
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>{sessionStorage.getItem('name')}</strong>
                </a>
                <ul className={dropdown == false ? "dropdown-menu dropdown-menu-dark text-small shadow" : "dropdown-menu dropdown-menu-dark text-small shadow show"} aria-labelledby="dropdownUser1">
                    <li><Link className="dropdown-item" to="">Placeholder</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" onClick={logout}>Sign out</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;