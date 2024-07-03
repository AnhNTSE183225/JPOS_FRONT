import { useNavigate } from 'react-router-dom';
import styles from '/src/css/CreateStaff.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const STAFF_TYPE = ['sale', 'design', 'produce', 'manage']

const CreateStaff = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [staffType, setStaffType] = useState(STAFF_TYPE[0]);

    const navigate = useNavigate();

    return (
        <div className="container-fluid" id={`${styles['create-staff']}`}>
            <div className="row mb-3">
                <h1 className='p-0'>
                    <FontAwesomeIcon onClick={() => navigate(-1)} className='me-3 mb-1' icon={faLeftLong} id={`${styles['back-btn']}`} />
                    Create new staff
                </h1>
                <div className="row mb-2">
                    <div className="col-lg-6">
                        <div className={`input-group mb-3 ${styles['input-group']}`}>
                            <span className='input-group-text'>Username</span>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='form-control'/>
                        </div>
                        <div className={`input-group mb-3 ${styles['input-group']}`}>
                            <span className='input-group-text'>Name</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} className='form-control' type="text" />
                        </div>
                        <div className={`input-group mb-3 ${styles['input-group']}`}>
                            <span className='input-group-text'>Email</span>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' type="email" />
                        </div>
                        <div className={`input-group mb-3 ${styles['input-group']}`}>
                            <span className='input-group-text'>Password</span>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' type="email" />
                        </div>
                        <div className={`input-group mb-3 ${styles['input-group']}`}>
                            <span className='input-group-text'>Phone</span>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} className='form-control' type="email" />
                        </div>
                        <div className={`input-group mb-3 ${styles['input-group']}`}>
                            <span className='input-group-text'>Staff type</span>
                            <input value={staffType} onChange={(e) => setStaffType(e.target.value)} className='form-control' type="email" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateStaff;