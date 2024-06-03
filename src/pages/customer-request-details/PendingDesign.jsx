import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React, { useState, useEffect } from 'react';
import img from '../../assets/test-image.jpg'

const PendingDesign = ({ order }) => {

    const [note, setNote] = useState();

    return (
        <>
            <div className="container-fluid p-3">
                <div className="row">
                    <h1>A design staff has sent you a design</h1>
                </div>
                <div className="row justify-content-center mb-3">
                    <div className="col-md-5 ">
                        <img crossOrigin='anonymous' src={img} className='img-fluid' />
                    </div>
                </div>
                <div className="row mb-3">
                    <textarea placeholder='Leave notes....' style={{ resize: "none" }} maxLength={255} className="form-control" onChange={(e) => setNote(e.target.value)} rows='5' cols='30' aria-label="description"></textarea>
                </div>
                <div className='row mb-3'>
                    <button className='btn btn-success' >Accept</button>
                    <button className='btn btn-danger'>Decline</button>
                </div>
            </div>
        </>
    )
}

export default PendingDesign;