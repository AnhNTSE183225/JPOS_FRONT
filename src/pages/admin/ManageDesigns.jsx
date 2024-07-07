import { Button, Dialog, DialogActions, DialogContent, DialogTitle, setRef } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateString } from "../../helper_function/Validation";
import { INFINITY } from "chart.js/helpers";

const ManageDesigns = () => {
    const [designs, setDesigns] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState(null);

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [activeDesign, setActiveDesign] = useState({
        productDesignId: -1,
        designFile: '',
        designName: '',
        designType: 'None',
        productShellDesigns: []
    })
    const validateDesignFile = validateString(activeDesign.designFile, 16, INFINITY);
    const validateDesignName = validateString(activeDesign.designName, 4, INFINITY);
    const validateDesignType = validateString(activeDesign.designType, 1, INFINITY);

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

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/product-designs/all`, { headers });
            if (response.status === 200) {
                setDesigns(response.data);
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
                const headers = {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
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
    }, [refresh])

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col">
                    <h1 className="p-0">MANAGE DESIGN</h1>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="container-fluid text-center">
                        <div className="row mb-3 fw-bold">
                            <div className="col-1 d-flex justify-content-center align-items-center">ID</div>
                            <div className="col d-flex justify-content-center align-items-center">Name</div>
                            <div className="col d-flex justify-content-center align-items-center">Type</div>
                            <div className="col d-flex justify-content-center align-items-center">Image</div>
                            <div className="col d-flex justify-content-center align-items-center">Shells</div>
                            <div className="col d-flex justify-content-center align-items-center">Actions</div>
                            <hr />
                        </div>
                        {
                            designs != null
                                ? designs.map((design, index) => (
                                    <div className="row mb-3 border border-dark" key={index}>
                                        <div className="col-1 d-flex justify-content-center align-items-center fw-bold">{design.productDesignId}</div>
                                        <div className="col d-flex justify-content-center align-items-center">{design.designName}</div>
                                        <div className="col d-flex justify-content-center align-items-center text-capitalize">{design.designType}</div>
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <img src={design.designFile} alt="" style={{ width: '10vw', height: '10vw' }} />
                                        </div>
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <div className="container-fluid">
                                                {
                                                    design.productShellDesigns.map((shell, index2) => (
                                                        <div key={index2} className="row">
                                                            <div className="col text-capitalize">
                                                                {shell.shellName.replace("shell", " ").trim()}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <button onClick={() => openUpdateDialog(design)} className="btn btn-primary">
                                                EDIT
                                            </button>
                                        </div>
                                    </div>
                                ))
                                : <></>
                        }
                    </div>
                </div>
            </div>
            <Dialog fullWidth={true} maxWidth="md" open={isOpenUpdate} onClose={closeUpdateDialog}>
                <DialogTitle>EDIT DESIGN</DialogTitle>
                <DialogContent>
                    <div className="container-fluid text-center my-3">
                        <div className="row mb-3">
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                ID
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                                <input value={activeDesign.productDesignId} type="text" className="form-control" disabled />
                            </div>
                            <div className="col d-flex justify-content-start align-items-center">
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                Name
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                                <input value={activeDesign.designName} onChange={(e) => setActiveDesign(d => ({ ...d, designName: e.target.value }))} type="text" className="form-control" />
                            </div>
                            <div className="col d-flex justify-content-start align-items-center">
                                <div className="form-text text-danger">{validateDesignName.reason}</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                Type
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                                <select className="form-select" value={activeDesign.designType} onChange={(e) => setActiveDesign(d => ({ ...d, designType: e.target.value }))}>
                                    <option value="">Select</option>
                                    <option value="ring">Ring</option>
                                    <option value="necklace">Necklace</option>
                                    <option value="earrings">Earrings</option>
                                    <option value="bracelets">Bracelets</option>
                                </select>
                            </div>
                            <div className="col d-flex justify-content-start align-items-center">
                                <div className="form-text text-danger">{!validateDesignType.result ? 'Please select one' : ''}</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-1 d-flex justify-content-center align-items-center">
                                Image
                            </div>
                            <div className="col d-flex justify-content-center align-items-center">
                                <input value={activeDesign.designFile} onChange={(e) => setActiveDesign(d => ({ ...d, designFile: e.target.value }))} type="text" className="form-control" />
                            </div>
                            <div className="col d-flex justify-content-start align-items-center">
                                <div className="form-text text-danger">{validateDesignFile.reason}</div>
                            </div>
                        </div>
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