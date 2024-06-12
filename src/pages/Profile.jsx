import React from 'react';
import { useNavigate } from "react-router-dom";
import image from '/src/assets/logoProfile.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow" style={{ borderRadius: '15px', maxWidth: '400px', width: '100%' }}>
                <div className="card-body text-center">
                    <div className="mt-3 mb-4">
                        <img src={image} className="rounded-circle img-fluid" style={{ width: '100px' }} alt="Profile" />
                    </div>
                    <h4 className="mb-2 text-uppercase">{sessionStorage.getItem('name')}</h4>
                    <p className="text-muted mb-4">Customer</p>
                    <div className="d-flex flex-column">
                        <button 
                            type="button" 
                            className="btn btn-lg mb-2" 
                            style={{ backgroundColor: '#48AAAD', color: '#fff' }}
                            onClick={() => navigate("/profile/your-orders")}
                        >
                            View Order Detail
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-lg" 
                            style={{ backgroundColor: '#48AAAD', color: '#fff' }}
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
