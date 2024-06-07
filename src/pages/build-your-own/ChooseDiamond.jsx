import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DiamondCard from './DiamondCard';
import NavigationBar from '../../components/NavigationBar';
import styles from '/src/css/ChooseDiamonds.module.css';
// import { Context } from '../FrameBuildYourOwn';
import { Context } from '../frame/BuildYourOwnFrame';

const ChooseDiamond = () => {

    const [productSetting, setProductSetting] = useContext(Context);
    const [chosenDiamonds, setChosenDiamonds] = useState([]);
    const [diamondList, setDiamondList] = useState([]);

    const navigate = useNavigate();

    const completeProduct = () => {
        if(chosenDiamonds.length !== productSetting.quantity) {
            toast.info(`You haven't chosen all the necessary diamonds, you need to choose ${productSetting.quantity - chosenDiamonds.length} more!`);
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
                if (chosenDiamonds.length < productSetting.quantity) {
                    setChosenDiamonds(list => [
                        ...list,
                        id
                    ]);
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

    return (
        <>
        <NavigationBar />
            <div className={`${styles.container} container`}>
                <Toaster position="top-center" richColors expand={true} />
                <div className="row my-3 px-5 align-items-center">
                    <div className="col-md-4 mx-auto">
                        <button onClick={completeProduct} className='btn btn-primary w-100'>Proceed</button>
                    </div>
                </div>
                <div className='row my-3 px-5'>
                    {diamondList.length > 0 ? (
                        diamondList.map(diamond => (
                            <div key={diamond.diamondId} className="col-md-3 mb-4">
                                <DiamondCard
                                    diamond={diamond}
                                    isSelected={chosenDiamonds.includes(diamond.diamondId)}
                                    onClick={handleChoose}
                                />
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ChooseDiamond;
