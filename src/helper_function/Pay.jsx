import axios from 'axios';

export const makePayment = async (amount) => {
    try {
        console.log(amount);
        const response = await axios.get(`http://localhost:8080/api/payment/vn-pay?amount=${amount}`);
        window.open(response.data.data.paymentUrl, '_blank').focus();
    } catch (error) {
        console.log(error);
    }
}