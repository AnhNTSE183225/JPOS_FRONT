import { useEffect, useState } from "react";
import { fetchMaterialPrice } from "../helper_function/FetchPriceFunctions";
import axios from "axios";
import styles from '/src/css/MaterialPriceListPage.module.css';
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";

const MaterialPriceListPage = () => {

    const [materials, setMaterials] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/public/material/all`);
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

    const [num, setNum] = useState(0);
    console.log(typeof(num));

    return (
        <div className={`container ${styles[`list-page`]}`}>
            <input value={num} onChange={(e) => setNum(e.target.value)} className="form-control" type="number" min={0} max={10} step={0.1} />
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
                                <th style={{ backgroundColor: "#48AAAD", color: "white" }}>PRECIOUS MATERIAL <span style={{ fontWeight: "normal" }}>(carat)</span></th>
                                <th style={{ backgroundColor: "#48AAAD", color: "white" }}>PRICE <span style={{ fontWeight: "normal" }}>(USD)</span></th>
                            </tr>
                        </thead>
                        <tbody className={`${styles[`content`]}`}>

                            {
                                materials.map((value, index) => (
                                    <tr key={index}>
                                        <td>
                                            {
                                                value.materialName.replaceAll("_", " ").split(" ").map((word, i) => i === 0
                                                    ? word.charAt(0).toUpperCase() + word.slice(1)
                                                    : word.toUpperCase()
                                                ).join(" ")
                                            }
                                        </td>
                                        <td>
                                            {formatPrice(value.price)}
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