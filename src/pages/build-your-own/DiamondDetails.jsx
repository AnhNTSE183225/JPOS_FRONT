import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '/src/css/DiamondDetails.module.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faTruckFast } from '@fortawesome/free-solid-svg-icons';

const DiamondDetails = () => {
    const { diamondId } = useParams();
    const [diamond, setDiamond] = useState(null);

    useEffect(() => {
        fetchDiamond();
    }, [diamondId]);

    const fetchDiamond = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamonds/${diamondId}`);
            if (!response.data || response.status === 204) {
                console.error(`Cannot find diamond with ID ${diamondId}`);
            } else {
                console.log('Fetched Diamond Data:', response.data);
                setDiamond(response.data);
            }
        } catch (error) {
            console.error('An error occurred while fetching the diamond data:', error);
        }
    };

    if (diamond === null) {
        return <div>Loading...</div>;
    } else {
        console.log('Diamond:', diamond);
        return (
            <div className={styles.container}>
                <div className={styles.imageSection}>
                    <img src={diamond.image } alt="Diamond" className={styles.diamondImage} />
                </div>
                <div className={styles.detailsSection}>
                    <h1 className={styles.diamondTitle}>{diamond.caratWeight } Carat Round Diamond</h1>
                    <div className={styles.priceSection}>
                        <p className={styles.price}>1000${diamond.price }</p>
                    </div>
                    <div className={styles.specs}>
                        <h4>Diamond Details</h4>
                        <p><strong>Shape:</strong> {diamond.shape }</p>
                        <p><strong>Cut:</strong> {diamond.cut }</p>
                        <p><strong>Color:</strong> {diamond.color }</p>
                        <p><strong>Clarity:</strong> {diamond.clarity }</p>
                        <p><strong>Carat Weight:</strong> {diamond.caratWeight }</p>
                    </div>
                    <div className={styles["payment-options"]}>
                        <div className={styles.option}>
                            Flexible Payment Options: 3 Interest-Free Payments of ${(diamond.price / 3).toFixed(2)}
                        </div>
                        <div className={styles.option}>
                            <FontAwesomeIcon icon={faRightLeft} style={{ marginRight: '8px' }} />
                            Free Returns: Our commitment to you does not end at delivery. We offer free returns (U.S and Canada) to make your experience as easy as possible.
                        </div>
                        <div className={styles.option}>
                            <FontAwesomeIcon icon={faTruckFast} style={{ marginRight: '8px' }} />
                            Free Shipping: We're committed to making your entire experience a pleasant one, from shopping to shipping.
                        </div>
                    </div>
                    <div className={styles.buttonsSection}>
                        <button className={styles.primaryButton}>Select this diamond</button>
                        <button className={styles.secondaryButton}>Consult an expert</button>
                    </div>
                 
                </div>
            </div>
        );
    }
};

export default DiamondDetails;
