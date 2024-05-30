import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import NavigatonBar from '../components/NavigationBar'
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
    return (
        <>
            <div className='container-fluid p-0'>
                <div className='row'>
                    <div className='col-md-2'>
                        <Sidebar active="home"/>
                    </div>
                    <div className='col py-3'>
                        <h1>Liem</h1>
                    </div>
                    <div className='col'>
                        <h1>Liem</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;