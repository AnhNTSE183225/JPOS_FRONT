import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, setRef } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateInteger, validateString } from "../../helper_function/Validation";
import { INFINITY } from "chart.js/helpers";

const ManageMaterials = () => {
    const [materials, setMaterials] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState(null);

    const [activeMaterial, setActiveMaterial] = useState({ materialId: -1, materialName: '' });
    const validateMaterialId = validateInteger(activeMaterial.materialId, 1, INFINITY);
    const validateMaterialName = validateString(activeMaterial.materialName, 4, 50, null, '^[A-Za-z0-9_]+$');



    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const openDialog = (material) => {
        setActiveMaterial(JSON.parse(JSON.stringify(material)));
        setOpen(true);
    }

    const openDialogCreate = () => {
        setActiveMaterial({ materialId: -1, materialName: '' });
        setOpenCreate(true);
    }

    const closeDialog = () => {
        setActiveMaterial({ materialId: -1, materialName: '' });
        setOpen(false);
        setOpenCreate(false);
    }

    const fetchData = async () => {
        try {
            console.log(`${import.meta.env.VITE_jpos_back}/public/material/all`)
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_jpos_back}/public/material/all`,
            })
            if (response.status === 200) {
                setMaterials(response.data);
            } else {
                console.log(`Error`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const update = async () => {
        if (
            validateMaterialId.result &&
            validateMaterialName.result
        ) {
            try {
                const response = await axios({
                    method: 'put',
                    url: `${import.meta.env.VITE_jpos_back}/api/material/${activeMaterial.materialId}`,
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                    data: activeMaterial
                });
                if (response.status === 200) {
                    toast.success(`Update complete`);
                    closeDialog();
                } else {
                    console.log('error');
                }
                setRefresh(r => !r);
            } catch (error) {
                console.log(error);
                toast.error(`Unable to update`);
            }
        } else {
            toast.error(`Please fulfill all requirements`);
        }
    }

    const create = async () => {
        if (validateMaterialName.result) {
            try {
                const response = await axios({
                    method: 'post',
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                    url: `${import.meta.env.VITE_jpos_back}/api/material/add`,
                    data: activeMaterial
                })
                if (response.status === 200) {
                    toast.success('Create complete');
                    closeDialog();
                } else {
                    console.log('error');
                }
                setRefresh(r => !r);
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.error(`Please fulfill all requirements`);
        }
    }

    useEffect(() => {
        fetchData();
    }, [refresh])

    console.log(materials);

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col">
                    <h1>MANAGE MATERIALS</h1>
                </div>
            </div>
            <div className="row-mb-3">
                <div className="col">
                    <Button onClick={openDialogCreate}>Create new material</Button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="container-fluid">
                        <div className="row mb-3 fw-bold">
                            <div className="col-1 d-flex justify-content-center align-items-center">ID</div>
                            <div className="col-3 d-flex justify-content-start align-items-center">Name</div>
                            <div className="col-1 d-flex justify-content-center align-items-center">Actions</div>
                        </div>
                        {
                            materials != null
                                ? materials.map((material, index) => (
                                    <div key={index} className="row mb-3">
                                        <div className="col-1 d-flex justify-content-center align-items-center fw-bold">
                                            {material.materialId}
                                        </div>
                                        <div className="col-3 d-flex justify-content-start align-items-center text-capitalize">
                                            {material.materialName.replace("_", " ")}
                                        </div>
                                        <div className="col-1 d-flex justify-content-center align-items-center">
                                            <Button onClick={() => openDialog(material)}>EDIT</Button>
                                        </div>
                                    </div>
                                ))
                                : <div className="row mb-3">
                                    <div className="col">
                                        <CircularProgress />
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <Dialog maxWidth="xl" open={open} onClose={closeDialog}>
                <DialogTitle>EDIT MATERIAL</DialogTitle>
                <DialogContent>
                    <div className="container-fluid my-5">
                        <div className="row">
                            <div className="col d-flex justify-content-start align-items-center">
                                Name
                            </div>
                            <div className="col">
                                <input className="form-control" onChange={(e) => setActiveMaterial(m => ({ ...m, materialName: e.target.value }))} value={activeMaterial.materialName} type="text" />

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <div className="form-text text-end text-danger">{validateMaterialName.reason}</div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={update}>UPDATE</Button>
                    <Button onClick={closeDialog}>CANCEL</Button>
                </DialogActions>
            </Dialog>

            <Dialog maxWidth="xl" open={openCreate} onClose={closeDialog}>
                <DialogTitle>CREATE MATERIAL</DialogTitle>
                <DialogContent>
                    <div className="container-fluid my-5">
                        <div className="row">
                            <div className="col d-flex justify-content-start align-items-center">
                                Name
                            </div>
                            <div className="col">
                                <input className="form-control" onChange={(e) => setActiveMaterial(m => ({ ...m, materialName: e.target.value }))} value={activeMaterial.materialName} type="text" />

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <div className="form-text text-end text-danger">{validateMaterialName.reason}</div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={create}>CREATE</Button>
                    <Button onClick={closeDialog}>CANCEL</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ManageMaterials;