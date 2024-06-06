import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PendingDesign = ({ order }) => {

    const navigate = useNavigate();

    const [note, setNote] = useState();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (accepted) => {
        try {
            setProcessing(true);
            let response = null;
            if (accepted) {
                response = await axios.post(`http://localhost:8080/api/customers/${order.id}/acceptDesign`);
            } else {
                response = await axios.post(`http://localhost:8080/api/customers/${order.id}/refuseDesign`, {
                    note: note
                });
            }
            if (!response.data || response.status === 204) {
                toast.error("Something went wrong, failed to submit");
            } else {
                setProcessing(false);
                console.log(response.data);
                navigate("/profile");
            }
        } catch (error) {
            setProcessing(false);
            console.log(error);
        }
    }

    return (
        <>
            {
                processing
                    ? <div className="spinner-border text-secondary" role="status">
                    </div>
                    : <></>
            }
            <div className="container-fluid p-3">
                <div className="row">
                    <h1>A design staff has sent you a design</h1>
                </div>
                <div className="row mb-3">
                    <div className="col-md-5 mx-auto">
                        <img crossOrigin='anonymous' className="img-fluid" src={order.modelFile} alt="" />
                    </div>
                </div>
                <div className="col mb-3">
                    <textarea placeholder='Leave notes....' style={{ resize: "none" }} maxLength={255} className="form-control" onChange={(e) => setNote(e.target.value)} rows='5' cols='30' aria-label="description"></textarea>
                </div>
                <div className='row  mb-3'>
                    <div className="col">
                        <button onClick={() => handleSubmit(true)} className='btn btn-success w-100'>Accept</button>
                    </div>
                    <div className="col">
                        <button onClick={() => handleSubmit(false)} className='btn btn-danger w-100'>Decline</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingDesign;