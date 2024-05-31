import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WaitSaleStaff = ({ order }) => {

    const [cut, setCut] = useState('');
    const [color, setColor] = useState('');
    const [clarity, setClarity] = useState('');
    const [caratWeight, setCaratWeight] = useState(0.0);

    const fetchPrice = (cut, color, clarity, caratWeight) => {
        axios.get(`http://localhost:8080/api/get-price-by-4C`,
            {
                cut: cut,
                clarity: clarity,
                caratWeight: caratWeight,
                color: color
            }
        ).then(
            response => {
                console.log(response.data);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
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

    const handleCaratWeight = (event) => {
        const value = parseFloat(event.target.value);
        setCaratWeight(isNaN(value) ? 0 : value);
    }

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <h3>
                        <b>Request Quotation</b>
                    </h3>
                    <div className="col px-3">
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

                    <div className="col px-3">
                        <div>
                            <p>
                                <b>Main Diamond Quality</b>
                            </p>
                            <div className="col-8 form-floating mb-2">
                                <select className="form-select">
                                    <option value>Choose shape</option>
                                    <option value="Round">Round</option>
                                    <option value="Princess">Princess</option>
                                    <option value="Cushion">Cushion</option>
                                    <option value="Emerald">Emerald</option>
                                    <option value="Oval">Oval</option>
                                    <option value="Radiant">Radiant</option>
                                    <option value="Asscher">Asscher</option>
                                    <option value="Marquise">Marquise</option>
                                    <option value="Heart">Heart</option>
                                    <option value="Pear">Pear</option>
                                </select>
                                <label>Shape</label>
                            </div>
                            <div className="form-floating col-8 mb-2">
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
                            <div className="col-8 form-floating mb-2">
                                <select value={color} onChange={handleColor} className="form-select">
                                    <option value>Choose color</option>
                                    <option value="K">K</option>
                                    <option value="J">J</option>
                                    <option value="I">I</option>
                                    <option value="H">H</option>
                                    <option value="G">G</option>
                                    <option value="F">F</option>
                                    <option value="E">E</option>
                                    <option value="D">D</option>
                                </select>
                                <label>Color</label>
                            </div>
                            <div className="col-8 form-floating mb-2">
                                <select value={clarity} onChange={handleClarity} className="form-select">
                                    <option value>Choose clarity</option>
                                    <option value="SI2">SI2</option>
                                    <option value="SI1">SI1</option>
                                    <option value="VS2">VS2</option>
                                    <option value="VS1">VS1</option>
                                    <option value="VVS2">VVS2</option>
                                    <option value="VVS1">VVS1</option>
                                    <option value="IF">IF</option>
                                    <option value="FL">FL</option>
                                </select>
                                <label>Clarity</label>
                            </div>
                            <form className="form-floating col-8 mb-2">
                                <input
                                    value={caratWeight}
                                    onChange={handleCaratWeight}
                                    type="number"
                                    className="form-control"
                                    step='0.1'
                                    placeholder='1.0'
                                />
                                <label>Carat Weight</label>
                            </form>
                            <form className="form-floating col-8 mb-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="1.0"
                                />
                                <label>Diamond code</label>
                            </form>
                            <button type="button" className="btn btn-secondary">
                                Add
                            </button>
                            <button onClick={() => fetchPrice(cut, color, clarity, caratWeight)} type="button" className="btn btn-secondary">
                                Update price
                            </button>
                            <div className="col-8 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>tinh total cc gi day</p>
                            </div>
                        </div>

                        <div>
                            <p>
                                <b>Material</b>
                            </p>
                            <div className="form-floating col-8 mb-2">
                                <select className="form-select">
                                    <option value>Choose material</option>
                                    <option value="1">14K Yellow Gold</option>
                                    <option value="2">14K White Gold</option>
                                    <option value="3">14K Rose Gold</option>
                                    <option value="4">18K Yellow Gold</option>
                                    <option value="5">Platinum</option>
                                </select>
                                <label>Material</label>
                            </div>
                            <form className="form-floating col-8 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                />
                                <label>Weight</label>
                            </form>
                            <button type="button" className="btn btn-secondary">
                                Add
                            </button>
                            <div className="col-8 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>tinh total cc gi day</p>
                            </div>
                        </div>

                        <div>
                            <p>
                                <b>Extra</b>
                            </p>
                            <form className="form-floating col-8 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                />
                                <label>Extra Diamond</label>
                            </form>
                            <form className="form-floating col-8 mb-2">
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
                            <div className="col-8 d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Price</p>
                                <p>tinh total cc gi day</p>
                            </div>
                        </div>

                        <div>
                            <p>
                                <b>Production</b>
                            </p>
                            <form className="form-floating col-8 mb-2">
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
                            <form className="form-floating col-8 mb-2">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="floatingInputValue"
                                    placeholder="1.0"
                                />
                                <label>Rate</label>
                            </form>
                        </div>
                        <button type="button" className="btn btn-secondary col-8">
                            Request Manager
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WaitSaleStaff;