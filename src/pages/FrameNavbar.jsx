import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Footer from '../components/Footer';
const FrameNavbar = () => {
    return (
        <>
            <NavigationBar />
            <Outlet/>
        </>
    )
}

export default FrameNavbar;