import { setRef, Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ManageDiamonds = () => {
    const [diamonds, setDiamonds] = useState(null);
    const [queryList, setQueryList] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');
    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(50);
    let pages = []
    if (queryList !== null) {
        let i = 0
        for (; i < queryList.length; i += pageSize) {
            pages.push(i);
        }
    }

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/diamond/get-all?pageNo=${pageNo}&pageSize=${pageSize}`, { headers });
            if (response.status === 200) {
                setDiamonds(response.data);
                setQueryList(response.data);
            } else {
                toast.error(`Unable to get diamonds`);
            }
        } catch (error) {
            toast.error(`Failed to fetch data`);
        }
    }

    const deleteFunction = async (selectedDiamond) => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const object = {
                ...selectedDiamond,
                active: !selectedDiamond.active
            }
            const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/diamond/update`, object, { headers });
            if (response.status === 200) {
                toast.success(`Update status`);
            } else {
                toast.error(`Unable to update status`);
            }
            setRefresh(r => !r);
        } catch (error) {
            toast.error(`Unable to update`);
        }
    }

    useEffect(() => {
        fetchData();
    }, [refresh])

    useEffect(() => {
        if (search.length > 0 && diamonds != null) {
            let query_list = [...diamonds];
            query_list = query_list.filter(d => d.diamondId.toString() == search || d.diamondCode.toLowerCase().includes(search.toLowerCase()) || d.diamondName.toLowerCase().includes(search.toLowerCase()));
            setQueryList(query_list);
        } else {
            setQueryList(diamonds);
        }
        setPageNo(0);
    }, [search])

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <h1 className="p-0 mb-3">MANAGE DIAMONDS</h1>
                <div className="col-lg-4 p-0">
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="form-control" />
                </div>
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text">Page</span>
                        {
                            pages.map((page,index) => {
                                if(page == pageNo) {
                                    return (
                                        <button key={index} className="btn btn-primary" style={{border: '1px solid #dee2e6'}}>{index+1}</button>
                                    )
                                } else {
                                    return (
                                        <button key={index} onClick={() => setPageNo(page)} className="btn btn-light" style={{border: '1px solid #dee2e6'}}>{index+1}</button>
                                    )
                                }
                            })
                        }
                        <span className="input-group-text"></span>
                    </div>
                </div>
            </div>
            <div className="row mb-3">

                <table className="text-start table">
                    <thead className="text-center">
                        <tr>
                            <th className="p-0 text-start">ID</th>
                            <th className="p-0 text-start">Code</th>
                            <th className="p-0 text-start">Name</th>
                            <th className="p-0">Color</th>
                            <th className="p-0">Cut</th>
                            <th className="p-0">Clarity</th>
                            <th className="p-0">Weight</th>
                            <th className="p-0">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            queryList !== null
                                ? queryList.slice(pageNo, pageNo + pageSize).map((diamond, index) => (
                                    <tr key={index}>
                                        <th className="p-0">{diamond.diamondId}</th>
                                        <td className="p-0">{diamond.diamondCode}</td>
                                        <td className="p-0">{diamond.diamondName}</td>
                                        <td className="p-0 text-center">{diamond.color}</td>
                                        <td className="p-0 text-center">{diamond.cut}</td>
                                        <td className="p-0 text-center">{diamond.clarity}</td>
                                        <td className="p-0 text-center">{diamond.caratWeight}</td>
                                        <td className="p-0 text-center">
                                            <Switch
                                                checked={diamond.active}
                                                onChange={() => deleteFunction(diamond)}
                                            />
                                        </td>
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

export default ManageDiamonds;