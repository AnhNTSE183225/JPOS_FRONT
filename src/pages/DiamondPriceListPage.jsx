import NavigationBar from "../components/NavigationBar"
import { useEffect, useState } from "react";
import axios from 'axios';
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";

const DiamondPriceListPage = () => {

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
        <>
            <NavigationBar/>
            <div>
                <div className="container" style={{paddingTop: '15vh'}}>
                    <div className="row mt-3">
                        <h1>Diamond price list</h1>
                    </div>
                    <div className="row">
                        <div className="col">
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
                                    {diamondPriceList.map(
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DiamondPriceListPage