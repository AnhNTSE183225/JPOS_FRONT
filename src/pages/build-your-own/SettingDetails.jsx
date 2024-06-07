import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "/src/css/SettingDetails.module.css"; 

const SettingDetails = () => {
    const designId = useParams().designId;
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
    }, []);

    const handleShellClick = (shell) => {
        setSelectedShell(shell);
    };

    const toggleShellDetails = () => {
        setShowShellDetails(!showShellDetails);
    };

    if (productDesign === null) {
        return <div className="loading">Loading...</div>;
    } else {
        return (
            <div className={`${styles['container']}`} id={`${styles['setting-details']}`}>
                <div className={`${styles['content']}`}>
                    <div  className={`${styles['image-selection']}`}>
                        <img src="path/to/your/ring-image.jpg" alt="Ring" />
                    </div>
                    <div className={`${styles['details-section']}`}>
                        <h1 className={`${styles['title']}`}>{productDesign.designName}</h1>
                        <h2 className={`${styles['subtitle']}`}>{selectedShell ? selectedShell.shellName : "Select a Shell"}</h2>
                        <div className={`${styles['price']}`}>$640 (Setting Price)</div>
                        <div className={`${styles['metal-type-section']}`}>
                            <h3 className={`${styles['metal-type-title']}`}></h3>
                            <div className={`${styles['shell-list']}`}>
                                {productDesign.productShellDesigns.map(shell => (
                                    <div 
                                        key={shell.productShellDesignId}
                                        className={`shell-item ${selectedShell && selectedShell.productShellDesignId === shell.productShellDesignId ? 'selected' : ''}`}
                                        onClick={() => handleShellClick(shell)}
                                    >
                                        <span className="shell-label">{shell.shellName}</span>
                                    </div>
                                ))}
                            </div>
                            <div className={`${styles['toggle-button']}`} onClick={toggleShellDetails}>
                                <h3>Shell Details</h3>
                                <span>{showShellDetails ? '-' : '+'}</span>
                            </div>
                            {showShellDetails && selectedShell && (
                                <div className="shell-details-section">
                                    <h3 className="shell-title">{selectedShell.shellName} Details</h3>
                                    <p className="shell-detail"><strong>ID:</strong> {selectedShell.productShellDesignId}</p>
                                    <p className="shell-detail"><strong>Diamonds:</strong> {selectedShell.diamondQuantity}</p>
                                    <p className="shell-detail"><strong>Production Price:</strong> ${selectedShell.productionPrice}</p>
                                    <p className="shell-detail"><strong>Diamond Price:</strong> ${selectedShell.ediamondPrice}</p>
                                    <p className="shell-detail"><strong>Material Price:</strong> ${selectedShell.ematerialPrice}</p>
                                </div>
                            )}
                        </div>
                        <div  className={`${styles['payment-options']}`}>
                            <div className={`${styles['option']}`}>
                                <img src="path/to/payment-icon.png" alt="Payment" />
                                Flexible Payment Options: 3 Interest-Free Payments of $1,333
                            </div>
                            <div className={`${styles['option']}`}>
                                <img src="path/to/return-icon.png" alt="Returns" />
                                Free Returns: Our commitment to you does not end at delivery. We offer free returns (U.S and Canada) to make your experience as easy as possible.
                            </div>
                            <div className={`${styles['option']}`}>
                                <img src="path/to/shipping-icon.png" alt="Shipping" />
                                Free Shipping: We're committed to making your entire experience a pleasant one, from shopping to shipping.
                            </div>
                        </div>
                        <button className={`${styles['button']}`}>Select this setting</button>
                        <button className={`${styles['button secondary-button']}`}>Consult an expert</button>
                        <div className={`${styles['product-details']}`} >
                            <h3>Product Details</h3>
                            <p className={`${styles['detail-item']}`}>productDesignId: {productDesign.productDesignId}</p>
                            <p className={`${styles['detail-item']}`}>designType: {productDesign.designType}</p>
                            <p className={`${styles['detail-item']}`}>Width: 1.80mm</p>
                            <p className={`${styles['detail-item']}`}>Rhodium Finish: Yes</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SettingDetails;
