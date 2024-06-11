import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";

const DiamondPriceListPage = () => {
    const [diamondPriceList, setDiamondPriceList] = useState([]);
    const [groupedDiamonds, setGroupedDiamonds] = useState({});

    const fetchDiamondList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/diamond-prices');
            if (response.status === 204) {
                console.log("No data");
            } else {
                const data = response.data;
                setDiamondPriceList(data);
                groupByOrigin(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const groupByOrigin = (data) => {
        const grouped = data.reduce((acc, diamond) => {
            const { origin } = diamond;
            if (!acc[origin]) {
                acc[origin] = [];
            }
            acc[origin].push(diamond);
            return acc;
        }, {});
        setGroupedDiamonds(grouped);
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
                {Object.keys(groupedDiamonds).length === 0 ? (
                    <p>No diamond data available.</p>
                ) : (
                    Object.keys(groupedDiamonds).map((origin) => (
                        <div key={origin} className="row mt-4">
                            <div className="col">
                                <h2>{origin}</h2>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Num</th>
                                            <th>Carat Weight</th>
                                            <th>Color</th>
                                            <th>Clarity</th>
                                            <th>Cut</th>
                                            <th>Effective Date</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {groupedDiamonds[origin].map((entry, index) => (
                                            <tr key={entry.diamondPriceId}>
                                                <td>{index + 1}</td>
                                                <td>{entry.caratWeight}</td>
                                                <td>{entry.color}</td>
                                                <td>{entry.clarity}</td>
                                                <td>{entry.cut}</td>
                                                <td>{formatDate(entry.effectiveDate)}</td>
                                                <td>{formatPrice(entry.price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default DiamondPriceListPage;
