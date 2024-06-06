import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Context } from '../FrameBuildYourOwn';
import axios from 'axios';

const ChooseSetting = () => {

    const navigate = useNavigate();
    const [productSetting, setProductSetting] = useContext(Context);
    const [designList, setDesignList] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/api/product-designs/all`);
            if (!response.data || response.status === 204) {
                toast.error("NO items in database");
            } else {
                //console.log(response.data);
                setDesignList(response.data);
            }

        } catch (error) {
            toast.error("Error, cannot fetch design list");
        }
    }

    if (designList.length > 0) {
        return (
            <>
                <Toaster position="top-center" richColors expand={true} />
                <div className='container-fluid'>
                    <Toaster position="top-center" richColors expand={true} />
                    <div className='row my-3 px-5'>
                        {designList.map(design => (
                            <div key={design.productDesignId} className="col-md-3 mb-4">
                                <div className="card h-100 d-flex flex-column">
                                    <img crossOrigin='anonymous' src={design.designFile} className="card-img-top" alt="..." />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{design.designName} - {design.designType}</h5>
                                        <button onClick={() => navigate(`/setting-details/${design.productDesignId}`)} className='btn btn-primary'>Click me</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <Toaster position="top-center" richColors expand={true} />
                Loading...
            </>
        )
    }
}

export default ChooseSetting;