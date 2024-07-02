import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { formatDate, formatPrice } from "../helper_function/ConvertFunction";
import styles from '/src/css/ManagePricePage.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPenToSquare } from "@fortawesome/free-regular-svg-icons";

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

    const [shape, setShape] = useState('ALL');
    const [origin, setOrigin] = useState('ALL');
    const [caratRange, setCaratRange] = useState('ALL');
    const [cut, setCut] = useState('ALL');
    const [clarity, setClarity] = useState('ALL');
    const [color, setColor] = useState('ALL');
    const [newPrice, setNewPrice] = useState(0.01);

    const [diamondPriceList, setDiamondPriceList] = useState(null);
    const [queryList, setQueryList] = useState(null);

    const [selectedPrice, setSelectedPrice] = useState(undefined);

    const [pageSize, setPageSize] = useState(50);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    let pages = []
    if (queryList !== null) {
        let i = 0
        for (; i < queryList.length; i += pageSize) {
            pages.push(i);
        }
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_jpos_back}/api/diamond-price/get-all`);
            if (!response.data || response.status === 204) {
                console.log(`Can't fetch from ${import.meta.env.VITE_jpos_back}/api/diamond-price/get-all`);
            } else {
                setDiamondPriceList(response.data);
                setQueryList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updatePrice = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/diamond-price/update`, selectedPrice);
            if (!response.data || response.status === 204) {
                console.log(`Can't update`);
                toast.error(`Something wen't wrong, you cannot update`);
            } else {
                setSelectedPrice(undefined);
                fetchData();
                toast.success('Update successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const createNewPrice = async () => {
        try {
            if (
                shape == 'ALL' ||
                origin == 'ALL' ||
                caratRange == 'ALL' ||
                cut == 'ALL' ||
                color == 'ALL' ||
                clarity == 'ALL'
            ) {
                toast.info(`Put in all values of filter to proceed creating new price`);
            } else {
                const newPrice = {
                    
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const resetFilters = () => {
        setShape('ALL');
        setOrigin('ALL');
        setCaratRange('ALL');
        setCut('ALL');
        setClarity('ALL');
        setColor('ALL');
        setCurrentPageIndex(0);
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (diamondPriceList !== null) {
            let query_list = [...diamondPriceList];
            if (shape != 'ALL') {
                query_list = query_list.filter(price => price.shape == shape);
            }
            if (origin != 'ALL') {
                query_list = query_list.filter(price => price.origin == origin);
            }
            if (cut != 'ALL') {
                query_list = query_list.filter(price => price.cut == cut);
            }
            if (caratRange != 'ALL') {
                query_list = query_list.filter(price => price.caratWeightFrom == caratRange[0] && price.caratWeightTo == caratRange[1]);
            }
            if (clarity != 'ALL') {
                query_list = query_list.filter(price => price.clarity == clarity);
            }
            if (color != 'ALL') {
                query_list = query_list.filter(price => price.color == color);
            }
            setQueryList(query_list);
            setCurrentPageIndex(0);
        }
    }, [shape, origin, caratRange, cut, clarity, color])

    return (
        <div className="container-fluid" id={`${styles['manage-price']}`}>
            <h1 className="p-0">Manage price</h1>
            <div className="row mb-3">
                <div className="col-lg-6 mb-3">
                    <div className="input-group mb-3">
                        <span className={`input-group-text ${styles['select-label']}`}>Shape</span>
                        <select value={shape} onChange={(e) => setShape(e.target.value)} type="text" className="form-select" >
                            <option value={'ALL'}>ALL</option>
                            {
                                SHAPES.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text ${styles['select-label']}`}>
                            Origin
                        </span>
                        <select value={origin} onChange={(e) => setOrigin(e.target.value)} className="form-select">
                            <option value={'ALL'}>ALL</option>
                            {
                                ORIGINS.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value.replace("_", " ")}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text ${styles['select-label']}`}>
                            Range
                        </span>
                        <select className="form-select" onChange={(e) => {
                            if (e.target.value !== 'ALL') {
                                const values = e.target.value.split(" - ");
                                setCaratRange([parseFloat(values[0]), parseFloat(values[1])]);
                            } else {
                                setCaratRange('ALL');
                            }
                        }}>
                            <option value={'ALL'}>ALL</option>
                            {
                                CARAT_RANGE.map((value, index) => (
                                    <option key={index} value={value.replace(" ct", "")}>
                                        {value}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <button className={`btn btn-primary ${styles['select-label']}`}>Create new price</button>
                        <span className="input-group-text">$</span>
                        <input type="number" min={0.01} step={0.01} className="form-control" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                    </div>
                </div>
                <div className="col-lg-6 mb-3">
                    <div className="input-group mb-3">
                        <span className={`input-group-text ${styles['select-label']}`}>
                            Cut
                        </span>
                        <select value={cut} onChange={(e) => setCut(e.target.value)} className="form-select">
                            <option value={'ALL'}>ALL</option>
                            {
                                CUTS.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value.replace("_", " ")}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text ${styles['select-label']}`}>
                            Color
                        </span>
                        <select className="form-select" value={color} onChange={(e) => setColor(e.target.value)}>
                            <option value={'ALL'}>ALL</option>
                            {
                                COLORS.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className={`input-group-text ${styles['select-label']}`}>
                            Clarity
                        </span>
                        <select className="form-select" value={clarity} onChange={(e) => setClarity(e.target.value)}>
                            <option value={'ALL'}>ALL</option>
                            {
                                CLARITIES.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <nav>
                        <ul className="pagination input-group">
                            {
                                pages.map((value, index) => (
                                    <li key={index} style={{ cursor: 'pointer' }} className="page-item" onClick={() => setCurrentPageIndex(value)}><span className="page-link">{index + 1}</span></li>
                                ))
                            }
                            <button className="btn btn-primary" onClick={resetFilters}>Reset filters</button>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <table className="text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Origin</th>
                                <th>Range</th>
                                <th>Shape</th>
                                <th>Traits</th>
                                <th>Price</th>
                                <th>Eff.Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                queryList !== null
                                    ? queryList.slice(currentPageIndex, currentPageIndex + pageSize).map((value, index) => (
                                        <tr key={index}>
                                            <td>{value.diamondPriceId}</td>
                                            <td>{value.origin}</td>
                                            <td>{value.caratWeightFrom.toFixed(2)} - {value.caratWeightTo.toFixed(2)}</td>
                                            <td>{value.shape}</td>
                                            <td>{value.color}-{value.clarity} {value.cut.replace("_", " ")}</td>
                                            <td>
                                                <div className="input-group">
                                                    {
                                                        selectedPrice !== undefined
                                                            ? selectedPrice.diamondPriceId == value.diamondPriceId
                                                                ? <input min={0.01} step={0.05} value={selectedPrice.price} onChange={(e) => setSelectedPrice(p => ({ ...p, price: e.target.value }))} type="number" className="form-control text-end" />
                                                                : <input min={0.01} step={0.05} value={value.price} type="number" className="form-control text-end" disabled />
                                                            : <input min={0.01} step={0.05} value={value.price} type="number" className="form-control text-end" disabled />
                                                    }
                                                    <button onClick={() => setSelectedPrice(value)} className="btn btn-primary"> <FontAwesomeIcon icon={faPenToSquare} /> </button>
                                                    <button onClick={updatePrice} className="btn btn-primary"> <FontAwesomeIcon icon={faFloppyDisk} /> </button>
                                                </div>
                                            </td>
                                            <td>{formatDate(value.effectiveDate)}</td>
                                        </tr>
                                    ))
                                    : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManagePricePage;