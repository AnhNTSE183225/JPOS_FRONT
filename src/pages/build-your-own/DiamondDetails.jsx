import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '/src/css/DiamondDetails.module.css';
import axios from 'axios';
import { Toaster, toast } from 'sonner';

const DiamondDetails = () => {

    const diamondId = useParams().diamondId;
    const [diamond, setDiamond] = useState(null);

    useEffect(() => {
        fetchDiamond();
    }, [])

    const fetchDiamond = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamonds/${diamondId}`);
            if (!response.data || response.status === 204) {
                toast.error(`Cannot find diamond of id ${diamondId}`);
            } else {
                setDiamond(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    if (diamond === null) {
        return (
            <>
                <Toaster position="top-center" richColors expand={true} />
                <div>Loading...</div>
            </>
        )
    } else {
        return (
            <>
                <div id={`${styles['diamond-details']}`}>
                    <p>Diamond id: {diamond.diamondId}</p>
                </div>
            </>
        )
    }
}

export default DiamondDetails;