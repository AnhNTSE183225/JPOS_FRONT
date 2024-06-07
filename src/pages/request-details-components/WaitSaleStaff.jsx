import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../helper_function/ConvertFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/WaitSaleStaff.module.css';

const WaitSaleStaff = ({ order }) => {

    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');

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

    const [processing, setProcessing] = useState(false);

    const finalSubmit = async () => {
        if (productName.length > 0 &&
            chosenDiamonds.length > 0 &&
            chosenMaterials.length > 0 &&
            extraPrice.diamond > 0 &&
            extraPrice.markupRate > 0 &&
            extraPrice.material > 0) {
            try {
                setProcessing(true);
                const productDTO = {
                    productName: productName,
                    productType: productType,
                    ediamondPrice: extraPrice.diamond,
                    ematerialPrice: extraPrice.material,
                    productionPrice: extraPrice.production,
                    markupRate: extraPrice.markupRate,
                    diamondIds: chosenDiamonds.map(diamond => diamond.id),
                    materialsIds: chosenMaterials.map(material => ({ first: material.id, second: material.weight }))
                }

                const response = await axios.post(`http://localhost:8080/api/product/save`, productDTO);
                if (!response.data || response.status === 204) {
                    throw new Error(`Product creation failed. Backend did not return id`);
                }

                const finalOrder = {
                    ...order,
                    productionPrice: extraPrice.production,
                    markupRate: extraPrice.markupRate,
                    totalAmount: (totalDiamondPrice + totalMaterialPrice + extraPrice.material + extraPrice.diamond + extraPrice.production) * extraPrice.markupRate,
                    ematerialPrice: extraPrice.material,
                    ediamondPrice: extraPrice.diamond,
                    qdiamondPrice: totalDiamondPrice,
                    qmaterialPrice: totalMaterialPrice
                }

                const response2 = await axios.post(`http://localhost:8080/api/sales/orders/${sessionStorage.getItem(`staff_id`)}/${response.data}`, finalOrder);
                if (!response.data || response.status === 204) {
                    throw new Error(`Order update failed. Backend did not return order`);
                }
                navigate("/profile/request");

            } catch (error) {
                toast.error(`Something went wrong! Can't complete order`);
                console.log(error);
            }
        } else {
            toast.info("Please fill in all forms");
        }
        setProcessing(false);
    }

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
                        setLatestPrice(diamondPrice);
                    }
                }
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    const fetchDiamonds = async (cut, color, clarity, fromCaratWeight, toCaratWeight, shape) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/get-diamonds-by-4C?fromCaratWeight=${fromCaratWeight}&toCaratWeight=${toCaratWeight}&cut=${cut}&clarity=${clarity}&color=${color}&shape=${shape}`);
            if (response.status === 204) {
                toast.info(`No diamonds fit this setting`);
            } else {
                //console.log(response.data);
                setDiamondList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
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
        <div className={`${styles['wait-sale-staff']}`}>
            <Toaster position="top-center" richColors expand={false} />
            <div>
                <div className="row">
                    <h1 className='fw-bold'>
                        <FontAwesomeIcon onClick={() => navigate('/staff/request')} icon={faChevronLeft} className='me-3' id={`${styles['go-back-icon']}`} />
                        Request Quotation
                    </h1>
                    <div className="col-md-3 px-3">
                        <p>
                            <b>Full Name</b>
                        </p>
                        <p className="px-3">{order.customer.name}</p>
                        <p>
                            <b>Description</b>
                        </p>
                        <textarea maxLength={255} readOnly value={order.description} style={{ resize: "none" }} className="form-control mb-3" rows='5' cols='30' aria-label="description"></textarea>
                        <p>
                            <b>Budget</b>
                        </p>
                        <p className="px-3">{order.budget}</p>
                        <p>
                            <b>Reference image</b>
                        </p>
                        <p className="px-3"><img crossOrigin='anonymous' className='img-fluid' src={order.designFile} alt="" /></p>
                    </div>

                    <div className="col-md-5 px-3">
                        <div>
                            <p>
                                <b>Basic information</b>
                            </p>
                            <div className="form-floating col-10 mb-2">
                                <input className='form-control' type='text' value={productName} onChange={(e) => setProductName(e.target.value)} />
                                <label>Product name</label>
                            </div>
                            <div className="form-floating col-10 mb-2">
                                <select value={productType} onChange={(e) => setProductType(e.target.value)} className="form-select">
                                    <option value>Choose product type</option>
                                    {[`Engagement Ring`, `Wedding Ring`, `Earrings`, `Necklace`, `General Jewelry`].map(value => (<option key={value} value={value}>{value}</option>))}
                                </select>
                                <label>Product type</label>
                            </div>
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
                                <p>{formatPrice(latestPrice)}</p>
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
                                                    <td>{formatPrice(diamond.price)}</td>
                                                    <td><button onClick={() => removeDiamond(diamond.id, diamond.price)}><b>-</b></button></td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-8 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>{formatPrice(totalDiamondPrice)}</p>
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
                                <p>{formatPrice(totalMaterialPrice)}</p>
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
                                <p>{formatPrice(extraPrice.diamond + extraPrice.material)}</p>
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
                                    )} />
                                <label>Rate</label>
                            </form>
                        </div>
                        <div className="col-md-10 d-flex justify-content-between align-items-center">
                            <p className="fw-bold">Total Price</p>
                            <p>{formatPrice((totalDiamondPrice + totalMaterialPrice + extraPrice.material + extraPrice.diamond + extraPrice.production) * extraPrice.markupRate)}</p>
                        </div>
                        {
                            processing
                                ? <button className="btn btn-secondary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </button>
                                : <button type="button" className="btn btn-secondary col-md-10" onClick={finalSubmit}>
                                    Request Manager
                                </button>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WaitSaleStaff;