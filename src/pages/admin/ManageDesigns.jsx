import { Button, Dialog, DialogActions, DialogContent, DialogTitle, setRef } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateString } from "../../helper_function/Validation";
import useDocumentTitle from "../../components/Title";
import styles from '/src/css/ManageDesigns.module.css';

const ManageDesigns = () => {
    const [designs, setDesigns] = useState(null);
    const [queryList, setQueryList] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');
    const [materials, setMaterials] = useState([]);

    useDocumentTitle("Manage Designs");

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [activeDesign, setActiveDesign] = useState({
        productDesignId: -1,
        designFile: '',
        designName: '',
        designType: 'None',
        productShellDesigns: []
    })
    const validateDesignFile = validateString(activeDesign.designFile, 16, Math.INFINITY);
    const validateDesignName = validateString(activeDesign.designName, 4, Math.INFINITY);
    const validateDesignType = validateString(activeDesign.designType, 1, Math.INFINITY);

    const openUpdateDialog = (design) => {
        setIsOpenUpdate(true);
        setActiveDesign(JSON.parse(JSON.stringify(design)));
    }

    const closeUpdateDialog = () => {
        setIsOpenUpdate(false);
        setActiveDesign({
            productDesignId: -1,
            designFile: '',
            designName: '',
            designType: 'None',
            productShellDesigns: []
        });
    }

    const fetchMaterials = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_jpos_back}/public/material/all`
            })
            if (response.status === 200) {
                setMaterials(response.data);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-designs/all`, { headers });
            if (response.status === 200) {
                setDesigns(response.data);
                setQueryList(response.data);
            } else {
                console.log('error');
            }
        } catch (error) {
            toast.error(`Failed to fetch data`);
        }
    }

    const update = async () => {
        if (
            validateDesignName.result &&
            validateDesignFile.result &&
            validateDesignType.result
        ) {
            try {
                console.log(activeDesign);
                const response = await axios({
                    url: `${import.meta.env.VITE_jpos_back}/api/product-designs/update`,
                    method: 'put',
                    data: activeDesign,
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    toast.success('Update successful');
                    closeUpdateDialog();
                } else {
                    console.log('error');
                }
                setRefresh(r => !r);
            } catch (error) {
                toast.error(`Unable to update`);
            }
        } else {
            toast.info(`Please fulfill all requirements first!`);
        }
    }

    useEffect(() => {
        fetchData();
        fetchMaterials();
    }, [refresh])

    useEffect(() => {
        if (search.length > 0) {
            let query_list = [...designs].filter(q => q.designName.toLowerCase().includes(search.toLowerCase()) || q.productDesignId.toString() == search);
            setQueryList(query_list);
        } else {
            setQueryList(designs);
        }
    }, [search])

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col p-0" style={{ maxWidth: '400px' }}>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="Search for design... &#128270;" className="form-control rounded-0" type="text" />
                </div>
                <div className="col">
                    <button className={`btn rounded-0 ${styles['staffButton']}`}>Add new design</button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col p-0">
                    <table className="table border">
                        <thead className="text-center">
                            <tr>
                                <th className="col-md-1">ID</th>
                                <th className="col-md-3">Name</th>
                                <th className="col-md-2">Type</th>
                                <th className="col-md-3">Image</th>
                                <th className="col-md-2">Shells</th>
                                <th className="col-md-1">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                queryList != null
                                    ? queryList.map((design, index) => (
                                        <tr key={index}>
                                            <td className="text-center align-content-lg-center">{design.productDesignId}</td>
                                            <td className="align-content-lg-center">{design.designName}</td>
                                            <td className="text-capitalize text-center align-content-lg-center">{design.designType}</td>
                                            <td className="justify-content-center">
                                                <img className="d-block mx-auto" src={design.designFile} alt="" style={{ width: '100%', height: 'auto' }} />
                                            </td>
                                            <td className="align-content-lg-center">
                                                <div className="container-fluid text-center ">
                                                    {
                                                        design.productShellDesigns.map((shell, index2) => (
                                                            <div key={index2}>
                                                                <div className="text-capitalize">
                                                                    {shell.shellName.replace("shell", " ").trim()}
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </td>
                                            <td className="align-content-lg-center">
                                                <button onClick={() => openUpdateDialog(design)} className={`btn rounded-0 ${styles['staffButton']}`}>
                                                    EDIT
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                    : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog fullWidth={true} maxWidth="md" open={isOpenUpdate} onClose={closeUpdateDialog}>
                <DialogTitle className="text-center">EDIT DESIGN</DialogTitle>
                <DialogContent>
                    <div className="container-fluid">
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Design ID</label>
                                <input value={activeDesign.productDesignId} type="text" className="form-control rounded-0" disabled />
                            </div>
                            <div className="col">
                                <label className="form-label">Design Name</label>
                                <input value={activeDesign.designName} onChange={(e) => setActiveDesign(d => ({ ...d, designName: e.target.value }))} type="text" className="form-control rounded-0" />
                                <span className="form-text text-danger">{validateDesignName.reason}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <label className="form-label">Type</label>
                                <select className="form-select rounded-0" value={activeDesign.designType} onChange={(e) => setActiveDesign(d => ({ ...d, designType: e.target.value }))}>
                                    <option value="">Select</option>
                                    <option value="ring">Ring</option>
                                    <option value="necklace">Necklace</option>
                                    <option value="earrings">Earrings</option>
                                    <option value="bracelets">Bracelets</option>
                                </select>
                                <span className="text-danger form-text">{!validateDesignType.result ? 'Please select one' : ''}</span>
                            </div>
                            <div className="col">
                                <label className="form-label">Image</label>
                                <input value={activeDesign.designFile} onChange={(e) => setActiveDesign(d => ({ ...d, designFile: e.target.value }))} type="text" className="form-control rounded-0" />
                                <span className="text-danger form-text">{validateDesignFile.reason}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold">
                                ID
                            </div>
                            <div className="col-md d-flex justify-content-center align-items-center fw-bold">
                                Shells
                            </div>
                            <div className="col-md d-flex justify-content-center align-items-center fw-bold">
                                Quantity
                            </div>
                            <div className="col-md-4 d-flex justify-content-center align-items-center fw-bold">
                                Materials
                            </div>
                        </div>
                        {
                            activeDesign.productShellDesigns.length > 0
                                ? activeDesign.productShellDesigns.map((shell, index) => (
                                    <div key={index} className="row mb-3">
                                        <div className="col-md-2 d-flex justify-content-center align-items-center fw-bold">
                                            {shell.productShellDesignId}
                                        </div>
                                        <div className="col-md d-flex justify-content-center align-items-center text-capitalize">
                                            <input type="text" className="form-control" value={shell.shellName} onChange={(e) => {
                                                const shells = [...activeDesign.productShellDesigns];
                                                shells[index].shellName = e.target.value;
                                                setActiveDesign(s => ({
                                                    ...s,
                                                    productShellDesigns: shells
                                                }))
                                            }} />
                                        </div>
                                        <div className="col-md d-flex justify-content-center align-items-center">
                                            <input className="form-control text-end" type="number" min={1} value={shell.diamondQuantity} onChange={(e) => {
                                                const number = parseInt(e.target.value);
                                                const shells = [...activeDesign.productShellDesigns];
                                                shells[index].diamondQuantity = number;
                                                setActiveDesign(s => ({
                                                    ...s,
                                                    productShellDesigns: shells
                                                }))
                                            }} />
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-center align-items-center">
                                            <div className="container-fluid">
                                                <div className="row">
                                                    {
                                                        shell.productShellMaterials.map((material, index2) => (
                                                            <div key={index2} className="col-md input-group">
                                                                <select className="form-select" value={material.material.materialId} onChange={(e) => {
                                                                    const materialId = parseInt(e.target.value);
                                                                    const shells = [...activeDesign.productShellDesigns];
                                                                    shells[index].productShellMaterials[index2].material = materials.find(m => m.materialId === materialId);
                                                                    setActiveDesign(s => ({
                                                                        ...s,
                                                                        productShellDesigns: shells
                                                                    }))
                                                                }}>
                                                                    {
                                                                        materials.map((mats, index3) => (
                                                                            <option key={index3} value={mats.materialId} >{mats.materialName}</option>
                                                                        ))
                                                                    }
                                                                </select>
                                                                <input type="number" step={0.01} min={0.1} value={material.weight} onChange={(e) => {
                                                                    const number = parseFloat(e.target.value);
                                                                    const shells = [...activeDesign.productShellDesigns];
                                                                    shells[index].productShellMaterials[index2].weight = number;
                                                                    setActiveDesign(s => ({
                                                                        ...s,
                                                                        productShellDesigns: shells
                                                                    }))
                                                                }} className="form-control" />
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : <>
                                    <div className="row mb-3">
                                        <div className="col-md">
                                            No shells
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={update}>SAVE</Button>
                    <Button onClick={closeUpdateDialog}>CANCEL</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ManageDesigns;