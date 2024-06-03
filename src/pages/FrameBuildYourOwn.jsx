import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Outlet } from 'react-router-dom';
import BuildYourOwnNav from '../components/BuildYourOwnNav';

const FrameBuildYourOwn = () => {
    return (
        <>
            <BuildYourOwnNav/>
            <Outlet/>
        </>
    )
}

export default FrameBuildYourOwn;