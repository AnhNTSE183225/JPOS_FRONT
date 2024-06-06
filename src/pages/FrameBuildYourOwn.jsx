import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import BuildYourOwnNav from '../components/BuildYourOwnNav';

export const Context = React.createContext();

const FrameBuildYourOwn = () => {
    const [productSetting, setProductSetting] = useState({
        diamonds: [],
        designId: null,
        shellId: null,
        diamondQuantity: 0,
    });

    return (
        <>
            <Context.Provider value = {[productSetting,setProductSetting]}>
                <BuildYourOwnNav />
                <Outlet />
            </Context.Provider>
        </>
    )
}

export default FrameBuildYourOwn;