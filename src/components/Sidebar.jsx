import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faInbox, faClockRotateLeft, faUser } from '@fortawesome/free-solid-svg-icons';

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
        <>
            <aside id='sidebar'>
                <div className='d-flex'>
                    <button id="toggle-btn" type='button'>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <div className='sidebar-logo'>
                        <a href="#">
                            BIJOUX
                        </a>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <a href="" className="sidebar-link">
                            <FontAwesomeIcon icon={faUser} />
                            <span>Profile</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="" className="sidebar-link">
                            <FontAwesomeIcon icon={faInbox} />
                            <span>Requests</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="" className="sidebar-link">
                            <FontAwesomeIcon icon={faClockRotateLeft} />
                            <span>History</span>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}

export default Sidebar;