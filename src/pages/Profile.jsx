import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import NavigatonBar from '../components/NavigationBar'
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
    return (
        <>
            <NavigatonBar />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <Sidebar />
                    </div>
                    <div className='col'>
                        <h1>Liem</h1>
                    </div>
                    <div className='col'>
                        <h1>Liem</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <h1>Liem</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;