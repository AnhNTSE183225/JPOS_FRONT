import { faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '/src/css/ManageStaffPage.module.css';
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import axios from "axios";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DEPARTMENT = {
    'sale': 'Sales',
    'design': 'Design',
    'produce': 'Production',
    'manage': 'Management'
}


const ManageStaffPage = () => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState(null);
    const [queryList, setQueryList] = useState(null);
    const [requestsCount, setRequestsCount] = useState(null);
    const [search, setSearch] = useState('');

    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const [openDialog, setOpenDialog] = useState(false);
    const [activeStaff, setActiveStaff] = useState(null);

    const UpdateDialog = () => {

        const [name, setName] = useState(activeStaff !== null ? activeStaff.name : '');
        const [phone, setPhone] = useState(activeStaff !== null ? activeStaff.phone : '');
        const [staffType, setStaffType] = useState(activeStaff !== null ? activeStaff.staffType : '');

        const updateStaff = async () => {
            try {
                console.log(`${import.meta.env.VITE_jpos_back}/api/staff/update`);
                const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/staff/update`, {
                    ...activeStaff,
                    name: name,
                    phone: phone,
                    staffType: staffType
                })
                if(!response.data || response.status === 204) {
                    console.log(`Can't update`);
                } else {
                    if(response.data > 0) {
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
                    Update Staff
                </DialogTitle>
                <DialogContent>
                    <div className="input-group mt-1 mb-3">
                        <span className={`input-group-text ${styles['input-label']}`}>Name</span>
                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-group mt-1 mb-3">
                        <span className={`input-group-text ${styles['input-label']}`}>Phone</span>
                        <input className="form-control" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="input-group mt-1 mb-3">
                        <span className={`input-group-text ${styles['input-label']}`}>Dept.</span>
                        <select className="form-select" type="text" value={staffType} onChange={(e) => setStaffType(e.target.value)} >
                            {
                                ['sale','design','produce','manage'].map((value,index) => (
                                    <option key={index} value={value}>{DEPARTMENT[value]}</option>
                                ))
                            }
                        </select>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={updateStaff}>Submit</Button>
                    <Button onClick={() => setOpenDialog(false)} >Cancel</Button>
                </DialogActions>
            </Dialog>
        )
    }


    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/staff/find-all`);
            if (!response.data || response.status == 204) {
                toast.info(`No info`);
            } else {
                let employees = response.data;
                let requests_count = [];
                for (let i = 0; i < employees.length; i++) {
                    requests_count.push(await (fetchRequestsCount(employees[i].staffType, employees[i].staffId)));
                }
                setEmployees(employees);
                setQueryList(employees);
                setRequestsCount(requests_count);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchRequestsCount = async (type, id) => {
        let orders_count = 0;
        let response = null;
        switch (type) {
            case 'sale':
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/sales/orders/${id}`);
                if (!response.data || response.status === 204) {
                    orders_count = 0;
                } else {
                    orders_count = response.data.length;
                }
                break;
            case 'design':
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/designs/orders/${id}`);
                if (!response.data || response.status === 204) {
                    orders_count = 0;
                } else {
                    orders_count = response.data.length;
                }
                break;
            case 'produce':
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/production/orders/${id}`);
                if (!response.data || response.status === 204) {
                    orders_count = 0;
                } else {
                    orders_count = response.data.length;
                }
                break;
        }
        return orders_count;
    }

    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        if (search.length > 0) {
            let query_list = [...employees];
            query_list = query_list.filter(staff => (staff.staffId.toString() == search || staff.name.toLowerCase().includes(search.toLowerCase())));
            setQueryList(query_list);
        } else {
            setQueryList(employees);
        }
    }, [search])

    return (
        <div className="container-fluid" id={`${styles['manage-staff']}`}>
            <div className="row mb-3">
                <h1 className="p-0">Company employees</h1>
                <div className="col-3" id={`${styles['search-bar']}`}>
                    <input placeholder={`Search Employee`} onChange={(e) => setSearch(e.target.value)} type="text" className="form-control" />
                    <FontAwesomeIcon id={`${styles['search-icon']}`} icon={faSearch} />
                </div>
                <div className="col">
                    <button onClick={() => navigate("create")} className="btn btn-primary">Create new staff</button>
                </div>
            </div>
            <div className="row mb-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Contact</th>
                            <th className="text-center">Requests</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            queryList != null && requestsCount != null
                                ? queryList.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value.staffId}</td>
                                        <td>{value.name}</td>
                                        <td>{DEPARTMENT[value.staffType]}</td>
                                        <td>{value.phone}</td>
                                        <td className="text-center">{requestsCount[index]}</td>
                                        <td className="text-center">{value.account.status ? 'Active' : 'Disabled'}</td>
                                        <td className="text-center" id={`${styles['action-button']}`} onClick={(e) => {
                                            setAnchor(anchor ? null : e.currentTarget);
                                            setActiveStaff(value);
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
                        <button>Delete</button>
                    </div>
                </BasePopup>
                <UpdateDialog />
            </div>
        </div>
    )
}

export default ManageStaffPage;