import React from 'react';
import complete from '/src/assets/order-complete.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '/src/css/CashThanksPage.module.css';

const CashThanksPage = () => {
    return (
        <div className="container text-center my-5">
            <div className="row">
                <div className="col-12">
                    <img src={complete} alt="Complete" className="img-fluid mb-4" style={{ maxWidth: '200px'}} />
                    <h1 className="mb-3">Thank You for Your Purchase!</h1>
                    <p className="lead">Your order has been placed successfully.</p>
                    <p className="mb-4">Our staff will contact you shortly to complete the payment process.</p>
                    <Link to="/build-your-own/choose-setting" className={`btn btn-lg mb-3 ${styles.continueShoppingButton}`}>Continue Shopping</Link>
                    <br />
                    <Link to="/profile/your-request" className="btn btn-secondary btn-lg">View Order Details</Link>
                </div>
            </div>
        </div>
    );
};

export default CashThanksPage;
