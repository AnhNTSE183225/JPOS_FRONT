export const makePayment = async (amount) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/payment/vn-pay?amount=${20000000}`);
        console.log(response.data.data.paymentUrl);
        window.open(response.data.data.paymentUrl, '_blank').focus();
    } catch (error) {
        console.log(error);
    }
}