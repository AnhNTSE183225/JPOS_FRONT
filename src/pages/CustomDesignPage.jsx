import NavigationBar from "../components/NavigationBar";
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import img from '../assets/jewelry_manufacturing_process.png';
import './CustomDesignPage.css'
import axios from 'axios';

const CustomDesignPage = () => {

    const [designFile, setDesignFile] = useState(null);
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [imageUrl, setImageUrl] = useState(`Not provided`);

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleBudget = (event) => {
        setBudget(event.target.value);
    }

    const uploadImage = async () => {
        try {
            if (designFile === null) {
                toast.info(`Please select a file to upload`);
            } else {
                const formData = new FormData();
                formData.append("file", designFile);
                const response = await axios.post(`http://localhost:8080/api/upload`, formData);
                if(!response.data || response.status === 204) {
                    throw new Error("Upload file failed. Backend fail");
                }
                setImageUrl(response.data);
            }
        } catch (error) {
            toast.error(`Something went wrong`);
            console.log(error);
        }
    }

    const submitForm = () => {
        if (description.length != 0 && budget.length != 0) {
            axios.post('http://localhost:8080/api/send-request',
                {
                    customerId: sessionStorage.getItem('customer_id'),
                    designFile: imageUrl,
                    description: description,
                    budget: budget
                }
            ).then(
                response => {
                    toast.success('Form submitted successfully!');
                    setDesignFile('');
                    setDescription('');
                    setBudget('');
                }
            ).catch(
                error => {
                    console.log(error);
                    toast.error("Something went wrong! Please try again");
                }
            )
        } else {
            toast.error('Please fill in all fields!');
        }
    }

    return (
        <>
            <Toaster position='top-center' richColors expand={true} />
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h1>Design your own</h1>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Give us reference images of your idea</label>
                                <input className="form-control mb-3" type="file" accept="image/*" onChange={(e) => setDesignFile(e.target.files[0])} />
                                <p>URL: {imageUrl}</p>
                                <button className="btn btn-primary" onClick={uploadImage} >Upload image</button>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Describe what you want</label>
                                <textarea maxLength={255} className="form-control" value={description} onChange={handleDescription} rows='5' cols='30' aria-label="description"></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">What's your budget?</label>
                                <textarea maxLength={255} className="form-control" value={budget} onChange={handleBudget} rows='1' cols='30'></textarea>
                            </div>
                            <div>
                                <button className="btn btn-dark w-100" onClick={submitForm}>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <img src={img} className="img-fluid" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomDesignPage;