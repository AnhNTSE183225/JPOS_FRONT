import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styles from '/src/css/RegisterPage.module.css';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');

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

    const customerRegister = () => {
        if (username.length !== 0 && password.length !== 0 && fullName.length !== 0 && address.length !== 0) {
            axios.post('http://localhost:8080/api/customer-register',
                {
                    username: username,
                    password: password,
                    name: fullName,
                    address: address
                }
            ).then(
                (response) => {
                    console.log(response.data);
                }
            ).catch(
                (error) => {
                    alert('Username already exists!');
                }
            )
        } else {
            alert('Please fill in all fields!');
        }
    }

    return (
        <div className={`container-fluid d-flex align-items-center justify-content-center ${styles.fullHeight}`}>
            <div className={`card p-3 mt-3 ${styles.centerCard}`}>
                <div className='mb-3'>
                    <h1>Register</h1>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Username</label>
                    <textarea value={username} onChange={handleUsername} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Password</label>
                    <input value={password} onChange={handlePassword} type="password" className='form-control' />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Name</label>
                    <textarea value={fullName} onChange={handleFullName} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Address</label>
                    <textarea value={address} onChange={handleAddress} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
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
