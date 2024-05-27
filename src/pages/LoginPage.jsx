import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.bundle';
import NavigationBar from '../components/NavigationBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const login = () => {
        axios
    }

    return (
        <>
            <NavigationBar />
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='card p-3 mt-3'>
                            <div className='mb-3'>
                                <h1>Login</h1>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Username</label>
                                <textarea value={username} onChange={handleUsername} maxLength={255} className="form-control" rows='1' cols='30'></textarea>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Password</label>
                                <input value={password} onChange={handlePassword} type="password" className='form-control' />
                            </div>
                            <div className='mb-3 row'>
                                <div className='col'>
                                    <button className='btn btn-dark w-100'>Login</button>
                                </div>
                                <div className='col'>
                                    <button onClick={login} className='btn btn-light w-100'>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;