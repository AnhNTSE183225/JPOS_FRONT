import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';

const ProfilePage = () => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                   
                    <div className='col-md-10'>
                        <section className="vh-100">
                            <div className="container py-5 h-100">
                                <div className="row d-flex justify-content-center align-items-center h-100">
                                    <div className="col-md-12 col-xl-4">
                                        <div className="card" style={{ borderRadius: '15px' }}>
                                            <div className="card-body text-center">
                                                <div className="mt-3 mb-4">
                                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                                        className="rounded-circle img-fluid" style={{ width: '100px' }} alt="Profile" />
                                                </div>
                                                <h4 className="mb-2">Nguyen Duc Truong Thinh</h4>
                                                <p className="text-muted mb-4">@Custommer <span className="mx-2">|</span> <a href="#!"></a></p>
                                             
                                                <button type="button" className="btn btn-primary btn-rounded btn-lg">
                                                    Message now
                                                </button>
                                                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                                                    <div>
                                                        <p className="mb-2 h5">01</p>
                                                        <p className="text-muted mb-0">Quantity purchased</p>
                                                    </div>
                                                    <div className="px-3">
                                                        <p className="mb-2 h5">01</p>
                                                        <p className="text-muted mb-0">Quantity PreOrder</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
