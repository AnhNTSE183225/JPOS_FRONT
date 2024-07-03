import { useEffect, useState } from "react";
import { fetchMaterialPrice } from "../helper_function/FetchPriceFunctions";
import axios from "axios";

const MaterialPriceListPage = () => {

    const [materials, setMaterials] = useState(null);

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/material/all`, { headers });
            let priced_materials = []
            for (const material of response.data) {
                priced_materials.push(
                    {
                        ...material,
                        price: await fetchMaterialPrice(material.materialId)
                    }
                )
            }
            setMaterials(priced_materials);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])
    
    return (
        <div className="container-fluid">
            {
                materials !== null
                    ? <>
                        {
                            materials.map((value, index) => (
                                <div key={index}>
                                    <p>
                                        {value.materialId}
                                    </p>
                                    <p>
                                        {value.materialName}
                                    </p>
                                    <p>
                                        {value.price}
                                    </p>
                                </div>
                            ))
                        }
                    </>
                    : <></>
            }
        </div>
    )
}

export default MaterialPriceListPage;