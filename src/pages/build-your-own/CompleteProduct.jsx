import { useState, useEffect, useContext } from 'react';
import { Context } from '../FrameBuildYourOwn';
import { Toaster, toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, formatPrice } from '../../helper_function/ConvertFunction';
import axios from 'axios';

const CompleteProduct = () => {

    const navigate = useNavigate();
    const [productSetting, setProductSetting] = useContext(Context);

    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState(null);

    const createOrder = async () => {

        if (sessionStorage.getItem("customer_id") === null || productSetting.designId == null || productSetting.shellId == null || productSetting.diamonds.length == 0) {
            console.log("ERROR");
        } else {
            try {
                const object = {
                    productDesignId: productSetting.designId,
                    productShellId: productSetting.shellId,
                    diamondIds: productSetting.diamonds,
                    customerId: sessionStorage.getItem("customer_id")
                };
                const response = await axios.post(`http://localhost:8080/api/create-order-from-design`, object);
                if (!response.data || response.status === 204) {
                    toast.error("Failed to fetch order");
                } else {
                    setOrderId(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const fetchOrder = async () => {
        if (orderId !== null) {
            try {
                const response = await axios.get(`http://localhost:8080/api/sales/order-select/${orderId}`);
                if (!response.data || response.status === 204) {
                    console.log("ERROR");
                } else {
                    setOrder(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        fetchOrder();
    }, [orderId])

    useEffect(() => {
        createOrder();
    }, [])

    if (order === null) {
        return (
            <>
                Processing order
            </>
        )
    } else {
        console.log(order);
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
                                                <li key={material.material.materialId}>
                                                    {material.material.materialName} - {material.weight} carat
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className='list-group-item'>
                                <ul className='list-group'>
                                    <li className='list-group-item'>Diamond price: {formatPrice(order.odiamondPrice)}</li>
                                    <li className='list-group-item'>Material price: {formatPrice(order.omaterialPrice)}</li>
                                    <li className='list-group-item'>Total price: {formatPrice(order.totalAmount)}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        )
    }

}
export default CompleteProduct;