import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const callback = async () => {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/payment/vn-pay-callback?${location.search}&orderId=${sessionStorage.getItem('currentOrderId')}&orderType=${sessionStorage.getItem('currentOrderType')}`, {headers});
            if(response.data.data.code == '00') {
                navigate("/online-completed");
            } else {
                toast.error(`Order cancelled`);
            }
        }

        callback();
        sessionStorage.removeItem('currentOrderId');
        sessionStorage.removeItem('currentOrderType');
    }, [])

    return (
        <>
            <h1>Payment processing</h1>
        </>
    )
}

export default PaymentHandler;