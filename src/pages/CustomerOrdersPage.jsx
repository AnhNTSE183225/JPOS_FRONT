import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'sonner';

const CustomerOrdersPage = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/all`);
                if (!response.data || response.status == 204) {
                    toast.info(`You currently have no orders`);
                } else {
                    let list = response.data;
                    list = list.filter(order => order.customer.customerId.toString() == sessionStorage.getItem('customer_id'));
                    if (list == null || list.length == 0) {
                        toast.info(`You currently have no orders`);
                    } else {
                        setOrders(list);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    if (orders.length > 0) {
        return (
            <>
                <div>
                    {orders[0].id}
                </div>
            </>
        )
    } else {
        return (
            <>
                <div>No orders.</div>
            </>
        )
    }

}

export default CustomerOrdersPage;