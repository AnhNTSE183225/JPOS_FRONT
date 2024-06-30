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

const SHAPES_IMAGES = [
    { name: 'Round', image: round },
    { name: 'Princess', image: princess },
    { name: 'Cushion', image: cushion },
    { name: 'Emerald', image: emerald },
    { name: 'Oval', image: oval },
    { name: 'Radiant', image: radiant },
    { name: 'Asscher', image: asscher },
    { name: 'Marquise', image: marquise },
    { name: 'Heart', image: heart },
    { name: 'Pear', image: pear },
];
//Selection above
const SHAPES = ['round', 'princess', 'cushion', 'emerald', 'oval', 'radiant', 'asscher', 'marquise', 'heart', 'pear'];
const ORIGINS = ['LAB_GROWN', 'NATURAL'];

//Combination of these create a table
const CUTS = ['Fair', 'Good', 'Very_Good', 'Excellent'];
const MIN_CARAT = 0.05;
const CARAT_STEP = 0.1;
const MAX_CARAT = 10;

//A single table
const CLARITIES = ['SI3', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL']; //Column
const COLORS = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D']; //Row

const DiamondPriceListPage = () => {

    const [activeOrigin, setActiveOrigin] = useState(ORIGINS[0]);
    const [activeShape, setActiveShape] = useState(SHAPES[0]);

    useDocumentTitle("Bijoux Diamond Price List");

    return (
        <div className={`container ${styles['diamond-price-list']}`}>
            <div className="row mb-3" id={`${styles['origin-row']}`}>
                {
                    ORIGINS.map((value,index) => (
                        <div onClick={() => setActiveOrigin(value)} key={index} id={`${styles['origin-div']}`} className={`col p-0 text-center ${value == activeOrigin ? styles['active'] : ''}`}>
                            <span>{value.replace("_"," ")}</span>
                        </div>
                    ))
                }
            </div>
            <div className="row gap-5">
                {SHAPES_IMAGES.map((value, index) => (
                    <div key={index} className={`col p-0 position-relative`} id={`${styles['shape-div']}`}>
                        <img src={value.image} alt="" />
                        <span>{value.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiamondPriceListPage;
