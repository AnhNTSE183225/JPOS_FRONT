import NavigationBar from "../components/NavigationBar";
import { useState, useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import img from '../assets/jewelry_manufacturing_process.png';
import './CustomDesignPage.css'
import axios from 'axios';

const CustomDesignPage = () => {

    const [designFile, setDesignFile] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');

    const handleDesignFile = (event) => {
        setDesignFile(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleBudget = (event) => {
        setBudget(event.target.value);
    }

    const submitForm = () => {
        if (designFile.length !== 0 && description.length != 0 && budget.length != 0) {
            axios.post('http://localhost:8080/api/orders?id=1',
                {
                    designFile: designFile,
                    description: description,
                    budget: budget
                }
            ).then(
                (response) => {
                    console.log(response);
                }
            ).catch(
                error => {
                    console.log(error);
                }
            )
        }
        console.log(sessionStorage.getItem('username'));
    }

    return (
        <>
            <NavigationBar />
            <div className="container">

                <div className="row">
                    <div className="col-md-4">
                        <h1>Design your own</h1>
                        <div>
                            <div className="mb-3">
                                <label className="form-label">Give us reference images of your idea</label>
                                <textarea maxLength={255} className="form-control" value={designFile} onChange={handleDesignFile} rows='1' cols='30'></textarea>
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