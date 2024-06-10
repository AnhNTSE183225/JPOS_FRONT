import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DiamondCard from './DiamondCard';
import styles from '/src/css/ChooseDiamonds.module.css';
// import { Context } from '../FrameBuildYourOwn';

const ChooseDiamond = () => {

    const [diamondList, setDiamondList] = useState([]);

    const navigate = useNavigate();

    const handleChoose = (id) => {
        navigate(`/build-your-own/diamond-details/${id}`);
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
        if (sessionStorage.getItem('designId') === null) {
            toast.info(`Please pick a setting first`);
            navigate('/build-your-own/choose-setting');
        } else {
            fetchData();
        }
    }, [])

    const isSelected = (id) => {

        if (sessionStorage.getItem('diamonds') === null || sessionStorage.getItem('diamonds').length === 0) {
            return false;
        } else {
            return sessionStorage.getItem('diamonds').split(',').includes(id.toString());
        }
    }

    return (
        <>
            <div className={`${styles.container} container`}>
                <div className='row my-3 px-5'>
                    {diamondList.length > 0 ? (
                        diamondList.map(diamond => (
                            <div key={diamond.diamondId} className="col-md-3 mb-4">
                                <DiamondCard
                                    diamond={diamond}
                                    isSelected={isSelected(diamond.diamondId)}
                                    onClick={() => handleChoose(diamond.diamondId)}
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
