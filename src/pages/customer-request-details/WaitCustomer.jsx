import { Toaster, toast } from 'sonner';
import { formatPrice, formatDate } from '../../helper_function/ConvertFunction';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import empty_image from '/src/assets/empty_image.jpg';
import { useNavigate } from 'react-router-dom';
import styles from '/src/css/WaitCustomer.module.css';
import { fetchDiamondPrice, fetchMaterialPrice } from '../../helper_function/FetchPriceFunctions';
import { makePayment } from '../../helper_function/Pay';

const WaitCustomer = ({ order }) => {

    const navigate = useNavigate();

    const [currentMaterialPrice, setCurrentMaterialPrice] = useState(0);
    const [currentDiamondPrice, setCurrentDiamondPrice] = useState(0);

    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        getCurrentDiamondPrice(order.product.diamonds);
        getCurrentMaterialPrice(order.product.materials);
    }, [])

    const getCurrentMaterialPrice = async (materials) => {
        let total = 0;
        for (const material of materials) {
            total += await fetchMaterialPrice(material.material.materialId) * material.weight;
        }
        setCurrentMaterialPrice(total);
    };

    const getCurrentDiamondPrice = async (diamonds) => {
        let totalDiamondPrice = 0;
        for (const diamond of diamonds) {
            totalDiamondPrice += await fetchDiamondPrice(diamond.origin, diamond.shape, diamond.caratWeight, diamond.color, diamond.clarity, diamond.cut);
        }
        setCurrentDiamondPrice(totalDiamondPrice);
    };

    const createOrder = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/accept-quotation?orderId=${order.id}`);
            if (!response.data || response.status === 204) {
                toast.error("Something went wrong, saving failed");
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const clickPay = async () => {
        setProcessing(true);
        try {
            const orderId = await createOrder();
            const orderAmount = await axios.get(`${import.meta.env.VITE_jpos_back}/api/sales/order-select/${orderId}`);
            if (!orderAmount || orderAmount.status === 204) {
                console.log(`Can't find totalAmount of that order`);
            } else {
                console.log(orderAmount);
                sessionStorage.setItem('currentOrderId', orderAmount.data.id);
                sessionStorage.setItem('currentOrderType', orderAmount.data.orderType);
                makePayment(orderAmount.data.totalAmount * 0.3);
            }
        } catch (error) {
            toast.error(`Payment process failed: ${error}`);
        }
        setProcessing(false);
    }

    return (
        <>
            <div className="container px-5" id={`${styles['wait-customer']}`}>
                <div className="row">
                    <div className="col">
                        <h1 className='fw-bold' style={{ color: '#48AAAD' }}>Your Request</h1>
                        <h4 className='fw-bold'>Customer name</h4>
                        <p>[ID: {order.customer.customerId}] {order.customer.name}</p>
                        <h4 className='fw-bold'>Customer address</h4>
                        <p>{order.customer.address}</p>
                        <h4 className='fw-bold'>Customer budget</h4>
                        <p>{formatPrice(order.budget)}</p>
                        <h4 className='fw-bold'>Description</h4>
                        <p style={{ maxWidth: '500px', wordWrap: 'break-word' }} >{order.description}</p>
                        <h4 className='fw-bold'>Reference image</h4>
                        <img className='img-fluid' src={order.designFile == 'Not provided' ? empty_image : order.designFile} alt="" style={{ width: '500px', height: '500px' }} />
                    </div>
                    <div className="col">
                        <h1 className='fw-bold' style={{ color: '#48AAAD' }}>Staff Response</h1>
                        {order.product.diamonds.map(diamond =>
                            <div key={diamond.diamondId}>
                                <h4 className='fw-bold'>Diamond #{diamond.diamondId}</h4>
                                <ul>
                                    <li>Shape: {diamond.shape}</li>
                                    <li>Clarity: {diamond.clarity}</li>
                                    <li>Color: {diamond.color}</li>
                                    <li>Cut: {diamond.cut}</li>
                                </ul>
                            </div>
                        )}
                        <h4>Quote: <span className='text-danger'>{formatPrice(order.qdiamondPrice)}</span></h4>
                        <h4>Current: <span className='text-success'>{formatPrice(currentDiamondPrice)}</span></h4>
                        {order.product.materials.map(material =>
                            <div key={material.material.materialId}>
                                <h4 className='fw-bold'>Material #{material.material.materialId}</h4>
                                <ul>
                                    <li>Name: {material.material.materialName}</li>
                                    <li>Weight: {material.weight} karat</li>
                                </ul>
                            </div>
                        )}
                        <h4>Quote: <span className='text-danger'>{formatPrice(order.qmaterialPrice)}</span></h4>
                        <h4>Current: <span className='text-success'>{formatPrice(currentMaterialPrice)}</span></h4>
                        <h4 className='fw-bold'>Extra</h4>
                        <ul>
                            <li>Extra diamonds: {formatPrice(order.ediamondPrice)}</li>
                            <li>Extra materials: {formatPrice(order.ematerialPrice)}</li>
                            <li>Production price: {formatPrice(order.productionPrice + (order.totalAmount * order.markupRate - order.totalAmount))}</li>
                        </ul>
                        <h4>Total price as of {formatDate(order.qdate)}: <span className='text-danger'>{formatPrice(order.totalAmount)}</span></h4>
                        <h4>Total price as of today: <span className='text-success'>{formatPrice((currentDiamondPrice + currentMaterialPrice + order.ematerialPrice + order.ediamondPrice + order.productionPrice) * order.markupRate * 1.1)}</span></h4>
                        <div className='my-3'>
                        </div>
                        {processing
                            ? <button className="btn btn-primary w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>
                            : <button onClick={clickPay} className={`btn w-100 ${styles['submit-button']}`}>
                                Accept quotation & pay {formatPrice((currentDiamondPrice + currentMaterialPrice + order.ematerialPrice + order.ediamondPrice + order.productionPrice) * order.markupRate * 1.1 * 0.3)} (30% price)
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default WaitCustomer;