import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { formatDate, formatPrice } from '/src/helper_function/ConvertFunction.jsx'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchDiamondPrice, fetchMaterialPrice } from '../helper_function/FetchPriceFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faRing, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/RequestPage.module.css';

const CustomerOrdersPage = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/all`);
                if (!response.data || response.status == 204) {
                    toast.info(`You currently have no orders`);
                } else {
                    let list = response.data;
                    list = list.filter(order => order.customer.customerId.toString() == sessionStorage.getItem('customer_id'));
                    if (list == null || list.length == 0) {
                        toast.info(`You currently have no orders`);
                    } else {
                        setOrders(list);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    if (orders.length > 0) {
        return (
            <>
                <div>
                    <table className={`${styles['request-table']}`}>
                        <thead>
                            <tr id={`${styles['table-head']}`}>
                                <th>Order ID</th>
                                <th>Product Name</th>
                                <th>Product Type</th>
                                <th>Order Date</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.product !== null && order.product.productName !== null ? order.product.productName : `Description: ${order.description}`}</td>
                                    <td>{order.product !== null && order.product.productType != null ? order.product.productType : 'TBD'}</td>
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td>{order.totalAmount != null ? formatPrice(order.totalAmount) : 'TBD'}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div>No orders.</div>
            </>
        )
    }

}

export default CustomerOrdersPage;