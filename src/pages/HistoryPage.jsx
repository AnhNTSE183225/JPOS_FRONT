import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { useState, useEffect } from 'react';
import styles from '/src/css/HistoryPage.module.css';
import axios from 'axios';
import OrderDetails from '../components/OrderDetails';

const HistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/all`);
                if (!response.data || response.status === 204) {
                    console.log("Can't fetch data");
                } else {
                    setOrders(response.data.filter(order => order.status === 'completed'));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className={`${styles['history-page']}`}>
            <h1 className='fw-bold'>History</h1>
            <div className='container-fluid'>
                <div className="row">
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
                            {orders.length <= 0
                                ? <tr>
                                    <td>You have no orders.</td>
                                </tr>
                                : orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.customer.name}</td>
                                        <td>{formatDate(order.orderDate)}</td>
                                        <td>{formatPrice(order.totalAmount)}</td>
                                        <td>Completed</td>
                                        <td>
                                            <button onClick={() => setCurrentOrder(order)}>
                                                View details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    {
                        currentOrder == null
                        ? <h1>Please select an order to view it's details</h1>
                        : <OrderDetails order={currentOrder}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;