import { Outlet } from "react-router-dom"
import NavigationBar from "../../components/NavigationBar";

const CustomerFrame = () => {



    return (
        <div>
            <NavigationBar />
            <div style={{ paddingTop: '15vh' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default CustomerFrame;