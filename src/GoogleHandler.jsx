import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const GoogleHandler = () => {

    const location = useLocation();
    const navigate = useNavigate();

    

    useEffect(() => {
        sessionStorage.clear();
        //console.log(atob(location.search.slice(1)));
        //console.log(JSON.parse(atob(location.search.slice(1))));
        const resp = JSON.parse(atob(location.search.slice(1)));

        sessionStorage.setItem('customer', JSON.stringify(resp.account));
        sessionStorage.setItem('token', JSON.stringify(resp.token));
        toast.info("Please finish your registration");
        navigate("/profile");
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