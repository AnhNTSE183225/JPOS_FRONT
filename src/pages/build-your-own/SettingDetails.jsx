import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingDetails = () => {

    const designId = useParams().designId;
    const [productDesign, setProductDesign] = useState(null);

    const fetchData = async () => {
        try {
            console.log(`GET http://localhost:8080/api/product-designs/${designId}`);
            const response = await axios.get(`http://localhost:8080/api/product-designs/${designId}`);
            if (!response.data || response.status === 204) {
                console.log(`Error, cannot fetch, wrong id or something`);
            } else {
                setProductDesign(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    if (productDesign === null) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    } else {
        return (
            <>
                <div>
                    productDesignId: {productDesign.productDesignId} <br/>
                    designName: {productDesign.designName} <br/>
                    designType: {productDesign.designType} <br/>
                    designFile {productDesign.designFile} <br/>
                    Shells: <br/>
                    {productDesign.productShellDesigns.map(shell => 
                        <p key={shell.productShellDesignId}>
                            productShellDesignId: {shell.productShellDesignId} <br/>
                            shellName: {shell.shellName} <br/>
                            diamondQuantity: {shell.diamondQuantity} <br/>
                            productionPrice: {shell.productionPrice} <br/>
                            ediamondPrice: {shell.ediamondPrice} <br/>
                            ematerialPrice: {shell.ematerialPrice}
                        </p>
                    )}
                </div>
            </>
        )
    }
}

export default SettingDetails;