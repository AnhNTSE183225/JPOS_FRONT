import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";
import useDocumentTitle from "../components/Title";

const DiamondPriceListPage = () => {
    const [diamondPriceList, setDiamondPriceList] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(50);

    useDocumentTitle("Bijoux Diamond Price List");

    const fetchDiamondList = async (pageNo, pageSize) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamond-price/get-all?pageNo=${pageNo}&pageSize=${pageSize}`);
            if (!response.data || response.status === 204) {
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
                        <input className="form-control" type="number" min="1" max="100" step="1" value={pageNo+1} onChange={(e) => setPageNo(e.target.value-1)} />
                    </div>
                </div>
                <div className="row mt-3">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Origin</th>
                                <th>Shape</th>
                                <th>Clarity</th>
                                <th>Color</th>
                                <th>Cut</th>
                                <th>Carat weight</th>
                                <th>Price</th>
                                <th>Effective Date</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                diamondPriceList.length === 0
                                    ? <tr>
                                        <td>
                                            Loading...
                                        </td>
                                    </tr>
                                    : diamondPriceList.map((price, index) =>
                                        <tr key={index}>
                                            <td>{price.origin}</td>
                                            <td>{price.shape}</td>
                                            <td>{price.clarity}</td>
                                            <td>{price.color}</td>
                                            <td>{price.cut}</td>
                                            <td>{price.caratWeightFrom} - {price.caratWeightTo}</td>
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
