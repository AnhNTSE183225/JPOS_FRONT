import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DiamondCard from './DiamondCard';
import styles from '/src/css/ChooseDiamonds.module.css';
import { formatPrice } from '../../helper_function/ConvertFunction';
import { Pagination, Slider } from '@mui/material';
import useDocumentTitle from '../../components/Title';

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
const SHAPES = ['round', 'princess', 'cushion', 'emerald', 'oval', 'radiant', 'asscher', 'marquise', 'heart', 'pear'];
const CLARITIES = ['SI3', 'SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
const COLORS = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'];
const CUTS = ['Fair', 'Good', 'Very_Good', 'Excellent'];
const MIN_PRICE = 200;
const MAX_PRICE = 5000000;
const PRICE_STEP = 200;
const MIN_CARAT = 0.05;
const MAX_CARAT = 10;
const CARAT_STEP = 0.05;
const DEFAULT_PAGE_NO = 0;
const DEFAULT_PAGE_SIZE = 40;

const ChooseDiamond = () => {

    const navigate = useNavigate();
    const [diamondList, setDiamondList] = useState([]);

    const [activeShape, setActiveShape] = useState(null);

    const [minPrice, setMinPrice] = useState(MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

    const [minCarat, setMinCarat] = useState(MIN_CARAT);
    const [maxCarat, setMaxCarat] = useState(10);

    const [beginColor, setBeginColor] = useState(0);
    const [endColor, setEndColor] = useState(COLORS.length - 1);

    const [beginClarity, setBeginClarity] = useState(0);
    const [endClarity, setEndClarity] = useState(CLARITIES.length - 1);


    const [beginCut, setBeginCut] = useState(0);
    const [endCut, setEndCut] = useState(CUTS.length - 1);

    const [origin, setOrigin] = useState('NATURAL')

    const [pageNo, setPageNo] = useState(DEFAULT_PAGE_NO);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
    const [totalPage, setTotalPage] = useState(10);

    useDocumentTitle('Find The Right Diamond For You');

    const setup = async () => {
        if (sessionStorage.getItem('selected_product') == null) {
            toast.info(`Please pick a setting first`);
            navigate('/build-your-own/choose-setting');
        } else {
            //let diamond_list = await fetchData(pageNo, pageSize);
            let query = await fetchQuery();
            let diamond_list = query.content;
            let total_page = query.page.totalPages;

            setTotalPage(total_page);
            setDiamondList(diamond_list);
        }
    }
    const fetchQuery = async () => {
        try {
            const query = {
                origin: origin,
                shapeList: activeShape !== null ? [activeShape.toLowerCase()] : SHAPES,
                colorList: [...COLORS.slice(beginColor, endColor), COLORS[endColor]],
                clarityList: [...CLARITIES.slice(beginClarity, endClarity), CLARITIES[endClarity]],
                cutList: [...CUTS.slice(beginCut, endCut), CUTS[endCut]],
                minCarat: minCarat,
                maxCarat: maxCarat,
                minPrice: minPrice,
                maxPrice: maxPrice
            }
            const headers = {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
            const response = await axios.post(`${import.meta.env.VITE_jpos_back}/api/diamond/get-diamond-with-price-by-4C?pageNo=${pageNo}&pageSize=${pageSize}`, query, {headers});
            if (!response.data || response.status === 204) {
                toast.error(`Cannot fetch data`);
            } else {
                return response.data;
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        setup();
    }, [])

    useEffect(() => {
        setup();
    }, [pageNo, pageSize, activeShape, minCarat, maxCarat, beginColor, endColor, beginClarity, endClarity, beginCut, endCut, minPrice, maxPrice, origin])

    const resetFilters = () => {

        setMinCarat(MIN_CARAT);
        setMaxCarat(MAX_CARAT);

        setMinPrice(MIN_PRICE);
        setMaxPrice(MAX_PRICE);

        setBeginClarity(0);
        setEndClarity(CLARITIES.length - 1);

        setBeginCut(0);
        setEndCut(CUTS.length - 1);

        setActiveShape(null);

        setBeginColor(0);
        setEndColor(COLORS.length - 1);

        setOrigin("NATURAL");

        setPageNo(DEFAULT_PAGE_NO);
        setPageSize(DEFAULT_PAGE_SIZE);

        setup();
    }

    const isSelected = (id) => {
        if (sessionStorage.getItem('selected_diamonds') === null) {
            return false;
        } else {
            return JSON.parse(sessionStorage.getItem('selected_diamonds')).filter(d => d.diamondId == id).length > 0;
        }
    }

    return (
        <>
            <div className={`${styles.container} container`}>
                <div className="diamond-finder text-center">
                    <h3 className='ms-3' style={{ textAlign: 'center' }}>Diamond Finder</h3>
                    <p style={{ maxWidth: '550px', margin: '0 auto', textAlign: 'center' }}>Use our diamond search feature to find GIA-graded, conflict-free loose diamonds of the highest quality. Browse thousands of options and use the filters to narrow down the selection by carat, cut, colour, clarity, shape and price.</p>
                </div>
                <div className="row text-center mb-4 mt-4">
                    <div className="col mx-auto">
                        <div className="btn-group" role="group" aria-label="Diamond Origin">
                            <button
                                type="button"
                                className={`btn ${origin === "NATURAL" ? styles['btn-custom'] : styles['btn-outline-custom']}`}
                                onClick={() => setOrigin("NATURAL")}
                                style={{ width: '150px' }}
                            >
                                Natural
                            </button>
                            <button
                                type="button"
                                className={`btn ${origin === "LAB_GROWN" ? styles['btn-custom'] : styles['btn-outline-custom']}`}
                                onClick={() => setOrigin("LAB_GROWN")}
                                style={{ width: '150px' }}
                            >
                                Lab Grown
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <b>Shape</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                {SHAPES_IMAGES.map((value, index) =>
                                    <div key={index} className={`col-3 ${styles['shape']} d-flex flex-column justify-content-center align-items-center ${activeShape == value.name.toLowerCase() ? styles['active'] : ''} `} onClick={() => {
                                        if (activeShape === value.name.toLowerCase()) {
                                            setActiveShape(null);
                                        } else {
                                            setActiveShape(value.name.toLowerCase());
                                        }
                                    }}>
                                        <img crossOrigin='anonymous' className='img-fluid' src={value.image} alt="" />
                                        <span className='mt-2'>{value.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Carat weight</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start fw-bold">0.05</div>
                                <div className="col text-end fw-bold">10.0</div>
                            </div>

                            <Slider
                                value={[minCarat, maxCarat]}
                                min={MIN_CARAT}
                                step={CARAT_STEP}
                                max={MAX_CARAT}
                                onChange={(e) => {
                                    setMinCarat(e.target.value[0]);
                                    setMaxCarat(e.target.value[1]);
                                }}
                                style={{
                                    color: '#2D9596',
                                }}
                                className='col me-5'
                                valueLabelDisplay='auto'
                                marks={
                                    [
                                        {
                                            value: MIN_CARAT,
                                            label: 'Min'
                                        },
                                        {
                                            value: MAX_CARAT,
                                            label: 'Max'
                                        }
                                    ]
                                }
                            />
                            <div className="row">
                                <div className="col">
                                    <input type="number" min={MIN_CARAT} max={MAX_CARAT} className='form-control text-end px-0' step={CARAT_STEP} onChange={(e) => setMinCarat(e.target.value)} value={minCarat} />
                                </div>
                                <div className="col">
                                    <input type="number" min={MIN_CARAT} max={MAX_CARAT} className='form-control text-end px-0' step={CARAT_STEP} onChange={(e) => setMaxCarat(e.target.value)} value={maxCarat} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Color</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start">{COLORS[0]}</div>
                                <div className="col text-end">{COLORS[COLORS.length - 1]}</div>
                            </div>

                            <Slider value={[beginColor, endColor]} min={0} max={COLORS.length - 1} onChange={(e) => {
                                setBeginColor(e.target.value[0]);
                                setEndColor(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                marks={
                                    COLORS.map((value, index) =>
                                    ({
                                        value: index,
                                        label: value
                                    })
                                    )
                                }
                                step={null}
                                className='col me-5' />

                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col-4">
                        <b>Clarity</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col p-0 text-start">{CLARITIES[0]}</div>
                                <div className="col p-0 text-end">{CLARITIES[CLARITIES.length - 1]}</div>
                            </div>
                            <Slider value={[beginClarity, endClarity]} min={0} max={CLARITIES.length - 1} onChange={(e) => {
                                setBeginClarity(e.target.value[0]);
                                setEndClarity(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                step={null}
                                marks={
                                    CLARITIES.map((value, index) => (
                                        {
                                            value: index,
                                            label: value
                                        }
                                    ))
                                }
                                className='col me-5' />
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Cut</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col p-0 text-start">{CUTS[0]}</div>
                                <div className="col p-0 text-end">{CUTS[CUTS.length - 1]}</div>
                            </div>
                            <Slider value={[beginCut, endCut]} min={0} max={CUTS.length - 1} onChange={(e) => {
                                setBeginCut(e.target.value[0]);
                                setEndCut(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                step={null}
                                marks={
                                    CUTS.map((value, index) => (
                                        {
                                            value: index,
                                            label: value.replace("_", " ")
                                        }
                                    ))
                                }
                                className='col me-5' />

                        </div>
                    </div>
                    <div className="col-4">
                        <b>Price</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col p-0 text-start">{formatPrice(MIN_PRICE)}</div>
                                <div className="col p-0 text-end">{formatPrice(MAX_PRICE)}</div>
                            </div>
                            <Slider value={[minPrice, maxPrice]} min={MIN_PRICE} max={MAX_PRICE} onChange={(e) => {
                                setMinPrice(e.target.value[0]);
                                setMaxPrice(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                step={PRICE_STEP}
                                valueLabelDisplay='auto'
                                valueLabelFormat={(value) => formatPrice(value)}
                                marks={
                                    [
                                        {
                                            value: MIN_PRICE,
                                            label: "Min"
                                        },
                                        {
                                            value: MAX_PRICE,
                                            label: "Max"
                                        }
                                    ]
                                }
                                className='col me-5' />
                            <div className="row gap-5">
                                <input type="number" min={MIN_PRICE} max={maxPrice} className='col form-control text-end' step={PRICE_STEP} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                <input type="number" min={minPrice} max={MAX_PRICE} className='col form-control text-end' step={PRICE_STEP} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-start">
                        <button className='btn' style={{ backgroundColor: '#48AAAD' }} onClick={resetFilters}>Reset filters</button>
                    </div>
                    <div className='col'>
                        <div className="d-flex justify-content-end mt-3">
                            <div className='me-3'>
                                <Pagination count={totalPage} page={pageNo + 1} onChange={(event, value) => {
                                    setPageNo(value - 1)
                                }} />
                            </div>
                            <div className='row'>
                                <span className='col text-center p-0' style={{ lineHeight: '2rem' }}>Page size</span>
                                <input className="form-control col text-end p-0" style={{ height: '1.5rem', marginTop: '0.3rem', marginRight: '1rem' }} type="number" min="10" max="100" step="5" value={pageSize} onChange={(e) => setPageSize(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>

                </div>
                <div className='row'>
                    {diamondList !== undefined && diamondList !== null ? (
                        diamondList.map((entry, index) => (
                            <div key={index} className="col-md-4 col-lg-3 mb-4">
                                <DiamondCard
                                    diamond={entry.diamond}
                                    isSelected={isSelected(entry.diamond.diamondId)}
                                    onClick={() => navigate(`/build-your-own/diamond-details/${entry.diamond.diamondId}`)}
                                />
                            </div>
                        ))
                    ) : (
                        <div>No results available...</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ChooseDiamond;
