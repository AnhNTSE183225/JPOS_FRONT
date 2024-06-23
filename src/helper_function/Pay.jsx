import axios from 'axios';

export const makePayment = async (amount) => {
    try {
        console.log(amount);
        const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/payment/vn-pay?amount=${amount}`);
        window.location.replace(response.data.data.paymentUrl);
    } catch (error) {
        console.log(error);
    }
}