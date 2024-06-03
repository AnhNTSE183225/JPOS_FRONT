import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { Toaster, toast } from 'sonner';
import { formatPrice, formatDate } from '../../helper_function/ConvertFunction';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WaitCustomer = ({ order }) => {

    const navigate = useNavigate();

    const [currentMaterialPrice, setCurrentMaterialPrice] = useState(0);
    const [currentDiamondPrice, setCurrentDiamondPrice] = useState(0);

    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        getCurrentDiamondPrice(order.product.diamonds);
        getCurrentMaterialPrice(order.product.materials);
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
            console.error(error);
            return 0; // Return 0 in case of error to not break the total calculation
        }
    };

    const fetchPrices = async (cut, color, clarity, fromCaratWeight, toCaratWeight) => {

        const response = await axios.post(`http://localhost:8080/api/get-price-by-4C`,
            {
                cut: cut,
                clarity: clarity,
                fromCaratWeight: fromCaratWeight,
                toCaratWeight: toCaratWeight,
                color: color
            }
        )
        if (!response.data || response.status === 204) {
            console.log("Failed to fetch diamond price");
        }
        return response.data;
    };

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
            totalDiamondPrice += await fetchPrices(diamond.cut, diamond.color, diamond.clarity, diamond.caratWeight, diamond.caratWeight);
        }
        setCurrentDiamondPrice(totalDiamondPrice);
    };

    const handleSubmit = async () => {
        setProcessing(true);
        try {
            const response = await axios.put(`http://localhost:8080/api/accept-order`,
                {
                    ...order,
                    odiamondPrice: currentDiamondPrice,
                    omaterialPrice: currentMaterialPrice
                }
            )
            if (response.data || response.status === 204) {
                toast.error("Something went wrong, saving failed");
            }
            console.log(response.data);
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
        setProcessing(false);
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
                            Quotation as of {formatDate(order.qdate)}
                            <ul className='list-group'>
                                <li className='text-warning list-group-item'>Quote Diamond price: {formatPrice(order.qdiamondPrice)}</li>
                                <li className='text-success list-group-item'>Current Diamond price: {formatPrice(currentDiamondPrice)}</li>
                                <li className='text-warning list-group-item'>Quote Material price: {formatPrice(order.qmaterialPrice)}</li>
                                <li className='text-success list-group-item'>Current Material price: {formatPrice(currentMaterialPrice)}</li>
                                <li className='list-group-item'>Production price: {formatPrice(order.productionPrice + (order.totalAmount * order.markupRate - order.totalAmount))}</li>
                                <li className='list-group-item'>Extra: {formatPrice(order.ediamondPrice + order.ematerialPrice)}</li>
                                <li className='list-group-item'>Total amount: {formatPrice(order.totalAmount)}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="row p-3">
                    {processing
                        ? <button className="btn btn-primary w-100" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Loading...</span>
                        </button>
                        : <button onClick={handleSubmit} className='btn btn-primary w-100'>
                            Accept price
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default WaitCustomer;