import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate } from '../../helper_function/ConvertFunction';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '/src/css/Production.module.css';
import empty_image from '/src/assets/empty_image.jpg';
import useDocumentTitle from '../../components/Title';

const Production = ({ order }) => {

    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useDocumentTitle("Complete Production");

    const handleSubmit = async () => {
        try {
            if (imageUrl == "Not provided") {
                toast.info("Please upload your completed product's image!");
            } else {
                const response = await axios.post(`http://localhost:8080/api/${order.id}/complete-product?imageUrl=${imageUrl}&productionStaffId=${sessionStorage.getItem("staff_id")}`);
                if (!response.data || response.status === 204) {
                    toast.error("Something went wrong, can't submit");
                } else {
                    console.log(response.data);
                    navigate("/staff/request");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const uploadImage = async () => {
        try {
            if (imageFile === null) {
                toast.info(`Please select a file to upload`);
            } else {
                setProcessing(true);
                const formData = new FormData();
                formData.append("file", imageFile);
                const response = await axios.post(`http://localhost:8080/api/upload`, formData);
                if (!response.data || response.status === 204) {
                    throw new Error("Upload file failed. Backend fail");
                }
                setImageUrl(response.data);
                setProcessing(false);
            }
        } catch (error) {
            toast.error(`Something went wrong`);
            console.log(error);
            setProcessing(false);
        }
    }

    return (
        <>
            <div className='container-fluid' id={`${styles['production']}`}>
                <div className="row">
                    <h1 className='fw-bold'>
                        <FontAwesomeIcon onClick={() => navigate('/staff/request')} icon={faChevronLeft} className='me-3' id={`${styles['go-back-icon']}`} />
                        Production Order
                    </h1>
                </div>

                <div className="row mb-2">
                    <div className="col-6">
                        <h4 className='fw-bold'>Customer name</h4>
                        <p className='fs-4'>[ID: {order.customer.customerId}] {order.customer.name}</p>
                        <h4 className='fw-bold'>Customer address</h4>
                        <p className='fs-4'>{order.customer.address}</p>
                        {order.orderType !== "from_design"
                            ? <>
                                <h4 className='fw-bold'>Customer budget</h4>
                                <p className='fs-4'>{formatPrice(order.budget)}</p>
                                <h4 className='fw-bold'>Description</h4>
                                <p className='fs-4' style={{ maxWidth: '500px', wordWrap: 'break-word' }} >{order.description}</p>
                                <h4 className='fw-bold'>Model - by [ID: {order.designStaff.staffId}]{order.designStaff.name}</h4>
                                <img className='img-fluid' src={order.modelFile == 'Not provided' ? empty_image : order.modelFile} alt="" style={{ width: '500px', height: '500px' }} />
                            </>
                            : <>
                                <h4 className='fw-bold'>Design model</h4>
                                <img className='img-fluid' src={order.designFile == 'Not provided' ? emptyImage : order.designFile} alt="" style={{ width: '500px', height: '500px' }} />
                            </>
                        }
                    </div>
                    <div className="col-6">
                        {order.product.diamonds.map(diamond =>
                            <div key={diamond.diamondId}>
                                <h4 className='fw-bold'>Diamond #{diamond.diamondId}</h4>
                                <ul>
                                    <li>Shape: {diamond.shape}</li>
                                    <li>Clarity: {diamond.clarity}</li>
                                    <li>Color: {diamond.color}</li>
                                    <li>Cut: {diamond.cut}</li>
                                </ul>
                            </div>
                        )}
                        <h4>Total: <span className='text-success'>{formatPrice(order.odiamondPrice)}</span></h4>
                        {order.product.materials.map(material =>
                            <div key={material.material.materialId}>
                                <h4 className='fw-bold'>Material #{material.material.materialId}</h4>
                                <ul>
                                    <li>Name: {material.material.materialName}</li>
                                    <li>Weight: {material.weight} karat</li>
                                </ul>
                            </div>
                        )}
                        <h4>Total: <span className='text-success'>{formatPrice(order.omaterialPrice)}</span></h4>
                        <h4 className='fw-bold'>Extra</h4>
                        <ul>
                            <li>Extra diamonds: {formatPrice(order.ediamondPrice)}</li>
                            <li>Extra materials: {formatPrice(order.ematerialPrice)}</li>
                            <li>Production price: {formatPrice(order.productionPrice)}</li>
                        </ul>
                        <h4>Total price as of {formatDate(order.odate)}: <span className='text-success'>{formatPrice(order.totalAmount)}</span></h4>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        <label className="form-label">Upload completed image of product</label>
                        <input className="form-control mb-3" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                        {
                            imageUrl !== null
                                ? <img className='img-fluid mb-3' src={imageUrl} crossOrigin='anonymous'>
                                </img>
                                : <p>URL: Not provided</p>
                        }
                        <div className="row">
                            <div className="col">
                                {
                                    processing
                                        ? < button className="btn btn-primary w-100" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status">Loading...</span>
                                        </button>
                                        : <button className="btn btn-primary w-100" onClick={uploadImage} >Upload image</button>
                                }

                            </div>
                            <div className="col">
                                <button className='btn btn-secondary w-100' onClick={handleSubmit}>Submit order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Production