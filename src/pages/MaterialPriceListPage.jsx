import { useEffect, useState } from "react";
import { fetchMaterialPrice } from "../helper_function/FetchPriceFunctions";
import axios from "axios";
import styles from '/src/css/MaterialPriceListPage.module.css';
import { formatDate } from "../helper_function/ConvertFunction";

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
        <div className={`container ${styles[`list-page`]}`}>
            <div className={`${styles[`page-title`]}`}>
                <p>Precious Material Price List</p>
            </div>
            <div>
                <p>Last Updated: {formatDate(new Date())}</p>
            </div>
            {
                materials !== null
                    ?
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th style={{ backgroundColor: "#48AAAD", color: "white" }}>PRECIOUS MATERIAL <span style={{fontWeight: "normal"}}>(carat)</span></th>
                                <th style={{ backgroundColor: "#48AAAD", color: "white" }}>PRICE <span style={{fontWeight: "normal"}}>(USD)</span></th>
                            </tr>
                        </thead>
                        <tbody className={`${styles[`content`]}`}>

                            {
                                materials.map((value, index) => (
                                    <tr key={index}>
                                        {
                                            value.materialName.replaceAll("_", " ").split(" ").map((word, i) => i === 0
                                                    ? word.charAt(0).toUpperCase() + word.slice(1)
                                                    : word.toUpperCase()
                                                ).join(" ")
                                        }
                                        <td>
                                            {value.price}
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                    : <></>
            }
        </div>
    )
}

export default MaterialPriceListPage;