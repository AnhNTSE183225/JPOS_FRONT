import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleHandler = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const processData = async () => {
        try {
            sessionStorage.clear();
            //console.log(atob(location.search.slice(1)));
            //console.log(JSON.parse(atob(location.search.slice(1))));
            const resp = JSON.parse(atob(location.search.slice(2)));
            const method = location.search[1];

            if (method == 'S') {
                const response = await axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_jpos_back}/api/v1/auth/register`,
                    data: resp
                });
                if (response.status === 200) {
                    sessionStorage.setItem('customer', JSON.stringify(response.data.account));
                    sessionStorage.setItem('token', response.data.token);
                }
            } else {
                console.log(resp);
                sessionStorage.setItem('customer', JSON.stringify(resp.account));
                sessionStorage.setItem('token',resp.token);
                // const response = await axios({
                //     method: 'post',
                //     url: `${import.meta.env.VITE_jpos_back}/api/v1/auth/authenticate`,
                //     data: resp
                // });
                // if (response.status === 200) {
                //     sessionStorage.setItem('customer', JSON.stringify(response.data.account));
                //     sessionStorage.setItem('token', response.data.token);
                // }
            }

            //toast.info("Please finish your registration");

            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        processData();
    }, [])

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h1>Handling request...</h1>
                </div>
            </div>
        </div>
    )

}

export default GoogleHandler;