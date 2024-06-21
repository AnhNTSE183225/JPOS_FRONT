import axios from 'axios';

export const fetchMaterialPrice = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/materialPrices/${id}`);
        if (response.status === 204) {
            return 0;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error(error);
        return 0; // Return 0 in case of error to not break the total calculation
    }
};

export const fetchDiamondPrice = async (origin, shape, caratWeight, color, clarity, cut) => {

    const response = await axios.post(`http://localhost:8080/api/diamond-price/get-single-price`,
        {
            origin: origin,
            cut: cut,
            clarity: clarity,
            caratWeight: caratWeight,
            color: color,
            shape: shape
        }
    )
    if (!response.data || response.status === 204) {
        console.log("Failed to fetch diamond price");
    }
    return response.data;
};