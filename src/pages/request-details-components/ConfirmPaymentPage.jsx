import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate } from '../../helper_function/ConvertFunction';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/ConfirmPaymentPage.module.css';
import empty_image from '/src/assets/empty_image.jpg';

const ConfirmPaymentPage = ({ order }) => {
    const navigate = useNavigate();

    const [amountPaid, setAmountPaid] = useState(0);
    const [processing, setProcessing] = useState(false);

    const getPaidAmount = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/api/payment/${order.id}`);
            if (!response.data || response.status === 204) {
                toast.error("Cannot fetch previously paid amount");
            } else {
                setAmountPaid(order.totalAmount - response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPaidAmount();
    }, [])

    const handleSubmit = async () => {
        try {
            setProcessing(true);
            const response = await axios.post(`http://localhost:8080/api/orders/${order.id}/complete`);
            if (!response.data || response.status === 204) {
                toast.error("Something happened, failed to confirm deposit");
            } else {
                console.log(response.data);
                setProcessing(false);
                navigate("/staff/request");
            }
        } catch (error) {
            console.log(error);
            setProcessing(false);
        }
    }

    return (
        <>
            <div className='container-fluid' id={`${styles['confirm-payment']}`}>
                <div className="row">
                    <h1 className='fw-bold'>
                        <FontAwesomeIcon onClick={() => navigate('/staff/request')} icon={faChevronLeft} className='me-3' id={`${styles['go-back-icon']}`} />
                        Confirm Payment
                    </h1>
                </div>

                <div className="row">
                    <div className="col">
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
                    <div className='col'>
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
                        <h4>Total: <span className='text-success'>{formatPrice(order.odiamondPrice)}</span></h4>
                        {order.product.materials.map(material =>
                            <div key={material.material.materialId}>
                                <h4 className='fw-bold'>Material #{material.material.materialId}</h4>
                                <ul>
                                    <li>Name: {material.material.materialName}</li>
                                    <li>Weight: {material.weight} karat</li>
                                </ul>
                            </div>
                        )}
                        <h4>Total: <span className='text-success'>{formatPrice(order.omaterialPrice)}</span></h4>
                        <h4 className='fw-bold'>Extra</h4>
                        <ul>
                            <li>Extra diamonds: {formatPrice(order.ediamondPrice)}</li>
                            <li>Extra materials: {formatPrice(order.ematerialPrice)}</li>
                            <li>Production price: {formatPrice(order.productionPrice)}</li>
                        </ul>
                        <h4>Accepted price as of {formatDate(order.odate)}: <span className='text-success'>{formatPrice(order.totalAmount)}</span></h4>
                        <h4 className='fw-bold'>Payment</h4>
                        <div className="row mb-2">
                            <div className="col">
                                70% Payment
                            </div>
                            <div className="col">
                                {formatPrice(amountPaid)}
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col">
                                Total amount
                            </div>
                            <div className="col">
                                {formatPrice(order.totalAmount)}
                            </div>
                        </div>
                        {
                            processing
                                ? <button className="btn btn-secondary w-100" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </button>
                                :
                                <button className={`btn w-100 ${styles['submit-button']}`} onClick={handleSubmit}>
                                    Confirm customer have completed payment and received product
                                </button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default ConfirmPaymentPage;