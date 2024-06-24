import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DiamondCard from './DiamondCard';
import styles from '/src/css/ChooseDiamonds.module.css';
import { formatPrice } from '../../helper_function/ConvertFunction';
import { Slider } from '@mui/material';
import useDocumentTitle from '../../components/Title';

const ChooseDiamond = () => {

    const navigate = useNavigate();
    const [diamondList, setDiamondList] = useState([]);

    const [activeShape, setActiveShape] = useState(null);
    const shapes = ['round', 'princess', 'cushion', 'emerald', 'oval', 'radiant', 'asscher', 'marquise', 'heart', 'pear'];

    const [minPrice, setMinPrice] = useState(200);
    const [maxPrice, setMaxPrice] = useState(5000000);

    const [minCarat, setMinCarat] = useState(0.05);
    const [maxCarat, setMaxCarat] = useState(10);

    const colors = ['K', 'J', 'I', 'H', 'G', 'F', 'E', 'D'];
    const [beginColor, setBeginColor] = useState(0);
    const [endColor, setEndColor] = useState(colors.length - 1);

    const clarities = ['SI2', 'SI1', 'VS2', 'VS1', 'VVS2', 'VVS1', 'IF', 'FL'];
    const [beginClarity, setBeginClarity] = useState(0);
    const [endClarity, setEndClarity] = useState(clarities.length - 1);

    const cuts = ['Fair', 'Good', 'Very_Good', 'Excellent'];
    const [beginCut, setBeginCut] = useState(0);
    const [endCut, setEndCut] = useState(cuts.length - 1);

    const [origin, setOrigin] = useState('NATURAL')

    const [pageNo, setPageNo] = useState(0);
    const [pageSize, setPageSize] = useState(40);

    useDocumentTitle('Find Your Diamonds by 4C');

    const setup = async () => {
        if (sessionStorage.getItem('designId') === null) {
            toast.info(`Please pick a setting first`);
            navigate('/build-your-own/choose-setting');
        } else {
            //let diamond_list = await fetchData(pageNo, pageSize);
            let diamond_list = await fetchQuery();

            setDiamondList(diamond_list);
        }
    }
    const fetchQuery = async () => {
        try {
            const query = {
                origin: origin,
                shapeList: activeShape !== null ? [activeShape.toLowerCase()] : shapes,
                colorList: [...colors.slice(beginColor, endColor), colors[endColor]],
                clarityList: [...clarities.slice(beginClarity, endClarity), clarities[endClarity]],
                cutList: [...cuts.slice(beginCut, endCut), cuts[endCut]],
                minCarat: minCarat,
                maxCarat: maxCarat,
                minPrice: minPrice,
                maxPrice: maxPrice
            }
            const response = await axios.post(`http://localhost:8080/api/diamond/get-diamond-with-price-by-4C?pageNo=${pageNo}&pageSize=${pageSize}`, query);
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

        setMinCarat(0.05);
        setMaxCarat(10);

        setMinPrice(200);
        setMaxPrice(5000000);

        setBeginClarity(0);
        setEndClarity(clarities.length - 1);

        setBeginCut(0);
        setEndCut(cuts.length - 1);

        setActiveShape(null);

        setBeginColor(0);
        setEndColor(colors.length - 1);

        setOrigin("NATURAL");

        setPageNo(0);
        setPageSize(40);

        setup();
    }

    const convertColor = (int) => {
        return colors[int] || 'Invalid input';
    }

    const convertClarity = (int) => {
        return clarities[int] || 'Invalid input';
    }

    const convertCut = (int) => {
        return cuts[int] || 'Invalid input';
    }

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
                                style={{width: '150px'}}
                            >
                                Natural
                            </button>
                            <button
                                type="button"
                                className={`btn ${origin === "LAB_GROWN" ? styles['btn-custom'] : styles['btn-outline-custom']}`}
                                onClick={() => setOrigin("LAB_GROWN")}
                                style={{width: '150px'}}
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
                                {['Round', 'Princess', 'Cushion', 'Emerald', 'Oval', 'Radiant', 'Asscher', 'Marquise', 'Heart', 'Pear'].map(value =>
                                    <div key={value} className={`col-3 ${styles['shape']} d-flex flex-column justify-content-center align-items-center ${activeShape == value ? styles['active'] : ''} `} onClick={() => setActiveShape(value)}>
                                        <img crossOrigin='anonymous' className='img-fluid' src={`/src/assets/svg/${value}.svg`} alt="" />
                                        <span className='mt-2'>{value}</span>
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
                                min={0.05}
                                step={0.05}
                                max={10.0}
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
                                            value: 0,
                                            label: 'Min'
                                        },
                                        {
                                            value: 10.0,
                                            label: 'Max'
                                        }
                                    ]
                                }
                            />
                            <div className="row">
                                <div className="col">
                                    <input type="number" min={0.05} max={10.0} className='form-control text-end px-0' step="0.01" onChange={(e) => setMinCarat(e.target.value)} value={minCarat} />
                                </div>
                                <div className="col">
                                    <input type="number" min={0.05} max={10.0} className='form-control text-end px-0' step="0.01" onChange={(e) => setMaxCarat(e.target.value)} value={maxCarat} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <b>Color</b>
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col text-start">{colors[0]}</div>
                                <div className="col text-end">{colors[colors.length - 1]}</div>
                            </div>

                            <Slider value={[beginColor, endColor]} min={0} max={colors.length - 1} onChange={(e) => {
                                setBeginColor(e.target.value[0]);
                                setEndColor(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                marks={
                                    colors.map((value, index) =>
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
                                <div className="col text-start">{clarities[0]}</div>
                                <div className="col text-end">{clarities[clarities.length - 1]}</div>
                            </div>
                            <Slider value={[beginClarity, endClarity]} min={0} max={clarities.length - 1} onChange={(e) => {
                                setBeginClarity(e.target.value[0]);
                                setEndClarity(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                step={null}
                                marks={
                                    clarities.map((value, index) => (
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
                                <div className="col text-start">{cuts[0]}</div>
                                <div className="col text-end">{cuts[cuts.length - 1]}</div>
                            </div>
                            <Slider value={[beginCut, endCut]} min={0} max={cuts.length - 1} onChange={(e) => {
                                setBeginCut(e.target.value[0]);
                                setEndCut(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                step={null}
                                marks={
                                    cuts.map((value, index) => (
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
                                <div className="col text-start">{formatPrice(200)}</div>
                                <div className="col text-end">{formatPrice(5000000)}</div>
                            </div>
                            <Slider value={[minPrice, maxPrice]} min={200} max={5000000} onChange={(e) => {
                                setMinPrice(e.target.value[0]);
                                setMaxPrice(e.target.value[1]);
                            }}
                                style={{
                                    color: '#2D9596',
                                }}
                                step={1}
                                valueLabelDisplay='auto'
                                marks={
                                    [
                                        {
                                            value: 200,
                                            label: "Min"
                                        },
                                        {
                                            value: 5000000,
                                            label: "Max"
                                        }
                                    ]
                                }
                                className='col me-5' />
                            <div className="row">
                                <input type="number" min={200} max={maxPrice} className='col form-control' step="0.01" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                                <input type="number" min={minPrice} max={5000000} className='col form-control' step="0.01" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-end">
                        <button className='btn' style={{ backgroundColor: '#48AAAD' }} onClick={resetFilters}>Reset filters</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className="d-flex justify-content-end mt-3">
                            <div className="me-3">
                                <span>Page size</span>
                                <input className="form-control" type="number" min="10" max="100" step="10" value={pageSize} onChange={(e) => setPageSize(e.target.value)} />
                            </div>
                            <div>
                                <span>Page No</span>
                                <input className="form-control" type="number" min="1" max="100" step="1" value={pageNo + 1} onChange={(e) => setPageNo(e.target.value - 1)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    {diamondList !== undefined && diamondList !== null ? (
                        diamondList.map((entry, index) => (
                            <div key={index} className="col-md-4 col-lg-3 mb-4">
                                <DiamondCard
                                    diamond={entry.diamond}
                                    isSelected={isSelected(entry.diamond.diamondId)}
                                    onClick={() => handleChoose(entry.diamond.diamondId)}
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
