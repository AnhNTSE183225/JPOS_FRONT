import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from '/src/css/LoginPage.module.css';
import { toast } from 'sonner';

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
            toast.info(`Please fill in the required fields: username, password`);
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
                    navigate("/staff/request");
                })
                .catch((error) => {
                    alert("Invalid login credentials");
                    console.log(error);
                });
        } else {
            alert("Please fill in all forms!");
        }
    };

    const unionLogin = async () => {
        if (username.length > 0 && password.length > 0) {
            try {
                const response = await axios.post(`http://localhost:8080/login`, {
                    username: username,
                    password: password
                });
                if (!response.data || response.status === 204) {
                    toast.error(`Invalid credentials. Please try again`);
                } else {
                    console.log(response.data);
                    console.log(response.data.customerId);
                    console.log(response.data.staffId);
                    if (response.data.customerId !== undefined) {
                        console.log('logged in as customer');
                        sessionStorage.setItem("customer_id", response.data.customerId);
                        sessionStorage.setItem("username", response.data.username);
                        sessionStorage.setItem("name", response.data.name);
                        sessionStorage.setItem("address", response.data.address);
                        navigate("/");
                        return;
                    } else if (response.data.staffId !== undefined) {
                        console.log(`Logged in as staff`);
                        sessionStorage.setItem("staff_id", response.data.staffId);
                        sessionStorage.setItem("username", response.data.username);
                        sessionStorage.setItem("name", response.data.name);
                        sessionStorage.setItem("phone", response.data.phone);
                        sessionStorage.setItem("staff_type", response.data.staffType);
                        if (response.data.staffType == 'manage') {
                            navigate("/staff/manage-requests")
                        } else {
                            navigate("/staff/request");
                        }
                        return;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.info("Please fill in all forms!");
        }
    }

    return (
        <div className={`container-fluid d-flex align-items-center justify-content-center ${styles.fullHeight}`}>
            <div className={`card p-3 mt-3 ${styles.centerCard}`}>
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
                        <Link to="" className={styles.customLink}>Forgot Password?</Link>
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
                        <button onClick={unionLogin} className="btn btn-dark w-100">
                            Login
                        </button>
                    </div>
                    <div className="col">
                        <Link to="/register">
                            <button className="btn btn-light w-100">Register</button>
                        </Link>
                    </div>
                </div>
                {/* <div className="d-flex justify-content-end">
                    <Link to="" onClick={loginStaff} className={styles.customLink}>Login as staff</Link>
                </div> */}
            </div>
        </div>
    );
};

export default LoginPage;
