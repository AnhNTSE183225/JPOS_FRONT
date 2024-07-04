import { Outlet } from "react-router-dom";
import SidebarAdmin from "../../components/SidebarAdmin";
import { Toaster } from "sonner";

const AdminFrame = () => {
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

export default AdminFrame;