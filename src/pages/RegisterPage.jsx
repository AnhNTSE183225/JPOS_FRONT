import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styles from '/src/css/RegisterPage.module.css';
import useDocumentTitle from '../components/Title';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { validateString } from '../helper_function/Validation';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const validateUsername = validateString(username,8,16,null,'^[a-zA-Z0-9]+$');
    const [email, setEmail] = useState('');
    const validateEmail = validateString(email,8,254,'^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
    const [password, setPassword] = useState('');
    const validatePassword = validateString(password,8,16);
    const [fullName, setFullName] = useState('');
    const validateFullName = validateString(fullName,8,20);
    const [address, setAddress] = useState('');
    const validateAddress = validateString(address,10,100);
    const navigate = useNavigate();

    useDocumentTitle('Register');

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleFullName = (event) => {
        setFullName(event.target.value);
    }

    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const customerRegister = async () => {
        if (
            validateUsername.result &&
            validateEmail.result &&
            validatePassword.result &&
            validateAddress.result
        ) {

            try {
                const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/v1/auth/register`, {
                    username: username,
                    password: password,
                    email: email,
                    name: fullName,
                    address: address
                })
                if (!response.data || response.status === 204) {
                    toast.error(`Username or email already exists!`)
                } else {
                    toast.success(`Account created!`)
                    const customer = response.data.account;
                    const token = response.data.token;
                    sessionStorage.setItem('customer',JSON.stringify(customer));
                    sessionStorage.setItem('token',token);
                    navigate('/');
                }
            } catch (error) {
                if(error.response.status === 409) {
                    toast.error(`Account username already exists! Please login or try another username`);
                } else {
                    console.log(error);
                }
            }
        } else {
            toast.info(`Please fulfill all requirements`);
        }
    }

    return (
        <div className={`container-fluid ${styles.fullHeight}`}>
            <div className={`card p-3 ${styles.centerCard}`}>
                <div className='mb-3'>
                    <h1>Register</h1>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Username</label>
                    <textarea value={username} onChange={handleUsername} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
                    <div className="form-text text-danger">{validateUsername.reason}</div>
                </div>
                <div className="mb-3">
                    <label className='form-label'>Email</label>
                    <textarea value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
                    <div className="form-text text-danger">{validateEmail.reason}</div>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input value={password} onChange={handlePassword} type="password" className='form-control' />
                    <div className="form-text text-danger">{validatePassword.reason}</div>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <textarea value={fullName} onChange={handleFullName} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
                    <div className="form-text text-danger">{validateFullName.reason}</div>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Address</label>
                    <textarea value={address} onChange={handleAddress} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
                    <div className="form-text text-danger">{validateAddress.reason}</div>
                </div>
                <div className='mb-3 row'>
                    <div className='col'>
                        <button onClick={customerRegister} className='btn btn-dark w-100'>Create account</button>
                    </div>
                    <div className='col'>
                        <Link to='/login'><button className='btn btn-light w-100'>Go to login</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
