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
const MAX_CARAT = 10.05;
let CARAT_RANGE = []
for (let i = MIN_CARAT; i <= MAX_CARAT; i += CARAT_STEP) {
    let first_num = parseFloat(i).toFixed(2);
    let second_num = parseFloat(i + CARAT_STEP).toFixed(2);
    CARAT_RANGE = [...CARAT_RANGE, [first_num, second_num]];
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

    const [selectedPrice, setSelectedPrice] = useState(undefined);

    const [refresh, setRefresh] = useState(false);

    const updatePrice = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.put(`${import.meta.env.VITE_jpos_back}/api/diamond-price/update`, selectedPrice, { headers });
            if (!response.data || response.status === 204) {
                console.log(`Can't update`);
                toast.error(`Something wen't wrong, you cannot update`);
            } else {
                setRefresh(r => !r);
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
                const object = {
                    origin: origin,
                    caratWeightFrom: caratRange[0],
                    caratWeightTo: caratRange[1],
                    shape: shape,
                    color: color,
                    clarity: clarity,
                    cut: cut,
                    price: newPrice
                }
                const headers = {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
                const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/diamond-price/add`, object, { headers });
                if (!response.data || response.status === 204) {
                    toast.error(`Error creating`);
                } else {
                    toast.success(`Creation completed`);
                    setRefresh(r => !r);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchData = async () => {
        try {
            const s_shapes = shape == 'ALL' ? SHAPES : [shape];
            const s_origins = origin == 'ALL' ? ORIGINS : [origin];
            const s_cuts = cut == 'ALL' ? CUTS : [cut];
            const s_clarity = clarity == 'ALL' ? CLARITIES : [clarity];
            const s_color = color == 'ALL' ? COLORS : [color];
            const s_from_carat = caratRange == 'ALL' ? MIN_CARAT : caratRange[0];
            const s_to_carat = caratRange == 'ALL' ? MAX_CARAT : caratRange[1];

            const response = await axios({
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
                url: `${import.meta.env.VITE_jpos_back}/api/diamond-price/get-diamond-prices`,
                data: {
                    listOrigin: s_origins,
                    listShape: s_shapes,
                    listCut: s_cuts,
                    listClarity: s_clarity,
                    listColor: s_color,
                    minCarat: s_from_carat,
                    maxCarat: s_to_carat
                }
            })
            if (response.status === 200) {
                setDiamondPriceList(response.data.content);
                setSelectedPrice(undefined);
            } else {
                console.log(`Error`);
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
    }

    useEffect(() => {
        fetchData();
    }, [refresh, shape, origin, cut, clarity, color, caratRange])

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
                                const carat = e.target.value.split(",");
                                setCaratRange([carat[0], carat[1]]);
                            } else {
                                setCaratRange('ALL');
                            }
                        }}>
                            <option value={'ALL'}>ALL</option>
                            {
                                CARAT_RANGE.map((value, index) => (
                                    <option key={index} value={value}>
                                        {value[0] + " - " + value[1] + ' ct'}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group">
                        <button onClick={createNewPrice} className={`btn btn-primary ${styles['select-label']}`}>Create new price</button>
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
                    <button className="btn btn-primary" onClick={resetFilters}>Reset filters</button>
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
                                diamondPriceList !== null
                                    ? diamondPriceList.map((value, index) => (
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
                                                    {
                                                        selectedPrice !== undefined
                                                            ? selectedPrice.diamondPriceId == value.diamondPriceId
                                                                ? <button onClick={updatePrice} className="btn btn-primary"> <FontAwesomeIcon icon={faFloppyDisk} /> </button>
                                                                : <></>
                                                            : <></>
                                                    }
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