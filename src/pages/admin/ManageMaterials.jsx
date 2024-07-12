import {  Button,CircularProgress,Dialog,DialogActions,DialogContent,DialogTitle} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validateInteger, validateString } from "../../helper_function/Validation";
import { INFINITY } from "chart.js/helpers";
import useDocumentTitle from "../../components/Title";

const ManageMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [filteredMaterials, setFilteredMaterials] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');
    const [activeMaterial, setActiveMaterial] = useState({ materialId: -1, materialName: '' });
    const [open, setOpen] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    useDocumentTitle("Manage Materials");

    const validateMaterialId = validateInteger(activeMaterial.materialId, 1, INFINITY);
    const validateMaterialName = validateString(activeMaterial.materialName, 4, 50, null, '^[A-Za-z0-9_]+$');

    const openDialog = (material) => {
        setActiveMaterial(material);
        setOpen(true);
    };

    const openDialogCreate = () => {
        setActiveMaterial({ materialId: -1, materialName: '' });
        setOpenCreate(true);
    };

    const closeDialog = () => {
        setActiveMaterial({ materialId: -1, materialName: '' });
        setOpen(false);
        setOpenCreate(false);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/public/material/all`);
            setMaterials(response.data);
            setFilteredMaterials(response.data);
        } catch (error) {
            console.error("Error fetching materials:", error);
            toast.error("Failed to fetch materials.");
        }
    };

    const updateMaterial = async () => {
        if (validateMaterialId.result && validateMaterialName.result) {
            try {
                const response = await axios.put(
                    `${import.meta.env.VITE_jpos_back}/api/material/${activeMaterial.materialId}`,
                    activeMaterial,
                    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                );
                if (response.status === 200) {
                    toast.success("Update complete");
                    closeDialog();
                    setRefresh(prev => !prev);
                }
            } catch (error) {
                console.error("Error updating material:", error);
                toast.error("Unable to update material.");
            }
        } else {
            toast.error("Please fulfill all requirements.");
        }
    };

    const createMaterial = async () => {
        if (validateMaterialName.result) {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_jpos_back}/api/material/add`,
                    activeMaterial,
                    { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
                );
                if (response.status === 200) {
                    toast.success("Create complete");
                    closeDialog();
                    setRefresh(prev => !prev);
                }
            } catch (error) {
                console.error("Error creating material:", error);
                toast.error("Unable to create material.");
            }
        } else {
            toast.error("Please fulfill all requirements.");
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
        const filtered = materials.filter(material =>
            material.materialName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredMaterials(filtered);
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const MaterialDialog = ({ open, title, onConfirm }) => (
        <Dialog maxWidth="xl" open={open} onClose={closeDialog}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-3 d-flex align-items-center">
                            <label htmlFor="materialName">Name</label>
                        </div>
                        <div className="col-9">
                            <input
                                id="materialName"
                                className="form-control"
                                onChange={(e) => setActiveMaterial(m => ({ ...m, materialName: e.target.value }))}
                                value={activeMaterial.materialName}
                                type="text"
                            />
                        </div>
                    </div>
                    {validateMaterialName.reason && (
                        <div className="row mb-3">
                            <div className="col">
                                <div className="text-danger text-end">{validateMaterialName.reason}</div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={onConfirm}>
                    {title.split(' ')[0]}
                </Button>
                <Button variant="outlined" onClick={closeDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <div className="container">
            <div className="row mb-4">
                <div className="col">
                    <h1 className="text-center">Manage Materials</h1>
                </div>
            </div>
            <div className="row mb-3 align-items-center">
                <div className="col-auto">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search materials..." 
                        value={search}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-auto">
                    <Button variant="contained" color="primary" onClick={openDialogCreate}>
                        Create New Material
                    </Button>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col" className="text-center">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col" className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMaterials.length ? (
                                    filteredMaterials.map((material, index) => (
                                        <tr key={index} style={{ backgroundColor: 'transparent' }}>
                                            <td className="text-center">{material.materialId}</td>
                                            <td>{material.materialName.replace("_", " ")}</td>
                                            <td className="text-center">
                                                <Button 
                                                    variant="outlined" 
                                                    color="primary" 
                                                    onClick={() => openDialog(material)}
                                                >
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">
                                            <CircularProgress />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <MaterialDialog 
                open={open} 
                title="Edit Material" 
                onConfirm={updateMaterial} 
            />

            <MaterialDialog 
                open={openCreate} 
                title="Create Material" 
                onConfirm={createMaterial} 
            />
        </div>
    );
};

export default ManageMaterials;
