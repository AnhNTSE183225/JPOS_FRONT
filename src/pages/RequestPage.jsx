import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { useNavigate, Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import styles from '/src/css/RequestPage.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDocumentTitle from '../components/Title';

const TableComponent = ({ requests }) => {

    const navigate = useNavigate();
    useDocumentTitle("Custom Requests");

    return (
        <table className={`${styles['request-table']}`}>
            <thead>
                <tr id={`${styles['table-head']}`}>
                    <th>Order ID</th>
                    <th className='col-2'>Customer Name</th>
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
    const staff = JSON.parse(sessionStorage.getItem('staff'));

    const fetchData = async () => {

        let response = null;
        const headers = {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }

        switch (staff.staffType) {
            case "sale":
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/sales/orders/${staff.staffId}`,{headers});
                break;
            case "manage":
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/manager/orders`,{headers});
                break;
            case "design":
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/designs/orders/${staff.staffId}`,{headers});
                break;
            case "produce":
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/production/orders/${staff.staffId}`,{headers});
                break;
            default:
                response = axios.get(`${import.meta.env.VITE_jpos_back}/api/order/all`,{headers});
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