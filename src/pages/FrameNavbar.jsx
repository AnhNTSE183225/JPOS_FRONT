import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import styles from '../css/FrameNavbar.module.css';

const FrameNavbar = () => {
    return (
        <>
            <NavigationBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default FrameNavbar;