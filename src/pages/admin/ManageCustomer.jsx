import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '/src/css/ManageCustomer.module.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Switch } from '@mui/material';

const ManageCustomer = () => {

    const [listCustomer, setListCustomer] = useState(null);
    const [listQuery, setListQuery] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState(null);

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/customer/get-all`, { headers });
            if (response.status === 200) {
                setListCustomer(response.data);
                setListQuery(response.data);
            } else {
                toast.error(`Cannot fetch customer list from server`);
            }
        } catch (error) {
            console.log(error);
            toast.error(`Something went wrong, cannot fetch customers...`);
        }
    }

    const toggleAccount = async (customer) => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const object = {
                ...customer,
                account: {
                    ...customer.account,
                    status: !customer.account.status
                }
            }
            const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/update`, object, { headers });
            if (response.status === 200) {
                toast.success(`Change status successfully`);
            } else {
                toast.error(`Something went wrong, unable to change status...`);
            }
            setRefresh(r => !r);
        } catch (error) {
            toast.error(`Unable to change status`);
        }
    }

    const deleteCustomer = async (id) => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.delete(`${import.meta.env.VITE_jpos_back}/api/customer/delete/${id}`, { headers });
            if (response.status === 200) {
                toast.success(`Delete successfully`);
            } else {
                toast.error(`Deletion unsuccessful`);
            }
            setRefresh(r => !r);
        } catch (error) {
            toast.error(`Something went wrong, cannot delete`);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
        setSearch(null);
    }, [refresh])

    useEffect(() => {
        if (search != null) {
            let query_list = listCustomer;
            query_list = query_list.filter(customer => (customer.customerId.toString() == search || customer.name.toLowerCase().includes(search.toLowerCase())))
            setListQuery(query_list);
        } else {
            setListQuery(listCustomer);
        }
    }, [search])

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <h1 className="p-0 text-center mt-5 mb-5" style={{ marginBottom: '1rem' }}>MANAGE CUSTOMERS</h1>
                <div className="col-lg-3" id={`${styles['manage-customer-search-bar']}`}>
                    <input onChange={(e) => setSearch(e.target.value)} className='form-control' placeholder='Search employees' type="text" />
                    <FontAwesomeIcon icon={faSearch} style={{
                        color: 'grey',
                        position: 'absolute',
                        top: '20%',
                        right: '3%'
                    }} />
                </div>
            </div>
            <div className="row mb-3">
                <table className='table text-center'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th className='col-md-3'>Address</th>
                            <th>Username</th>
                            <th className='col-md-3'>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listQuery != null
                                ? listQuery.map((customer, index) => (
                                    <tr key={index}>
                                        <td>{customer.customerId}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.account.username}</td>
                                        <td>{customer.account.email}</td>
                                        <td>
                                            <Switch
                                                checked={customer.account.status}
                                                onChange={() => toggleAccount(customer)}
                                                style={{ color: customer.account.status ? '#48AAAD' : 'red' }}
                                            />
                                        </td>
                                        <td><button onClick={() => deleteCustomer(customer.customerId)} className='btn btn-danger w-100'>Delete</button></td>
                                    </tr>
                                ))
                                : <></>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageCustomer;