import { Link, useNavigate } from 'react-router-dom';
import styles from '/src/css/BuildYourOwnNav.module.css';
import { useState, useEffect } from 'react';

const BuildYourOwnNav = () => {

    const navigate = useNavigate();
    const [designId, setDesignId] = useState(null);
    const [diamonds, setDiamonds] = useState(null);

    useEffect(() => {
        setDesignId(sessionStorage.getItem('designId'));
    }, [sessionStorage.getItem('designId')]);

    useEffect(() => {
        setDiamonds(sessionStorage.getItem('diamonds'));
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
                                <div className={`col`}>
                                    <div className="container-fluid">
                                        <div className="row">
                                            {sessionStorage.getItem('designName')}
                                        </div>
                                        <div className="row">
                                            <b>{sessionStorage.getItem('designPrice')}</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <img className='img-fluid' src={sessionStorage.getItem('designImage')} alt="" />
                                </div>
                            </>
                    }
                </div>
                <div className={`col ${styles['col']}`}>
                    {
                        diamonds == null
                            ? <>
                                2. Choose diamonds
                            </>
                            : <>
                            </>
                    }
                </div>
                <div className={`col ${styles['col']}`}>

                </div>
            </div>
        </div>
    );
}

export default BuildYourOwnNav;
