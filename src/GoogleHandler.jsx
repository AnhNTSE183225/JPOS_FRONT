import { useLocation } from "react-router-dom";

const GoogleHandler = () => {

    const location = useLocation();

    console.log(location.search);

}

export default GoogleHandler;