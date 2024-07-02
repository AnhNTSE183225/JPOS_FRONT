import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInbox, faClockRotateLeft, faCircleExclamation, faGem, faHammer, faRing } from '@fortawesome/free-solid-svg-icons';
import img from '../assets/FullLogo.png';
import styles from '../css/Sidebar.module.css';
import { useState } from 'react';

const Sidebar = () => {

    const navigate = useNavigate();
    const location = useLocation().pathname.split('/');
    const [staff, setStaff] = useState(JSON.parse(sessionStorage.getItem('staff')));

    const logout = () => {
        sessionStorage.clear();
        navigate('/');
    }
    return (
        <>
            <div className="d-flex flex-column flex-shrink-0 p-3 position-fixed min-vh-100" style={{ width: '18rem', backgroundColor: '#e3e3e3', color: '#48AAAD' }}>
                <Link to="#" className="d-flex align-items-center mb-4 text-decoration-none w-100">
                    <img src={img} className='img-fluid mx-auto mt-3' style={{ width: '100px' }} />
                </Link>
                <ul className="nav nav-pills flex-column mb-auto">
                    {
                        staff.staffType !== 'manage'
                            ? <>
                                <li className="nav-item">
                                    <Link to="/staff/request" className={`${styles['nav-link']} nav-link py-3 px-5 my-1 ${location.includes('request') ? styles['active'] : ''}`}>
                                        <FontAwesomeIcon className='me-3' icon={faInbox} />
                                        Requests
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/history" className={`${styles['nav-link']} nav-link py-3 px-5 my-1 ${location.includes('history') ? styles['active'] : ''}`}>
                                        <FontAwesomeIcon className='me-3' icon={faClockRotateLeft} />
                                        History
                                    </Link>
                                </li>
                            </>
                            : <>
                                <li>
                                    <Link to="/staff/manage-requests" className={`${styles['nav-link']} nav-link py-3 px-5 my-1 ${location.includes('manage-requests') ? styles['active'] : ''}`}>
                                        <FontAwesomeIcon className='me-3' icon={faCircleExclamation} />
                                        Manage requests
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/manage-price" className={`${styles['nav-link']} nav-link py-3 px-5 my-1 ${location.includes('manage-price') ? styles['active'] : ''}`}>
                                        <FontAwesomeIcon className='me-3' icon={faGem} />
                                        Diamond prices
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/manage-material-price" className={`${styles['nav-link']} nav-link py-3 px-5 my-1 ${location.includes('manage-material-price') ? styles['active'] : ''}`}>
                                        <FontAwesomeIcon className='me-3' icon={faHammer} />
                                        Material prices
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/staff/manage-design-price" className={`${styles['nav-link']} nav-link py-3 px-5 my-1 ${location.includes('manage-design-price') ? styles['active'] : ''}`}>
                                        <FontAwesomeIcon className='me-3' icon={faRing} />
                                        Design prices
                                    </Link>
                                </li>
                            </>
                    }
                </ul>
                <div className="dropdown">
                    <a href="#" className={`${styles['user']} d-flex align-items-center text-decoration-none dropdown-toggle`} id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>{staff.name}</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a onClick={logout} className="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar;