import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const WaitManager = ({order}) => {

    return (
        <>
            <Toaster position="top-center" richColors expand={true} />
            <div className='container'>
                
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
                    <WaitSaleStaff order={order}/>
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