import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import WaitSaleStaff from './request-details-components/WaitSaleStaff';
import WaitManager from './request-details-components/WaitManager';

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
                return (
                    <WaitSaleStaff order={order} />
                )
                break;
            case "wait_manager":
                return (
                    <WaitManager order={order} />
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
        toast("Something went wrong...");
    };
}

export default RequestDetailPage;
