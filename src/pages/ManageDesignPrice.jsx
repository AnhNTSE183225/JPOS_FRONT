import { faGem, faHammer, faRing } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageDesignPrice = () => {

    const [productDesigns, setProductDesigns] = useState(null);
    const [queryList, setQueryList] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-designs/all`, { headers });
            if (!response.data || response.status === 204) {
                toast.info(`Can't fetch data`);
            } else {
                setProductDesigns(response.data);
                setQueryList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (search.length > 0) {
            let query_list = [...productDesigns];
            query_list = query_list.filter(design => design.designName.toLowerCase().includes(search.toLowerCase()) || design.productDesignId.toString() == search);
            setQueryList(query_list);
        } else {
            setQueryList(productDesigns);
        }
    }, [search])

    console.log(productDesigns);

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <h1 className="p-0">MANAGE DESIGN PRICES</h1>
                <div className="col-lg-4 p-0">
                    <div className="input-group">
                        <span className="input-group-text">Search</span>
                        <input onChange={(e) => setSearch(e.target.value)} className="form-control" type="text" placeholder="Search id/name" />
                    </div>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Shells</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                queryList != null
                                    ? queryList.map((design, index) => (
                                        <tr key={index}>
                                            <td>{design.productDesignId}</td>
                                            <td>{design.designName}</td>
                                            <td style={{ textTransform: 'capitalize' }}>{design.designType}</td>
                                            <td>
                                                <ul>
                                                    {
                                                        design.productShellDesigns.map((shell, index2) => (
                                                            <li key={index2} style={{ textTransform: 'capitalize' }}>
                                                                {shell.shellName}
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text"> <FontAwesomeIcon icon={faGem}/> </span>
                                                                    <input value={shell.ediamondPrice} className="form-control" type="text" />
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text"> <FontAwesomeIcon icon={faRing}/></span>
                                                                    <input value={shell.ematerialPrice} className="form-control" type="text" />
                                                                </div>
                                                                <div className="input-group mb-3">
                                                                    <span className="input-group-text"> <FontAwesomeIcon icon={faHammer}/> </span>
                                                                    <input value={shell.productionPrice} className="form-control" type="text" />
                                                                </div>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </td>
                                        </tr>
                                    ))
                                    : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageDesignPrice;