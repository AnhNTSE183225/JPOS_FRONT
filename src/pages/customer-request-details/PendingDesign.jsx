import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../helper_function/ConvertFunction';
import empty_image from '/src/assets/empty_image.jpg';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '/src/css/PendingDesign.module.css';

const PendingDesign = ({ order }) => {

    const navigate = useNavigate();

    const [note, setNote] = useState();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (accepted) => {
        try {
            setProcessing(true);
            let response = null;
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            if (accepted) {
                response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/customers/${order.id}/acceptDesign`, {headers});
            } else {
                response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/customers/${order.id}/refuseDesign`, {
                    note: note
                },{headers});
            }
            if (!response.data || response.status === 204) {
                toast.error("Something went wrong, failed to submit");
            } else {
                setProcessing(false);
                navigate("/profile");
            }
        } catch (error) {
            setProcessing(false);
            console.log(error);
        }
    }

    //--------------------------------IMAGE THING---------------------------------------------------
    const [activeProductionImage, setActiveProductionImage] = useState(0);

    const handleProductionImageMove = (direction) => {
        if (direction) {
            setActiveProductionImage(n => n + 1);
        } else {
            setActiveProductionImage(n => n - 1);
        }
    }
    //--------------------------------IMAGE THING---------------------------------------------------

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
                        {
                            order.modelFile === null
                                ? <>
                                    <img className='img-fluid' src={order.modelFile === null ? empty_image : order.modelFile} alt="" style={{ width: '100%', height: 'auto' }} />
                                </>
                                : <>
                                    <div className="position-relative">
                                        <button onClick={() => handleProductionImageMove(false)} disabled={activeProductionImage == 0} hidden={order.modelFile.split("|").length <= 0} className={`${styles['image-btn']} position-absolute start-0 top-50`}><FontAwesomeIcon icon={faCaretLeft} /></button>
                                        <button onClick={() => handleProductionImageMove(true)} disabled={activeProductionImage == order.modelFile.split("|").length - 1} hidden={order.modelFile.split("|").length <= 0} className={`${styles['image-btn']} position-absolute end-0 top-50`}><FontAwesomeIcon icon={faCaretRight} /></button>
                                        {
                                            order.modelFile.split("|").map((image, index) => {
                                                if (index == activeProductionImage) {
                                                    return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto' }} />
                                                } else {
                                                    return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto', display: 'none' }} />
                                                }
                                            })
                                        }
                                    </div>
                                </>
                        }
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