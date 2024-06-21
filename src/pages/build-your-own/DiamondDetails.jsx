import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '/src/css/DiamondDetails.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faTruckFast, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { fetchDiamondPrice } from '../../helper_function/FetchPriceFunctions';
import { formatPrice } from '../../helper_function/ConvertFunction';

const DiamondDetails = () => {
    const { diamondId } = useParams();
    const [diamond, setDiamond] = useState(null);
    const [diamondPrice, setDiamondPrice] = useState(null);
    
    const navigate = useNavigate();
    

    useEffect(() => {
        if (sessionStorage.getItem('designId') === null) {
            toast.info(`Please pick a setting first`);
            navigate('/build-your-own/choose-setting');
        } else {
            fetchDiamond();
        }
    }, [diamondId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (diamond) {
            document.title = diamond.caratWeight + ' Carat ' + diamond.shape + ' ' + diamond.origin + ' Diamond';
        } else {
            document.title = 'Diamond Details';
        }
    }, [diamond]);

    const fetchDiamond = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamond/get-by-id/${diamondId}`);
            if (!response.data || response.status === 204) {
                console.error(`Cannot find diamond with ID ${diamondId}`);
            } else {
                const result = response.data;
                const diamondPrice = await fetchDiamondPrice(result.origin, result.shape, result.caratWeight, result.color, result.clarity, result.cut);
                //console.log('Fetched Diamond Data:', response.data);
                setDiamond(result);
                setDiamondPrice(diamondPrice);
                
            }
        } catch (error) {
            console.error('An error occurred while fetching the diamond data:', error);
        }
    };

    const isSelected = () => {
        if (sessionStorage.getItem('diamonds') == null) {
            return false;
        } else {
            return sessionStorage.getItem('diamonds').includes(diamondId.toString());
        }
    }

    const selectDiamond = () => {
        if (sessionStorage.getItem('diamonds') === null || sessionStorage.getItem('diamonds').length === 0) {
            sessionStorage.setItem('diamonds', diamondId);
            sessionStorage.setItem('diamondImages', diamond.image);
            sessionStorage.setItem('diamondPrices', diamondPrice);
        } else if (Number(sessionStorage.getItem('quantity')) > sessionStorage.getItem('diamonds').split(',').length) {
            sessionStorage.setItem('diamonds', sessionStorage.getItem('diamonds').concat(`,${diamondId}`));
            sessionStorage.setItem('diamondImages', sessionStorage.getItem('diamondImages').concat(`,${diamond.image}`));
            sessionStorage.setItem('diamondPrices', sessionStorage.getItem('diamondPrices').concat(`,${diamondPrice}`));
        }
        toast.info(`You have selected ${sessionStorage.getItem('diamonds').split(',').length} diamonds out of ${sessionStorage.getItem('quantity')} slots`);

        // console.log(sessionStorage.getItem('diamonds'));
        // console.log(sessionStorage.getItem('diamondImages'));
        // console.log(sessionStorage.getItem('diamondPrices'));

        navigate("/build-your-own/choose-diamond");
    }

    const removeSelection = () => {
        let diamonds = sessionStorage.getItem('diamonds').split(',');
        let images = sessionStorage.getItem('diamondImages').split(',');
        let prices = sessionStorage.getItem('diamondPrices').split(',');

        // Get the index of the diamond to be removed
        let index = diamonds.indexOf(diamondId.toString());

        if (index !== -1) {
            // Remove the diamond, image, and price from their respective lists
            diamonds.splice(index, 1);
            images.splice(index, 1);
            prices.splice(index, 1);
        }

        // Update the session storage
        sessionStorage.setItem('diamonds', diamonds.join(','));
        sessionStorage.setItem('diamondImages', images.join(','));
        sessionStorage.setItem('diamondPrices', prices.join(','));

        // console.log(sessionStorage.getItem('diamonds'));
        // console.log(sessionStorage.getItem('diamondImages'));
        // console.log(sessionStorage.getItem('diamondPrices'));

        navigate("/build-your-own/choose-diamond");
    }
    if (diamond === null || diamondPrice == null) {
        return <div>Loading...</div>;
    } else {
        
        return (
            <div className={styles.container}>
                <div className={`${styles[`imageSection`]} col-md-5`}>
                    <img src={diamond.image} alt="Diamond" className={styles.diamondImage} />
                    <div className={styles.specs}>
                        <p className={styles.specItem}><span>Shape:</span><span>{diamond.shape}</span></p>
                        <p className={styles.specItem}><span>Cut:</span><span>{diamond.cut}</span></p>
                        <p className={styles.specItem}><span>Color:</span><span>{diamond.color}</span></p>
                        <p className={styles.specItem}><span>Clarity:</span><span>{diamond.clarity}</span></p>
                        <p className={styles.specItem}><span>Carat Weight:</span><span>{diamond.caratWeight}</span></p>
                    </div>

                </div>
                <div className={`${styles[`detailsSection`]} col-md-7`}>
                    <h1 className={styles.diamondTitle}>{diamond.diamondName}</h1>
                    <div>
                        <p className={styles.price}>{formatPrice(diamondPrice)} (Diamond Price)</p>

                    </div>
                    <div className='mt-3 ms-3'>
                        <p>Flexible Payment Options: 3 Interest-Free Payments of {formatPrice(diamondPrice / 3)}</p>
                    </div>
                    <div className={styles.paymentOptions}>
                        <h3>Your order included: </h3>
                        <div className={styles.optionBox}>
                            <div className={styles.iconContainer}>
                                <FontAwesomeIcon icon={faTruckFast} />
                            </div>
                            <div className={styles.textContainer}>
                                <h3>Free Shipping</h3>
                                <p>We're committed to making your entire experience a pleasant one, from shopping to shipping.</p>
                            </div>
                        </div>
                        <div className={styles.optionBox}>
                            <div className={styles.iconContainer}>
                                <FontAwesomeIcon icon={faChartBar} />
                            </div>
                            <div className={styles.textContainer}>
                                <h3>Appraisal Included</h3>
                                <p>An appraisal is a document stating the approximate monetary value of your item. It is only available for items over $800.</p>
                            </div>
                        </div>
                        <div className={styles.optionBox}>
                            <div className={styles.iconContainer}>
                                <FontAwesomeIcon icon={faRightLeft} />
                            </div>
                            <div className={styles.textContainer}>
                                <h3>Free Returns</h3>
                                <p>Our commitment to you does not end at delivery. We offer free returns (U.S and Canada) to make your experience as easy as possible.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonsSection}>
                        <div className='row'>
                            <div className='col'>
                                {
                                    isSelected()
                                        ? <button onClick={removeSelection} className={styles.removeButton}>Remove selection</button>
                                        : <button onClick={selectDiamond} className={styles.primaryButton}>Select this diamond</button>
                                }
                            </div>
                            <div className='col'>
                                <button className={styles.secondaryButton}>Consult an expert</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default DiamondDetails;
