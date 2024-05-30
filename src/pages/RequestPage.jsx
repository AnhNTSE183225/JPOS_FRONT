import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Sidebar from '../components/Sidebar';

const RequestPage = () => {
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Sidebar active="request"/>
                    </div>
                    <div className='col-md-9'>
                        <h1>TEST</h1>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RequestPage;