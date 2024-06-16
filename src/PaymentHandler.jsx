import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { makePayment } from "./helper_function/Pay";

const PaymentHandler = () => {
    const location = useLocation();

    useEffect(() => {
        const callback = async () => {
            console.log(`GET http://localhost:8080/api/payment/vn-pay-callback?${location.search}`);
            const response = await axios.get(`http://localhost:8080/api/payment/vn-pay-callback?${location.search}`);
            console.log(response.data);
        }

        callback();
    }, [])

    return (
        <>
            <button onClick={makePayment}>
                Click me
            </button>
            <h1>Payment processing</h1>
        </>
    )
}

export default PaymentHandler;