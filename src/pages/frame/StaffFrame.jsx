import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Toaster } from "sonner";

const StaffFrame = () => {
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

export default StaffFrame;