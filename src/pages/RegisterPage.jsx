import NavigationBar from "../components/NavigationBar";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {Toaster, toast} from 'sonner';
import axios from 'axios';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setfullName] = useState('');
    const [address, setAddress] = useState('');

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleFullName = (event) => {
        setfullName(event.target.value);
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
                    toast.error('Username already exists!');
                }
            )
        } else {
            toast.error('Please fill in all fields!');
        }
    }

    return (
        <>
            <Toaster position='top-center' richColors expand={true}/>
            <NavigationBar />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className='card p-3 mt-3'>
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
                                    <Link to='/customer-login'><button className='btn btn-light w-100'>Go to login</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;