import { useNavigate } from "react-router-dom";

const ProfilePage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="card" style={{ borderRadius: '15px' }}>
                    <div className="card-body text-center">
                        <div className="mt-3 mb-4">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                                className="rounded-circle img-fluid" style={{ width: '100px' }} alt="Profile" />
                        </div>
                        <h4 className="mb-2">{sessionStorage.getItem('name')}</h4>
                        <p className="text-muted mb-4">@Customer</p>

                        <div className="row">
                            <div className="col d-flex">
                                <button type="button" className="btn btn-primary btn-rounded btn-lg">
                                    Message now
                                </button>
                            </div>
                            <div className="col d-flex">
                                <button onClick={() => navigate("/profile/your-request")} type="button" className=" btn btn-primary btn-rounded btn-lg">
                                    View requests
                                </button>
                            </div>
                        </div>

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
        </>
    );
}

export default ProfilePage;
