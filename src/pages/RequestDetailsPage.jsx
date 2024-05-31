import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const WaitManager = ({ order }) => {

    const navigate = useNavigate();

    const acceptQuote = () => {
        let staff_id = sessionStorage.getItem('staff_id');
        if (staff_id !== null) {
            axios.get(`http://localhost:8080/api/${staff_id}/manage-response?managerApproved=true`)
            .then(
                reponse => {
                    toast(response.data);
                    navigate('/profile/request');
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
        if(staff_id !== null) {
            axios.get(`http://localhost:8080/api/${staff_id}/manage-response?managerApproved=false`)
            .then(
                response => {
                    toast(response.data);
                    navigate('/profile/request');
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
            <Toaster position="top-center" richColors expand={true} />
            <div className='container'>
                <div className='row p-3'>
                    <ul className='list-group'>
                        <li className='list-group-item'>Order id: {order.id}</li>
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
                            Product:
                            <ul className='list-group'>
                                <li className='list-group-item'>ID: {order.product.productId}</li>
                                <li className='list-group-item'>Name: {order.product.productName}</li>
                                <li className='list-group-item'>Production price: {order.product.productionPrice}</li>
                                <li className='list-group-item'>Markup rate: {order.product.markupRate}</li>
                                <li className='list-group-item'>Product type: {order.product.productType}</li>
                                <li className='list-group-item'>Extra material price: {order.product.ematerialPrice}</li>
                                <li className='list-group-item'>Extra diamond price: {order.product.ediamondPrice}</li>
                            </ul>
                        </li>
                        <li className='list-group-item'>
                            Sale staff: {order.product.saleStaff}
                        </li>
                        <li className='list-group-item'>
                            Order date: {formatDate(order.orderDate)}
                        </li>
                        <li className='list-group-item'>
                            Budget: {formatPrice(order.budget)}
                        </li>
                        <li className='list-group-item'>
                            Quotation
                            <ul className='list-group'>
                                <li className='list-group-item'>Diamond price: {formatPrice(order.qdiamondPrice)}</li>
                                <li className='list-group-item'>Material price: {formatPrice(order.qmaterialPrice)}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className='row'>
                    <div className='col'>
                        <button onClick={acceptQuote} className='btn btn-success w-100'>Accept</button>
                    </div>
                    <div className='col'>
                        <button onClick={refuseQuote} className='btn btn-danger w-100'>Refuse</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const WaitSaleStaff = ({ order }) => {
    return (
        <>

        </>
    )
}

const RequestDetailPage = () => {
    const orderId = useParams().orderId;

    const [order, setOrder] = useState(undefined);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/sales/order-select/${orderId}`)
            .then(
                response => {
                    setOrder(response.data);
                }
            ).catch(
                error => {
                    if (error.response) {
                        toast(error.response);
                    }
                    toast("Something went wrong...");
                }
            );
    }, [])

    if (order === undefined) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        switch (order.status) {
            case "wait_sale_staff":
                return (
                    <WaitSaleStaff order={order} />
                )
                break;
            case "wait_manager":
                return (
                    <WaitManager order={order} />
                );
            case "manager_approved":
                break;
            case "wait_customer":
                break;
            case "customer_accept":
                break;
            case "designing":
                break;
            case "pending_design":
                break;
            case "production":
                break;
            case "delivered":
                break;
            case "completed":
                break;
            default:
        }
    }
}

export default RequestDetailPage;