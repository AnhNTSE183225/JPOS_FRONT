import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const getLatestMaterialPrice = (material) => {
    const now = new Date();
    const pastPrices = material.materialPrices.filter(price => new Date(price.id.effectiveDate) <= now);
    const latestPrice = pastPrices.reduce((prev, current) => (new Date(prev.id.effectiveDate) > new Date(current.id.effectiveDate)) ? prev : current);
    return latestPrice.price === null ? 0 : latestPrice.price;
}

const getLatestPrice = (diamondPrices) => {
    const now = new Date();
    const pastPrices = diamondPrices.filter(price => {
        const effectiveDate = new Date(price.effectiveDate);
        return effectiveDate <= now;
    });
    pastPrices.sort((a, b) => new Date(b.effectiveDate) - new Date(a.effectiveDate));
    return pastPrices.length > 0 ? pastPrices[0].price : 0;
};

const WaitSaleStaff = ({ order }) => {

    const [cut, setCut] = useState('');
    const [color, setColor] = useState('');
    const [clarity, setClarity] = useState('');
    const [shape, setShape] = useState('');
    const [fromCaratWeight, setFromCaratWeight] = useState(0.0);
    const [toCaratWeight, setToCaratWeight] = useState(10.0);
    const [diamondList, setDiamondList] = useState([]);
    const [latestPrice, setLatestPrice] = useState(0);
    const [chosenDiamonds, setChosenDiamonds] = useState([]);
    const [chosenMaterials, setChosenMaterials] = useState([]);
    const [totalMaterialPrice, setTotalMaterialPrice] = useState(0);
    const [totalDiamondPrice, setTotalDiamondPrice] = useState(0);
    const [materialList, setMaterialList] = useState([]);
    const [materialWeight, setMaterialWeight] = useState(0);
    const [currentMaterial, setCurrentMaterial] = useState({});

    const removeDiamond = (id, price) => {
        setChosenDiamonds(oldList => oldList.filter(diamond => diamond.id !== id));
        setTotalDiamondPrice(prevPrice => prevPrice - price);
    }

    const chooseDiamond = (id, code, price) => {
        setChosenDiamonds(oldList => [...oldList, {
            id: id,
            code: code,
            price: price
        }]);
        setTotalDiamondPrice(prevPrice => prevPrice + price);
    }

    const chooseMaterial = () => {
        const material = currentMaterial;
        if (material.materialId !== null && materialWeight !== null && materialWeight > 0) {
            setChosenMaterials(oldList => [...oldList, {
                id: material.materialId,
                weight: materialWeight,
                price: 0
            }]);
            setTotalMaterialPrice(prevPrice => prevPrice + price);
        }
    }

    useEffect(() => {

    })

    useEffect(() => {
        if (cut.length !== 0 && clarity.length !== 0 && color.length !== 0) {
            setLatestPrice(0);
            fetchPrice(cut, color, clarity, fromCaratWeight, toCaratWeight);
        }
        if (cut.length !== 0 && clarity.length !== 0 && color.length !== 0 && shape.length != 0) {
            setDiamondList([]);
            fetchDiamonds(cut, color, clarity, fromCaratWeight, toCaratWeight, shape);
        }
    }, [cut, color, clarity, fromCaratWeight, toCaratWeight, shape])

    useEffect(() => {
        fetchMaterials();
    }, [])

    const fetchMaterials = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/material/all`);
            if (response.status === 204) {
                console.log("No data");
            } else {
                setMaterialList(response.data);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const fetchPrice = (cut, color, clarity, fromCaratWeight, toCaratWeight) => {

        axios.post(`http://localhost:8080/api/get-price-by-4C`,
            {
                cut: cut,
                clarity: clarity,
                fromCaratWeight: fromCaratWeight,
                toCaratWeight: toCaratWeight,
                color: color
            }
        ).then(
            response => {
                if (response.status === 204) {
                    console.log("No data");
                } else {
                    const diamondPrice = response.data;
                    if (diamondPrice !== null) {
                        setLatestPrice(getLatestPrice(diamondPrice));
                    }
                }
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    const fetchDiamonds = (cut, color, clarity, fromCaratWeight, toCaratWeight, shape) => {

        axios.get(`http://localhost:8080/api/get-diamonds-by-4C?fromCaratWeight=${fromCaratWeight}&toCaratWeight=${toCaratWeight}&cut=${cut}&clarity=${clarity}&color=${color}&shape=${shape}`)
            .then(
                response => {
                    if (response.status === 204) {
                        console.log("No data");
                    } else {
                        setDiamondList(response.data);
                    }
                }
            ).catch(
                error => {
                    console.log('no diamonds');
                }
            )
    }

    const handleMaterial = (event) => {
        setCurrentMaterial(event.target.value);
    }

    const handleMaterialWeight = (event) => {
        setMaterialWeight(event.target.value);
    }

    const handleShape = (event) => {
        setShape(event.target.value);
    }

    const handleCut = (event) => {
        setCut(event.target.value);
    }

    const handleColor = (event) => {
        setColor(event.target.value);
    }

    const handleClarity = (event) => {
        setClarity(event.target.value);
    }

    const handleFromCaratWeight = (event) => {
        const value = parseFloat(event.target.value);
        setFromCaratWeight(isNaN(value) ? 0 : value);
    }

    const handleToCaratWeight = (event) => {
        const value = parseFloat(event.target.value);
        setToCaratWeight(isNaN(value) ? 0 : value);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row mt-5">
                    <h3>
                        <b>Request Quotation</b>
                    </h3>
                    <div className="col-md-3 px-3">
                        <p>
                            <b>Full Name</b>
                        </p>
                        <p className="px-3">{order.customer.name}</p>
                        <p>
                            <b>Description</b>
                        </p>
                        <p className="px-3">{order.description}</p>
                        <p>
                            <b>Budget</b>
                        </p>
                        <p className="px-3">{order.budget}</p>
                    </div>

                    <div className="col-md-5 px-3">
                        <div>
                            <p>
                                <b>Main Diamond Quality</b>
                            </p>
                            <div className="form-floating col-10 mb-2">
                                <select value={shape} onChange={handleShape} className="form-select">
                                    <option value>Choose shape</option>
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
                                <label>Shape</label>
                            </div>
                            <div className="form-floating col-10 mb-2">
                                <select value={cut} onChange={handleCut} className="form-select">
                                    <option value>Choose cut</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Very_Good">Very Good</option>
                                    <option value="Good">Good</option>
                                    <option value="Fair">Fair</option>
                                    <option value="Poor">Poor</option>
                                </select>
                                <label>Cut</label>
                            </div>
                            <div className="col-10 form-floating mb-2">
                                <select value={color} onChange={handleColor} className="form-select">
                                    <option value>Choose color</option>
                                    {['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'].map(
                                        value => (
                                            <option key={value} value={value}>{value}</option>
                                        )
                                    )}
                                </select>
                                <label>Color</label>
                            </div>
                            <div className="col-10 form-floating mb-2">
                                <select value={clarity} onChange={handleClarity} className="form-select">
                                    <option value>Choose clarity</option>
                                    {['I3', 'I2', 'I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'].map(
                                        value => (
                                            <option key={value} value={value}>{value}</option>
                                        )
                                    )}
                                </select>
                                <label>Clarity</label>
                            </div>
                            <div className='row'>
                                <div className="col-md-5">
                                    <form className="form-floating mb-2">
                                        <input
                                            value={fromCaratWeight}
                                            onChange={handleFromCaratWeight}
                                            type="number"
                                            className="form-control"
                                            step='0.1'
                                            placeholder='0.0'
                                        />
                                        <label>From Carat Weight</label>
                                    </form>
                                </div>
                                <div className="col-md-5">
                                    <form className="form-floating mb-2">
                                        <input
                                            value={toCaratWeight}
                                            onChange={handleToCaratWeight}
                                            type="number"
                                            className="form-control"
                                            step='0.1'
                                            placeholder='10.0'
                                        />
                                        <label>To Carat Weight</label>
                                    </form>
                                </div>
                            </div>
                            <button type="button" className="btn btn-secondary">
                                Add
                            </button>
                        </div>

                        <div className='row'>
                            <div className='col-10'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Code</th>
                                            <th>Ct.W</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {diamondList.map(
                                            diamond => (
                                                <tr key={diamond.diamondId}>
                                                    <td>{diamond.diamondId}</td>
                                                    <td>{diamond.diamondCode}</td>
                                                    <td>{diamond.caratWeight}</td>
                                                    <td><button
                                                        onClick={() => chooseDiamond(diamond.diamondId, diamond.diamondCode, latestPrice)}
                                                        disabled={chosenDiamonds.some(chosenDiamond => chosenDiamond.id === diamond.diamondId)}
                                                    >Choose</button></td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-8 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>{latestPrice}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <h3>
                                <b>
                                    Chosen diamonds
                                </b>
                            </h3>
                            <div className='col-10'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Code</th>
                                            <th>Price</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {chosenDiamonds.map(
                                            diamond => (
                                                <tr key={diamond.id}>
                                                    <td>{diamond.id}</td>
                                                    <td>{diamond.code}</td>
                                                    <td>{diamond.price}</td>
                                                    <td><button onClick={() => removeDiamond(diamond.id, diamond.price)}><b>-</b></button></td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-8 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>{totalDiamondPrice}</p>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4 px-3">
                        <div>
                            <p>
                                <b>Material</b>
                            </p>
                            <div className="form-floating col-10 mb-2">
                                <select value={currentMaterial} onChange={handleMaterial} className="form-select">
                                    <option value>Choose material</option>
                                    {materialList.map(
                                        material => (
                                            <option key={material.materialId} value={material}>{material.materialName}</option>
                                        )
                                    )}
                                </select>
                                <label>Material</label>
                            </div>
                            <form className="form-floating col-10 mb-2">
                                <input
                                    value={materialWeight}
                                    onChange={handleMaterialWeight}
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="0.0"
                                    step="0.1"
                                />
                                <label>Weight</label>
                            </form>
                            <button onClick={chooseMaterial} type="button" className="btn btn-secondary">
                                Add
                            </button>
                            <div className="col-8 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>{totalMaterialPrice}</p>
                            </div>
                        </div>


                        <div>
                            <p>
                                <b>Extra</b>
                            </p>
                            <form className="form-floating col-md-10 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                />
                                <label>Extra Diamond</label>
                            </form>
                            <form className="form-floating col-md-10 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                />
                                <label>Extra Material</label>
                            </form>
                            <button type="button" className="btn btn-secondary">
                                Add
                            </button>
                            <div className="col-md-10 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>tinh total cc gi day</p>
                            </div>
                        </div>

                        <div>
                            <p>
                                <b>Production</b>
                            </p>
                            <form className="form-floating col-md-10 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                />
                                <label>Production price</label>
                            </form>
                        </div>
                        <div>
                            <p>
                                <b>Markup rate</b>
                            </p>
                            <form className="form-floating col-md-10 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                />
                                <label>Rate</label>
                            </form>
                        </div>
                        <div className="col-md-10 d-flex justify-content-between align-items-center">
                            <p className="fw-bold">Total Price</p>
                            <p>tinh total cc gi day</p>
                        </div>
                        <button type="button" className="btn btn-secondary col-md-10">
                            Request Manager
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
};

export default WaitSaleStaff;