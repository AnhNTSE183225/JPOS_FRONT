import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDocumentTitle from '../components/Title';
import styles from '../css/Profile.module.css';

const ProfilePage = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    useDocumentTitle("My Account");

    return (
        <div className={`${styles['account-page']}`}>
            <section className={`${styles['row']}`}>
                <img className={`img-fluid ${styles['img-slide']}`} src="https://www.withclarity.com/cdn/shop/files/Diamond-banner_1920x.jpg?v=1695385583" alt="choose_settings" />
                <div className={`${styles[`overlay-content`]}`}>
                    <p className='fw-light text-center'>MY ACCOUNT</p>
                </div>
            </section>
            <div className={`row ${styles[`form-container`]}`}>
                <p className='mb-5 fw-light' style={{ fontSize: '2rem' }}>My Personal Details</p>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="name"
                            class="form-control"
                            id="floatingInputGrid"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label for="floatingInputGrid">Name</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="email"
                            class="form-control"
                            id="floatingInputGrid"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label for="floatingInputGrid">Email address</label>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-floating">
                        <input
                            type="address"
                            class="form-control"
                            id="floatingInputGrid"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label for="floatingInputGrid">Address</label>
                    </div>
                </div>
                <div className='row mt-4'>
                    <button
                        type="button"
                        className="btn btn-md"
                    >
                        Save Changes
                    </button>
                </div>
                <div className="row mt-5">
                    <div className={`col ${styles['button-custom']}`}>
                        <button

                            onClick={() => navigate("/profile/your-orders")}
                        >
                            View Order Detail
                        </button>
                    </div>
                    <div className={`col ${styles['button-custom']}`}>
                        <button
                            type="button"
                            className="btn btn-md"
                            onClick={() => navigate("/profile/your-request")}
                        >
                            View Request
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProfilePage;