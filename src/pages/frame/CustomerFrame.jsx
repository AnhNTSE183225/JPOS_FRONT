import { Outlet } from "react-router-dom"
import NavigationBar from "../../components/NavigationBar";
import { Toaster } from 'sonner';

const CustomerFrame = () => {



    return (
        <div>
            <Toaster position="top-center" richColors expand={true} />
            <NavigationBar />
            <div style={{ paddingTop: '15vh' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerFrame;