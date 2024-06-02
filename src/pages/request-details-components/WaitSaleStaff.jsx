import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

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

    const [materialWeight, setMaterialWeight] = useState(0);
    const [currentMaterial, setCurrentMaterial] = useState('');
    const [extraPrice, setExtraPrice] = useState({ material: 0, diamond: 0, production: 0, markupRate: 1.0 });
    const [diamondList, setDiamondList] = useState([]);
    const [materialList, setMaterialList] = useState([]);
    const [latestPrice, setLatestPrice] = useState(0);
    
    const [chosenDiamonds, setChosenDiamonds] = useState([]);
    const [chosenMaterials, setChosenMaterials] = useState([]);
    const [totalMaterialPrice, setTotalMaterialPrice] = useState(0);
    const [totalDiamondPrice, setTotalDiamondPrice] = useState(0);
    

    // const finalSubmit = () => {
    //     const finalOrder = {
    //         ...order
    //         ,
    //     }
    // }

    // const createProduct = () => {
    //     const product = {
    //         productName: "Test",
    //         productionPrice: extraPrice.production,
    //         markupRate: extraPrice.markupRate,
    //         productType: "TestType",
    //         productDesignId: null,
    //         diamonds: [

    //         ]
    //     }
    // }

    const removeDiamond = (id, price) => {
        setChosenDiamonds(oldList => oldList.filter(diamond => diamond.id !== id));
        setTotalDiamondPrice(prevPrice => prevPrice - price);
    }

    const removeMaterial = (id, price) => {
        setChosenMaterials(oldList => oldList.filter(material => material.id !== id));
        setTotalMaterialPrice(prevPrice => prevPrice - price);
    }

    const chooseDiamond = (id, code, price) => {
        setChosenDiamonds(oldList => [...oldList, {
            id: id,
            code: code,
            price: price
        }]);
        setTotalDiamondPrice(prevPrice => prevPrice + price);
    }

    const chooseMaterial = async () => {
        if (!chosenMaterials.some(material => material.id === currentMaterial)) {
            if (currentMaterial.length > 0 && materialWeight > 0) {
                const price = await fetchMaterialPrice(currentMaterial) * materialWeight;
                const newMaterial = {
                    id: currentMaterial,
                    weight: materialWeight,
                    price: price
                }
                setChosenMaterials(oldList => [...oldList, newMaterial]);
                setTotalMaterialPrice(prevPrice => prevPrice + newMaterial.price);
            }
        } else {
            toast.error(`Material already added`);
        }
    }

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

    const fetchMaterialPrice = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/materialPrices/${id}`);
            if (response.status === 204) {
                return 0;
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        console.log(event.target.value)
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
            <Toaster position="top-center" richColors expand={true} />
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
                                            <option key={material.materialId} value={material.materialId}>{material.materialName}</option>
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


                            <div className='col-10'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Weight</th>
                                            <th>Price</th>
                                            <th>#</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {chosenMaterials.map(
                                            material => (
                                                <tr key={material.id}>
                                                    <td>{material.id}</td>
                                                    <td>{material.weight}</td>
                                                    <td>{material.price}</td>
                                                    <td><button onClick={() => removeMaterial(material.id, material.price)} ><b>-</b></button></td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
                            <div className="form-floating col-md-10 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                    value={extraPrice.diamond}
                                    onChange={(event) => setExtraPrice(
                                        (prevExtraPrice) => (
                                            { ...prevExtraPrice, diamond: parseFloat(event.target.value.length === 0 ? '0' : event.target.value) }
                                        )
                                    )}
                                />
                                <label>Extra Diamond</label>
                            </div>
                            <div className="form-floating col-md-10 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                    value={extraPrice.material}
                                    onChange={(event) => setExtraPrice(
                                        (prevExtraPrice) => (
                                            { ...prevExtraPrice, material: parseFloat(event.target.value.length === 0 ? '0' : event.target.value) }
                                        )
                                    )}
                                />
                                <label>Extra Material</label>
                            </div>
                            <div className="col-md-10 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>{extraPrice.diamond + extraPrice.material}</p>
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
                                    value={extraPrice.production}
                                    onChange={(event) => setExtraPrice(
                                        (prevExtraPrice) => (
                                            { ...prevExtraPrice, production: parseFloat(event.target.value.length === 0 ? '0' : event.target.value) }
                                        )
                                    )}
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
                                    step="0.1"
                                    value={extraPrice.markupRate}
                                    onChange={(event) => setExtraPrice(
                                        (prevExtraPrice) => (
                                            { ...prevExtraPrice, markupRate: parseFloat(event.target.value.length === 0 ? '0' : event.target.value) }
                                        )
                                    )}                                />
                                <label>Rate</label>
                            </form>
                        </div>
                        <div className="col-md-10 d-flex justify-content-between align-items-center">
                            <p className="fw-bold">Total Price</p>
                            <p>{(totalDiamondPrice + totalMaterialPrice + extraPrice.material + extraPrice.diamond + extraPrice.production) * extraPrice.markupRate}</p>
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