import { Outlet } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const FrameNavbar = () => {
    return (
        <>
            <NavigationBar />
            <main style={{paddingTop: '15vh'}}>
                <Outlet />
            </main>
        </>
    )
}

export default FrameNavbar;