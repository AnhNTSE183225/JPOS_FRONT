import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";

const DiamondPriceListPage = () => {
    const [diamondPriceList, setDiamondPriceList] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchDiamondList = async (pageNo, pageSize) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamond-prices?pageNo=${pageNo}&pageSize=${pageSize}`);
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
        fetchDiamondList(pageNo, pageSize);
    }, []);

    useEffect(() => {
        fetchDiamondList(pageNo, pageSize);
    }, [pageNo, pageSize])

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <h1 className="text-center">Diamond Price List</h1>
                </div>
                <div className="row mt-3">
                    <div className="col-1 ms-auto">
                        <span>Page size</span>
                        <input className="form-control" type="number" min="10" max="100" step="10" value={pageSize} onChange={(e) => setPageSize(e.target.value)} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-1 ms-auto">
                        <span>Page No</span>
                        <input className="form-control" type="number" min="0" max="100" step="1" value={pageNo} onChange={(e) => setPageNo(e.target.value)} />
                    </div>
                </div>
                <div className="row mt-3">
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
                            {
                                diamondPriceList.length === 0
                                    ? <tr>
                                        <td>
                                            Loading...
                                        </td>
                                    </tr>
                                    : diamondPriceList.map(price =>
                                        <tr key={price.diamondPriceId}>
                                            <td>{price.origin}</td>
                                            <td>{price.caratWeight}</td>
                                            <td>{price.shape}</td>
                                            <td>{price.color}</td>
                                            <td>{price.clarity}</td>
                                            <td>{price.cut}</td>
                                            <td>{formatPrice(price.price)}</td>
                                            <td>{formatDate(price.effectiveDate)}</td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default DiamondPriceListPage;
