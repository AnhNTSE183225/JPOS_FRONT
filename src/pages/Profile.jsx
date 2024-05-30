import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import NavigatonBar from '../components/NavigationBar'
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row min-vh-100 flex-nowrap'>
                    <div className='col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark'>
                        <Sidebar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;