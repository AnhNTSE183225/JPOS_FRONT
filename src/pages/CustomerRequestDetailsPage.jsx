import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import PendingDesign from './customer-request-details/PendingDesign';
import WaitCustomer from './customer-request-details/WaitCustomer';

const CustomerRequestDetailsPage = ({ order }) => {
    const [currentOrder, setCurrentOrder] = useState(null);
    const [orderList, setOrderList] = useState([]);
    
    const fetchOrder = async () => {

        const response = await axios.get(`http://localhost:8080/api/customers/${sessionStorage.getItem('customer_id')}/orders`);
        if (!response.data || response.status === 204) {
            toast.error("No data found");
        }
        setOrderList(response.data);
    }

    useState(() => {
        fetchOrder();
    },[])

    useState(() => {
        setCurrentRequest(order[0]);
    },[orderList])

    if(currentOrder === null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }

}

export default CustomerRequestDetailsPage;