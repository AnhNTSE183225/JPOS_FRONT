import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { formatDate, formatPrice } from '../../helper_function/ConvertFunction'
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const WaitManager = ({ order }) => {

    const navigate = useNavigate();

    const acceptQuote = () => {
        let staff_id = sessionStorage.getItem('staff_id');
        if (staff_id !== null) {
            axios.post(`http://localhost:8080/api/${order.id}/manager-response?managerApproval=true`)
                .then(
                    response => {
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
        if (staff_id !== null) {
            axios.post(`http://localhost:8080/api/${order.id}/manager-response?managerApproval=false`)
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
                            Order date: {formatDate(order.orderDate)}
                        </li>
                        <li className='list-group-item'>
                            Customer specification:
                            <ul className='list-group'>
                                <li className='list-group-item'>
                                    Reference image:
                                    <img className='img-fluid' crossOrigin='anonymous' src={order.designFile} alt="" />
                                </li>
                                <li className='list-group-item'>Budget: {formatPrice(order.budget)}</li>
                                <li className='list-group-item'>
                                    Description: <br />
                                    <textarea readOnly className='form-control' name="" id="" defaultValue={order.description}></textarea>
                                </li>
                            </ul>
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
                            Product:
                            <ul className='list-group'>
                                <li className='list-group-item'>ID: {order.product.productId}</li>
                                <li className='list-group-item'>Name: {order.product.productName}</li>
                                <li className='list-group-item'>Production price: {order.product.productionPrice}</li>
                                <li className='list-group-item'>Markup rate: {order.product.markupRate}</li>
                                <li className='list-group-item'>Product type: {order.product.productType}</li>
                                <li className='list-group-item'>Extra material price: {order.product.ematerialPrice}</li>
                                <li className='list-group-item'>Extra diamond price: {order.product.ediamondPrice}</li>
                                <li className='list-group-item'>
                                    Main diamonds:
                                    <ul className='list-group'>
                                        {order.product.diamonds.map(diamond => (
                                            <li key={diamond.diamondId} className='list-group-item'>
                                                <ul className='list-group'>
                                                    <li className='list-group-item'>ID: {diamond.diamondId}</li>
                                                    <li className='list-group-item'>Code: {diamond.diamondCode}</li>
                                                    <li className='list-group-item'>Name: {diamond.diamondName}</li>
                                                    <li className='list-group-item'>Shape: {diamond.shape}</li>
                                                    <li className='list-group-item'>Origin: {diamond.origin}</li>
                                                    <li className='list-group-item'>Proportions: {diamond.proportions}</li>
                                                    <li className='list-group-item'>Fluorescence: {diamond.fluorescence}</li>
                                                    <li className='list-group-item'>Symmetry: {diamond.symmetry}</li>
                                                    <li className='list-group-item'>Polish: {diamond.polish} </li>
                                                    <li className='list-group-item'>Cut: {diamond.cut}</li>
                                                    <li className='list-group-item'>Color: {diamond.color}</li>
                                                    <li className='list-group-item'>Clarity: {diamond.clarity}</li>
                                                    <li className='list-group-item'>Crt. Weight: {diamond.caratWeight}</li>
                                                    <li className='list-group-item'>Note: {diamond.note}</li>
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className='list-group-item'>
                                    Materials:
                                    <ul className='list-group'>
                                        {order.product.materials.map(material => (
                                            <li className='list-group-item' key={material.material.materialId}>
                                                {material.material.materialName} - {material.weight} carat
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li className='list-group-item'>
                            Sale staff:
                            <ul className='list-group'>
                                <li className='list-group-item'>ID: {order.saleStaff.staffId}</li>
                                <li className='list-group-item'>Username: {order.saleStaff.username}</li>
                                <li className='list-group-item'>Name: {order.saleStaff.name}</li>
                                <li className='list-group-item'>Phone: {order.saleStaff.phone}</li>
                            </ul>
                        </li>
                        <li className='list-group-item'>
                            Quotation as of {formatDate(order.qDate)}
                            <ul className='list-group'>
                                <li className='list-group-item'>Diamond price: {formatPrice(order.qdiamondPrice)}</li>
                                <li className='list-group-item'>Material price: {formatPrice(order.qmaterialPrice)}</li>
                                <li className='list-group-item'>Production price: {formatPrice(order.productionPrice)}</li>
                                <li className='list-group-item'>Extra: {formatPrice(order.ediamondPrice + order.ematerialPrice)}</li>
                                <li className='list-group-item'>Markup rate: {order.markupRate}</li>
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
    );
};

export default WaitManager;