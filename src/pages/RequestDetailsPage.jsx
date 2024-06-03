import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import WaitSaleStaff from './request-details-components/WaitSaleStaff';
import WaitManager from './request-details-components/WaitManager';
import ManagerApproved from './request-details-components/ManagerApproved';
import WaitCustomer from './customer-request-details/WaitCustomer';
import CustomerAccept from './request-details-components/CustomerAccept';
import Production from './request-details-components/Production';
import DesignerUploadPage from './request-details-components/DesignerUploadPage';

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
                return (
                    <ManagerApproved order={order} />
                );
                break;
            case "customer_accept":
                return (
                    <CustomerAccept order={order} />
                )
                break;
            case "designing":
                return(
                    <DesignerUploadPage order={order}/>
                );
                break;
            case "production":
                return (
                    <Production order={order} />
                )
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
