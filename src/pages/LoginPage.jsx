import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from '/src/css/LoginPage.module.css';
import { toast } from 'sonner';
import useDocumentTitle from "../components/Title";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useDocumentTitle("Login");
    const handleUsername = (event) => {
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
    };

    const unionLogin = async () => {
        if (username.length > 0 && password.length > 0) {
            try {
                const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/v1/auth/authenticate`, {
                    username: username,
                    password: password
                });
                if (!response.data || response.status === 204) {
                    toast.error(`Invalid credentials. Please try again`);
                } else {
                    if (response.data.account.customerId !== undefined) {
                        sessionStorage.setItem('customer',JSON.stringify(response.data.account));
                        sessionStorage.setItem('token',response.data.token);
                        navigate("/");
                        return;
                    } else if (response.data.account.staffId !== undefined) {
                        console.log(response.data);
                        // sessionStorage.setItem("staff", JSON.stringify(response.data));

                        // if (response.data.staffType == 'manage') {
                        //     navigate("/staff/manage-requests")
                        // } else {
                        //     navigate("/staff/request");
                        // }
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
