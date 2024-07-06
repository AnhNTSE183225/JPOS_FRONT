import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Toaster } from "sonner";
import { useEffect } from "react";

const StaffFrame = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('staff') === null) {
            navigate('/unauthorized-access');
        }
    }, [])

    if (sessionStorage.getItem('staff') !== null) {
        return (
            <div style={{ fontSize: '20px' }}>
                <Toaster position="top-center" richColors expand={true} />
                <Sidebar />
                <div className="container-fluid" style={{ paddingLeft: '19rem', paddingTop: '1rem' }}>
                    <Outlet />
                </div>
            </div>
        )
    }

}

export default StaffFrame;