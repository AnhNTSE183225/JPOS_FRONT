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

export const fetchDiamondPrice = async (cut, color, clarity, fromCaratWeight, toCaratWeight) => {

    const response = await axios.post(`http://localhost:8080/api/get-price-by-4C`,
        {
            cut: cut,
            clarity: clarity,
            fromCaratWeight: fromCaratWeight,
            toCaratWeight: toCaratWeight,
            color: color
        }
    )
    if (!response.data || response.status === 204) {
        console.log("Failed to fetch diamond price");
    }
    return response.data;
};