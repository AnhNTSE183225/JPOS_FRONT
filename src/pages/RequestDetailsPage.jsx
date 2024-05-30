import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { useParams } from 'react-router-dom';
import React, {useState} from 'react';

const WaitSaleStaff = (order) => {

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col card'>
                        <div className="card-body">
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1"/>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const RequestDetailPage = () => {
    const orderId = useParams().orderId;

    const [order, setOrder] = useState(undefined);
    


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