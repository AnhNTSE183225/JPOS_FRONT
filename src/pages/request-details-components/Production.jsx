import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, formatDate } from '../../helper_function/ConvertFunction';
import { Toaster, toast } from 'sonner';
import axios from 'axios';

const Production = ({ order }) => {

    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(`Not provided`);

    const handleSubmit = async () => {
        try {
            if(imageUrl == "Not provided") {
                toast.info("Please upload your completed product's image!");
            } else {
                const response = await axios.post(`http://localhost:8080/api/${order.id}/complete-product?imageUrl=${imageUrl}&productionStaffId=${sessionStorage.getItem("staff_id")}`);
                if(!response.data || response.status === 204) {
                    toast.error("Something went wrong, can't submit");
                } else {
                    console.log(response.data);
                    navigate("/profile/request");
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
            <div className='container-fluid'>
                <Toaster position="top-center" richColors expand={true} />
                <div className='container'>
                    <div className='row p-3'>
                        <ul className='list-group'>
                            <li className='list-group-item'>Order id: {order.id}</li>
                            <li className='list-group-item'>
                                Order date: {formatDate(order.orderDate)}
                            </li>
                            <li className='list-group-item'>
                                Customer specification:
                                <ul className='list-group'>
                                    <li className='list-group-item'>
                                        Reference image:
                                        <img className='img-fluid' crossOrigin='anonymous' src={order.designFile} alt="" />
                                    </li>
                                    <li className='list-group-item'>Budget: {formatPrice(order.budget)}</li>
                                    <li className='list-group-item'>
                                        Description: <br />
                                        <textarea readOnly className='form-control' name="" id="" defaultValue={order.description}></textarea>
                                    </li>
                                </ul>
                            </li>
                            <li className='list-group-item'>
                                Customer information:
                                <ul className='list-group'>
                                    <li className='list-group-item'>ID: {order.customer.customerId}</li>
                                    <li className='list-group-item'>Username: {order.customer.username}</li>
                                    <li className='list-group-item'>name: {order.customer.name}</li>
                                    <li className='list-group-item'>Address: {order.customer.address}</li>
                                </ul>
                            </li>
                            <li className='list-group-item'>
                                Product:
                                <ul className='list-group'>
                                    <li className='list-group-item'>ID: {order.product.productId}</li>
                                    <li className='list-group-item'>Name: {order.product.productName}</li>
                                    <li className='list-group-item'>Production price: {order.product.productionPrice}</li>
                                    <li className='list-group-item'>Markup rate: {order.product.markupRate}</li>
                                    <li className='list-group-item'>Product type: {order.product.productType}</li>
                                    <li className='list-group-item'>Extra material price: {order.product.ematerialPrice}</li>
                                    <li className='list-group-item'>Extra diamond price: {order.product.ediamondPrice}</li>
                                    <li className='list-group-item'>
                                        Main diamonds:
                                        <ul className='list-group'>
                                            {order.product.diamonds.map(diamond => (
                                                <li key={diamond.diamondId} className='list-group-item'>
                                                    <ul className='list-group'>
                                                        <li className='list-group-item'>ID: {diamond.diamondId}</li>
                                                        <li className='list-group-item'>Code: {diamond.diamondCode}</li>
                                                        <li className='list-group-item'>Name: {diamond.diamondName}</li>
                                                        <li className='list-group-item'>Shape: {diamond.shape}</li>
                                                        <li className='list-group-item'>Origin: {diamond.origin}</li>
                                                        <li className='list-group-item'>Proportions: {diamond.proportions}</li>
                                                        <li className='list-group-item'>Fluorescence: {diamond.fluorescence}</li>
                                                        <li className='list-group-item'>Symmetry: {diamond.symmetry}</li>
                                                        <li className='list-group-item'>Polish: {diamond.polish} </li>
                                                        <li className='list-group-item'>Cut: {diamond.cut}</li>
                                                        <li className='list-group-item'>Color: {diamond.color}</li>
                                                        <li className='list-group-item'>Clarity: {diamond.clarity}</li>
                                                        <li className='list-group-item'>Crt. Weight: {diamond.caratWeight}</li>
                                                        <li className='list-group-item'>Note: {diamond.note}</li>
                                                    </ul>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="row mb-3 p-3">
                        <label className="form-label">Upload completed image of product</label>
                        <input className="form-control mb-3" type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                        <p>URL: {imageUrl}</p>
                        {
                            processing
                                ? < button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                </button>
                                : <button className="btn btn-primary" onClick={uploadImage} >Upload image</button>
                        }
                    </div>
                    <div className='row mb-3 p-3'>
                        <button className='btn btn-secondary' onClick={handleSubmit}>Submit order</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Production