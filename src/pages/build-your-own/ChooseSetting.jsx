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
                <NavigationBar />
                <div className={`${styles.container} container`}>
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