import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { useNavigate, Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import styles from '/src/css/RequestPage.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableComponent = ({ requests }) => {

    const navigate = useNavigate();

    return (
        <table className={`${styles['request-table']}`}>
            <thead>
                <tr id={`${styles['table-head']}`}>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Budget/Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {requests.map(request => (
                    <tr key={request.id}>
                        <td>{request.id}</td>
                        <td>{request.customer.name}</td>
                        <td>{formatDate(request.orderDate)}</td>
                        <td>{request.totalAmount !== null ? `Price: ${formatPrice(request.totalAmount)}` : `Budget: ${formatPrice(request.budget)}`}</td>
                        <td>{request.status}</td>
                        <td>
                            <button onClick={() => navigate(`/staff/request/select/${request.id}`)} className='btn'>Manage</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const RequestPage = () => {

    const [requests, setRequests] = useState([]);

    const fetchData = async () => {

        let response = null;

        switch (sessionStorage.getItem("staff_type")) {
            case "sale":
                console.log(`GET http://localhost:8080/api/sales/orders/${sessionStorage.getItem("staff_id")}`)
                response = await axios.get(`http://localhost:8080/api/sales/orders/${sessionStorage.getItem("staff_id")}`);
                break;
            case "manage":
                response = await axios.get(`http://localhost:8080/api/manager/orders`);
                break;
            case "design":
                response = await axios.get(`http://localhost:8080/api/designs/orders/${sessionStorage.getItem("staff_id")}`);
                break;
            case "produce":
                response = await axios.get(`http://localhost:8080/api/production/orders/${sessionStorage.getItem("staff_id")}`);
                break;
            default:
                response = axios.get(`http://localhost:8080/api/order/all`);
        }

        if (response.status === 204) {
            toast.info(`No available requests`);
        } else {
            setRequests(response.data);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <h1 className='fw-bold'>Custom Requests</h1>
            <TableComponent requests={requests} />
        </div>
    )
}

export default RequestPage;