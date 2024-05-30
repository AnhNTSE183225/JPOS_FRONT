import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { Link } from 'react-router-dom'
import {Toaster, toast} from 'sonner';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const TableComponent = ({requests}) => {
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
                            <Link to={`/profile/request/${request.id}`}>
                                <button className='btn btn-primary'>Manage</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const RequestPage = () => {

    //console.log("Is customer? ", sessionStorage.getItem('customer_id') !== null);
    //console.log("Is staff?", sessionStorage.getItem('staff_id') !== null);

    const [requests, setRequests] = useState([]);

    const fetchData = () => {
        axios.get(`http://localhost:8080/api/sales/orders/${sessionStorage.getItem('staff_id')}`)
        .then(
            response => {
                setRequests(response.data);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <>
            <Toaster position='top-center' richColors expand={true}/>
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