import { useState, useEffect, useContext } from 'react';
// import { Context } from '../FrameBuildYourOwn';
import { Context } from '../frame/BuildYourOwnFrame';
import { Toaster, toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { formatDate, formatPrice } from '../../helper_function/ConvertFunction';
import axios from 'axios';

const CompleteProduct = () => {

    const navigate = useNavigate();
    const [productSetting, setProductSetting] = useContext(Context);

    const [productDesign, setProductDesign] = useState(null);
    const [shell, setShell] = useState(null);
    const [diamonds, setDiamonds] = useState([]);

    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState(null);

    useEffect(() => {
        getDesign();
    },[])

    const createOrder = async () => {

        if (sessionStorage.getItem("customer_id") === null || productSetting.designId == null || productSetting.shellId == null || productSetting.diamonds.length == 0) {
            console.log("ERROR");
        } else {
            try {
                const object = {
                    productDesignId: productSetting.designId,
                    productShellId: productSetting.shellId,
                    diamondIds: productSetting.diamonds,
                    customerId: sessionStorage.getItem("customer_id")
                };
                const response = await axios.post(`http://localhost:8080/api/create-order-from-design`, object);
                if (!response.data || response.status === 204) {
                    toast.error("Failed to fetch order");
                } else {
                    setOrderId(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const fetchOrder = async () => {
        if (orderId !== null) {
            try {
                const response = await axios.get(`http://localhost:8080/api/sales/order-select/${orderId}`);
                if (!response.data || response.status === 204) {
                    console.log("ERROR");
                } else {
                    setOrder(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        createOrder();
    },[])

    useEffect(() => {
        fetchOrder();
    },[orderId])

    const getDesign = async () => {
        try { 
            //console.log(`GET http://localhost:8080/api/product-designs/${productSetting.designId}`);
            const response = await axios.get(`http://localhost:8080/api/product-designs/${productSetting.designId}`);
            if(!response.data || response.status === 204) {
                console.log('error, cannot fetch, wrong id');
            } else {
                setProductDesign(response.data);
                setShell(response.data.productShellDesigns.find(val => val.productShellDesignId === productSetting.shellId));
                getDiamonds();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getDiamonds = async () => {
        try {

            const response = await axios.get(`http://localhost:8080/api/diamonds/all`);
            if(!response.data || response.status === 204) {
                console.log('no data found for diamonds');
            } else {
                setDiamonds(response.data.filter(v => productSetting.diamonds.includes(v.diamondId)));
            }

        } catch (error) {
            console.log(error);
        }
    } 

    if (order === null || productDesign === null || shell === null || diamonds.length == 0) {
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
                            <img src={productDesign.designFile} className='img-fluid mx-auto'/>
                        </div>
                        <div className="col">
                            <h1 className='display-1'>Product preview</h1>
                            <h4 className='fw-bold'>{productDesign.designName} - {shell.shellName}</h4>
                            <h4>Diamonds</h4>
                            <ul>
                                {diamonds.map(d => 
                                    <li key={d.diamondId}>
                                        {d.diamondCode} - {d.diamondName} - {d.shape} - {d.cut} - {d.clarity} - {d.color} - {d.caratWeight}
                                    </li>
                                )}
                            </ul>
                            <h4>Materials</h4>
                            <ul>
                                {
                                    order.product.materials.map(m =>
                                        <li key={m.material.materialId}>
                                            {m.material.materialName} - {m.weight} karat
                                        </li>
                                    )
                                }
                            </ul>
                            <h1 className='fw-bold'>Total price</h1>
                            <h1 className='fw-bold text-success'>{formatPrice(order.totalAmount)}</h1>
                            <button className='btn btn-success'>Check out</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}
export default CompleteProduct;