import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const WaitSaleStaff = (order) => {

    return (
        <>
            <Toaster position="top-center" richColors expand={true} />
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='card m-3'>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control"/>
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label">Check me out</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const RequestDetailPage = () => {
    const orderId = useParams().orderId;

    const [order, setOrder] = useState(undefined);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/sales/order-select/${orderId}`)
            .then(
                response => {
                    setOrder(response.data);
                }
            ).catch(
                error => {
                    if (error.response) {
                        toast(error.response);
                    }
                    toast("Something went wrong...");
                }
            );
    }, [])

    if (order === undefined) {
        return (
            <h1>Loading...</h1>
        )
    } else {
        switch (order.status) {
            case "wait_sale_staff":
                break;
            case "wait_manager":
                return (
                    <WaitSaleStaff />
                );
            case "manager_approved":
                break;
            case "wait_customer":
                break;
            case "customer_accept":
                break;
            case "designing":
                break;
            case "pending_design":
                break;
            case "production":
                break;
            case "delivered":
                break;
            case "completed":
                break;
            default:
        }
    }
}

export default RequestDetailPage;