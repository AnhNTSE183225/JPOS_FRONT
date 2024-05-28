import NavigationBar from "../components/NavigationBar"
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useEffect, useState } from "react";
import axios from 'axios';

const DiamondTable = (props) => {

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

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
                <tbody>
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
        <div>
            <NavigationBar />
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
        </div>
    )
}

export default DiamondPriceListPage