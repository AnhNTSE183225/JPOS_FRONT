import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableComponent = ({ requests }) => {
    const navigate = useNavigate();
    let disabledFields = [];

    if(sessionStorage.getItem("staff_type") == "sale") {
        disabledFields = ["wait_manager", "wait_customer", "designing", "pending_design", "production"];
    } else if(sessionStorage.getItem("staff_type") == "manage") {
        disabledFields = ["wait_sale_staff","manager_approved","wait_customer","customer_accept","designing","pending_design","production","completed","delivered"];
    } else if(sessionStorage.getItem("staff_type") == "design") {
        disabledFields = ["wait_sale_staff","wait_manager","manager_approved","wait_customer","customer_accept","pending_design","production","completed","delivered"];
    } else if(sessionStorage.getItem("staff_type") == "produce") {
        disabledFields = ["wait_sale_staff","wait_manager","manager_approved","wait_customer","customer_accept","designing","pending_design","delivered","completed"];
    }

    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Budget</th>
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
                        <td>{formatPrice(request.budget)}</td>
                        <td>{request.status}</td>
                        <td>
                            <button onClick={() => navigate(`/profile/request/${request.id}`)} disabled={disabledFields.includes(request.status)} className='btn btn-primary'>Manage</button>
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
        // const response = await axios.get(`http://localhost:8080/api/sales/orders/${sessionStorage.getItem('staff_id')}`)
        const response = await axios.get(`http://localhost:8080/api/order/all`);
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
        <>
            <Toaster position='top-center' richColors expand={true} />
            <div className='container-fluid'>
                <div className='row'>
                    <h1>Request Screen</h1>
                </div>
                <div className='row'>
                    <TableComponent requests={requests} />
                </div>
            </div>
        </>
    )
}

export default RequestPage;