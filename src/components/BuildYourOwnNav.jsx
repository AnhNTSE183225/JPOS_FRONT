import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../pages/frame/BuildYourOwnFrame';

const BuildYourOwnNav = () => {

    const [productSetting, setProductSetting] = useContext(Context);

    return (
        <div className="container mt-4" style={{ paddingBottom: '5vh' }}>
            <Link to="/build-your-own/choose-setting">
                <button type="button" className="btn btn-light btn-lg col-4">Choose a Setting</button>
            </Link>
            <Link to="/build-your-own/choose-diamond">
                <button type="button" className="btn btn-light btn-lg col-4">Choose a Diamond</button>
            </Link>
            <Link to="/build-your-own/complete-product" >
                <button type="button" className="btn btn-light btn-lg col-4" disabled={productSetting.designId === null || productSetting.diamonds.length === 0 || productSetting.shellId === null}>Complete Ring</button>
            </Link>
            {/* <div>
                {
                    productSetting.designId !== null && productSetting.shellId !== null
                        ? <>
                            <p>
                                Selected design: {productSetting.designId}/{productSetting.shellId}
                            </p>
                        </>
                        : <></>
                }
            </div> */}
        </div>
    );
}

export default BuildYourOwnNav;
