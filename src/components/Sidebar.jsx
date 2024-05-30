import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import {Link} from 'react-router-dom'

const components = (props) => {

}

const Sidebar = (props) => {

    let classStyle = {
        home: "nav-link text-white",
        request: "nav-link text-white",
        history: "nav-link text-white"
    }

    switch (props.active) {
        case "home":
            classStyle.home = "nav-link active";
            break;
        case "request":
            classStyle.request = "nav-link active";
            break;
        case "history":
            classStyle.history = "nav-link active";
            break;
        default:
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-4">Sidebar</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/profile" className={classStyle.home} aria-current="page">
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/requests" className={classStyle.request}>
                        Requests
                    </Link>
                </li>
                <li>
                    <Link href="#" className={classStyle.history}>
                        History
                    </Link>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" href="#">New project...</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;