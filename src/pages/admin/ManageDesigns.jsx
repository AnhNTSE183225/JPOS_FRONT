import { useEffect, useState } from "react";
import { toast } from "sonner";

const ManageDesigns = () => {
    const [designs, setDesigns] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [search, setSearch] = useState(null);

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}`, { headers });
            if (response.status === 200) {

            } else {

            }
        } catch (error) {
            toast.error(`Failed to fetch data`);
        }
    }

    const update = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.put(`${import.meta.env.VITE_jpos_back}`, { headers });
            if (response.status === 200) {

            } else {

            }
            setRefresh(r => !r);
        } catch (error) {
            toast.error(`Unable to update`);
        }
    }

    const deleteFunction = async () => {
        try {
            const headers = {
                'Authorization': `Bearer : ${sessionStorage.getItem('token')}`
            }
            const response = await axios.delete(`${import.meta.env.VITE_jpos_back}`, { headers });
        } catch (error) {
            toast.error(`Unable to delete`);
        }
    }

    useEffect(() => {
        fetchData();
    }, [refresh])

    return (
        <div className="container-fluid">
            <div className="row mb-3">
                <div className="col-lg-4">
                    <h1 className="p-0">MANAGE </h1>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="form-control" />
                </div>
            </div>
            <div className="row mb-3">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageDesigns;