import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DiamondCard from './DiamondCard';
import styles from '/src/css/ChooseDiamonds.module.css';
import { formatPrice } from '../../helper_function/ConvertFunction';
import { fetchDiamondPrice } from '../../helper_function/FetchPriceFunctions';

const ChooseDiamond = () => {

    const [diamondList, setDiamondList] = useState([]);
    const [queryList, setQueryList] = useState([]);
    const [activeShape, setActiveShape] = useState(null);
    const [minPrice, setMinPrice] = useState(200);
    const [minCarat, setMinCarat] = useState(0.05);
    const [color, setColor] = useState(1);
    const [clarity, setClarity] = useState(1);
    const [cut, setCut] = useState(1);
    const [diamondPrices, setDiamondPrices] = useState([]);

    useEffect(() => {
        const setup = async () => {
            if (sessionStorage.getItem('designId') === null) {
                toast.info(`Please pick a setting first`);
                navigate('/build-your-own/choose-setting');
            } else {
                const diamond_list = await fetchData();
                const diamond_prices = await getPrice(diamond_list);

                setDiamondPrices(diamond_prices);
                setDiamondList(diamond_list);
                setQueryList(diamond_list);
            }
        }

        setup();
    }, [])

    useEffect(() => {
        if (diamondList.length > 0) {
            let list = diamondList;
            if (activeShape !== null) {
                list = list.filter(diamond => diamond.shape.toLowerCase() == activeShape.toLowerCase());
            }
            list = list.filter(diamond => diamond.caratWeight > minCarat);
            list = list.filter(diamond => reverseConvertColor(diamond.color) >= color);
            list = list.filter(diamond => reverseConvertClarity(diamond.clarity) >= clarity);
            list = list.filter(diamond => reverseConvertCut(diamond.cut) >= cut);
            list = list.filter(diamond => diamondPrices.find(d => d.id === diamond.diamondId).price >= minPrice);
            setQueryList(list);
        }
    }, [activeShape, minPrice, minCarat, color, clarity, cut])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/diamonds/all`);
            if (!response.data || response.status === 204) {
                toast.error("Error fetching the diamonds from the server");
            } else {
                return response.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getPrice = async (list) => {
        let result = []
        for (const diamond of list) {
            const single_price = await fetchDiamondPrice(diamond.cut, diamond.color, diamond.clarity, diamond.caratWeight, diamond.caratWeight);
            result = [
                ...result,
                {
                    id: diamond.diamondId,
                    price: single_price
                }
            ]
        }
        return result;
    }

    const resetFilters = () => {
        setMinCarat(0.05);
        setMinPrice(200);
        setClarity(1);
        setCut(1);
        setActiveShape(null);
        setColor(1);
    }

    const convertColor = (int) => {
        const chars = ['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'];
        return chars[int - 1] || 'Invalid input';
    }

    const convertClarity = (int) => {
        const clarity = ['I3', 'I2', 'I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
        return clarity[int - 1] || 'Invalid input';
    }

    const convertCut = (int) => {
        const quality = ['Poor', 'Fair', 'Good', 'Very_Good', 'Excellent'];
        return quality[int - 1] || 'Invalid input';
    }

    const reverseConvertColor = (char) => {
        const chars = ['Z', 'Y', 'X', 'W', 'V', 'U', 'T', 'S', 'R', 'Q', 'P', 'O', 'N', 'M', 'L', 'K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'];
        const index = chars.indexOf(char);
        return index !== -1 ? index + 1 : 'Invalid input';
    }

    const reverseConvertClarity = (clarityStr) => {
        const clarity = ['I3', 'I2', 'I1', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
        const index = clarity.indexOf(clarityStr);
        return index !== -1 ? index + 1 : 'Invalid input';
    }

    const reverseConvertCut = (qualityStr) => {
        const quality = ['Poor', 'Fair', 'Good', 'Very_Good', 'Excellent'];
        const index = quality.indexOf(qualityStr);
        return index !== -1 ? index + 1 : 'Invalid input';
    }


    const navigate = useNavigate();

    const handleChoose = (id) => {
        navigate(`/build-your-own/diamond-details/${id}`);
    }

    const isSelected = (id) => {

        if (sessionStorage.getItem('diamonds') === null || sessionStorage.getItem('diamonds').length === 0) {
            return false;
        } else {
            return sessionStorage.getItem('diamonds').split(',').includes(id.toString());
        }
    }

    return (
        <>
            <div className={`${styles.container} container`}>
                <div className="row">
                    <div className="col-4">
                        <b>Shape</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                {['Round', 'Princess', 'Cushion', 'Emerald', 'Oval', 'Radiant', 'Asscher', 'Marquise', 'Heart', 'Pear'].map(value =>
                                    <div key={value} className={`col-3 ${styles['shape']} d-flex flex-column justify-content-center align-items-center ${activeShape == value ? styles['active'] : ''} `} onClick={() => setActiveShape(value)}>
                                        <img className='img-fluid' src={`/src/assets/svg/${value}.svg`} alt="" />
                                        <span className='mt-2'>{value}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Minimum price</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start">{formatPrice(200)}</div>
                                <div className="col text-end">{formatPrice(5000000)}</div>
                            </div>
                            <input type="range" className='form-range' min={200} max={5000000} step={200} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                            <input type="number" min={200} max={5000000} className='form-control' step="0.01" onChange={(e) => setMinPrice(e.target.value)} value={minPrice} />
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Min Carat</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start">0.05</div>
                                <div className="col text-end">30.0</div>
                            </div>
                            <input type="range" className='form-range' min={0.05} max={30.0} step={0.05} value={minCarat} onChange={(e) => setMinCarat(e.target.value)} />
                            <input type="number" min={0.05} max={30.0} className='form-control' step="0.01" onChange={(e) => setMinCarat(e.target.value)} value={minCarat} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <b>Min Color</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start">Z</div>
                                <div className="col text-end">D</div>
                            </div>
                            <input type="range" className='form-range' min={1} max={23} step={1} value={color} onChange={(e) => setColor(e.target.value)} />
                            <div className='text-start'><b>Color:</b> {convertColor(color)}</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Min Clarity</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start">I3</div>
                                <div className="col text-end">FL</div>
                            </div>
                            <input type="range" className='form-range' min={1} max={11} step={1} value={clarity} onChange={(e) => setClarity(e.target.value)} />
                            <div className='text-start'><b>Clarity:</b> {convertClarity(clarity)}</div>
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Cut</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start">Poor</div>
                                <div className="col text-end">Excellent</div>
                            </div>
                            <input type="range" className='form-range' min={1} max={5} step={1} value={cut} onChange={(e) => setCut(e.target.value)} />
                            <div className='text-start'><b>Cut:</b> {convertCut(cut)}</div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-end">
                        <button className='btn btn-primary' onClick={resetFilters}>Reset filters</button>
                    </div>
                </div>
                <div className='row my-3'>
                    {queryList.length > 0 && diamondPrices.length > 0 ? (
                        queryList.map(diamond => (
                            <div key={diamond.diamondId} className="col-md-3 mb-4">
                                <DiamondCard
                                    diamond={diamond}
                                    isSelected={isSelected(diamond.diamondId)}
                                    onClick={() => handleChoose(diamond.diamondId)}
                                    price={diamondPrices.find(d => d.id == diamond.diamondId).price}
                                />
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ChooseDiamond;
