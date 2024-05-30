
export const formatPrice = (price) => {
    if(price === null || price === undefined) {
        return "";
    }
    return price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export const formatDate = (dateString) => {
    
    if(dateString === null || dateString === undefined) {
        return "";
    }
    
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
};