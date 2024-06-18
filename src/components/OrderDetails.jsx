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
            const response = await axios.get(`http://localhost:8080/api/staff-production`);
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
            const response = await axios.get(`http://localhost:8080/api/staff-design`);
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
            const response = await axios.get(`http://localhost:8080/api/staff-sale`);
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
                console.log(`POST http://localhost:8080/api/assign?orderId=${order.id}&${selectedProductionStaff.length > 0 ? `productionStaffId=${selectedProductionStaff}` : ''}&${selectedDesignStaff.length > 0 ? `designStaffId=${selectedDesignStaff}` : ''}&${selectedSaleStaff.length > 0 ? `saleStaffId=${selectedSaleStaff}` : ''}`);
                const response = await axios.post(`http://localhost:8080/api/assign?orderId=${order.id}&${selectedProductionStaff.length > 0 ? `productionStaffId=${selectedProductionStaff}` : ''}&${selectedDesignStaff.length > 0 ? `designStaffId=${selectedDesignStaff}` : ''}&${selectedSaleStaff.length > 0 ? `saleStaffId=${selectedSaleStaff}` : ''}`);
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
            const response = await axios.get(`http://localhost:8080/api/sales/order-select/${orderId}`);
            if (!response.data || response.status == 204) {
                toast.error(`Error fetching order`);
            } else {
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
                        <div className="col">
                            <h2 className="fw-bold">CUSTOMER INFORMATION</h2>
                            <h4 className='fw-bold'>Customer name</h4>
                            <p className='fs-4'>[ID: {order.customer.customerId}] {order.customer.name}</p>
                            <h4 className='fw-bold'>Customer address</h4>
                            <p className='fs-4'>{order.customer.address}</p>
                            <h4 className='fw-bold'>Reference image</h4>
                            <img className='img-fluid' src={order.designFile === null ? empty_image : order.designFile} alt="" style={{ width: '300px', height: '300px' }} />
                            <h4 className='fw-bold'>Production image</h4>
                            <img className='img-fluid' src={order.productImage === null ? empty_image : order.productImage} alt="" style={{ width: '300px', height: '300px' }} />
                        </div>
                        <div className="col">
                            <h2 className="fw-bold">PRODUCT INFORMATION</h2>
                            {order.product !== null
                                ? order.product.diamonds.map(diamond =>
                                    <div key={diamond.diamondId}>
                                        <h4 className='fw-bold'>Diamond #{diamond.diamondId}</h4>
                                        <ul>
                                            <li>Shape: {diamond.shape}</li>
                                            <li>Clarity: {diamond.clarity}</li>
                                            <li>Color: {diamond.color}</li>
                                            <li>Cut: {diamond.cut}</li>
                                        </ul>
                                    </div>
                                )
                                : <></>
                            }
                            <h4>Quotation price: <span style={{ color: 'red' }}>{order.qdiamondPrice === null ? 'None' : formatPrice(order.qdiamondPrice)}</span></h4>
                            <h4>Order price: <span style={{ color: '#48AAAD' }}>{order.odiamondPrice === null ? 'None' : formatPrice(order.odiamondPrice)}</span></h4>
                            {order.product !== null
                                ? order.product.materials.map(material =>
                                    <div key={material.material.materialId}>
                                        <h4 className='fw-bold'>Material #{material.material.materialId}</h4>
                                        <ul>
                                            <li>Name: {material.material.materialName}</li>
                                            <li>Weight: {material.weight}</li>
                                        </ul>
                                    </div>
                                )
                                : <>
                                </>
                            }
                            <h4>Quotation price: <span style={{ color: 'red' }}>{order.qmaterialPrice === null ? 'None' : formatPrice(order.qmaterialPrice)}</span></h4>
                            <h4>Order price: <span style={{ color: '#48AAAD' }}>{formatPrice(order.omaterialPrice)}</span></h4>
                            <h4 className='fw-bold'>Extra</h4>
                            <ul>
                                <li>Extra diamonds: {formatPrice(order.ediamondPrice)}</li>
                                <li>Extra materials: {formatPrice(order.ematerialPrice)}</li>
                                <li>Production price: {formatPrice(order.productionPrice)}</li>
                            </ul>
                            <h5>Tax fee (10% VAT): {formatPrice(order.taxFee)}</h5>
                            <h4><b>TOTAL PRICE {formatDate(order.qdate)}: <span style={{ color: '#48AAAD' }}>{formatPrice(order.totalAmount)}</span></b></h4>

                        </div>
                        {
                            order.status != 'completed' && staffType == 'manage'
                                ? <div className="col">
                                    <h2 className="fw-bold">ASSIGNMENT</h2>
                                    <AssignColumn order={order} fetchOrder={fetchOrder} />
                                </div>
                                : <>
                                </>
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default OrderDetails;