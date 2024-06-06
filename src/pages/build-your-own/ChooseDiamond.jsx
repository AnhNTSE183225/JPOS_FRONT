import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Toaster, toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../FrameBuildYourOwn';

const ChooseDiamond = () => {

    const [productSetting, setProductSetting] = useContext(Context);
    const [chosenDiamonds, setChosenDiamonds] = useState([]);
    const [diamondList, setDiamondList] = useState([]);

    const navigate = useNavigate();

    const completeProduct = () => {
        if(chosenDiamonds.length !== productSetting.diamondQuantity) {
            toast.info(`You haven't chosen all the neccessary diamonds, you need to choose ${productSetting.diamondQuantity - chosenDiamonds.length} more!`);
        } else {
            setProductSetting(p => ({
                ...p,
                diamonds: chosenDiamonds
            }))
            navigate("/build-your-own/complete-product");
        }
    }

    const handleChoose = (id, isAdd) => {
        if (productSetting.designId === null) {
            toast.info("Please select a design first!");
        } else {
            if (isAdd) {
                if (chosenDiamonds.length < productSetting.diamondQuantity) {
                    setChosenDiamonds(list => [
                        ...list,
                        id
                    ])
                } else {
                    toast.info(`You have chosen ${chosenDiamonds.length} out of ${chosenDiamonds.length} diamonds`);
                }
            } else {
                if (chosenDiamonds.length > 0) {
                    setChosenDiamonds(list => list.filter(diamondId => diamondId !== id));
                } else {
                    toast.error("Error, no diamonds chosen yet");
                }
            }
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamonds/all`);
            if (!response.data || response.status === 204) {
                toast.error("Error fetching the diamonds from the server");
            } else {
                setDiamondList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (diamondList.length > 0) {
        return (
            <div className='container-fluid'>
                <Toaster position="top-center" richColors expand={true} />
                <div className="row my-3 px-5 align-items-center">
                    <div className="col-md-4 mx-auto">
                        <button onClick={completeProduct} className='btn btn-primary w-100'>Proceed</button>
                    </div>
                </div>
                <div className='row my-3 px-5'>
                    {diamondList.map(diamond => (
                        <div key={diamond.diamondId} className="col-md-3 mb-4">
                            <div className="card h-100 d-flex flex-column">
                                <img src="https://dictionary.cambridge.org/vi/images/thumb/diamon_noun_002_10599.jpg?version=6.0.15" className="card-img-top" alt="..." />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{diamond.diamondCode} - {diamond.diamondName}</h5>
                                    <p className="card-text" style={{ flex: 1 }}>
                                        {diamond.shape}, {diamond.origin}, {diamond.cut}, {diamond.color}, {diamond.clarity}, {diamond.caratWeight}
                                    </p>
                                    {
                                        chosenDiamonds.includes(diamond.diamondId)
                                            ? <button onClick={() => handleChoose(diamond.diamondId, false)} className='btn btn-danger'>
                                                Deselect
                                            </button>
                                            : <button onClick={() => handleChoose(diamond.diamondId, true)} className='btn btn-success'>
                                                Select
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <>
                <Toaster position="top-center" richColors expand={true} />
                Loading...
            </>
        )
    }
}

export default ChooseDiamond;