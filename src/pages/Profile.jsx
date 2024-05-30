import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className="card" style={{ width: '400px' }}>
                            <img className="card-img-top" src="img_avatar1.png" alt="Card image" />
                            <div className="card-body">
                                <h4 className="card-title">John Doe</h4>
                                <p className="card-text">Some example text.</p>
                                <a href="#" className="btn btn-primary">See Profile</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
