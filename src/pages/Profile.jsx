import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useDocumentTitle from '../components/Title';
import styles from '../css/Profile.module.css';
import { toast } from 'sonner';
import axios from 'axios';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [customer,setCustomer] = useState(JSON.parse(sessionStorage.getItem('customer')));

    useDocumentTitle("My Account");

    const saveChanges = async () => {
        if (customer.name.length > 0 &&
            customer.email.length > 0 &&
            customer.address.length > 0
        ) {
            try {
                console.log(`PUT ${import.meta.env.VITE_jpos_back}/api/update?customerId=${sessionStorage.getItem('customer_id')}&email=${email}&name=${name}&address=${address}`);
                const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/update?customerId=${sessionStorage.getItem('customer_id')}&email=${email}&name=${name}&address=${address}`);
                if (!response.data || response.status == 204) {
                    toast.error(`Error updating profile`);
                } else {
                    setCustomer(response.data);
                    sessionStorage.setItem('customer',JSON.stringify(response.data));
                    toast.success(`Changes saved`);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.info(`Fields can't be empty`);
        }
    }

    return (
        <div className={`${styles['account-page']}`}>
            <section className={`${styles['row']}`}>
                <img className={`img-fluid ${styles['img-slide']}`} src="https://www.withclarity.com/cdn/shop/files/Diamond-banner_1920x.jpg?v=1695385583" alt="choose_settings" />
                <div className={`${styles[`overlay-content`]}`}>
                    <p className='fw-light text-center'>MY ACCOUNT</p>
                </div>
            </section>
            <div className={`${styles[`form-container`]}`}>
                <div className={`row gap-3`}>
                    <p className='mb-5 fw-light' style={{ fontSize: '2rem' }}>My Personal Details</p>
                    <div className="col p-0">
                        <div className="form-floating">
                            <input
                                type="name"
                                className="form-control"
                                id="floatingInputGrid"
                                value={customer.name}
                                onChange={(e) => setCustomer(c => ({...c,name: e.target.value}))}
                            />
                            <label htmlFor="floatingInputGrid">Name</label>
                        </div>
                    </div>
                    <div className="col p-0">
                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInputGrid"
                                value={email}
                                onChange={(e) => setCustomer(c => ({...c,email: e.target.value}))}
                            />
                            <label htmlFor="floatingInputGrid">Email address</label>
                        </div>
                    </div>
                    <div className="col p-0">
                        <div className="form-floating">
                            <input
                                type="address"
                                className="form-control"
                                id="floatingInputGrid"
                                value={address}
                                onChange={(e) => setCustomer(c => ({...c,address: e.target.value}))}
                            />
                            <label htmlFor="floatingInputGrid">Address</label>
                        </div>
                    </div>

                </div>

                <div className='row mt-5'>
                    <button
                        type="button"
                        className={`btn btn-md ${styles['save-change']}`}
                        onClick={saveChanges}
                    >
                        Save Changes
                    </button>
                </div>
                <div className="row mt-5 gap-3">
                    <div className={`col ${styles['button-custom']}`} onClick={() => navigate("/profile/your-orders")} >
                        View Order Details
                    </div>
                    <div className={`col ${styles['button-custom']}`} onClick={() => navigate("/profile/your-request")}>
                        View Request
                    </div>
                </div>
            </div>


        </div >
    );
}

export default ProfilePage;