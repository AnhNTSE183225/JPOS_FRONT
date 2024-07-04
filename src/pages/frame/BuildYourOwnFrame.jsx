import { Outlet } from "react-router-dom";
import BuildYourOwnNav from "../../components/BuildYourOwnNav";
import { useEffect } from "react";

const BuildYourOwnFrame = () => {

    return (
        <>
            <BuildYourOwnNav />
            <Outlet />
        </>
    )
}

export default BuildYourOwnFrame;