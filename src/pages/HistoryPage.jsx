import { formatDate, formatPrice } from '../helper_function/ConvertFunction';
import { useState, useEffect } from 'react';
import styles from '/src/css/HistoryPage.module.css';
import axios from 'axios';
import OrderDetails from '../components/OrderDetails';
import useDocumentTitle from '../components/Title';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState(null);

    const navigate = useNavigate();

    useDocumentTitle('History');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
                const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/order/all`, {headers});
                if (!response.data || response.status === 204) {
                    console.log("Can't fetch data");
                } else {
                    setOrders(response.data.filter(order => order.status === 'completed'));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={`${styles['history-page']}`}>
            <h1 className='fw-bold'>History</h1>
            <div className='container-fluid'>
                <div className="row">
                    <div className={`${styles['table-container']}`}>
                        <table>
                            <thead>
                                <tr className={`${styles['table-head']}`}>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Date</th>
                                    <th>Paid</th>
                                    <th>Status</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length <= 0 ? (
                                    <tr>
                                        <td colSpan="6">You have no orders.</td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer.name}</td>
                                            <td>{formatDate(order.orderDate)}</td>
                                            <td>{formatPrice(order.totalAmount)}</td>
                                            <td>Completed</td>
                                            <td>
                                                <button onClick={() => navigate(`${order.id}`)} className='fs-6'>
                                                    View details
                                                </button>
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

export default HistoryPage;
