import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate, formatPrice } from '../helper_function/ConvertFunction';
import styles from '/src/css/OrderDetails.module.css';
import empty_image from '/src/assets/empty_image.jpg';
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

const AssignColumn = ({ order, fetchOrder }) => {

    const [saleStaff, setSaleStaff] = useState([]);
    const [productionStaff, setProductionStaff] = useState([]);
    const [designStaff, setDesignStaff] = useState([]);

    const [selectedSaleStaff, setSelectedSaleStaff] = useState('');
    const [selectedDesignStaff, setSelectedDesignStaff] = useState('');
    const [selectedProductionStaff, setSelectedProductionStaff] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const production_staff = await fetchProductionStaff();
            const sale_staff = await fetchSaleStaff();
            const design_staff = await fetchDesignStaff();
            setDesignStaff(design_staff);
            setSaleStaff(sale_staff);
            setProductionStaff(production_staff);
        }
        fetchData();
    }, [])

    const fetchProductionStaff = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/staff-production`);
            if (!response.data || response.status === 204) {
                toast.error(`Something went wrong went fetching staff members`);
            } else {
                return Array.isArray(response.data) ? response.data : [response.data];
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchDesignStaff = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/staff-design`);
            if (!response.data || response.status === 204) {
                toast.error(`Something went wrong went fetching staff members`);
            } else {
                return Array.isArray(response.data) ? response.data : [response.data];
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSaleStaff = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/staff-sale`);
            if (!response.data || response.status === 204) {
                toast.error(`Something went wrong went fetching staff members`);
            } else {
                return Array.isArray(response.data) ? response.data : [response.data];
            }
        } catch (error) {
            console.log(error);
        }
    }

    const submitForm = async () => {
        if (selectedProductionStaff.length > 0 || selectedSaleStaff.length > 0 || selectedDesignStaff.length > 0) {
            try {
                //console.log(`POST ${import.meta.env.VITE_jpos_back}/api/assign?orderId=${order.id}&${selectedProductionStaff.length > 0 ? `productionStaffId=${selectedProductionStaff}` : ''}&${selectedDesignStaff.length > 0 ? `designStaffId=${selectedDesignStaff}` : ''}&${selectedSaleStaff.length > 0 ? `saleStaffId=${selectedSaleStaff}` : ''}`);
                const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/assign?orderId=${order.id}&${selectedProductionStaff.length > 0 ? `productionStaffId=${selectedProductionStaff}` : ''}&${selectedDesignStaff.length > 0 ? `designStaffId=${selectedDesignStaff}` : ''}&${selectedSaleStaff.length > 0 ? `saleStaffId=${selectedSaleStaff}` : ''}`);
                if (!response.data || response.status === 204) {
                    toast.error(`Error submitting assignment form`);
                } else {
                    fetchOrder();
                    setSelectedDesignStaff('');
                    setSelectedProductionStaff('');
                    setSelectedDesignStaff('');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.info(`Choose at least one staff to save!`);
        }
    }


    return (
        <>
            <div className="row mb-2">
                <div className="col">
                    Sale staff:
                </div>
                <div className="col text-end">
                    {
                        order.saleStaff == null
                            ? <>
                                <select className={`form-select`} value={selectedSaleStaff} onChange={(e) => setSelectedSaleStaff(e.target.value)}>
                                    <option value=''>Select a staff</option>
                                    {saleStaff.map((staff, index) =>
                                        <option key={index} value={staff.staffId}>{staff.name} - {staff.phone}</option>
                                    )}
                                </select>
                            </>
                            : <>
                                {order.saleStaff.name} [ID: {order.saleStaff.staffId}]
                            </>
                    }
                </div>
            </div>
            {
                order.orderType == 'from_design'
                    ? <></>
                    : <>
                        <div className="row mb-2">
                            <div className="col">
                                Design staff:
                            </div>
                            <div className="col text-end">
                                {
                                    order.designStaff == null
                                        ? <>
                                            <select className={`form-select`} value={selectedDesignStaff} onChange={(e) => setSelectedDesignStaff(e.target.value)}>
                                                <option value=''>Select a staff</option>
                                                {designStaff.map((staff, index) =>
                                                    <option key={index} value={staff.staffId}>{staff.name} - {staff.phone}</option>
                                                )}
                                            </select>
                                        </>
                                        : <>
                                            {order.designStaff.name} [ID:{order.designStaff.staffId}]
                                        </>
                                }
                            </div>
                        </div>
                    </>
            }
            <div className="row mb-2">
                <div className="col">
                    Prod. staff:
                </div>
                <div className="col text-end">
                    {
                        order.productionStaff == null
                            ? <>
                                <select className={`form-select`} value={selectedProductionStaff} onChange={(e) => setSelectedProductionStaff(e.target.value)}>
                                    <option value=''>Select a staff</option>
                                    {productionStaff.map((staff, index) =>
                                        <option key={index} value={staff.staffId}>{staff.name} - {staff.phone}</option>
                                    )}
                                </select>
                            </>
                            : <>
                                {order.productionStaff.name} [ID:{order.productionStaff.staffId}]
                            </>
                    }
                </div>
            </div>
            {
                order.saleStaff !== null && order.productionStaff !== null && order.designStaff !== null
                    ? <></>
                    : <div className="row">
                        <button onClick={submitForm}>
                            Assign
                        </button>
                    </div>
            }
        </>
    )

}

const OrderDetails = () => {
    const location = useLocation().pathname.split("/");
    const navigate = useNavigate();
    const orderId = useParams().orderId;
    const [order, setOrder] = useState(null);

    const staffType = location.includes("your-orders") ? 'customer' : 'manage';

    const fetchOrder = async () => {
        try {
            //(`${import.meta.env.VITE_jpos_back}/api/sales/order-select/${orderId}`)
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/sales/order-select/${orderId}`);
            if (!response.data || response.status == 204) {
                toast.error(`Error fetching order`);
            } else {
                //console.log(response.data);
                setOrder(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    //--------------------------------IMAGE THING---------------------------------------------------
    const [activeReferenceImage, setActiveReferenceImage] = useState(0);

    const handleReferenceImageMove = (direction) => {
        if (direction) {
            setActiveReferenceImage(n => n + 1);
        } else {
            setActiveReferenceImage(n => n - 1);
        }
    }

    const [activeProductionImage, setActiveProductionImage] = useState(0);

    const handleProductionImageMove = (direction) => {
        if (direction) {
            setActiveProductionImage(n => n + 1);
        } else {
            setActiveProductionImage(n => n - 1);
        }
    }

    const [activeFinalImage, setActiveFinalImage] = useState(0);

    const handleFinalImageMove = (direction) => {
        if (direction) {
            setActiveFinalImage(n => n + 1);
        } else {
            setActiveFinalImage(n => n - 1);
        }
    }
    //--------------------------------IMAGE THING---------------------------------------------------

    if (order == null) {
        return (
            <>
                Loading...
            </>
        )
    } else {
        return (
            <>
                <div className={`${staffType == 'manage' ? 'container-fluid' : 'container'}`}>
                    <div className="row">
                        <div className="col-md-8 position-relative">
                            <FontAwesomeIcon className={`${styles['back-icon']} position-absolute`} icon={faLeftLong} onClick={() => navigate(-1)} />
                            <h4 className="text-center fw-bold mb-4 mt-4">CUSTOMER INFORMATION</h4><hr />
                            <h5 className='fw-semibold'>Customer name</h5>
                            <p className='fs-6 ms-4'>[ID: {order.customer.customerId}] {order.customer.name}</p>
                            <h5 className='fw-semibold'>Customer address</h5>
                            <p className='fs-6 ms-4'>{order.customer.address}</p>
                            <h5 className='fw-semibold'>Note</h5>
                            <p className='fs-6 ms-4'>{order.note}</p>
                            <h5 className='fw-semibold'>Reference images</h5>
                            {
                                order.designFile === null
                                    ? <>
                                        <img className='img-fluid' src={order.designFile === null ? empty_image : order.designFile} alt="" style={{ width: '100%', height: 'auto' }} />
                                    </>
                                    : <>
                                        <div className="position-relative">
                                            <button onClick={() => handleReferenceImageMove(false)} disabled={activeReferenceImage == 0} hidden={order.designFile.split("|").length <= 0} className={`${styles['image-btn']} position-absolute start-0 top-50`}><FontAwesomeIcon icon={faCaretLeft} /></button>
                                            <button onClick={() => handleReferenceImageMove(true)} disabled={activeReferenceImage == order.designFile.split("|").length - 1} hidden={order.designFile.split("|").length <= 0} className={`${styles['image-btn']} position-absolute end-0 top-50`}><FontAwesomeIcon icon={faCaretRight} /></button>
                                            {
                                                order.designFile.split("|").map((image, index) => {
                                                    if (index == activeReferenceImage) {
                                                        return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto' }} />
                                                    } else {
                                                        return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto', display: 'none' }} />
                                                    }
                                                })
                                            }
                                        </div>
                                    </>
                            }
                            <h5 className='fw-semibold'>Design images</h5>
                            {
                                order.modelFile === null
                                    ? <>
                                        <img className='img-fluid' src={order.modelFile === null ? empty_image : order.modelFile} alt="" style={{ width: '100%', height: 'auto' }} />
                                    </>
                                    : <>
                                        <div className="container position-relative">
                                            <button onClick={() => handleProductionImageMove(false)} disabled={activeProductionImage == 0} hidden={order.modelFile.split("|").length <= 0} className={`${styles['image-btn']} position-absolute start-0`}><FontAwesomeIcon icon={faCaretLeft} /></button>
                                            <button onClick={() => handleProductionImageMove(true)} disabled={activeProductionImage == order.modelFile.split("|").length - 1} hidden={order.modelFile.split("|").length <= 0} className={`${styles['image-btn']} position-absolute end-0`}><FontAwesomeIcon icon={faCaretRight} /></button>
                                            {
                                                order.modelFile.split("|").map((image, index) => {
                                                    if (index == activeProductionImage) {
                                                        return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto' }} />
                                                    } else {
                                                        return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto', display: 'none' }} />
                                                    }
                                                })
                                            }
                                        </div>
                                    </>
                            }
                            <h5 className='fw-semibold'>Finished product</h5>
                            {
                                order.productImage === null
                                    ? <>
                                        <img className='img-fluid' src={order.productImage === null ? empty_image : order.productImage} alt="" style={{ width: '100%', height: 'auto' }} />
                                    </>
                                    : <>
                                        <div className="position-relative">
                                            <button onClick={() => handleFinalImageMove(false)} disabled={activeFinalImage == 0} hidden={order.productImage.split("|").length <= 0} className={`${styles['image-btn']} position-absolute start-0 top-50`}><FontAwesomeIcon icon={faCaretLeft} /></button>
                                            <button onClick={() => handleFinalImageMove(true)} disabled={activeFinalImage == order.productImage.split("|").length - 1} hidden={order.productImage.split("|").length <= 0} className={`${styles['image-btn']} position-absolute end-0 top-50`}><FontAwesomeIcon icon={faCaretRight} /></button>
                                            {
                                                order.productImage.split("|").map((image, index) => {
                                                    if (index == activeFinalImage) {
                                                        return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto' }} />
                                                    } else {
                                                        return <img key={index} className='img-fluid' src={image} alt="" style={{ width: '100%', height: 'auto', display: 'none' }} />
                                                    }
                                                })
                                            }
                                        </div>
                                    </>
                            }
                        </div>

                        <div className="col-md-4">
                            {
                                order.status != 'completed' && staffType == 'manage'
                                    ? <div className="col">
                                        <h4 className="text-center fw-bold mb-4 mt-4">ASSIGNMENT</h4><hr />
                                        <AssignColumn order={order} fetchOrder={fetchOrder} />
                                    </div>
                                    : <>
                                    </>
                            }
                            <h4 className="text-center fw-bold mb-4 mt-4">ORDER SUMMARY</h4><hr />
                            {order.product !== null
                                ? order.product.diamonds.map(diamond =>
                                    <div key={diamond.diamondId}>
                                        <h5 className='fw-semibold mb-4'>Diamond #{diamond.diamondId}</h5>
                                        <div className='fs-6'>
                                            <p className={styles.listItem}><span>Shape:</span> <span>{diamond.shape.charAt(0).toUpperCase() + diamond.shape.slice(1)}</span></p>
                                            <p className={styles.listItem}><span>Clarity:</span> <span>{diamond.clarity}</span></p>
                                            <p className={styles.listItem}><span>Color:</span> <span>{diamond.color}</span></p>
                                            <p className={styles.listItem}><span>Cut:</span> <span>{diamond.cut}</span></p>
                                        </div>
                                    </div>
                                )
                                : <></>
                            }
                            <h5 className={styles.listItem}><span>Quotation price:</span> <span style={{ color: 'red' }}>{order.qdiamondPrice === null ? 'None' : formatPrice(order.qdiamondPrice)}</span></h5>
                            <h5 className={styles.listItem}><span>Order price:</span> <span style={{ color: '#48AAAD' }}>{order.odiamondPrice === null ? 'None' : formatPrice(order.odiamondPrice)}</span></h5>
                            <hr />
                            {order.product !== null
                                ? order.product.materials.map(material =>
                                    <div key={material.material.materialId}>
                                        <h5 className='fw-semibold mb-4'>Material #{material.material.materialId}</h5>
                                        <div className='fs-6' style={{ listStyle: "none" }}>
                                            <p className={styles.listItem}><span>Name:</span> <span>{material.material.materialName.replaceAll("_", " ")}</span></p>
                                            <p className={styles.listItem}><span>Weight:</span> <span>{material.weight}</span></p>
                                        </div>
                                    </div>
                                )
                                : <>
                                </>
                            }
                            <h5 className={styles.listItem}><span>Quotation price:</span> <span style={{ color: 'red' }}>{order.qmaterialPrice === null ? 'None' : formatPrice(order.qmaterialPrice)}</span></h5>
                            <h5 className={styles.listItem}><span>Order price:</span> <span style={{ color: '#48AAAD' }}>{order.omaterialPrice === null ? 'None' : formatPrice(order.omaterialPrice)}</span></h5>
                            <hr />
                            <h5 className='fw-semibold mb-4'>Extra</h5>
                            <div className='fs-6' style={{ listStyle: "none" }}>
                                <p className={styles.listItem}><span>Extra diamonds:</span> <span>{order.ediamondPrice === null ? "None" : formatPrice(order.ediamondPrice)}</span></p>
                                <p className={styles.listItem}><span>Extra materials:</span> <span>{order.ematerialPrice === null ? "None" : formatPrice(order.ematerialPrice)}</span></p>
                                <p className={styles.listItem}><span>Production price:</span> <span>{order.productionPrice === null ? "None" : formatPrice(order.productionPrice)}</span></p>
                            </div>

                            <hr /><h5 className={styles.listItem}><span>Tax fee (10% VAT):</span> <span>{order.taxFee === null ? 'None' : formatPrice(order.taxFee)}</span></h5>
                            <h5 className={styles.listItem}><span>TOTAL PRICE {formatDate(order.qdate)}:</span> <span style={{ color: '#48AAAD' }}>{order.totalAmount === null ? "None" : formatPrice(order.totalAmount)}</span></h5>
                            {
                                order.status == 'completed'
                                    ? <>
                                        <h5 className="fw-bold">WARRANTY INFORMATION</h5>
                                        <div>
                                            <li>Customer ID: {('000' + order.customer.customerId).slice(-4)}</li>
                                            <li>Product ID: {('000' + order.product.productId).slice(-4)}</li>
                                            <li>Purchase date: {order.odate === null ? formatDate(order.orderDate) : formatDate(order.odate)}</li>
                                            <li>Warranty: 4 years from purchase date</li>
                                            <li>Terms: <a href="/" target="_blank">Read our terms here</a></li>
                                        </div>
                                    </>
                                    : <>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default OrderDetails;