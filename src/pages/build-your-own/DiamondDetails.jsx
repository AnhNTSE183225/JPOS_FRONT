import { useEffect, useRef, useState } from 'react';
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

    const [activeImage, setActiveImage] = useState(0)
    const [spinning, setSpinning] = useState(false);
    const isForwardDirection = useRef(false)
    const prevX = useRef(0)

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

    //Image stuff

    const handleCursorMoveImage = (e) => {
        const x = e.clientX

        if (prevX.current < x) {
            isForwardDirection.current = true;
            moveImage(true);
        } else {
            isForwardDirection.current = false;
            moveImage(false);
        }

        prevX.current = x
    }

    const moveImage = (isForward) => {
        if (diamond != null) {
            if (isForward) {
                setActiveImage(n => (n + 1) % diamond.image.split("|").slice(1).length)
            } else {
                setActiveImage(n => n == 0 ? diamond.image.split("|").slice(1).length - 1 : n - 1)
            }
        }
    }

    useEffect(() => {
        if (diamond != null) {
            const interval = setInterval(() => {
                moveImage(isForwardDirection.current)
            }, 50);

            return () => clearInterval(interval);
        }
    }, [diamond]);
    //Image stuff

    const fetchDiamond = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/diamond/get-by-id/${diamondId}`);
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
            sessionStorage.setItem('diamondImages', diamond.image.split("|")[0]);
            sessionStorage.setItem('diamondPrices', diamondPrice);
        } else if (Number(sessionStorage.getItem('quantity')) > sessionStorage.getItem('diamonds').split(',').length) {
            sessionStorage.setItem('diamonds', sessionStorage.getItem('diamonds').concat(`,${diamondId}`));
            sessionStorage.setItem('diamondImages', sessionStorage.getItem('diamondImages').concat(`,${diamond.image.split("|")[0]}`));
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
            <>
                <div className='container'>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={`${styles[`imageSection`]} col-md-6`}>
                                {
                                    spinning == false
                                        ? <img style={{ cursor: 'pointer' }} src={diamond.image.split("|")[0]} alt="Diamond" className={styles.diamondImage} onClick={() => {
                                            if (diamond.image.split("|").length > 1) {
                                                setSpinning(true);
                                            }
                                        }} />
                                        : <div style={{ cursor: 'grab' }} onClick={() => setSpinning(false)} onMouseMove={handleCursorMoveImage}>
                                            {
                                                diamond.image.split("|").length > 1
                                                    ? diamond.image.split("|").slice(1).map((link, index) => {
                                                        if (index == activeImage) {
                                                            return (
                                                                <img className={styles.diamondImage} key={index} src={link} />
                                                            )
                                                        } else {
                                                            return (
                                                                <img className={styles.diamondImage} key={index} src={link} style={{ display: "none" }} />
                                                            )
                                                        }
                                                    })
                                                    : <></>
                                            }
                                        </div>
                                }
                                <div className={styles.specs}>
                                    <p className={styles.specItem}><span>Shape:</span><span>{diamond.shape.charAt(0).toUpperCase() + diamond.shape.slice(1)}</span></p>
                                    <p className={styles.specItem}><span>Cut:</span><span>{diamond.cut}</span></p>
                                    <p className={styles.specItem}><span>Color:</span><span>{diamond.color}</span></p>
                                    <p className={styles.specItem}><span>Clarity:</span><span>{diamond.clarity}</span></p>
                                    <p className={styles.specItem}><span>Carat Weight:</span><span>{diamond.caratWeight}</span></p>
                                    <p className={styles.specItem}><span>Polish:</span><span>{diamond.polish}</span></p>
                                    <p className={styles.specItem}><span>Symmetry</span><span>{diamond.symmetry}</span></p>
                                </div>

                            </div>
                            <div className={`${styles[`detailsSection`]} col-md-6`}>
                                <p className={`fs-2 ${styles.diamondTitle}`}>{diamond.diamondName}</p>
                                <p className={`fs-4 ${styles.diamondTitle}`}>{diamond.origin.charAt(0).toUpperCase() + diamond.origin.slice(1).toLowerCase().replace("_", " ")} {diamond.caratWeight} {diamond.color}-{diamond.clarity} {diamond.cut.replace("_", " ")} Cut {diamond.shape} Diamond</p>
                                <div>
                                    <p className={`mb-3 ${styles.price}`}>{formatPrice(diamondPrice)} (Diamond Price)</p>
                                </div>
                                <div className={`mt-4 mb-5 ${styles.option}`}>
                                    <b>Flexible Payment Options:</b> 3 Interest-Free Payments of {formatPrice(diamondPrice / 3)}
                                </div>
                                <div className={`mb-3 ${styles.buttonsSection}`}>
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
                                <div className={`row ${styles.paymentOptions}`}>
                                    <p className="fs-5">Your order includes:</p>
                                    <div className={styles.optionBox}>
                                        <div className={styles.iconContainer}>
                                            <FontAwesomeIcon icon={faTruckFast} />
                                        </div>
                                        <div className={styles.textContainer}>
                                            <p><b>Free Shipping</b></p>
                                            <p>We're committed to making your entire experience a pleasant one, from shopping to shipping.</p>
                                        </div>
                                    </div>
                                    <div className={styles.optionBox}>
                                        <div className={styles.iconContainer}>
                                            <FontAwesomeIcon icon={faChartBar} />
                                        </div>
                                        <div className={styles.textContainer}>
                                            <p><b>Appraisal Included</b></p>
                                            <p>An appraisal is a document stating the approximate monetary value of your item. It is only available for items over $800.</p>
                                        </div>
                                    </div>
                                    <div className={styles.optionBox}>
                                        <div className={styles.iconContainer}>
                                            <FontAwesomeIcon icon={faRightLeft} />
                                        </div>
                                        <div className={styles.textContainer}>
                                            <p><b>Free Returns</b></p>
                                            <p>Our commitment to you does not end at delivery. We offer free returns (U.S and Canada) to make your experience as easy as possible.</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default DiamondDetails;
