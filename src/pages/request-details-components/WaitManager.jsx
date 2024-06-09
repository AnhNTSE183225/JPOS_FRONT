import { formatDate, formatPrice } from '../../helper_function/ConvertFunction'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import empty_image from '/src/assets/empty_image.jpg';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/WaitManager.module.css';

const WaitManager = ({ order }) => {

    const navigate = useNavigate();

    const acceptQuote = () => {
        let staff_id = sessionStorage.getItem('staff_id');
        if (staff_id !== null) {
            axios.post(`http://localhost:8080/api/${order.id}/manager-response?managerApproval=true`)
                .then(
                    response => {
                        navigate('/staff/request');
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                )
        } else {
            toast('Logged out');
            navigate('/login');
        }
    }

    const refuseQuote = () => {
        let staff_id = sessionStorage.getItem('staff_id');
        if (staff_id !== null) {
            axios.post(`http://localhost:8080/api/${order.id}/manager-response?managerApproval=false`)
                .then(
                    response => {
                        toast(response.data);
                        navigate('/staff/request');
                    }
                ).catch(
                    error => {
                        console.log(error);
                    }
                )
        }
    }

    return (
        <>
            <div className='container-fluid' id={`${styles['wait-manager']}`}>
                <div className="row">
                    <h1 className='fw-bold'>
                        <FontAwesomeIcon onClick={() => navigate('/staff/request')} icon={faChevronLeft} className='me-3' id={`${styles['go-back-icon']}`} />
                        Quotation Request
                    </h1>
                </div>
                <div className="row">
                    <div className="col-6">
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
                    <div className="col-6">
                        {order.product.diamonds.map(diamond =>
                            <>
                                <h4 className='fw-bold'>Diamond #{diamond.diamondId}</h4>
                                <ul>
                                    <li>Shape: {diamond.shape}</li>
                                    <li>Clarity: {diamond.clarity}</li>
                                    <li>Color: {diamond.color}</li>
                                    <li>Cut: {diamond.cut}</li>
                                </ul>
                            </>
                        )}
                        <h4>Total: <span className='text-danger'>{formatPrice(order.qdiamondPrice)}</span></h4>
                        {order.product.materials.map(material =>
                            <>
                                <h4 className='fw-bold'>Material #{material.material.materialId}</h4>
                                <ul>
                                    <li>Name: {material.material.materialName}</li>
                                    <li>Weight: {material.weight} karat</li>
                                </ul>
                            </>
                        )}
                        <h4>Total: <span className='text-danger'>{formatPrice(order.qmaterialPrice)}</span></h4>
                        <h4 className='fw-bold'>Extra</h4>
                        <ul>
                            <li>Extra diamonds: {formatPrice(order.ediamondPrice)}</li>
                            <li>Extra materials: {formatPrice(order.ematerialPrice)}</li>
                            <li>Production price: {formatPrice(order.productionPrice)}</li>
                        </ul>
                        <h4>Total price as of {formatDate(order.qdate)}: <span className='text-danger'>{formatPrice(order.totalAmount)}</span></h4>
                        <h4 className='fw-bold'>Markup rate</h4>
                        <input className='form-control mb-3' type="text" value={order.markupRate} disabled />
                        <div className="row">
                            <div className="col">
                                <button onClick={acceptQuote} className='btn btn-success w-100'>Accept</button>
                            </div>
                            <div className="col">
                                <button onClick={refuseQuote} className='btn btn-danger w-100'>Refuse</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WaitManager;