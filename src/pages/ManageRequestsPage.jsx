import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from 'axios';
import styles from '/src/css/ManageRequestsPage.module.css';
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";
import OrderDetails from "../components/OrderDetails";
import WaitManager from '../pages/request-details-components/WaitManager';
import useDocumentTitle from "../components/Title";

const ManageRequestsPage = () => {

    const [orders, setOrders] = useState([]);
    const [queryOrders, setQueryOrders] = useState([]);
    const [activeStatus, setActiveStatus] = useState(null);
    const [activeOrder, setActiveOrder] = useState(null);
    const orderStatus = [
        'Waiting for Sales Staff',
        'Waiting for Manager',
        'Manager approved',
        'Waiting for Customer',
        'Customer Accepted',
        'Designing',
        'Pending Designs',
        'Production',
        'Delivered',
        'Waiting for Payment',
        'Completed'
    ]

    useDocumentTitle("Manage Requests");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/all`);
                if (!response.data || response.status === 204) {
                    toast.error(`Cannot fetch orders`);
                } else {
                    setOrders(response.data);
                    setQueryOrders(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        let status = null;
        switch (activeStatus) {
            case "Waiting for Sales Staff":
                status = 'wait_sale_staff';
                break;
            case "Waiting for Manager":
                status = 'wait_manager';
                break;
            case "Manager approved":
                status = 'manager_approved';
                break;
            case "Waiting for Customer":
                status = 'wait_customer';
                break;
            case "Customer Accepted":
                status = 'customer_accept';
                break;
            case "Designing":
                status = 'designing';
                break;
            case "Pending Designs":
                status = 'pending_design';
                break;
            case "Production":
                status = 'production';
                break;
            case "Delivered":
                status = 'delivered';
                break;
            case "Waiting for Payment":
                status = 'wait_payment';
                break;
            case "Completed":
                status = 'completed';
                break;
            default:
        }
        if (status !== null) {
            const query_orders = orders.filter(order => order.status == status);
            setQueryOrders(query_orders);
            setActiveOrder(null);
        } else {
            setQueryOrders(orders);
            setActiveOrder(null);
        }
    }, [activeStatus])

    return (
        <div id={`${styles['manage-request']}`} className="container-fluid">
            <div className="row my-3" id={`${styles['status-row']}`}>
                {orderStatus.map((status, index) =>
                    <div onClick={() => setActiveStatus(status)} className={`${styles['status-circle']} ${activeStatus == status ? styles['active'] : ''}`} key={index}>
                        <p className="fw-bold">{status}</p>
                    </div>
                )}
            </div>
            <div className="row my-3">
                <table>
                    <thead>
                        <tr className={`${styles['table-head']}`}>
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>Date</th>
                            <th>Price/Budget</th>
                            <th>Status</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length <= 0
                            ? <tr>
                                <td>You have no orders.</td>
                            </tr>
                            : queryOrders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer.name}</td>
                                    <td>{formatDate(order.orderDate)}</td>
                                    <td>{order.totalAmount == null ? `Budget: ${formatPrice(order.budget)}` : `Price: ${formatPrice(order.totalAmount)}`}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        <button onClick={() => setActiveOrder(order)}>
                                            View details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className="row mb-3">
                {activeOrder == null
                    ? <h1>Please select an order to view its details</h1>
                    : activeOrder.status == 'wait_manager'
                        ? <WaitManager order={activeOrder} />
                        : <OrderDetails orderId={activeOrder.id} staffType="manage" />
                }
            </div>
        </div>
    )
}

export default ManageRequestsPage;