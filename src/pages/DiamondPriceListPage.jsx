import NavigationBar from "../components/NavigationBar";
import { useEffect, useState } from "react";
import axios from 'axios';
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";
import useDocumentTitle from "../components/Title";
import { Pagination } from "@mui/material";
import styles from '/src/css/DiamondPriceListPage.module.css';
import asscher from '/src/assets/svg/Asscher.svg';
import cushion from '/src/assets/svg/Cushion.svg';
import emerald from '/src/assets/svg/Emerald.svg';
import heart from '/src/assets/svg/Heart.svg';
import marquise from '/src/assets/svg/Marquise.svg';
import oval from '/src/assets/svg/Oval.svg';
import pear from '/src/assets/svg/Pear.svg';
import princess from '/src/assets/svg/Princess.svg';
import radiant from '/src/assets/svg/Radiant.svg';
import round from '/src/assets/svg/Round.svg';
import { toast } from "sonner";

const SHAPES_IMAGES = [
    { name: 'round', image: round },
    { name: 'princess', image: princess },
    { name: 'cushion', image: cushion },
    { name: 'emerald', image: emerald },
    { name: 'oval', image: oval },
    { name: 'radiant', image: radiant },
    { name: 'asscher', image: asscher },
    { name: 'marquise', image: marquise },
    { name: 'heart', image: heart },
    { name: 'pear', image: pear },
];
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
    CARAT_RANGE = [...CARAT_RANGE, [i, i + CARAT_STEP]];
}

//A single table
const CLARITIES = ['SI3', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL']; //Column
const COLORS = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D']; //Row

const DiamondPriceListPage = () => {

    const [activeOrigin, setActiveOrigin] = useState(ORIGINS[0]);
    const [activeShape, setActiveShape] = useState(SHAPES[0]);

    const [diamondPrices, setDiamondPrices] = useState(null);
    const [queryList, setQueryList] = useState(null);
    
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    useDocumentTitle("Bijoux Diamond Price List");

    const fetchData = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/diamond-price/get-all`, {headers});
            if (!response.data || response.status === 204) {
                console.log(`${import.meta.env.VITE_jpos_back}/api/diamond-price/get-all`);
                toast.info(`Cannot fetch diamond prices right now...`);
            } else {
                setDiamondPrices(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (diamondPrices != null) {
            let query_list = [...diamondPrices];
            query_list = query_list.filter(price => price.origin == activeOrigin && price.shape == activeShape);
            setQueryList(query_list);
        }
    }, [activeOrigin, activeShape, diamondPrices])

    return (
        <div className={`container ${styles['diamond-price-list']}`}>
            <div className="row mb-3" id={`${styles['origin-row']}`}>
                {
                    ORIGINS.map((value, index) => (
                        <div onClick={() => setActiveOrigin(value)} key={index} id={`${styles['origin-div']}`} className={`col p-0 text-center ${value == activeOrigin ? styles['active'] : ''}`}>
                            <span>{value.replace("_", " ")}</span>
                        </div>
                    ))
                }
            </div>
            <div className="row gap-5 mb-3">
                {SHAPES_IMAGES.map((value, index) => (
                    <div onClick={() => setActiveShape(value.name)} key={index} className={`col ${value.name == activeShape ? styles['active'] : ''}`} id={`${styles['shape-div']}`}>
                        <img src={value.image} alt="" />
                        <span>{value.name[0].toUpperCase() + value.name.slice(1)}</span>
                    </div>
                ))}
            </div>

            {
                CARAT_RANGE.map((caratRangeValue, index) => (
                    <div key={index} className={`row mb-3`}>
                        <h4>{activeOrigin.replace("_", " ")} {activeShape.toUpperCase()} EXCELLENT CUT {caratRangeValue[0].toFixed(2)} - {caratRangeValue[1].toFixed(2)} Ct</h4>
                        <table className="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>{caratRangeValue[0].toFixed(2)} - {caratRangeValue[1].toFixed(2)} Ct</th>
                                    {
                                        COLORS.map((caratRangeValue, index) => (
                                            <th key={index}>
                                                {caratRangeValue}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    CLARITIES.map((clarityValue, index) => (
                                        <tr key={index}>
                                            <th>{clarityValue}</th>
                                            {
                                                COLORS.map((colorValue, index) => (
                                                    <td key={index}>
                                                        {
                                                            queryList != null
                                                                ? queryList.find(price => price.color == colorValue && price.clarity == clarityValue && caratRangeValue[0] == price.caratWeightFrom && caratRangeValue[1] == price.caratWeightTo) != null
                                                                    ? formatPrice(queryList.find(price => price.color == colorValue && price.clarity == clarityValue && caratRangeValue[0] == price.caratWeightFrom && caratRangeValue[1] == price.caratWeightTo).price)
                                                                    : 'NaN'
                                                                : 'NaN'
                                                        }
                                                    </td>
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ))
            }
        </div>
    );
};

export default DiamondPriceListPage;
