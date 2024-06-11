import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../helper_function/ConvertFunction';
import axios from 'axios';
import { fetchDiamondPrice, fetchMaterialPrice } from '../../helper_function/FetchPriceFunctions';
import styles from '/src/css/CompleteProduct.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faRing, faClipboardList } from '@fortawesome/free-solid-svg-icons';

const CompleteProduct = () => {

    const navigate = useNavigate();

    const [productDesign, setProductDesign] = useState(null);
    const [shell, setShell] = useState(null);
    const [diamonds, setDiamonds] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [estimatedPrice, setEstimatedPrice] = useState(null);

    useEffect(() => {
        const getDesign = async () => {
            if (sessionStorage.getItem('designId') === null) {
                toast.info(`Please return for selection`);
                navigate("/build-your-own/choose-setting");
            } else {
                try {
                    //console.log(`GET http://localhost:8080/api/product-designs/${sessionStorage.getItem('designId')}`);
                    const response = await axios.get(`http://localhost:8080/api/product-designs/${sessionStorage.getItem('designId')}`);
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
    }, [])

    const getEstimatePrice = async (shell, diamonds, materials) => {
        let totalPrice = 0;
        //console.log(`Material price: ${shell.ematerialPrice}`);
        totalPrice += shell.ematerialPrice;
        //console.log(`Production price: ${shell.productionPrice}`);
        totalPrice += shell.productionPrice;
        //console.log(`Extra diamond: ${shell.ediamondPrice}`);
        totalPrice += shell.ediamondPrice;
        for (const diamond of diamonds) {
            const diamond_price = await fetchDiamondPrice(diamond.cut, diamond.color, diamond.clarity, diamond.caratWeight, diamond.caratWeight);
            //console.log(`Diamond: ${diamond_price}`);
            totalPrice += diamond_price;
        }
        for (const material of materials) {
            const material_price = await fetchMaterialPrice(material.material.materialId);
            //console.log(`Material: ${material_price}`);
            totalPrice += material_price * material.weight;
        }
        //console.log(`Markup rate: ${shell.markupRate}`);
        totalPrice = totalPrice * shell.markupRate;
        return totalPrice;
    }

    const createOrder = async (havePaid) => {

        if (sessionStorage.getItem("customer_id") === null) {
            toast.info(`You need to be logged in to place the order!`);
        } else {
            try {
                const object = {
                    productDesignId: sessionStorage.getItem('designId'),
                    productShellId: sessionStorage.getItem('shellId'),
                    diamondIds: sessionStorage.getItem('diamonds').split(','),
                    customerId: sessionStorage.getItem("customer_id"),
                    havePaid: havePaid
                };
                const response = await axios.post(`http://localhost:8080/api/create-order-from-design`, object);
                if (!response.data || response.status === 204) {
                    toast.error("Failed to fetch order");
                } else {
                    const orderId = response.data;
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleCashPayment = () => {
        createOrder(false)
        navigate("/cash-completed");
    }

    const handleOnlinePayment = () => {
        createOrder(true)
        navigate("/online-completed")
    }

    const getDiamonds = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamonds/all`);
            if (!response.data || response.status === 204) {
                console.log('no data found for diamonds');
            } else {
                const chosenDiamonds = sessionStorage.getItem('diamonds').split(',');
                const diamonds = response.data.filter(v => chosenDiamonds.includes(v.diamondId.toString()));
                return diamonds;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getMaterials = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/product-shell-material/${sessionStorage.getItem('shellId')}`);
            if (!response.data || response.status === 204) {
                toast.error("ERror cannot fetch materials");
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (materials.length == 0 || productDesign === null || shell === null || diamonds.length == 0) {
        return (
            <>
                Processing order
            </>
        )
    } else {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img src={productDesign.designFile} className='img-fluid mx-auto' />
                        </div>
                        <div className="col">
                            <h1 className='text-center fw-semibold mb-5' style={{ color: '#48AAAD' }}>MY BIJOUX ORDER</h1>
                            <h4 className='fw-semibold' style={{ color: '#48AAAD' }}><i>{productDesign.designName} in {shell.shellName}</i></h4>
                            <br />
                            <h5><FontAwesomeIcon icon={faGem}/> <i>Diamonds</i></h5>
                            <ul>
                                {diamonds.map(d =>
                                    <li key={d.diamondId} style={{ listStyle: 'none' }}>
                                        {d.caratWeight} Carat {d.diamondName} {d.shape} Shape <br /> {d.cut} Cut {d.clarity} Clarity {d.color} Color <br /> Stock#:{d.diamondCode} 
                                    </li>
                                )}
                            </ul>
                            <h5><FontAwesomeIcon icon={faRing}/> <i>Materials</i></h5>
                            <ul>
                                {
                                    materials.map(m =>
                                        <li key={m.material.materialId} style={{ listStyle: 'none' }}>
                                            {m.material.materialName} - {m.weight} carat
                                        </li>
                                    )
                                }
                            </ul>
                            <h3 className='fw-semibold'>Product price: </h3>
                            <h4 className='fw-bold text' style={{ color: '#48AAAD', marginLeft: '1vw' }}>
                                {estimatedPrice === null
                                    ? 'Estimating price...'
                                    : formatPrice(estimatedPrice)
                                }
                            </h4>
                            <br />
                            <div className="col">
                                <h3 className="fst-italic fw-semibold "><FontAwesomeIcon icon={faClipboardList} /> SUMMARY</h3>
                                <br />
                                <div className="summary-card">
                                    <div className="content">
                                        <p>Subtotal: {estimatedPrice ? formatPrice(estimatedPrice) : 'Estimating price...'}</p>
                                        <p>US & Int. Shipping: Free</p>
                                        <p>Taxes/Duties Estimate: 10% VAT</p>
                                        <h3>Total Price: <div style={{ color: '#48AAAD', marginLeft: '1vw'}}>{(estimatedPrice + estimatedPrice * 0.1) ? formatPrice(estimatedPrice + estimatedPrice * 0.1) : 'Estimating price...'}</div></h3>
                                        <button onClick={handleCashPayment} className='btn w-100 my-2' style={{ backgroundColor: '#48AAAD', color: '#fff'}}>Pay with cash</button>
                                        <button onClick={handleOnlinePayment} className='btn btn-secondary w-100 my-2'>Pay online</button>
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