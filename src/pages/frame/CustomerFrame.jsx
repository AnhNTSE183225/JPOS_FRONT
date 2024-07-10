import { Outlet, useLocation, useNavigate } from "react-router-dom"
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { Toaster } from 'sonner';
import { useEffect } from "react";


const CustomerFrame = () => {

    const location = useLocation().pathname;
    const navigate = useNavigate();
    const allowedPaths = ['/', '/diamond-price-list', '/material-price-list', '/custom-design', '/unauthorized-access', '/login', '/register', '/build-your-own/choose-setting'];

    useEffect(() => {
        if (sessionStorage.getItem('customer') == null) {
            if (!allowedPaths.includes(location)) {
                console.log(`Unathorized`);
                navigate('/unauthorized-access');
                return;
            }
        }
    }, [])

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }

    if (sessionStorage.getItem('customer') != null || allowedPaths.includes(location)) {
        return (
            <div>
                {test.sayHello()}
                <Toaster position="top-center" richColors expand={true} />
                <NavigationBar />
                <div style={{ paddingTop: '15vh' }}>
                    <Outlet />
                </div>
                <Footer />
                <ScrollToTop />
            </div>

        )
    }
}

export default CustomerFrame;