import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../helper_function/ConvertFunction';
import useDocumentTitle from '../../components/Title';

const DesignerUploadPage = ({ order }) => {
    const [designFile, setDesignFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [processing, setProcessing] = useState(false);

    useDocumentTitle("Upload Design");

    const navigate = useNavigate();

    useEffect(() => {
        if (designFile !== null) {
            const objectURL = URL.createObjectURL(designFile);
            setImageUrl(objectURL);
        }
    }, [designFile])

    const uploadImage = async () => {
        try {
            if (designFile === null) {
                toast.info(`Please select a file to upload`);
            } else {
                setProcessing(true);
                const formData = new FormData();
                formData.append("file", designFile);
                const response = await axios.post(`http://localhost:8080/api/designs/upload/${sessionStorage.getItem("staff_id")}/${order.id}`, formData);
                if (!response.data || response.status === 204) {
                    throw new Error("Upload file failed. Backend fail");
                }
                setProcessing(false);
                navigate('/staff/request');
            }
        } catch (error) {
            toast.error(`Something went wrong`);
            console.log(error);
            setProcessing(false);
        }
    }

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="mb-2">
                        <h3>
                            <b>Design order</b>
                        </h3>
                    </div>
                    <div className="col-md-6 px-3">
                        <p>
                            <b>Full Name</b>
                        </p>
                        <p className="px-3">{order.customer.name}</p>
                        <p>
                            <b>Description</b>
                        </p>
                        <p className="px-3">{order.description}</p>
                        <p>
                            <b>Budget</b>
                        </p>
                        <p className="px-3">{order.budget}</p>
                        <p>
                            <b>Reference image</b>
                        </p>
                        <img crossOrigin="anonymous" src={order.designFile} className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-6 px-2">
                        <div className='row'>
                            <p><b>Product ID: </b> <b>{order.product.productId}</b></p>
                            <p>
                                <b>
                                    Chosen diamonds
                                </b>
                            </p>
                            <div className='col'>
                                <table className='table table-hover text-center'>
                                    <thead>
                                        <tr>
                                            <th>Num</th>
                                            <th>ID</th>
                                            <th>Code</th>
                                            <th>Cut</th>
                                            <th>Color</th>
                                            <th>Clarity</th>
                                            <th>Carat Weight</th>

                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {order.product.diamonds.map((diamond, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{diamond.diamondId}</td>
                                                <td>{diamond.diamondCode}</td>
                                                <td>{diamond.cut}</td>
                                                <td>{diamond.color}</td>
                                                <td>{diamond.clarity}</td>
                                                <td>{diamond.caratWeight}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Diamond price: {formatPrice(order.qdiamondPrice + order.ediamondPrice)}</p>
                            </div>

                            <div className='col'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th>Num</th>
                                            <th>ID</th>
                                            <th>Material Name</th>
                                            <th>Weight</th>
                                        </tr>
                                    </thead>
                                    <tbody className='table-group-divider'>
                                        {order.product.materials.map(
                                            (material, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{material.material.materialId}</td>
                                                    <td>{material.material.materialName}</td>
                                                    <td>{material.weight}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <p className="fw-semibold">Material price: {formatPrice(order.qmaterialPrice + order.ematerialPrice)}</p>
                            </div>

                            <div>
                                <p className="fw-semibold">Extra diamond: {formatPrice(order.ediamondPrice)}</p>
                                <p className="fw-semibold">Extra material: {formatPrice(order.ematerialPrice)}</p>
                            </div>
                            <div>
                                <p className="fw-semibold">Production: {formatPrice(order.productionPrice)}</p>
                                <p className="fw-semibold">Markup rate: {order.markupRate}</p>
                            </div>
                            <hr />
                            <div>
                                <p><b>Total Price: {formatPrice(order.totalAmount)}</b></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Upload design file</h1>
                        <div>
                            <div className="mb-3">
                                <input className="form-control mb-3" type="file" accept="image/*" onChange={(e) => setDesignFile(e.target.files[0])} />
                                {
                                    imageUrl !== null
                                        ? <img className='img-fluid mb-3' src={imageUrl} crossOrigin='anonymous' />
                                        : <p>Image preview...</p>
                                }
                                {
                                    processing
                                        ? < button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status">Loading...</span>
                                        </button>
                                        : <button className="btn btn-primary" onClick={uploadImage} >Upload image</button>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </>
    );
}
export default DesignerUploadPage;