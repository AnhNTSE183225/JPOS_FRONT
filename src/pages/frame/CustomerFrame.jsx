import { Outlet, useLocation } from "react-router-dom"
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import { Toaster } from 'sonner';
import { useEffect } from "react";

const CustomerFrame = () => {

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    }

    return (
        <div>
            <Toaster position="top-center" richColors expand={true} />
            <NavigationBar />
            <div style={{ paddingTop: '15vh' }}>
                <Outlet />
            </div>
            <Footer />
            <ScrollToTop/>
        </div>
    )
}

export default CustomerFrame;