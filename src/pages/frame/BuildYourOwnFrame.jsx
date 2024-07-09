import { Outlet, useNavigate } from "react-router-dom";
import BuildYourOwnNav from "../../components/BuildYourOwnNav";
import { useEffect } from "react";

const BuildYourOwnFrame = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('customer') === null) {
            navigate('/unauthorized-access');
        }
    }, [])

    if (sessionStorage.getItem('customer') !== null) {
        return (
            <>
                <BuildYourOwnNav />
                <Outlet/>
            </>
        )
    }
}

export default BuildYourOwnFrame;