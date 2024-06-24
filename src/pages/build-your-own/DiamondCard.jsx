import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/src/css/DiamondCard.module.css';
import { formatPrice } from '../../helper_function/ConvertFunction';

const DiamondCard = ({ diamond, isSelected, onClick }) => {
    const navigate = useNavigate();
    
    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={() => onClick(diamond.diamondId, !isSelected)}>
            <img crossOrigin='anonymous' src={diamond.image.split("|")[0]} className={styles.cardImgTop} alt="diamond" />
            <div className={styles.cardBody}>
                <p className={`fs-6  ${styles.cardTitle}`}> {diamond.origin.charAt(0).toUpperCase() + diamond.origin.slice(1).toLowerCase().replace("_"," ")} {diamond.caratWeight} {diamond.color}-{diamond.clarity} {diamond.cut.replace("_", " ")} Cut {diamond.shape} Diamond</p>
                <div className='text-center'>
                    <div className={`${styles.cardStatus}`}>
                        {isSelected ? 'Selected' : 'Select'}
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default DiamondCard;
