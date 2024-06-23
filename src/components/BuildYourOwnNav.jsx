import { Link, useNavigate } from 'react-router-dom';
import styles from '/src/css/BuildYourOwnNav.module.css';
import { useState, useEffect } from 'react';
import { formatPrice } from '../helper_function/ConvertFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';

const BuildYourOwnNav = () => {

    const navigate = useNavigate();
    const [designId, setDesignId] = useState(null);
    const [diamonds, setDiamonds] = useState(null);

    const calculateTotal = () => {
        if (sessionStorage.getItem('diamondPrices') === null) {
            return 0;
        } else {
            let total = 0;
            for (const price of sessionStorage.getItem('diamondPrices').split(',')) {
                total += Number(price);
            }
            return total;
        }
    }

    const checkCompletion = () => {
        if (sessionStorage.getItem('designId') == null) {
            return false;
        } else if (sessionStorage.getItem('diamonds') == null || sessionStorage.getItem('diamonds').length == 0) {
            return false;
        } else if (sessionStorage.getItem('diamonds').split(',').length !== Number(sessionStorage.getItem('quantity'))) {
            return false;
        } else {
            return true;
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('designId') !== null) {
            setDesignId(sessionStorage.getItem('designId'));
        } else {
            setDesignId(null);
        }
    }, [sessionStorage.getItem('designId')]);

    useEffect(() => {
        if (sessionStorage.getItem('diamonds') !== null && sessionStorage.getItem('diamonds').length > 0) {
            setDiamonds(sessionStorage.getItem('diamonds'));
        } else {
            setDiamonds(null);
        }
    }, [sessionStorage.getItem('diamonds')]);

    return (
        <div className="container mt-4" id={styles['build-your-own-nav']} style={{ paddingBottom: '5vh' }}>
            <div className="row flex-nowrap">
                <div className={`col-lg-4 ${styles['col']}`} onClick={() => navigate("/build-your-own/choose-setting")}>
                    <div className="col-1">
                        <h2>1.</h2>
                    </div>
                    {
                        designId == null
                            ? <>
                                <p className='fs-5'>Choose a setting</p>
                            </>
                            : <>
                                <div className="col">
                                    <div className="container-fluid">
                                        <div className={`"row fw-bold " ${styles['text-ellipsis']}`}>
                                            {sessionStorage.getItem('designName')}
                                        </div>
                                        <div className="row justify-content-around">
                                            <b className='text' style={{ color: '#48AAAD' }}>{sessionStorage.getItem('designPrice')}</b>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-2 ${styles['image-col']} `}>
                                    <Link onClick={(e) => e.stopPropagation()} to={`/build-your-own/setting-details/${sessionStorage.getItem('designId')}`}>
                                        <img crossOrigin='anonymous' src={sessionStorage.getItem('designImage')} alt="" />
                                    </Link>
                                </div>
                            </>
                    }
                </div>
                <div className={`col-lg-4 ${styles['col']}`} onClick={() => navigate("/build-your-own/choose-diamond")}>
                    <div className="col-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h2>2.</h2>
                    </div>
                    {
                        diamonds === null
                            ? <>
                                <p className='fs-5'>Choose diamonds</p>
                            </>
                            : <>
                                {sessionStorage.getItem('diamondImages').split(',').map((image, index) => (
                                    <div key={index} className={`col-2 me-2 ${styles['image-col']}`}>
                                        <Link onClick={(e) => e.stopPropagation()} to={`/build-your-own/diamond-details/${sessionStorage.getItem('diamonds').split(',')[index]}`}>
                                            <img crossOrigin='anonymous' className='img-fluid' src={image} alt="" />
                                        </Link>
                                    </div>
                                ))}
                                <div className="col">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <b>{sessionStorage.getItem('diamonds').split(',').length}/{sessionStorage.getItem('quantity')}</b>
                                        </div>
                                        <div className="row">
                                            <b>Total: <span className='text' style={{ color: '#48AAAD' }}>{formatPrice(calculateTotal())}</span></b>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
                {
                    checkCompletion()
                        ? <div className={`col-lg-4 ${styles['col']} ${styles['final-button']}`} onClick={() => navigate("/build-your-own/complete-product")}>
                            <p className='fw-bolder m-0 fs-5' >Proceed to checkout</p>
                            <FontAwesomeIcon icon={faRightLong} id={`${styles['icon']}`} />
                        </div>
                        : <div className={`col ${styles['col']}`}>
                            <div className="col-1">
                                <h2>3.</h2>
                            </div>
                            <div className="col fs-5">
                                Complete product
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}

export default BuildYourOwnNav;
