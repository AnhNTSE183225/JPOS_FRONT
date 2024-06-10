import { Outlet } from "react-router-dom";
import BuildYourOwnNav from "../../components/BuildYourOwnNav";

const BuildYourOwnFrame = () => {

    return (
        <>
            <BuildYourOwnNav />
            <Outlet />
        </>
    )
}

export default BuildYourOwnFrame;