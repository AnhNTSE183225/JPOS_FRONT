import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "/src/css/SettingDetails.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft, faTruckFast, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { formatPrice } from "../../helper_function/ConvertFunction";
import { fetchMaterialPrice } from "../../helper_function/FetchPriceFunctions";

const SettingDetails = () => {
    const navigate = useNavigate();
    const { designId } = useParams();
    const [productDesign, setProductDesign] = useState(null);
    const [selectedShell, setSelectedShell] = useState(null);
    const [showShellDetails, setShowShellDetails] = useState(false);
    const [settingPrice, setSettingPrice] = useState(null);
    const [showMoreInfo, setShowMoreInfo] = useState(false); // New state for more/less information

    useEffect(() => {
        fetchData();
    }, [designId]);

    useEffect(() => {
        if (selectedShell !== null) {
            const updatePrice = async () => {
                const materials = await getMaterials(selectedShell);
                const setting_price = await fetchSettingPrice(selectedShell, materials);
                setSettingPrice(setting_price);
            }
            updatePrice();
        }
    }, [selectedShell])
    
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product-designs/${designId}`);
            if (!response.data || response.status === 204) {
                console.error('Error, cannot fetch, wrong id or something');
            } else {
                const product_design = response.data;
                const selected_shell = response.data.productShellDesigns[0];
                const materials = await getMaterials(selected_shell);
                const setting_price = await fetchSettingPrice(selected_shell, materials);

                setProductDesign(product_design);
                setSettingPrice(setting_price);
                setSelectedShell(selected_shell);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getMaterials = async (shell) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product-shell-material/${shell.productShellDesignId}`);
            if (!response.data || response.status === 204) {
                toast.error("ERror cannot fetch materials");
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSettingPrice = async (shell, materials) => {
        let total = shell.ediamondPrice + shell.ematerialPrice + (shell.productionPrice * shell.markupRate);
        for (const material of materials) {
            const price = await fetchMaterialPrice(material.material.materialId);
            total += price * material.weight;
        }
        return total;
    }

    const handleChoose = () => {
        if (designId !== null && selectedShell.productShellDesignId !== null && selectedShell.diamondQuantity > 0 && settingPrice !== null) {
            //Cosmetic
            sessionStorage.setItem('designImage', productDesign.designFile);
            sessionStorage.setItem('designName', productDesign.designName);
            sessionStorage.setItem('designPrice', formatPrice(settingPrice));
            //Functional
            sessionStorage.setItem('designId', designId);
            sessionStorage.setItem('shellId', selectedShell.productShellDesignId);
            sessionStorage.setItem('quantity', selectedShell.diamondQuantity);
            sessionStorage.setItem('diamonds', '');
            sessionStorage.setItem('diamondImages', '');
            sessionStorage.setItem('diamondPrices', '');
            navigate("/build-your-own/choose-diamond");
        } else {
            console.log("ERROR CHOOSING");
        }
    }

    const handleShellClick = (shell) => {
        setSelectedShell(shell);
    };

    const toggleShellDetails = () => {
        setShowShellDetails(!showShellDetails);
    };

    const toggleMoreInfo = () => {
        setShowMoreInfo(!showMoreInfo);
    };

    if (productDesign === null) {
        return <div className={styles.loading}>Loading...</div>;
    } else {
        return (
            <div className="container">
                <div className={styles.container} id={styles["setting-details"]}>
                    <div className={styles.content}>
                        <div className={styles["image-section"]}>
                            <img src={productDesign.designFile} alt="Ring" />
                            <div className={styles["more-info-section"]}>
                                <div className={styles["toggle-button"]} onClick={toggleMoreInfo}>
                                    <h3>{showMoreInfo ? 'Less Information' : 'More Information'}</h3>
                                    <span>{showMoreInfo ? '-' : '+'}</span>
                                </div>
                                {showMoreInfo && (
                                    <div className={styles["more-info-content"]}>
                                        <h3>Can Be Set With:</h3>
                                        <ul>
                                            <li>Round 0.20 - 8.00 Carat</li>
                                            <li>Princess 0.20 - 8.00 Carat</li>
                                            <li>Cushion 0.20 - 8.00 Carat</li>
                                            <li>Emerald 0.20 - 8.00 Carat</li>
                                            <li>Oval 0.20 - 8.00 Carat</li>
                                            <li>Radiant 0.20 - 8.00 Carat</li>
                                            <li>Asscher 0.20 - 8.00 Carat</li>
                                            <li>Marquise 0.20 - 8.00 Carat</li>
                                            <li>Heart 0.20 - 8.00 Carat</li>
                                            <li>Pear 0.20 - 8.00 Carat</li>
                                            <li>Square Emerald 0.20 - 8.00 Carat</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={styles["details-section"]}>
                            <h1 className={styles.title}>{productDesign.designName}</h1>
                            <h2 className={styles.subtitle}>{selectedShell ? selectedShell.shellName : "Select a Shell"}</h2>
                            <div className={styles.price}>{formatPrice(settingPrice)} (Setting Price)</div>
                            <div className={styles.option}>

                                Flexible Payment Options: 3 Interest-Free Payments of {formatPrice(settingPrice / 3)}
                            </div>
                            <div className={styles["metal-type-section"]}>
                                <h3 className={styles["metal-type-title"]}></h3>
                                <div className={styles["shell-list"]}>
                                    {productDesign.productShellDesigns.map(shell => (
                                        <div
                                            key={shell.productShellDesignId}
                                            className={`${styles["shell-item"]} ${selectedShell && selectedShell.productShellDesignId === shell.productShellDesignId ? styles.selected : ''}`}
                                            onClick={() => handleShellClick(shell)}
                                        >
                                            <span className={styles["shell-label"]}>{shell.shellName}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles["toggle-button"]} onClick={toggleShellDetails}>
                                    <h3>Shell Details</h3>
                                    <span>{showShellDetails ? '-' : '+'}</span>
                                </div>
                                {showShellDetails && selectedShell && (
                                    <div className={styles["shell-details-section"]}>
                                        <h3 className={styles["shell-title"]}>{selectedShell.shellName} Details</h3>
                                        <p className={styles["shell-detail"]}><strong>ID:</strong> {selectedShell.productShellDesignId}</p>
                                        <p className={styles["shell-detail"]}><strong>Diamonds:</strong> {selectedShell.diamondQuantity}</p>
                                        <p className={styles["shell-detail"]}><strong>Production Price:</strong> {formatPrice(selectedShell.productionPrice)}</p>
                                        <p className={styles["shell-detail"]}><strong>Extra Diamond Price:</strong> {formatPrice(selectedShell.ediamondPrice)}</p>
                                        <p className={styles["shell-detail"]}><strong>Extra Material Price:</strong> {formatPrice(selectedShell.ematerialPrice)}</p>
                                    </div>
                                )}
                            </div>
                            

                            <div className={styles.paymentOptions}>
                                <h3>Your order included: </h3>
                                <div className={styles.optionBox}>
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faTruckFast} />
                                    </div>
                                    <div className={styles.textContainer}>
                                        <h3>Free Shipping</h3>
                                        <p>We're committed to making your entire experience a pleasant one, from shopping to shipping.</p>
                                    </div>
                                </div>
                                <div className={styles.optionBox}>
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faChartBar} />
                                    </div>
                                    <div className={styles.textContainer}>
                                        <h3>Appraisal Included</h3>
                                        <p>An appraisal is a document stating the approximate monetary value of your item. It is only available for items over $800.</p>
                                    </div>
                                </div>
                                <div className={styles.optionBox}>
                                    <div className={styles.iconContainer}>
                                        <FontAwesomeIcon icon={faRightLeft} />
                                    </div>
                                    <div className={styles.textContainer}>
                                        <h3>Free Returns</h3>
                                        <p>Our commitment to you does not end at delivery. We offer free returns (U.S and Canada) to make your experience as easy as possible.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button className={styles.button} onClick={handleChoose}>Select this setting</button>
                                </div>
                                <div className="col">
                                    <button className={`${styles.button} ${styles["secondary-button"]}`}>Consult an expert</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default SettingDetails;
