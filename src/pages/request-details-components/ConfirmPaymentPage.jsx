import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate } from '../../helper_function/ConvertFunction';
import { Toaster, toast } from 'sonner';
import axios from 'axios';


const ConfirmPaymentPage = ({order}) => {
    const navigate = useNavigate();

    const [paymentDate, setPaymentDate] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [amountPaid, setAmountPaid] = useState(null);

    const [processing, setProcessing] = useState(false);

    const handleSubmit = async () => {
        try {
            if (paymentDate !== null &&
                paymentMethod !== null &&
                paymentStatus !== null &&
                amountPaid != null
            ) {
                setProcessing(true);
                const response = await axios.put(`http://localhost:8080/api/sales/orders/${order.id}/confirm-deposit`,
                    {
                        paymentDate: paymentDate,
                        paymentMethod: paymentMethod,
                        paymentStatus: paymentStatus,
                        amountPaid: amountPaid,
                        amountTotal: order.totalAmount
                    }
                )
                if (!response.data || response.status === 204) {
                    toast.error("Something happened, failed to confirm deposit");
                } else {
                    console.log(response.data);
                    setProcessing(false);
                    navigate("/profile/request");
                }
            } else {
                toast.info("Please fill in all fields");
            }
        } catch (error) {
            console.log(error);
            setProcessing(false);
        }
    }

    return (
        <>
            <Toaster position="top-center" richColors expand={true} />
            <div className='container'>
                <h1>Order information</h1>
                <div className='row p-3'>
                    <ul className='list-group'>
                        <li className='list-group-item'>Order id: {order.id}</li>
                        <li className='list-group-item'>
                            Order date: {formatDate(order.orderDate)}
                        </li>
                        <li className='list-group-item'>
                            Customer information:
                            <ul className='list-group'>
                                <li className='list-group-item'>ID: {order.customer.customerId}</li>
                                <li className='list-group-item'>Username: {order.customer.username}</li>
                                <li className='list-group-item'>name: {order.customer.name}</li>
                                <li className='list-group-item'>Address: {order.customer.address}</li>
                            </ul>
                        </li>
                        <li className='list-group-item'>
                            Finalized price - {formatDate(order.odate)}
                            <ul className='list-group'>
                                <li className='list-group-item'>Diamond price: {formatPrice(order.odiamondPrice)}</li>
                                <li className='list-group-item'>Material price: {formatPrice(order.omaterialPrice)}</li>
                                <li className='list-group-item'>Production price: {formatPrice(order.productionPrice)}</li>
                                <li className='list-group-item'>Extra: {formatPrice(order.ediamondPrice + order.ematerialPrice)}</li>
                                <li className='list-group-item'>Markup rate: {order.markupRate}</li>
                                <li className='list-group-item'>Total: {formatPrice(order.totalAmount)}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <h1>Payment information</h1>
                <div className='row p-3'>
                    <div className="card p-3">
                        <label className='form-label'>Payment date</label>
                        <input onChange={(e) => setPaymentDate(e.target.value)} className='form-control' type="date" />
                        <label className='form-label'>Payment method</label>
                        <select onChange={(e) => setPaymentMethod(e.target.value)} className='form-control'>
                            <option value>Select payment method</option>
                            {["VISA", "Cash", "Credit/Debit"].map(value => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <label className='form-label'>Payment status</label>
                        <select onChange={(e) => setPaymentStatus(e.target.value)} className='form-control'>
                            <option value>Select payment status</option>
                            {["Full pay", "10% deposit", "25% deposit", "50% deposit"].map(value => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <label className='form-label'>Amount paid</label>
                        <input onChange={(e) => setAmountPaid(e.target.value)} className='form-control' type="number" />
                        <label className='form-label'>Total amount</label>
                        <input className='form-control' type="number" value={order.totalAmount} disabled />
                    </div>
                </div>
                <div className="row p-3">
                    {
                        processing
                            ? <button className="btn btn-secondary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                <span role="status">Loading...</span>
                            </button>
                            :
                            <button className='btn btn-primary' onClick={handleSubmit} >Confirm customer complete payment</button>
                    }
                </div>
            </div>
        </>
    );
}
export default ConfirmPaymentPage;