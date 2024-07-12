import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '/src/css/ManageCustomer.module.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { Switch } from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

const ManageCustomer = () => {

    const [listCustomer, setListCustomer] = useState(null);
    const [listQuery, setListQuery] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState(null);
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const [openDialog, setOpenDialog] = useState(false);
    const [activeCustomer, setActiveCustomer] = useState(null);

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

    const UpdateDialog = () => {
        const [username, setUsername] = useState(activeCustomer !== null ? activeCustomer.account.username : '');
        const [name, setName] = useState(activeCustomer !== null ? activeCustomer.name : '');
        const [address, setAddress] = useState(activeCustomer !== null ? activeCustomer.address : '');

        const updateCustomer = async () => {
            try {
                console.log(`${import.meta.env.VITE_jpos_back}/api/update`);
                const headers = {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
                const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/update`, {
                    ...activeCustomer,
                    account: {
                        ...activeCustomer.account,
                        username: username
                    },
                    address: address,
                    name: name,
                    
                }, {
                    headers
                })
                if (!response.data || response.status === 204) {
                    console.log(`Can't update`);
                } else {
                    if (response.data > 0) {
                        toast.success(`Update successful`);
                    }
                    fetchData();
                    setOpenDialog(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        return (
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    Update Customer
                </DialogTitle>
                <DialogContent>
                    <div className="input-group mt-1 mb-3">
                        <span className={`input-group-text ${styles['input-label']}`}>UserName</span>
                        <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-group mt-1 mb-3">
                        <span className={`input-group-text ${styles['input-label']}`}>Name</span>
                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-group mt-1 mb-3">
                        <span className={`input-group-text ${styles['input-label']}`}>Address</span>
                        <input className="form-control" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateCustomer}>Submit</Button>
                    <Button onClick={() => setOpenDialog(false)} >Cancel</Button>
                </DialogActions>
            </Dialog>
        )
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
                                        <td className="text-center" id={`${styles['action-button']}`} onClick={(e) => {
                                            setAnchor(anchor ? null : e.currentTarget);
                                            setActiveCustomer(customer);
                                        }} ><FontAwesomeIcon icon={faEllipsisVertical} /></td>
                                    </tr>
                                ))
                                : <></>
                        }
                    </tbody>
                </table>
                <BasePopup open={open} anchor={anchor}>
                    <div className={`${styles['popup-div']}`}>
                        <button onClick={() => {
                            setOpenDialog(true);
                            setAnchor(null);
                        }}>Update</button>
                        <button onClick={() => deleteCustomer(activeCustomer.customerId)}>Delete</button>
                    </div>
                </BasePopup>
                <UpdateDialog />
            </div>
        </div>
    )
}

export default ManageCustomer;