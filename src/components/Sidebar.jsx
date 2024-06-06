import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

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
        <nav className='sidebar'>
            <ul className='sidebar-nav'>
                <li className='nav-item'>
                    <a href="" className='nav-link'>

                        <span className='link-text'>Profile</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;