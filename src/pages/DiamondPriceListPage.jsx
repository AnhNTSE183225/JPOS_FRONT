import NavigationBar from "../components/NavigationBar"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useEffect, useState } from "react";
import axios from 'axios';
import { formatDate,formatPrice } from "../helper_function/ConvertFunction";

const DiamondTable = (props) => {


    if (props.diamondPriceList.length === 0) {
        return (
            <>
                <h1>Loading data...</h1>
            </>
        )
    } else {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Origin</th>
                        <th>Carat weight</th>
                        <th>Color</th>
                        <th>Clarity</th>
                        <th>Cut</th>
                        <th>Effective date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {props.diamondPriceList.map(
                        (entry) => (
                            <tr key={entry.diamondPriceId}>
                                <td>{entry.diamondPriceId}</td>
                                <td>{entry.origin}</td>
                                <td>{entry.caratWeight}</td>
                                <td>{entry.color}</td>
                                <td>{entry.clarity}</td>
                                <td>{entry.cut}</td>
                                <td>{formatDate(entry.effectiveDate)}</td>
                                <td>{formatPrice(entry.price)}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        )
    }
}

const DiamondPriceListPage = () => {

    const [diamondPriceList, setDiamondPriceList] = useState([]);

    useEffect(() => {
        console.log('fetching diamond prices...');
        axios.get('http://localhost:8080/api/diamond-prices')
            .then(
                (response) => {
                    setDiamondPriceList(response.data);
                }
            )
            .catch(
                (error) => {
                    console.log(error);
                }
            )
    }, []);

    return (
        <>
            <div>
                <div className="container">
                    <div className="row mt-3">
                        <h1>Diamond price list</h1>
                    </div>
                    <div className="row">
                        <div className="col">
                            <DiamondTable diamondPriceList={diamondPriceList} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiamondPriceListPage