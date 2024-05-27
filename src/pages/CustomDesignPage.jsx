import NavigationBar from "../components/NavigationBar";
import './CustomDesignPage.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
    }

    return (
        <div>
            <NavigationBar />
            <div>
                <h1>Design your own</h1>
                <div>
                    <div>
                        <p>Give us reference images of your idea</p>
                        <textarea value={designFile} onChange={handleDesignFile} rows='1' cols='30'></textarea>
                    </div>
                    <div>
                        <p>Describe what you want</p>
                        <textarea value={description} onChange={handleDescription} rows='6' cols='30'></textarea>
                    </div>
                    <div>
                        <p>What's your budget?</p>
                        <textarea value={budget} onChange={handleBudget} rows='1' cols='30'></textarea>
                    </div>
                    <div>
                        <button onClick={submitForm}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomDesignPage;