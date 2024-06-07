import { formatDate, formatPrice } from '../helper_function/ConvertFunction'
import { useNavigate, Link } from 'react-router-dom'
import { Toaster, toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TableComponent = ({requests}) => {

    const navigate = useNavigate();

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
                            <button onClick={() => navigate(`/profile/request/${request.id}`)} className='btn btn-primary'>Manage</button>
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

        switch(sessionStorage.getItem("staff_type")) {
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
        <>
            <Toaster position='top-center' richColors expand={true} />
            <div className='container-fluid'>
                <div className='row'>
                    <Link to="" className="nav-link mx-lg-2">Test </Link>
                    <h1>Request Screen</h1>
                </div>
                <div className='row'>
                    <TableComponent requests={requests}/>
                </div>
            </div>
        </>
    )
}

export default RequestPage;