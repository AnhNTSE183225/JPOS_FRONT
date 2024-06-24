import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../helper_function/ConvertFunction';
import axios from 'axios';
import { fetchDiamondPrice, fetchMaterialPrice } from '../../helper_function/FetchPriceFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faRing, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/CompleteProduct.module.css';
import { makePayment } from '../../helper_function/Pay';
import useDocumentTitle from '../../components/Title';

const CompleteProduct = () => {
    const navigate = useNavigate();

    const [productDesign, setProductDesign] = useState(null);
    const [shell, setShell] = useState(null);
    const [diamonds, setDiamonds] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [estimatedPrice, setEstimatedPrice] = useState(null);

    useDocumentTitle('Complete Bijoux Order');
    useEffect(() => {
        const getDesign = async () => {
            if (sessionStorage.getItem('designId') === null) {
                toast.info(`Please return for selection`);
                navigate("/build-your-own/choose-setting");
            } else {
                try {
                    const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-designs/${sessionStorage.getItem('designId')}`);
                    if (!response.data || response.status === 204) {
                        console.log('error, cannot fetch, wrong id');
                    } else {
                        const shell = response.data.productShellDesigns.find(val => val.productShellDesignId === Number(sessionStorage.getItem('shellId')));
                        const diamonds = await getDiamonds();
                        const materials = await getMaterials();
                        const price = await getEstimatePrice(shell, diamonds, materials);

                        setProductDesign(response.data);
                        setShell(shell);
                        setDiamonds(diamonds);
                        setMaterials(materials);
                        setEstimatedPrice(price);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        getDesign();
    }, []);

    const getEstimatePrice = async (shell, diamonds, materials) => {
        let totalPrice = 0;
        totalPrice += shell.ematerialPrice;
        totalPrice += shell.productionPrice;
        totalPrice += shell.ediamondPrice;
        for (const diamond of diamonds) {
            const diamond_price = await fetchDiamondPrice(diamond.origin, diamond.shape, diamond.caratWeight, diamond.color, diamond.clarity, diamond.cut);
            totalPrice += diamond_price;
        }
        for (const material of materials) {
            const material_price = await fetchMaterialPrice(material.material.materialId);
            totalPrice += material_price * material.weight;
        }
        totalPrice = totalPrice * shell.markupRate;
        return totalPrice;
    }

    const clickPay = async () => {
        if (sessionStorage.getItem('customer_id') == null) {
            toast.info(`You need to be logged in!`);
            navigate('/login');
            return;
        }
        try {
            const orderId = await createOrder();
            const orderAmount = await axios.get(`${import.meta.env.VITE_jpos_back}/api/sales/order-select/${orderId}`);
            if (!orderAmount || orderAmount.status === 204) {
                console.log(`Can't find totalAmount of that order`);
            } else {
                sessionStorage.setItem('currentOrderId', orderAmount.data.id);
                sessionStorage.setItem('currentOrderType', orderAmount.data.orderType);

                sessionStorage.removeItem('quantity');
                sessionStorage.removeItem('shellId');
                sessionStorage.removeItem('diamonds');
                sessionStorage.removeItem('diamondPrices');
                sessionStorage.removeItem('diamondImages');
                sessionStorage.removeItem('designId');
                sessionStorage.removeItem('designName');
                sessionStorage.removeItem('designPrice');
                sessionStorage.removeItem('designImage');
                makePayment(orderAmount.data.totalAmount * 0.3);
            }
        } catch (error) {
            toast.error(`Payment process failed: ${error}`);
        }
    }

    const createOrder = async () => {
        try {
            const object = {
                productDesignId: sessionStorage.getItem('designId'),
                productShellId: sessionStorage.getItem('shellId'),
                diamondIds: sessionStorage.getItem('diamonds').split(','),
                customerId: sessionStorage.getItem("customer_id")
            };
            const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/create-order-from-design`, object);
            if (!response.data || response.status === 204) {
                toast.error("Failed to fetch order");
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }


    const getDiamonds = async () => {
        const chosenDiamonds = sessionStorage.getItem('diamonds').split(',');
        let result = [];

        for (const diamondId of chosenDiamonds) {
            try {
                const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/diamond/get-by-id/${diamondId}`);
                if (!response.data || response.status === 204) {
                    console.log(`Can't fetch diamond ${diamondId}`);
                } else {
                    result = [...result, response.data];
                }
            } catch (error) {
                console.log(error);
            }
        }

        return result;
    }

    const getMaterials = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-shell-material/${sessionStorage.getItem('shellId')}`);
            if (!response.data || response.status === 204) {
                toast.error("ERror cannot fetch materials");
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (materials.length === 0 || productDesign === null || shell === null || diamonds.length === 0) {
        return (
            <>
                Processing order
            </>
        )
    } else {

        return (
            <>
                <div className='container'>
                    <div className={styles.container}>
                        <div className={`row ${styles.imageSection}`}>
                            <div className='row'>
                                {diamonds.map(d =>
                                    <li key={d.diamondId} style={{ listStyle: 'none' }}>
                                        <img src={d.image} alt="Diamond" className={styles.diamondImage} />
                                    </li>
                                )}
                            </div>
                            <div className='row'>
                                <img src={productDesign.designFile} className={styles.productImage} alt="Product Design" />
                            </div>
                        </div>
                        <div className={styles.detailsSection}>
                            <h1 className='text-center fw-semibold mb-5' style={{ color: '#48AAAD' }}>MY BIJOUX ORDER</h1>
                            <h4 className='fs-2' style={{ color: '#48AAAD' }}>{productDesign.designName} in {shell.shellName}</h4>
                            <br />
                            <h5><FontAwesomeIcon icon={faGem} /> <i>Diamonds</i></h5>
                            <ul>
                                {diamonds.map(d =>
                                    <li key={d.diamondId} style={{ listStyle: 'none' }}>
                                        {d.caratWeight} Carat {d.diamondName} {d.shape} Shape <br /> {d.cut} Cut {d.clarity} Clarity {d.color} Color <br /> Stock#:{d.diamondCode}

                                    </li>

                                )}
                            </ul>
                            <h5><FontAwesomeIcon icon={faRing} /> <i>Materials</i></h5>
                            <ul>
                                {
                                    materials.map(m =>
                                        <li key={m.material.materialId} style={{ listStyle: 'none' }}>
                                            {m.material.materialName} - {m.weight} carat
                                        </li>
                                    )
                                }
                            </ul>
                            <p className='fw-semibold fst-italic fs-4'>Product price: </p>
                            <h5 className='fw-bold text' style={{ color: '#48AAAD', marginLeft: '1vw' }}>
                                {estimatedPrice === null
                                    ? 'Estimating price...'
                                    : formatPrice(estimatedPrice)
                                }
                            </h5>
                            <br />
                            <div className="col">
                                <h4 className="fst-italic fw-semibold "><FontAwesomeIcon icon={faClipboardList} /> SUMMARY</h4>

                                <div>
                                    <div>
                                        <div style={{ marginLeft: '1vw' }}>
                                            <p className='fs-6'>Subtotal: {estimatedPrice ? formatPrice(estimatedPrice) : 'Estimating price...'}</p>
                                            <p className='fs-6'>US & Int. Shipping: Free</p>
                                            <p className='fs-6'>Taxes/Duties Estimate: 10% VAT</p>
                                        </div>
                                        <hr />
                                        <p className='fs-4'>TOTAL PRICE: <div style={{ color: '#48AAAD', marginLeft: '1vw', marginTop: '1vw' }}>{(estimatedPrice + estimatedPrice * 0.1) ? formatPrice(estimatedPrice + estimatedPrice * 0.1) : 'Estimating price...'}</div></p>
                                        <div className='row'>
                                            <div className='col d-flex'><button onClick={clickPay} className={styles.button}>Pay 30% - {estimatedPrice !== null ? formatPrice(estimatedPrice * 1.1 * 0.3) : 'Estimating price...'}</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default CompleteProduct;
