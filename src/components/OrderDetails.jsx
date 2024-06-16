import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = ({ order }) => {

    if (order == null) {
        return (
            <>
                Loading...
            </>
        )
    } else {
        return (
            <>
                Loaded order {order.id}
            </>
        )
    }
}

export default OrderDetails;