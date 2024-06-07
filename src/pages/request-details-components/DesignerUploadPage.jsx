import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DesignerUploadPage = ({ order }) => {
    const [designFile, setDesignFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(`Not provided`);

    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();

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
                setImageUrl(response.data);
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
            <Toaster position="top-center" richColors expand={true} />
            <div className="container">
                <div className="row">
                    <div className="col-md-10 text-center">
                        <h1>Upload design file</h1>
                        <div>
                            <div className="mb-3">
                                <input className="form-control mb-3" type="file" accept="image/*" onChange={(e) => setDesignFile(e.target.files[0])} />
                                <p>File URL: {imageUrl}</p>
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