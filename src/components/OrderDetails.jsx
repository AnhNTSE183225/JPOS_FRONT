import axios from "axios";
import { useEffect, useState } from "react";
import { formatDate, formatPrice } from '../helper_function/ConvertFunction';
import styles from '/src/css/OrderDetails.module.css';
import empty_image from '/src/assets/empty_image.jpg';
import { toast } from "sonner";

const AssignColumn = ({ order, fetchOrder }) => {

    const [saleStaff, setSaleStaff] = useState([]);
    const [productionStaff, setProductionStaff] = useState([]);
    const [designStaff, setDesignStaff] = useState([]);

    const [selectedSaleStaff, setSelectedSaleStaff] = useState('');
    const [selectedDesignStaff, setSelectedDesignStaff] = useState('');
    const [selectedProductionStaff, setSelectedProductionStaff] = useState('');

    const saveAssignment = async () => {
        try {

        } catch (error) {
            console.log(error);
        }
    }

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
                console.log(`POST ${import.meta.env.VITE_jpos_back}/api/assign?orderId=${order.id}&${selectedProductionStaff.length > 0 ? `productionStaffId=${selectedProductionStaff}` : ''}&${selectedDesignStaff.length > 0 ? `designStaffId=${selectedDesignStaff}` : ''}&${selectedSaleStaff.length > 0 ? `saleStaffId=${selectedSaleStaff}` : ''}`);
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
            <div className="row">
                <div className="col">
                    Sale staff:
                </div>
                <div className="col">
                    {
                        order.saleStaff == null
                            ? <>
                                <select value={selectedSaleStaff} onChange={(e) => setSelectedSaleStaff(e.target.value)}>
                                    <option value=''>Select a staff</option>
                                    {saleStaff.map((staff, index) =>
                                        <option key={index} value={staff.staffId}>{staff.name} - {staff.phone}</option>
                                    )}
                                </select>
                            </>
                            : <>
                                [ID: {order.saleStaff.staffId}] {order.saleStaff.name}
                            </>
                    }
                </div>
            </div>
            {
                order.orderType == 'from_design'
                    ? <></>
                    : <>
                        <div className="row">
                            <div className="col">
                                Design staff:
                            </div>
                            <div className="col">
                                {
                                    order.designStaff == null
                                        ? <>
                                            <select value={selectedDesignStaff} onChange={(e) => setSelectedDesignStaff(e.target.value)}>
                                                <option value=''>Select a staff</option>
                                                {designStaff.map((staff, index) =>
                                                    <option key={index} value={staff.staffId}>{staff.name} - {staff.phone}</option>
                                                )}
                                            </select>
                                        </>
                                        : <>
                                            [ID:{order.designStaff.staffId}] {order.designStaff.name}
                                        </>
                                }
                            </div>
                        </div>
                    </>
            }
            <div className="row">
                <div className="col">
                    Prod. staff:
                </div>
                <div className="col">
                    {
                        order.productionStaff == null
                            ? <>
                                <select value={selectedProductionStaff} onChange={(e) => setSelectedProductionStaff(e.target.value)}>
                                    <option value=''>Select a staff</option>
                                    {productionStaff.map((staff, index) =>
                                        <option key={index} value={staff.staffId}>{staff.name} - {staff.phone}</option>
                                    )}
                                </select>
                            </>
                            : <>
                                [ID:{order.productionStaff.staffId}] {order.productionStaff.name}
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

const OrderDetails = ({ orderId, staffType }) => {

    const [order, setOrder] = useState(null);

    const fetchOrder = async () => {
        try {
            console.log(`${import.meta.env.VITE_jpos_back}/api/sales/order-select/${orderId}`)
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/sales/order-select/${orderId}`);
            if (!response.data || response.status == 204) {
                toast.error(`Error fetching order`);
            } else {
                console.log(response.data);
                setOrder(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    if (order == null) {
        return (
            <>
                Loading...
            </>
        )
    } else {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="text-center fw-bold mb-4 mt-4">CUSTOMER INFORMATION</h4><hr />
                            <h5 className='fw-semibold'>Customer name</h5>
                            <p className='fs-6 ms-4'>[ID: {order.customer.customerId}] {order.customer.name}</p>
                            <h5 className='fw-semibold'>Customer address</h5>
                            <p className='fs-6 ms-4'>{order.customer.address}</p>
                            <h5 className='fw-semibold'>Reference image</h5>
                            <img className='img-fluid' src={order.designFile === null ? empty_image : order.designFile} alt="" style={{ width: '100%', height: 'auto' }} />
                            <h5 className='fw-semibold'>Production image</h5>
                            <img className='img-fluid' src={order.productImage === null ? empty_image : order.productImage} alt="" style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div className="col-md-4">
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
                                        <div className='fs-6' style={{listStyle: "none"}}>
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
                            <div className='fs-6' style={{listStyle: "none"}}>
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
                        {/* {
                            order.status != 'completed' && staffType == 'manage'
                                ? <div className="col">
                                    <h2 className="fw-bold">ASSIGNMENT</h2>
                                    <AssignColumn order={order} fetchOrder={fetchOrder} />
                                </div>
                                : <>
                                </>
                        } */}
                    </div>
                </div>
            </>
        )
    }
}

export default OrderDetails;