import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import axios from "axios";
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };



    const login = () => {
        if (username.length !== 0 && password.length !== 0) {
            axios
                .post("http://localhost:8080/api/customer-login", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    sessionStorage.setItem("customer_id", response.data.customerId);
                    sessionStorage.setItem("username", response.data.username);
                    sessionStorage.setItem("name", response.data.name);
                    sessionStorage.setItem("address", response.data.address);
                    navigate("/");
                })
                .catch((error) => {
                    
                    console.log(error);
                });
        } else {
            toast.error("Please fill in all forms!");
        }
    };
    const loginStaff = () => {
        if (username.length !== 0 && password.length !== 0) {
            axios
                .post("http://localhost:8080/api/staff-login", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    sessionStorage.setItem("staff_id", response.data.staffId);
                    sessionStorage.setItem("username", response.data.username);
                    sessionStorage.setItem("name", response.data.name);
                    sessionStorage.setItem("phone", response.data.phone);
                    sessionStorage.setItem("staff_type", response.data.staffType);
                    navigate("/profile/request");
                })
                .catch((error) => {
                    toast('Invalid login credentials');
                    console.log(error);
                });
        } else {
            toast.error("Please fill in all forms!");
        }
    };

    return (
        <>
            <Toaster position="top-center" richColors expand={true} />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card p-3 mt-3">
                            <div className="mb-3">
                                <h1>Login</h1>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <textarea
                                    value={username}
                                    onChange={handleUsername}
                                    maxLength={255}
                                    className="form-control"
                                    rows="1"
                                    cols="30"
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="form-label">Password</label>
                                    <Link to="" style={{ color: '#48AAAD' }}>Forgot Password?</Link>
                                </div>
                                <input
                                    value={password}
                                    onChange={handlePassword}
                                    type="password"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3 row">
                                <div className="col">
                                    <button onClick={login} className="btn btn-dark w-100">
                                        Login
                                    </button>
                                </div>
                                <div className="col">
                                    <Link to="/customer-register">
                                        <button className="btn btn-light w-100">Register</button>
                                    </Link>
                                </div>
                            </div>
                            <div className="d-flex justify-content-end">
                                <Link to="" onClick={loginStaff} style={{ color: '#48AAAD' }}>Login as staff</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
