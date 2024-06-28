import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { formatDate, formatPrice } from '/src/helper_function/ConvertFunction.jsx';
import axios from 'axios';
import styles from '/src/css/CustomerOrdersPage.module.css';
import OrderDetails from '../components/OrderDetails';
import useDocumentTitle from "../components/Title";
import { Link } from "react-router-dom";

const CustomerOrdersPage = () => {
    const [orders, setOrders] = useState([]);

    useDocumentTitle("Your Orders");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/order/all`);
                if (!response.data || response.status === 204) {
                    toast.info(`You currently have no orders`);
                } else {
                    let list = response.data;
                    list = list.filter(order => order.customer.customerId.toString() === sessionStorage.getItem('customer_id'));
                    if (list === null || list.length === 0) {
                        toast.info(`You currently have no orders`);
                    } else {
                        setOrders(list);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={`${styles['request-page']}`}>
            <h1 className='fw-bold text-center mb-4'>My Orders</h1>
            <div className='container-fluid'>
                <div className="row">
                    <div className={`${styles['table-container']}`}>
                        <table>
                            <thead>
                                <tr className={`${styles['table-head']}`}>
                                    <th>Order ID</th>
                                    <th>Product Name</th>
                                    <th>Product Type</th>
                                    <th>Order Date</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length <= 0 ? (
                                    <tr>
                                        <td colSpan="7">You have no orders.</td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.product && order.product.productName ? order.product.productName : `Description: ${order.description}`}</td>
                                            <td>{order.product && order.product.productType ? order.product.productType : 'TBD'}</td>
                                            <td>{formatDate(order.orderDate)}</td>
                                            <td>{order.totalAmount != null ? formatPrice(order.totalAmount) : 'TBD'}</td>
                                            <td>{order.status}</td>
                                            <td>
                                                <Link to={`/profile/your-orders/${order.id}`}>
                                                    <button className='fs-6'>
                                                        View details
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerOrdersPage;
