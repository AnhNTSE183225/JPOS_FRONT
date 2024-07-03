import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageDesignPrice = () => {

    const [productDesigns, setProductDesigns] = useState(null);

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-designs/all`, {headers});
            if(!response.data || response.status === 204) {
                toast.info(`Can't fetch data`);
            } else {
                setProductDesigns(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    console.log(productDesigns);

    return (
        <div className="container-fluid">

        </div>
    )
}

export default ManageDesignPrice;