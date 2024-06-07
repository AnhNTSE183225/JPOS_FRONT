import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {Toaster, toast} from 'sonner';
import styles from '/src/css/HistoryPage.module.css';
import axios from 'axios';

const TableComponent = () => {

    const [orders, setOrders] = useState([]);

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

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <table>
            <thead>
                <tr className={`${styles['table-head']}`}>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Paid</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer.name}</td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td>{formatPrice(order.totalAmount)}</td>
                        <td>Completed</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const HistoryPage = () => {
    return (
        <div className={`${styles['history-page']}`}>
            <Toaster position='top-center' richColors expand={true} />
            <h1 className='fw-bold'>History</h1>
            <TableComponent />
        </div>
    );
}

export default HistoryPage;