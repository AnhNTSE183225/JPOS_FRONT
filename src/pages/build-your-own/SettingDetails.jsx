import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from '/src/css/SettingDetails.module.css';

const SettingDetails = () => {
    const { designId } = useParams();
    const [productDesign, setProductDesign] = useState(null);
    const [selectedShell, setSelectedShell] = useState(null);
    const [showShellDetails, setShowShellDetails] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product-designs/${designId}`);
            if (!response.data || response.status === 204) {
                console.error('Error, cannot fetch, wrong id or something');
            } else {
                setProductDesign(response.data);
                setSelectedShell(response.data.productShellDesigns[0]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [designId]);

    const handleShellClick = (shell) => {
        setSelectedShell(shell);
    };

    const toggleShellDetails = () => {
        setShowShellDetails(!showShellDetails);
    };

    if (productDesign === null) {
        return <div className={styles.loading}>Loading...</div>;
    } else {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.imageSection}>
                        <img src="/path/to/your/ring-image.jpg" alt="Ring" />
                    </div>
                    <div className={styles.detailsSection}>
                        <h1 className={styles.title}>{productDesign.designName}</h1>
                        <h2 className={styles.subtitle}>{selectedShell ? selectedShell.shellName : "Select a Shell"}</h2>
                        <div className={styles.price}>$640 (Setting Price)</div>
                        <div className={styles.metalTypeSection}>
                            <h3 className={styles.metalTypeTitle}>Shell Designs</h3>
                            <div className={styles.shellList}>
                                {productDesign.productShellDesigns.map(shell => (
                                    <div 
                                        key={shell.productShellDesignId}
                                        className={`${styles.shellItem} ${selectedShell && selectedShell.productShellDesignId === shell.productShellDesignId ? styles.selected : ''}`}
                                        onClick={() => handleShellClick(shell)}
                                    >
                                        <span className={styles.shellLabel}>{shell.shellName}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={styles.toggleButton} onClick={toggleShellDetails}>
                                <h3>Shell Details</h3>
                                <span>{showShellDetails ? '-' : '+'}</span>
                            </div>
                            {showShellDetails && selectedShell && (
                                <div className={styles.shellDetailsSection}>
                                    <h3 className={styles.shellTitle}>{selectedShell.shellName} Details</h3>
                                    <p className={styles.shellDetail}><strong>ID:</strong> {selectedShell.productShellDesignId}</p>
                                    <p className={styles.shellDetail}><strong>Diamonds:</strong> {selectedShell.diamondQuantity}</p>
                                    <p className={styles.shellDetail}><strong>Production Price:</strong> ${selectedShell.productionPrice}</p>
                                    <p className={styles.shellDetail}><strong>Diamond Price:</strong> ${selectedShell.ediamondPrice}</p>
                                    <p className={styles.shellDetail}><strong>Material Price:</strong> ${selectedShell.ematerialPrice}</p>
                                </div>
                            )}
                        </div>
                        <div className={styles.paymentOptions}>
                            <div className={styles.option}>
                                <img src="/path/to/payment-icon.png" alt="Payment" />
                                Flexible Payment Options: 3 Interest-Free Payments of $1,333
                            </div>
                            <div className={styles.option}>
                                <img src="/path/to/return-icon.png" alt="Returns" />
                                Free Returns: Our commitment to you does not end at delivery. We offer free returns (U.S and Canada) to make your experience as easy as possible.
                            </div>
                            <div className={styles.option}>
                                <img src="/path/to/shipping-icon.png" alt="Shipping" />
                                Free Shipping: We're committed to making your entire experience a pleasant one, from shopping to shipping.
                            </div>
                        </div>
                        <button className={styles.button}>Select this setting</button>
                        <button className={`${styles.button} ${styles.secondaryButton}`}>Consult an expert</button>
                        <div className={styles.productDetails}>
                            <h3>Product Details</h3>
                            <p className={styles.detailItem}>productDesignId: {productDesign.productDesignId}</p>
                            <p className={styles.detailItem}>designType: {productDesign.designType}</p>
                            <p className={styles.detailItem}>Width: 1.80mm</p>
                            <p className={styles.detailItem}>Rhodium Finish: Yes</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SettingDetails;
