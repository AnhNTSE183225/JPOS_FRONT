import { Link, useNavigate } from 'react-router-dom';
import styles from '/src/css/BuildYourOwnNav.module.css';
import { useState, useEffect } from 'react';
import { formatPrice } from '../helper_function/ConvertFunction';
import {toast} from 'sonner';

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

    const handleComplete = () => {
        if (sessionStorage.getItem('designId') == null) {
            toast.error(`You haven't selected a design!`);
            navigate("/build-your-own/choose-setting");
        } else if (sessionStorage.getItem('diamonds') == null || sessionStorage.getItem('diamonds').length == 0) {
            toast.error(`You haven't chosen any diamonds!`);
            navigate("/build-your-own/choose-diamond");
        } else if (sessionStorage.getItem('diamonds').split(',').length !== Number(sessionStorage.getItem('quantity'))) {
            toast.error(`You haven't chosen enough diamonds!`);
            navigate("/build-your-own/choose-diamond");
        } else {
            navigate("/build-your-own/complete-product");
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
            <button onClick={() => sessionStorage.clear()}>Clear</button>
            <div className="row">
                <div className={`col ${styles['col']}`} onClick={() => navigate("/build-your-own/choose-setting")}>
                    <div className="col-1">
                        <h3>1.</h3>
                    </div>
                    {
                        designId == null
                            ? <>
                                Choose a setting
                            </>
                            : <>
                                <div className="col">
                                    <div className="container-fluid">
                                        <div className="row fw-bold">
                                            {sessionStorage.getItem('designName')}
                                        </div>
                                        <div className="row">
                                            <b className='text-danger'>{sessionStorage.getItem('designPrice')}</b>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-2 ${styles['image-col']} `}>
                                    <img src={sessionStorage.getItem('designImage')} alt="" />
                                </div>
                            </>
                    }
                </div>
                <div className={`col ${styles['col']}`} onClick={() => navigate("/build-your-own/choose-diamond")}>
                    <div className="col-1">
                        <h3>2.</h3>
                    </div>
                    {
                        diamonds === null
                            ? <>
                                Choose diamonds
                            </>
                            : <>
                                {sessionStorage.getItem('diamondImages').split(',').map(image => (
                                    <div key={image} className={`col-2 me-2 ${styles['image-col']}`}>
                                        <img crossOrigin='anonymous' className='img-fluid' src={image} alt="" />
                                    </div>
                                ))}
                                <div className="col">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <b>Q: {sessionStorage.getItem('diamonds').split(',').length}/{sessionStorage.getItem('quantity')}</b>
                                        </div>
                                        <div className="row">
                                            <b>Total: <span className='text-danger'>{formatPrice(calculateTotal())}</span></b>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
                <div className={`col ${styles['col']}`} onClick={handleComplete}>
                    <div className="col-1">
                        <h3>3.</h3>
                    </div>
                    <div className="col fw-bold fs-4">
                        Complete product
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuildYourOwnNav;
