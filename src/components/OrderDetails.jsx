import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate, formatPrice } from '../helper_function/ConvertFunction';
import styles from '/src/css/OrderDetails.module.css';
import empty_image from '/src/assets/empty_image.jpg';

const OrderDetails = ({ order }) => {

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
                        <div className="col-6">
                            <h4 className='fw-bold'>Customer name</h4>
                            <p className='fs-4'>[ID: {order.customer.customerId}] {order.customer.name}</p>
                            <h4 className='fw-bold'>Customer address</h4>
                            <p className='fs-4'>{order.customer.address}</p>
                            <h4 className='fw-bold'>Reference image</h4>
                            <img className='img-fluid' src={order.designFile === null ? empty_image : order.designFile} alt="" style={{ width: '300px', height: '300px' }} />
                            <h4 className='fw-bold'>Production image</h4>
                            <img className='img-fluid' src={order.productImage === null ? empty_image : order.productImage} alt="" style={{ width: '300px', height: '300px' }} />
                        </div>
                        <div className="col-6">
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
                            <h4><b>TOTAL PRICE {formatDate(order.qdate)}: <span style={{ color: '#48AAAD' }}>{formatPrice(order.totalAmount)}</span></b></h4>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default OrderDetails;