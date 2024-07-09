import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { Toaster } from "sonner";
import { useEffect, useRef } from "react";
import axios from "axios";

const AdminFrame = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('admin') === null) {
            navigate('/unauthorized-access');
        }
    }, [])

    if (sessionStorage.getItem('admin') !== null) {
        return (
            <div style={{ fontSize: '20px' }}>
                <Toaster position="top-center" richColors expand={false} />
                <SidebarAdmin />
                <div className="container-fluid" style={{ paddingLeft: '19rem', paddingTop: '1rem' }}>
                    <Outlet />
                </div>
            </div>
        )
    }
}

export default AdminFrame;