import { faClipboard, faFloppyDisk, faGem, faHammer, faPenToSquare, faRing, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatPrice, formatDate } from '/src/helper_function/ConvertFunction';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


const ManageDesignPrice = () => {

    const [productDesigns, setProductDesigns] = useState(null);
    const [queryList, setQueryList] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState('');

    const [activeDesign, setActiveDesign] = useState(null);
    const [open, setOpen] = useState(false);

    const openDialog = (design) => {
        setActiveDesign(design);
        setOpen(true);
    }

    const closeDialog = () => {
        setActiveDesign(null);
        setOpen(false);
    }

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
        fetchData();
    }, [refresh])

    useEffect(() => {
        if (search.length > 0) {
            let query_list = [...productDesigns];
            query_list = query_list.filter(design => design.designName.toLowerCase().includes(search.toLowerCase()) || design.productDesignId.toString() == search);
            setQueryList(query_list);
        } else {
            setQueryList(productDesigns);
        }
    }, [search])

    console.log(queryList);

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col">
                    <h1>MANAGE DESIGN PRICES</h1>
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-lg-4">
                    <input type="text" className="form-control" placeholder="Search id/name" onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <div className="container-fluid text-center">
                        <div className="row mb-3 fw-bold">
                            <div className="col-1">ID</div>
                            <div className="col">Name</div>
                            <div className="col">Type</div>
                            <div className="col">Image</div>
                            <div className="col">Options</div>
                            <div className="col">Actions</div>
                        </div>
                        {
                            queryList !== null
                                ? queryList.map((design, index) => (
                                    <div className="row mb-3" key={index}>
                                        <div className="col-1 fw-bold d-flex justify-content-center align-items-center">{design.productDesignId}</div>
                                        <div className="col d-flex justify-content-center align-items-center">{design.designName}</div>
                                        <div className="col d-flex justify-content-center align-items-center text-capitalize">{design.designType}</div>
                                        <div className="col d-flex justify-content-center align-items-center"><img style={{ width: '6rem', height: '6rem' }} src={design.designFile} /></div>
                                        <div className="col d-flex justify-content-center align-items-center">
                                            <div className="container-fluid">
                                                {
                                                    design.productShellDesigns.map((shell, index2) => (
                                                        <div className="row">
                                                            <div className="col text-capitalize">
                                                                {shell.shellName}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="col d-flex justify-content-center align-items-center"><button onClick={() => openDialog(design)} className="btn btn-primary">Edit</button></div>
                                    </div>
                                ))
                                : <></>
                        }
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>Edit Design Price</DialogTitle>
                <DialogContent>
                    <div className="container-fluid">
                        {
                            activeDesign !== null
                                ? activeDesign.productShellDesigns.map((shell, index) => (
                                    <div className="row">
                                        
                                    </div>
                                ))
                                : <></>
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button>Update</Button>
                    <Button onClick={closeDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ManageDesignPrice;