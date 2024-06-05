import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './BuildYourOwnNav.css'; // Create a CSS file for additional styling
import { useContext } from 'react';
import { Context } from '../pages/FrameBuildYourOwn';

const BuildYourOwnNav = () => {

    const [productSetting, setProductSetting] = useContext(Context);

    return (
        <div className="container mt-4">
            <Link to="/build-your-own/choose-setting">
                <button type="button" className="btn btn-light btn-lg col-4">Choose a Setting</button>

            </Link>
            <Link to="/build-your-own/choose-diamond">
                <button type="button" className="btn btn-light btn-lg col-4">Choose a Diamond</button>
            </Link>
            <Link to="/build-your-own/complete-product" >
                <button type="button" className="btn btn-light btn-lg col-4" disabled={productSetting.designId === null || productSetting.diamonds.length === 0 || productSetting.shellId === null}>Complete Ring</button>
            </Link>
            <div>
                {
                    productSetting.designId !== null && productSetting.shellId !== null
                        ? <>
                            <p>
                                Selected design: {productSetting.designId}/{productSetting.shellId}
                            </p>
                        </>
                        : <></>
                }
            </div>
        </div>
    );
}

export default BuildYourOwnNav;
