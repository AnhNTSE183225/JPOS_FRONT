import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate } from '../../helper_function/ConvertFunction';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/ConfirmPaymentPage.module.css';
import empty_image from '/src/assets/empty_image.jpg';
import useDocumentTitle from '../../components/Title';

const ConfirmPaymentPage = ({ order }) => {
    const navigate = useNavigate();

    const [amountPaid, setAmountPaid] = useState(0);
    const [processing, setProcessing] = useState(false);

    useDocumentTitle("Confirm Payment");

    const getPaidAmount = async () => {

        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/payment/${order.id}`);
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
            const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/orders/${order.id}/complete`);
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
                    <div className="col-md-8">
                        <h4 className="text-center fw-bold mb-4 mt-4">CUSTOMER INFORMATION</h4><hr />
                        <h5 className='fw-semibold'>Customer name</h5>
                        <p className='fs-6 ms-4'>[ID: {order.customer.customerId}] {order.customer.name}</p>
                        <h5 className='fw-semibold'>Customer address</h5>
                        <p className='fs-6 ms-4'>{order.customer.address}</p>
                        <h5 className='fw-semibold'>Reference image</h5>
                        <img className='img-fluid' src={order.designFile === null ? empty_image : order.designFile} alt="" style={{ width: '100%', height: 'auto' }} />
                        <h5 className='fw-semibold'>Production image</h5>
                        <img className='img-fluid' src={order.productImage === null ? empty_image : order.productImage} alt="" style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <div className="col-md-4">
                        <h4 className="text-center fw-bold mb-4 mt-4">ORDER SUMMARY</h4><hr />
                        {order.product !== null
                            ? order.product.diamonds.map(diamond =>
                                <div key={diamond.diamondId}>
                                    <h5 className='fw-semibold mb-4'>Diamond #{diamond.diamondId}</h5>
                                    <div className='fs-6'>
                                        <p className={styles.listItem}><span>Shape:</span> <span>{diamond.shape.charAt(0).toUpperCase() + diamond.shape.slice(1)}</span></p>
                                        <p className={styles.listItem}><span>Clarity:</span> <span>{diamond.clarity}</span></p>
                                        <p className={styles.listItem}><span>Color:</span> <span>{diamond.color}</span></p>
                                        <p className={styles.listItem}><span>Cut:</span> <span>{diamond.cut}</span></p>
                                    </div>
                                </div>
                            )
                            : <></>
                        }
                        <h5 className={styles.listItem}><span>Quotation price:</span> <span style={{ color: 'red' }}>{order.qdiamondPrice === null ? 'None' : formatPrice(order.qdiamondPrice)}</span></h5>
                        <h5 className={styles.listItem}><span>Order price:</span> <span style={{ color: '#48AAAD' }}>{order.odiamondPrice === null ? 'None' : formatPrice(order.odiamondPrice)}</span></h5>
                        <hr />
                        {order.product !== null
                            ? order.product.materials.map(material =>
                                <div key={material.material.materialId}>
                                    <h5 className='fw-semibold mb-4'>Material #{material.material.materialId}</h5>
                                    <div className='fs-6' style={{ listStyle: "none" }}>
                                        <p className={styles.listItem}><span>Name:</span> <span>{material.material.materialName.replaceAll("_", " ")}</span></p>
                                        <p className={styles.listItem}><span>Weight:</span> <span>{material.weight}</span></p>
                                    </div>
                                </div>
                            )
                            : <>
                            </>
                        }
                        <h5 className={styles.listItem}><span>Quotation price:</span> <span style={{ color: 'red' }}>{order.qmaterialPrice === null ? 'None' : formatPrice(order.qmaterialPrice)}</span></h5>
                        <h5 className={styles.listItem}><span>Order price:</span> <span style={{ color: '#48AAAD' }}>{order.omaterialPrice === null ? 'None' : formatPrice(order.omaterialPrice)}</span></h5>
                        <hr />
                        <h5 className='fw-semibold mb-4'>Extra</h5>
                        <div className='fs-6' style={{ listStyle: "none" }}>
                            <p className={styles.listItem}><span>Extra diamonds:</span> <span>{order.ediamondPrice === null ? "None" : formatPrice(order.ediamondPrice)}</span></p>
                            <p className={styles.listItem}><span>Extra materials:</span> <span>{order.ematerialPrice === null ? "None" : formatPrice(order.ematerialPrice)}</span></p>
                            <p className={styles.listItem}><span>Production price:</span> <span>{order.productionPrice === null ? "None" : formatPrice(order.productionPrice)}</span></p>
                        </div>

                        <hr /><h5 className={styles.listItem}><span>Tax fee (10% VAT):</span> <span>{order.taxFee === null ? 'None' : formatPrice(order.taxFee)}</span></h5>
                        <h5 className='fw-bold'>Payment</h5>
                        <div className="row mb-2">
                            <div className="col">
                                70% Payment
                            </div>
                            <div className="col">
                                {formatPrice(amountPaid)}
                            </div>
                        </div>
                        <h5 className={styles.listItem}><span>TOTAL PRICE {formatDate(order.qdate)}:</span> <span style={{ color: '#48AAAD' }}>{order.totalAmount === null ? "None" : formatPrice(order.totalAmount)}</span></h5>
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
