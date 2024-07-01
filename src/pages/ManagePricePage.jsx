import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";
import styles from '/src/css/ManagePricePage.module.css';

//Selection above
const SHAPES = ['round', 'princess', 'cushion', 'emerald', 'oval', 'radiant', 'asscher', 'marquise', 'heart', 'pear'];
const ORIGINS = ['LAB_GROWN', 'NATURAL'];

//Combination of these create a table
const CUTS = ['Fair', 'Good', 'Very_Good', 'Excellent'];
const MIN_CARAT = 0.05;
const CARAT_STEP = 0.1;
const MAX_CARAT = 10;
let CARAT_RANGE = []
for (let i = MIN_CARAT; i <= MAX_CARAT; i += CARAT_STEP) {
    CARAT_RANGE = [...CARAT_RANGE, i.toFixed(2) + " - " + (i + CARAT_STEP).toFixed(2) + ' ct'];
}

//A single table
const CLARITIES = ['SI3', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL']; //Column
const COLORS = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D']; //Row


const ManagePricePage = () => {
    return (
        <div className="container-fluid" id={`${styles['manage-price']}`}>
            <h1 className="p-0">Manage price</h1>
        </div>
    )
}

export default ManagePricePage;