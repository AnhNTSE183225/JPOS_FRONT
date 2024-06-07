import { Outlet } from "react-router-dom";
import BuildYourOwnNav from "../../components/BuildYourOwnNav";
import { createContext, useContext, useState } from "react";

export const Context = createContext();

const BuildYourOwnFrame = () => {

    const [productSetting, setProductSetting] = useState({
        designId: null,
        shellId: null,
        quantity: 0,
        diamonds: []
    })

    return (
        <>
            <Context.Provider value={[productSetting, setProductSetting]}>
                <BuildYourOwnNav />
                <Outlet />
            </Context.Provider>
        </>
    )
}

export default BuildYourOwnFrame;