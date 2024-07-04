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
    const [activeCategory, setActiveCategory] = useState(null);

    useDocumentTitle('Build Your Own Ring');
    useEffect(() => {
        if (sessionStorage.getItem('customer') !== null) {

            fetchData();
        } else {
            toast.info(`Please log in to continue`);
            navigate('/login');
            return;
        }
    }, [activeCategory])

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-designs/all`, { headers });
            if (!response.data || response.status === 204) {
                toast.error("NO items in database");
            } else {
                //console.log(response.data);
                if (activeCategory == null) {
                    setDesignList(response.data);
                } else {
                    setDesignList(response.data.filter(design => design.designType === activeCategory))
                }
            }

        } catch (error) {
            toast.error("Error, cannot fetch design list");
        }
    }

    return (
        <>
            <NavigationBar />
            <div className={`${styles.container} container`}>
                {/* <div className="diamond-finder text-center mb-3">
                        <h3 className='ms-3' style={{ textAlign: 'center' }}>Ring Settings</h3>
                        <p style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>Search hundreds of engagement ring settings to find the perfect ring. Styles range from solitaire to vintage-inspired to everything in between.</p>
                    </div> */}
                <div className="container-fluid mb-5">
                    <div className={`row text-center ${styles['category-selector']}`}>
                        <div className={`col ${activeCategory == null ? styles['active'] : ''}`} onClick={() => setActiveCategory(null)}>
                            ALL
                        </div>
                        <div className={`col ${activeCategory == 'Necklace' ? styles['active'] : ''}`} onClick={() => setActiveCategory('Necklace')}>
                            NECKLACES & PENDANTS
                        </div>
                        <div className={`col ${activeCategory == 'Earrings' ? styles['active'] : ''}`} onClick={() => setActiveCategory('Earrings')}>
                            EARRINGS
                        </div>
                        <div className={`col ${activeCategory == 'Bracelets' ? styles['active'] : ''}`} onClick={() => setActiveCategory('Bracelets')}>
                            BRACELETS
                        </div>
                        <div className={`col ${activeCategory == 'ring' ? styles['active'] : ''}`} onClick={() => setActiveCategory('ring')}>
                            RINGS
                        </div>
                    </div>
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
}

export default ChooseSetting;