import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../css/Sidebar.css';

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
        <nav>

        </nav>
    )
}

export default Sidebar;