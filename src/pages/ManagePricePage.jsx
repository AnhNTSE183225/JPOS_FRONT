import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";

const ManagePricePage = () => {

    const [shape, setShape] = useState('');
    const [color, setColor] = useState('');
    const [cut, setCut] = useState('');
    const [clarity, setClarity] = useState('');
    const [caratWeight, setCaratWeight] = useState(0);
    const [origin, setOrigin] = useState('');
    const [diamondPrices, setDiamondPrices] = useState([]);
    const [queryPrices, setQueryPrices] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [updatedPrice, setUpdatedPrice] = useState(0);
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(10); 222222

    const updateDiamondPrice = async (oldPrice) => {
        if (selectedPrice !== null && updatedPrice !== oldPrice) {
            try {
                const response = await axios.post(`http://localhost:8080/api/update-diamond-price?diamondPriceId=${selectedPrice}&newPrice=${updatedPrice}`);
                if (!response.data || response.status === 204) {
                    toast.error(`Something went wrong, cannot update price`);
                } else {
                    console.log(response.data);
                    setSelectedPrice(null);
                    setUpdatedPrice(0);
                    toast.success(`Succesfully updated`);
                    fetchData();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.info(`Price is the same as previous, can't update!`);
        }
    }

    const clearFilter = () => {
        setCut('');
        setColor('');
        setClarity('');
        setShape('');
        setOrigin('');
        setCaratWeight(0);
    }

    useEffect(() => {
        let query_prices = diamondPrices;
        if(cut.length > 0) {
            query_prices = query_prices.filter(price => price.cut == cut);
        }
        if(color.length > 0) {
            query_prices = query_prices.filter(price => price.color == color);
        } 
        if(clarity.length > 0) {
            query_prices = query_prices.filter(price => price.clarity == clarity);
        }
        if(caratWeight > 0) {
            query_prices = query_prices.filter(price => price.caratWeight == caratWeight);
        }
        if(shape.length > 0) {
            query_prices = query_prices.filter(price => price.shape == shape);
        }
        if(origin.length > 0) {
            query_prices = query_prices.filter(price => price.origin == origin);
        }
        setQueryPrices(query_prices);
    },[diamondPrices, cut, color, clarity, caratWeight, shape, origin])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamond-prices?pageNo=${pageNo}&pageSize=${pageSize}`);
            if (!response.data || response.status === 204) {
                toast.error(`Something went wrong, cannot fetch data`);
            } else {
                setDiamondPrices(response.data);
                setQueryPrices(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [pageNo, pageSize])

    return (
        <div className="container-fluid">
            <h1 className="fw-bold">SET PRICE</h1>
            <div className="row mb-2">
                <div className="col-2">
                    Origin
                </div>
                <div className="col">
                    <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="form-select">
                        <option value="">Select origin</option>
                        {['LAB_GROWN', 'NATURAL'].map((value, index) =>
                            <option key={index} value={value}>{value}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-2">
                    Shape
                </div>
                <div className="col">
                    <select value={shape} onChange={(e) => setShape(e.target.value)} className="form-select">
                        <option value=''>Choose shape</option>
                        <option value="round">Round</option>
                        <option value="princess">Princess</option>
                        <option value="cushion">Cushion</option>
                        <option value="emerald">Emerald</option>
                        <option value="oval">Oval</option>
                        <option value="radiant">Radiant</option>
                        <option value="asscher">Asscher</option>
                        <option value="marquise">Marquise</option>
                        <option value="heart">Heart</option>
                        <option value="pear">Pear</option>
                    </select>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-2">
                    Cut
                </div>
                <div className="col">
                    <select value={cut} onChange={(e) => setCut(e.target.value)} className="form-select">
                        <option value=''>Choose cut</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Very_Good">Very Good</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                    </select>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-2">
                    Color
                </div>
                <div className="col">
                    <select value={color} onChange={(e) => setColor(e.target.value)} className="form-select">
                        <option value=''>Choose color</option>
                        {['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'].map(
                            value => (
                                <option key={value} value={value}>{value}</option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-2">
                    Clarity
                </div>
                <div className="col">
                    <select value={clarity} onChange={(e) => setClarity(e.target.value)} className="form-select">
                        <option value=''>Choose clarity</option>
                        {['I3', 'I2', 'I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'].map(
                            value => (
                                <option key={value} value={value}>{value}</option>
                            )
                        )}
                    </select>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col-2">
                    Carat weight
                </div>
                <div className="col">
                    <input value={caratWeight} onChange={(e) => setCaratWeight(e.target.value)} type="number" step="0.1" min="0" className="form-control" />
                </div>
            </div>

            <div className="row mb-2">
                <button onClick={clearFilter}>
                    Clear
                </button>
            </div>

            <div className="row mb-2">
                <div className="col-2">
                    <div className="container-fluid">
                        <span>Page size</span>
                        <input className="form-control" type="number" min="10" max="100" step="10" value={pageSize} onChange={(e) => setPageSize(e.target.value)} />
                    </div>
                </div>
                <div className="col-2">
                    <div className="container-fluid">
                        <span>Page No</span>
                        <input className="form-control" type="number" min="0" max="100" step="1" value={pageNo} onChange={(e) => setPageNo(e.target.value)} />
                    </div>                
                </div>
            </div>

            <div className="row mb-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Origin</th>
                            <th>Carat Weight</th>
                            <th>Shape</th>
                            <th>Color</th>
                            <th>Clarity</th>
                            <th>Cut</th>
                            <th>E. Date</th>
                            <th>Price</th>
                            <th>
                                {selectedPrice !== null
                                    ? <>
                                        <button onClick={() => setSelectedPrice(null)}>Cancel</button>
                                    </>
                                    : <>
                                        Action
                                    </>
                                }
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {queryPrices.length > 0
                            ? queryPrices.map((value, index) =>
                                <tr key={index}>
                                    <td>{value.diamondPriceId}</td>
                                    <td>{value.origin}</td>
                                    <td>{value.caratWeight}</td>
                                    <td>{value.shape}</td>
                                    <td>{value.color}</td>
                                    <td>{value.clarity}</td>
                                    <td>{value.cut}</td>
                                    <td>{formatDate(value.effectiveDate)}</td>
                                    <td>
                                        {
                                            selectedPrice == value.diamondPriceId
                                                ? <>
                                                    <input type="number" min="0" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
                                                </>
                                                : <>
                                                    {formatPrice(value.price)}
                                                </>
                                        }
                                    </td>
                                    <td>
                                        {
                                            selectedPrice == value.diamondPriceId
                                                ? <>
                                                    <button onClick={() => updateDiamondPrice(value.price)}>Save</button>
                                                </>
                                                : <>
                                                    <button onClick={() => {
                                                        setSelectedPrice(value.diamondPriceId);
                                                        setUpdatedPrice(value.price);
                                                    }}>Edit</button>
                                                </>
                                        }
                                    </td>
                                </tr>
                            )
                            : <></>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManagePricePage;