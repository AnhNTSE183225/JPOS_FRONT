import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import ProductCard from './ProductCard';
import styles from '/src/css/ChooseSettings.module.css';
import useDocumentTitle from '../../components/Title';

const ChooseSetting = () => {

    const navigate = useNavigate();
    const [designList, setDesignList] = useState([]);

    useDocumentTitle('Build Your Own Ring');
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-designs/all`);
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
                <NavigationBar />
                <div className={`${styles.container} container`}>
                <div className="diamond-finder text-center mb-3">
                    <h3 className='ms-3' style={{ textAlign: 'center' }}>Ring Settings</h3>
                    <p style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>Search hundreds of engagement ring settings to find the perfect ring. Styles range from solitaire to vintage-inspired to everything in between.</p>
                </div>
                    {designList.length > 0 ? (
                        <div className={`${styles.content} row`}>
                            {designList.map(design => (
                                <div key={design.productDesignId} className="col-md-4 col-lg-3 mb-4">
                                    <ProductCard design={design} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>Loading...</div>
                    )}
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