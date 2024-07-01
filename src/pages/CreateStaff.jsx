import { useNavigate } from 'react-router-dom';
import styles from '/src/css/CreateStaff.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';

const CreateStaff = () => {

    const navigate = useNavigate();

    return (
        <div className="container-fluid" id={`${styles['create-staff']}`}>
            <div className="row mb-3">
                <h1 className='p-0'>
                    <FontAwesomeIcon onClick={() => navigate(-1)} className='me-3 mb-1' icon={faLeftLong} id={`${styles['back-btn']}`} />
                    Create new staff
                </h1>
            </div>
        </div>
    )
}

export default CreateStaff;