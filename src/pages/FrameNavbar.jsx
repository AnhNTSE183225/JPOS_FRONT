import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
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