import { useNavigate } from 'react-router-dom';
import styles from '/src/css/CreateStaff.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { validateString } from '../helper_function/Validation';

const STAFF_TYPE = ['sale', 'design', 'produce', 'manage']

const CreateStaff = () => {

    const [username, setUsername] = useState('');
    const validateUsername = validateString(username, 8, 16, null);
    const [email, setEmail] = useState('');
    const validateEmail = validateString(email, 8, 254, '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');
    const [password, setPassword] = useState('');
    const validatePassword = validateString(password, 8, 16);
    const [name, setName] = useState('');
    const validateName = validateString(name, 8, 20);
    const [phone, setPhone] = useState('');
    const validatePhone = validateString(phone, 9, 11, null, '^\\d+$');
    const [staffType, setStaffType] = useState(STAFF_TYPE[0]);

    const navigate = useNavigate();

    const handleCreate = async () => {
        if (
            validateUsername.result &&
            validateEmail.result &&
            validatePassword.result &&
            validateName.result &&
            validatePhone.result
        ) {
            try {
                const headers = {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
                const object = {
                    username: username,
                    email: email,
                    password: password,
                    name: name,
                    phone: phone,
                    staffType: staffType
                }
                const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/staff/create`, object, { headers });
                if (response.status === 200) {
                    toast.success(`Creation successful`);
                    navigate(-1);
                } else {
                    toast.error(`Username must be unique`);
                }
            } catch (error) {
                toast.error(`Something went wrong. Creation failed`);
            }
        } else {
            toast.info(`Please fulfill the requirements`);
        }
    }

    return (
        <div className="container-fluid" id={`${styles['create-staff']}`}>
            <div className="row mb-3">
                <h1 className='p-0'>
                    <FontAwesomeIcon onClick={() => navigate(-1)} className='me-3 mb-1' icon={faLeftLong} id={`${styles['back-btn']}`} />
                    Create new staff
                </h1>
                <div className="row mb-2">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <div className={`input-group ${styles['input-group']}`}>
                                <span className='input-group-text'>Username</span>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='form-control' />
                            </div>
                            <div className="form-text text-danger">{validateUsername.reason}</div>
                        </div>
                        <div className="mb-3">
                            <div className={`input-group ${styles['input-group']}`}>
                                <span className='input-group-text'>Name</span>
                                <input value={name} onChange={(e) => setName(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div className="form-text text-danger">{validateName.reason}</div>
                        </div>
                        <div className="mb-3">
                            <div className={`input-group ${styles['input-group']}`}>
                                <span className='input-group-text'>Email</span>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' type="email" />
                            </div>
                            <div className="form-text text-danger">{validateEmail.reason}</div>
                        </div>
                        <div className="mb-3">
                            <div className={`input-group ${styles['input-group']}`}>
                                <span className='input-group-text'>Password</span>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div className="form-text text-danger">{validatePassword.reason}</div>
                        </div>
                        <div className="mb-3">
                            <div className={`input-group ${styles['input-group']}`}>
                                <span className='input-group-text'>Phone</span>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' type="text" />
                            </div>
                            <div className="form-text text-danger">{validatePhone.reason}</div>
                        </div>
                        <div className="mb-3">
                            <div className={`input-group ${styles['input-group']}`}>
                                <span className='input-group-text'>Staff type</span>
                                <select value={staffType} onChange={(e) => setStaffType(e.target.value)} className='form-select'>
                                    {
                                        STAFF_TYPE.map((staff_type, index) => (
                                            <option key={index} value={staff_type}>
                                                {staff_type}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <button className='btn btn-primary' onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStaff;