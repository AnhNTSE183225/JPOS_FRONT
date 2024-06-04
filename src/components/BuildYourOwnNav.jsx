import { Link } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './BuildYourOwnNav.css'; // Create a CSS file for additional styling
import dia1 from "../assets/Diamond1.jpg";
import { useEffect, useState } from "react";
import axios from 'axios';

const BuildYourOwnNav = () => {
    const [diamondPriceList, setDiamondPriceList] = useState([]);

    const fetchDiamondList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/diamond-prices');
            if (response.status === 204) {
                console.log("No data");
            } else {
                setDiamondPriceList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDiamondList();
    }, []);
    return (
        <div className="container mt-4">
            <Link to="/build-your-own/choose-diamond">
                <button type="button" className="btn btn-light btn-lg col-4">Choose a Diamond</button>
            </Link>
            <Link to="/build-your-own/choose-setting">
                <button type="button" className="btn btn-light btn-lg col-4">Choose a Setting</button>
            </Link>
            <Link to="/build-your-own/complete-product">
                <button type="button" className="btn btn-light btn-lg col-4">Complete Ring</button>
            </Link>
            <div className="text-center mt-3">
                <h4><b>Diamond Finder</b></h4>
            </div>
            <div className="row">
                <div className="col-md-3 col-sm-6">
                    <img src={dia1} alt="diamond" className="img-fluid" />
                </div>
                <div className="col-md-3 col-sm-6">
                    <img src={dia1} alt="diamond" className="img-fluid" />
                </div>
                <div className="col-md-3 col-sm-6">
                    <img src={dia1} alt="diamond" className="img-fluid" />
                </div>
                <div className="col-md-3 col-sm-6">
                    <img src={dia1} alt="diamond" className="img-fluid" />
                </div>
            </div>
        </div>
    );
}

export default BuildYourOwnNav;
