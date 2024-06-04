import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './BuildYourOwnNav.css'; // Create a CSS file for additional styling

const BuildYourOwnNav = () => {
    return (
        <div className="build-your-own-nav">
            <div className="nav-steps">
                <Link to="/build-your-own/choose-diamond" className="nav-link step active">
                    <span className="step-number">1</span>
                    <span className="step-label">Choose a Diamond</span>
                </Link>
                <Link to="/build-your-own/choose-setting" className="nav-link step">
                    <span className="step-number">2</span>
                    <span className="step-label">Choose a Setting</span>
                </Link>
                <Link to="/build-your-own/complete-product" className="nav-link step">
                    <span className="step-number">3</span>
                    <span className="step-label">Complete Ring</span>
                </Link>
            </div>
            <p>This is navbar</p>
        </div>
    );
}

export default BuildYourOwnNav;
