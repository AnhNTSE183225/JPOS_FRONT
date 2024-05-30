import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import {formatDate, formatPrice} from '../helper_function/ConvertFunction'
import {Link} from 'react-router-dom'

const orders = [
    {
        orderId: 1,
        customerId: 1,
        customerName: 'Nguyen Tran Tuan Khang',
        productId: null,
        status: 'wait_sale_staff',
        orderDate: new Date('2024-05-27T15:16:00'),
        orderType: 'customize',
        budget: '5000000',
        designFile: 'design_file_1',
        description: 'description_1',
        qDiamondPrice: null,
        qMaterialPrice: null,
        qDate: null,
        oDiamondPrice: null,
        oMaterialPrice: null,
        oDate: null,
        modelFile: null,
        modelFeedback: null,
        productImage: null,
        shippingFee: null,
        taxFee: null,
        discount: null,
        totalAmount: null,
        saleStaffId: null,
        designStaffId: null,
        productionStaffId: null,
        eDiamondPrice: null,
        eMaterialPrice: null,
        productionPrice: null,
        markupRate: null
    },
    {
        orderId: 2,
        customerId: 1,
        customerName: 'Nguyen Duc Truong Thinh',
        productId: 2,
        status: 'wait_manager',
        orderDate: new Date('2024-05-27T15:16:00'),
        orderType: 'customize',
        budget: '5000000',
        designFile: 'design_file_1',
        description: 'description_1',
        qDiamondPrice: 2500000,
        qMaterialPrice: 3500000,
        qDate: new Date('2024-05-28T15:16:00'),
        oDiamondPrice: null,
        oMaterialPrice: null,
        oDate: null,
        modelFile: null,
        modelFeedback: null,
        productImage: null,
        shippingFee: null,
        taxFee: null,
        discount: null,
        totalAmount: null,
        saleStaffId: null,
        designStaffId: null,
        productionStaffId: null,
        eDiamondPrice: null,
        eMaterialPrice: null,
        productionPrice: null,
        markupRate: null
    },
    {
        orderId: 3,
        customerId: 1,
        customerName: 'Hua Tan Thinh',
        productId: 3,
        status: 'manager_approved',
        orderDate: new Date('2024-05-27T15:16:00'),
        orderType: 'customize',
        budget: '5000000',
        designFile: 'design_file_1',
        description: 'description_1',
        qDiamondPrice: 2500000,
        qMaterialPrice: 3500000,
        qDate: new Date('2024-05-28T15:16:00'),
        oDiamondPrice: null,
        oMaterialPrice: null,
        oDate: null,
        modelFile: null,
        modelFeedback: null,
        productImage: null,
        shippingFee: null,
        taxFee: null,
        discount: null,
        totalAmount: null,
        saleStaffId: null,
        designStaffId: null,
        productionStaffId: null,
        eDiamondPrice: null,
        eMaterialPrice: null,
        productionPrice: null,
        markupRate: null
    },
    {
        orderId: 4,
        customerId: 1,
        customerName: 'Moc Nguyen',
        productId: 4,
        status: 'wait_customer',
        orderDate: new Date('2024-05-27T15:16:00'),
        orderType: 'customize',
        budget: '5000000',
        designFile: 'design_file_1',
        description: 'description_1',
        qDiamondPrice: 2500000,
        qMaterialPrice: 3500000,
        qDate: new Date('2024-05-28T15:16:00'),
        oDiamondPrice: null,
        oMaterialPrice: null,
        oDate: null,
        modelFile: null,
        modelFeedback: null,
        productImage: null,
        shippingFee: null,
        taxFee: null,
        discount: null,
        totalAmount: null,
        saleStaffId: null,
        designStaffId: null,
        productionStaffId: null,
        eDiamondPrice: null,
        eMaterialPrice: null,
        productionPrice: null,
        markupRate: null
    },
    {
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
];

const TableComponent = () => {
    return (
        <table className='table table-hover'>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Date</th>
                    <th>Budget</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.customerName}</td>
                        <td>{formatDate(order.orderDate)}</td>
                        <td>{formatPrice(order.budget)}</td>
                        <td>Completed</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

const HistoryPage = () => {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <h1>History</h1>
                </div>
                <div className='row'>
                    <TableComponent />
                </div>
            </div>
        </>
    );
}

export default HistoryPage;