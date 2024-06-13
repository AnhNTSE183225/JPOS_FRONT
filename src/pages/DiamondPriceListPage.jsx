import NavigationBar from "../components/NavigationBar";
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
                const data = response.data;


                setDiamondPriceList(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDiamondList();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <h1 className="text-center">Diamond Price List</h1>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Origin</th>
                            <th>Carat Weight</th>
                            <th>Shape</th>
                            <th>Color</th>
                            <th>Clarity</th>
                            <th>Cut</th>
                            <th>Price</th>
                            <th>Effective Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diamondPriceList.map(price =>
                            <tr key={price.diamondPriceId}>
                                <td>{price.origin}</td>
                                <td>{price.caratWeight}</td>
                                <td>{price.shape}</td>
                                <td>{price.color}</td>
                                <td>{price.clarity}</td>
                                <td>{price.cut}</td>
                                <td>{price.price}</td>
                                <td>{formatDate(price.effectiveDate)}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DiamondPriceListPage;
