import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import complete from '/src/assets/order-complete.png';
import styles from '/src/css/OnlineThanksPage.module.css';

const OnlineThanksPage = () => {

    const navigate = useNavigate();

    const clear = () => {
        const customer_id = sessionStorage.getItem("customer_id");
        const username = sessionStorage.getItem("username");
        const name = sessionStorage.getItem("name");
        const address = sessionStorage.getItem("address");

        sessionStorage.clear();

        sessionStorage.setItem("customer_id", customer_id);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("address", address);
    }

    return (
        <>
            <div className="container text-center my-5">
                <div className="row">
                    <div className="col-12">
                        <img src={complete} alt="Complete" className="img-fluid mb-4" style={{ maxWidth: '200px' }} />
                        <h1 className="mb-3">Thank You for Your Purchase!</h1>
                        <p className="lead">Your order has been placed successfully.</p>
                        <Link to="/build-your-own/choose-setting" onClick={clear} className={`btn btn-lg mb-3 ${styles.continueShoppingButton}`}>Continue Shopping</Link>
                        <br />
                        <Link to="/profile/your-orders" className="btn btn-secondary btn-lg">View Order Details</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OnlineThanksPage;