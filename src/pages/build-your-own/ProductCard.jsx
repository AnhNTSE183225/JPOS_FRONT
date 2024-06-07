import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '/src/css/ProductCard.module.css';

const ProductCard = ({ design }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/setting-details/${design.productDesignId}`);
    };

    return (
        <div className={styles.card} onClick={handleClick}>
            <img crossOrigin='anonymous' src={design.designFile} alt={design.designName} className={styles.cardImgTop} />
            <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{design.designName}</div>
            </div>
        </div>
    );
}

export default ProductCard;
