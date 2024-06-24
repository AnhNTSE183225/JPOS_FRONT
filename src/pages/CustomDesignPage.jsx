import NavigationBar from "../components/NavigationBar";
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import img from '../assets/jewelry_manufacturing_process.png';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../components/Title";

const CustomDesignPage = () => {


    const navigate = useNavigate();
    const [designFile, setDesignFile] = useState(null);
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(500);
    const [imageUrl, setImageUrl] = useState(null);

    const [processing, setProcessing] = useState(false);

    useDocumentTitle("Custom Your Own Design");
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const uploadImage = async () => {
        setProcessing(true);
        try {
            if (designFile === null) {
                toast.info(`Please select a file to upload`);
            } else {
                const formData = new FormData();
                formData.append("file", designFile)
                const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/upload`, formData);
                if (!response.data || response.status === 204) {
                    throw new Error("Upload file failed. Backend fail");
                }
                setImageUrl(response.data);
            }
        } catch (error) {
            toast.error(`Something went wrong`);
            console.log(error);
        }
        setProcessing(false);
    }

    const submitForm = () => {
        if (sessionStorage.getItem('customer_id') == null) {
            toast.info(`Please log in to continue!`);
            navigate("/login");
        } else {
            if (description.trim().length > 0 &&
                budget >= 500
            ) {
                axios.post(`${import.meta.env.VITE_jpos_back}/api/send-request`,
                    {
                        customerId: sessionStorage.getItem('customer_id'),
                        designFile: imageUrl,
                        description: description,
                        budget: budget
                    }
                ).then(
                    response => {
                        toast.success('Form submitted successfully!');
                        setDesignFile(null);
                        setDescription('');
                        setBudget(500);
                        setImageUrl(null);
                    }
                ).catch(
                    error => {
                        console.log(error);
                        toast.error("Something went wrong! Please try again");
                    }
                )
            } else {
                if(description.trim().length <= 0) {
                    toast.error(`Description cannot be empty! You need to describe your product`);
                }
                if(budget < 500) {
                    toast.error(`Budget must be minimum $500 (We don't make custom models for under)`);
                }
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col" style={{ marginLeft: '5vw' }}>
                        <h1 className="text-center">Design your own</h1>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Give us reference images of your idea</label>
                                <input className="form-control mb-3" type="file" accept="image/*" onChange={(e) => setDesignFile(e.target.files[0])} />
                                {
                                    imageUrl !== null
                                    ? <img className="mb-3" src={imageUrl} crossOrigin="anonymous"/>
                                    : <p>URL: Not provided</p>
                                }
                                {
                                    processing
                                        ? < button className="btn btn-primary" type="button" disabled>
                                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            <span role="status">Loading...</span>
                                        </button>
                                        : <button className="btn w-100" style={{ backgroundColor: '#48AAAD' }} onClick={uploadImage} >Upload image</button>
                                }

                            </div>
                            <div className="mb-3">
                                <label className="form-label">Describe details what you want</label>
                                <textarea style={{ resize: "none" }} maxLength={255} className="form-control" value={description} onChange={handleDescription} rows='5' cols='30' aria-label="description"></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">What's your budget? Minimum value: $500</label>
                                <input className="form-control" type="number" min={500} value={budget} onChange={(e) => setBudget(e.target.value)} />
                            </div>

                            <div>
                                <button className="btn btn-dark w-100" onClick={submitForm}>Submit</button>
                            </div>

                        </div>
                    </div>
                    <div className="col" style={{ marginRight: '5vw' }}>
                        <img src={img} className="img-fluid" />
                    </div>
                </div>
            </div >
        </>
    )
}

export default CustomDesignPage;