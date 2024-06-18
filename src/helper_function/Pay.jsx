import axios from 'axios';

export const makePayment = async (amount) => {
    try {
        console.log(amount);
        const response = await axios.get(`http://localhost:8080/api/payment/vn-pay?amount=${amount}`);
        window.location.replace(response.data.data.paymentUrl);
    } catch (error) {
        console.log(error);
    }
}