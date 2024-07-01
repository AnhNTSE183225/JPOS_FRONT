import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '/src/css/ManageStaffPage.module.css';
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import axios from "axios";

const DEPARTMENT = {
    'sale': 'Sales',
    'design': 'Design',
    'produce': 'Production',
    'manage': 'Management'
}

const ManageStaffPage = () => {

    const [employees, setEmployees] = useState(null);
    const [requestsCount, setRequestsCount] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/staff/find-all`);
            if (!response.data || response.status == 204) {
                toast.info(`No info`);
            } else {
                const employees = response.data;
                let requests_count = [];
                for (let i = 0; i < employees.length; i++) {
                    requests_count.push(await (fetchRequestsCount(employees[i].staffType,employees[i].staffId)));
                }

                setEmployees(employees);
                setRequestsCount(requests_count);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const fetchRequestsCount = async (type, id) => {
        console.log(id);
        let orders_count = 0;
        let response = null;
        switch (type) {
            case 'sale':
                console.log(`GET ${import.meta.env.VITE_jpos_back}/api/sales/orders/${id}`);
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/sales/orders/${id}`);
                if(!response.data || response.status === 204) {
                    orders_count = 0;
                } else {
                    orders_count = response.data.length;
                }
                break;
            case 'design':
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/designs/orders/${id}`);
                if(!response.data || response.status === 204) {
                    orders_count = 0;
                } else {
                    orders_count = response.data.length;
                }
                break;
            case 'produce':
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/production/orders/${id}`);
                if(!response.data || response.status === 204) {
                    orders_count = 0;
                } else {
                    orders_count = response.data.length;
                }
                break;
            case 'manage':
                response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/manager/orders`);
                if(!response.data || response.status === 204) {
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

    return (
        <div className="container-fluid" id={`${styles['manage-staff']}`}>
            <div className="row mb-3">
                <h1 className="p-0">Company employees</h1>
                <div className="col-3" id={`${styles['search-bar']}`}>
                    <input placeholder={`Search Employee`} type="text" className="form-control" />
                    <FontAwesomeIcon id={`${styles['search-icon']}`} icon={faSearch} />
                </div>
            </div>
            <div className="row mb-3">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Contact</th>
                            <th>Requests</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees != null && requestsCount != null
                                ? employees.map((value, index) => (
                                    <tr key={index}>
                                        <td>{('000' + value.staffId).slice(-4)}</td>
                                        <td>{value.name}</td>
                                        <td>{DEPARTMENT[value.staffType]}</td>
                                        <td>{value.phone}</td>
                                        <td>{requestsCount[index ]}</td>
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

export default ManageStaffPage;