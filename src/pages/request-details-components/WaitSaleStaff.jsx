import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../helper_function/ConvertFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/WaitSaleStaff.module.css';
import empty_image from '/src/assets/empty_image.jpg';
import { fetchDiamondPrice, fetchMaterialPrice } from '../../helper_function/FetchPriceFunctions';

const WaitSaleStaff = ({ order }) => {

    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');

    const [cut, setCut] = useState('');
    const [color, setColor] = useState('');
    const [clarity, setClarity] = useState('');
    const [shape, setShape] = useState('');
    const [caratWeight, setCaratWeight] = useState(0.0);

    const [materialWeight, setMaterialWeight] = useState(0);
    const [currentMaterial, setCurrentMaterial] = useState('');
    const [extraPrice, setExtraPrice] = useState({ material: 0, diamond: 0, production: 0, markupRate: 1.0 });
    const [diamondList, setDiamondList] = useState([]);
    const [diamondPrices, setDiamondPrices] = useState([]);
    const [materialList, setMaterialList] = useState([]);

    const [chosenDiamonds, setChosenDiamonds] = useState([]);
    const [chosenMaterials, setChosenMaterials] = useState([]);
    const [totalMaterialPrice, setTotalMaterialPrice] = useState(0);
    const [totalDiamondPrice, setTotalDiamondPrice] = useState(0);

    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const update = async () => {
            if (
                cut.trim().length > 0 &&
                clarity.trim().length > 0 &&
                color.trim().length > 0 &&
                shape.trim().length > 0
            ) {
                let diamond_list = await fetchDiamonds(cut, color, clarity, fromCaratWeight, toCaratWeight, shape);
                let diamond_prices = [];
                if (diamond_list != null && diamond_list.length > 0) {
                    diamond_prices = await fetchPrice(diamond_list);
                }

                setDiamondList(diamond_list);
                setDiamondPrices(diamond_prices);
            }
        }
        update();
    }, [cut, color, clarity, fromCaratWeight, toCaratWeight, shape])

    useEffect(() => {
        fetchMaterials();
    }, [])

    const finalSubmit = async () => {
        if (productName.trim().length > 0 &&
            productType.trim().length > 0 &&
            chosenDiamonds.length > 0 &&
            chosenMaterials.length > 0 &&
            extraPrice.production >= 0 &&
            extraPrice.diamond >= 0 &&
            extraPrice.markupRate > 0 &&
            extraPrice.material >= 0) {
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
                    totalAmount: (totalDiamondPrice + totalMaterialPrice + extraPrice.material + extraPrice.diamond + extraPrice.production) * extraPrice.markupRate * 1.1,
                    ematerialPrice: extraPrice.material,
                    ediamondPrice: extraPrice.diamond,
                    qdiamondPrice: totalDiamondPrice,
                    qmaterialPrice: totalMaterialPrice
                }

                const response2 = await axios.post(`http://localhost:8080/api/sales/orders/${sessionStorage.getItem(`staff_id`)}/${response.data}`, finalOrder);
                if (!response.data || response.status === 204) {
                    throw new Error(`Order update failed. Backend did not return order`);
                }
                navigate("/staff/request");

            } catch (error) {
                toast.error(`Something went wrong! Can't complete order`);
                console.log(error);
            }
        } else {
            if (productName.trim().length <= 0) {
                toast.info(`Product needs a name!`);
            }
            if (productType.trim().length <= 0) {
                toast.info(`You haven't selected any product type`);
            }
            if(extraPrice.markupRate <= 0) {
                toast.info(`Markup rate cannot be below 0`);
            }
            if(chosenDiamonds.length <= 0) {
                toast.info(`You haven't chosen any diamonds`);
            }
            if(chosenMaterials.length <= 0) {
                toast.info(`You haven't chosen any materials`);
            }
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
            } else {
                toast.info(`Please fill in material and weight`);
            }
        } else {
            toast.error(`Material already added`);
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

    const fetchPrice = async (diamondList) => {
        let diamond_prices = []
        for (const diamond of diamondList) {
            const response = await fetchDiamondPrice(diamond.cut, diamond.color, diamond.clarity, diamond.caratWeight, diamond.shape);
            diamond_prices = [
                ...diamond_prices,
                {
                    id: diamond.diamondId,
                    price: response
                }
            ]
        }
        return diamond_prices;
    }

    const fetchDiamonds = async (cut, color, clarity, fromCaratWeight, toCaratWeight, shape) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/get-diamonds-by-4C?fromCaratWeight=${fromCaratWeight}&toCaratWeight=${toCaratWeight}&cut=${cut}&clarity=${clarity}&color=${color}&shape=${shape}`);
            if (response.status === 204) {
                toast.info(`No diamonds fit this setting`);
                return [];
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
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

    return (
        <div className={`${styles['wait-sale-staff']}`}>
            <div className="row">
                <h1 className='fw-bold'>
                    <FontAwesomeIcon onClick={() => navigate('/staff/request')} icon={faChevronLeft} className='me-3' id={`${styles['go-back-icon']}`} />
                    Request Quotation
                </h1>
            </div>
            <div className="row">

                <div className="col-4">
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
                    <img className='img-fluid' src={order.designFile == 'Not provided' ? empty_image : order.designFile} alt="" style={{ width: '500px', height: '500px' }} />
                </div>

                <div className="col-4">
                    <h4 className='fw-bold'>Basic information</h4>
                    <div className="row mb-2">
                        <div className="col">Product name</div>
                        <div className="col"><input className='form-control' type='text' placeholder='Enter name...' value={productName} onChange={(e) => setProductName(e.target.value)} /></div>
                    </div>
                    <div className="row mb-2">
                        <div className="col">Product type</div>
                        <div className="col">
                            <select value={productType} onChange={(e) => setProductType(e.target.value)} className="form-select">
                                <option value=''>Choose product type</option>
                                {[`Engagement Ring`, `Wedding Ring`, `Earrings`, `Necklace`, `General Jewelry`].map(value => (<option key={value} value={value}>{value}</option>))}
                            </select>
                        </div>
                    </div>
                    <h4 className='fw-bold'>Main Diamond Quality</h4>

                    <div className="row mb-2">
                        <div className="col-3">Shape</div>
                        <div className="col">
                            <select value={shape} onChange={handleShape} className="form-select">
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
                        <div className="col-3">Cut</div>
                        <div className="col">
                            <select value={cut} onChange={handleCut} className="form-select">
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
                        <div className="col-3">Color</div>
                        <div className="col">
                            <select value={color} onChange={handleColor} className="form-select">
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
                        <div className="col-3">Clarity</div>
                        <div className="col">
                            <select value={clarity} onChange={handleClarity} className="form-select">
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
                        <div className="col-3">Carat Weight</div>
                        <div className="col">
                            <input
                                value={fromCaratWeight}
                                onChange={handleFromCaratWeight}
                                type="number"
                                className="form-control"
                                step='0.1'
                                placeholder='0.0'
                            />

                        </div>
                        <div className="col">
                            <input
                                value={toCaratWeight}
                                onChange={(e) => setToCaratWeight(e.target.value)}
                                type="number"
                                className="form-control"
                                step='0.1'
                                placeholder='0.0'
                            />

                        </div>
                    </div>

                    <div className='row mb-2'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Code</th>
                                    <th>Ct.W</th>
                                    <th>Price</th>
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
                                            <td>{formatPrice(diamondPrices.find(price => diamond.diamondId == price.id).price)}</td>
                                            <td>
                                                <button
                                                    onClick={() => chooseDiamond(diamond.diamondId, diamond.diamondCode, diamondPrices.find(price => diamond.diamondId == price.id).price)}
                                                    disabled={chosenDiamonds.some(chosenDiamond => chosenDiamond.id === diamond.diamondId)}
                                                    className='btn'
                                                >
                                                    Choose
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>



                </div>

                <div className="col-4">
                    <div className='col-10'>
                        <h4 className='fw-bold'>Chosen diamonds</h4>
                        <div className='row mb-2'>
                            <table className='table table-bordered'>
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
                        <div className="row mb-2">
                            <div className="col-10 fw-semibold">
                                Price
                            </div>
                            <div className="col-10">
                                {formatPrice(totalDiamondPrice)}
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>
                            <b>Material</b>
                        </p>
                        <div className="col-10 mb-2">
                            <select value={currentMaterial} onChange={handleMaterial} className="form-select">
                                <option value=''>Choose material</option>
                                {materialList.map(
                                    material => (
                                        <option key={material.materialId} value={material.materialId}>{material.materialName}</option>
                                    )
                                )}
                            </select>
                        </div>
                        <p>
                            <b>Weight</b>
                        </p>
                        <div className="col-10 mb-2">
                            <input
                                value={materialWeight}
                                onChange={handleMaterialWeight}
                                type="number"
                                className="form-control"
                                id="floatingInputValue"
                                placeholder="0.0"
                                step="0.1"
                            />
                        </div>


                        <div className='col-10'>
                            <table className='table table-bordered'>
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
                                                <td>{formatPrice(material.price)}</td>
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
                        <p className="fw-bold">Product price</p>
                        <p>{formatPrice((totalDiamondPrice + totalMaterialPrice + extraPrice.material + extraPrice.diamond + extraPrice.production) * extraPrice.markupRate)}</p>
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center">
                        <p className="fw-bold">Total amount &#40;10% tax&#41;</p>
                        <p>{formatPrice((totalDiamondPrice + totalMaterialPrice + extraPrice.material + extraPrice.diamond + extraPrice.production) * extraPrice.markupRate * 1.1)}</p>
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
    );
};

export default WaitSaleStaff;