import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useParams } from 'react-router-dom';

const WaitSaleStaff = (order) => {

    return (
        <>

        </>
    )
}

const RequestDetailPage = () => {
    const orderId = useParams().orderId;
    const order = {
        orderId: 5,
        customerId: 1,
        customerName: 'Nguyen Huynh Thanh Liem',
        productId: 5,
        status: 'customer_accept',
        orderDate: new Date('2024-05-27T15:16:00'),
        orderType: 'customize',
        budget: '5000000',
        designFile: 'design_file_1',
        description: 'description_1',
        qDiamondPrice: 2500000,
        qMaterialPrice: 3500000,
        qDate: new Date('2024-05-28T15:16:00'),
        oDiamondPrice: 4000000,
        oMaterialPrice: 5000000,
        oDate: new Date('2024-05-29T15:16:00'),
        modelFile: null,
        modelFeedback: null,
        productImage: null,
        shippingFee: 1000000,
        taxFee: 2000000,
        discount: 10,
        totalAmount: null,
        saleStaffId: null,
        designStaffId: null,
        productionStaffId: null,
        eDiamondPrice: null,
        eMaterialPrice: null,
        productionPrice: null,
        markupRate: null
    }
    switch (order.status) {
        case "wait_sale_staff":
            break;
        case "wait_manager":
            return (
                <WaitSaleStaff />
            );
        case "manager_approved":
            break;
        case "wait_customer":
            break;
        case "customer_accept":
            break;
        case "designing":
            break;
        case "pending_design":
            break;
        case "production":
            break;
        case "delivered":
            break;
        case "completed":
            break;
        default:
    }
}

export default RequestDetailPage;