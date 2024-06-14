import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/src/css/DiamondCard.module.css';
import { formatPrice } from '../../helper_function/ConvertFunction';

const DiamondCard = ({ diamond, isSelected, onClick }) => {
    const navigate = useNavigate();

    return (
        <div className={`${styles.card} ${isSelected ? styles.selected : ''}`} onClick={() => onClick(diamond.diamondId, !isSelected)}>
            <img crossOrigin='anonymous' src={diamond.image} className={styles.cardImgTop} alt="diamond" />
            <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>{diamond.diamondName}</h5>
                
                <div className="row" style={{textTransform: 'capitalize'}}>
                    <div className="col">
                        <b>Shape:</b> {diamond.shape} <br />
                        <b>Og:</b> {diamond.origin} <br />
                        <b>Color:</b> {diamond.color} <br />
                    </div>
                    <div className="col">
                        <b>Clarity:</b> {diamond.clarity} <br />
                        <b>Cut:</b> {diamond.cut} <br />
                        <b>Carat:</b> {diamond.caratWeight}
                    </div>
                </div>

                <div className={styles.cardStatus}>
                    {isSelected ? 'Selected' : 'Select'}
                </div>
            </div>
        </div>
    );
}

export default DiamondCard;
