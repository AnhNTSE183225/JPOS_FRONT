import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/src/css/DiamondCard.module.css';

const DiamondCard = ({ diamond, isSelected, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/setting-details/${design.productDesignId}`);
    };
    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={() => onClick(diamond.diamondId, !isSelected)}>
            <img src="https://ion.bluenile.com/sgmdirect/photoID/31377337/Diamond/21512301/nl/Diamond-round-1.02-Carat_3_first_.jpg" className={styles.cardImgTop} alt="diamond" />
            <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{diamond.diamondCode} - {diamond.diamondName}</h5>
                <p className={styles.cardText}>
                    {diamond.shape}, {diamond.origin}, {diamond.cut}, {diamond.color}, {diamond.clarity}, {diamond.caratWeight}
                </p>
                <div className={styles.cardStatus}>
                    {isSelected ? 'Selected' : 'Select'}
                </div>
            </div>
        </div>
    );
}

export default DiamondCard;
