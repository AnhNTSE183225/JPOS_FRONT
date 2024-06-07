import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import PendingDesign from './customer-request-details/PendingDesign';
import WaitCustomer from './customer-request-details/WaitCustomer';
import axios from 'axios';

const CustomerRequestDetailsPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [orderList, setOrderList] = useState([]);

    const fetchOrder = async () => {

        //console.log(`GET http://localhost:8080/api/customers/${sessionStorage.getItem('customer_id')}/orders`);
        const response = await axios.get(`http://localhost:8080/api/customers/${sessionStorage.getItem('customer_id')}/orders`);
        if (!response.data || response.status === 204) {
            toast.error("No data found");
        }
        setOrderList(response.data);
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    useEffect(() => {
        if(currentIndex >= 0 && currentIndex < orderList.length) {
            setCurrentOrder(orderList[currentIndex]);
        }
    },[currentIndex])

    useEffect(() => {
        //console.log(orderList);
        if (orderList.length > 0) {
            setCurrentOrder(orderList[currentIndex]);
        }
    }, [orderList])

    return (
        <>
            <div className='container'>
                <div className="row p-3">
                    <div className='col-md-6'>
                        <button onClick={() => setCurrentIndex(val => val - 1)} disabled={currentIndex <= 0} className='btn btn-primary w-100'>
                            Previous
                        </button>
                    </div>
                    <div className='col-md-6'>
                        <button onClick={() => setCurrentIndex(val => val + 1)} disabled={currentIndex >= orderList.length-1} className='btn btn-primary w-100'>
                            Next
                        </button>
                    </div>
                </div>
                <div className='row'>
                    {currentOrder != null && currentOrder.status == 'wait_customer' ? <WaitCustomer order={currentOrder} /> : <></>}
                    {currentOrder != null && currentOrder.status == 'pending_design' ? <PendingDesign order={currentOrder} /> : <></>}
                </div>
            </div>
        </>
    )

}

export default CustomerRequestDetailsPage;