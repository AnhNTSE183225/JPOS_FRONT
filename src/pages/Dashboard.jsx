import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/Dashboard.module.css';
import axios from 'axios';
import { formatPrice } from '/src/helper_function/ConvertFunction';

const PopularProducts = () => {
    const [productList, setProductList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_jpos_back}/stats/get-recently-purchased`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setProductList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={`${styles.popularProducts} card w-100 h-100`}>
            <h3 className='mb-4'>Most Recent Products</h3>
            <ul className="list-unstyled">
                {
                    productList.length > 0
                        ? productList.map((product, index) => (
                            <li key={index} className='fs-6 text-capitalize'>
                                {product.productName} - {formatPrice(product.ediamondPrice + product.ematerialPrice + product.productionPrice)}
                                <hr />
                            </li>
                        ))
                        : <li>No recent products</li>
                }
            </ul>
        </div>
    );
};

const DashboardComponent = () => {
    const accessoriesChartRef = useRef(null);
    const customBuildChartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const customBuildChartInstanceRef = useRef(null);

    const [stats, setStats] = useState({
        noCustomers: 0,
        noOrders: 0,
        noSales: 0,
        revenue: 0.0
    });
    const [salesReport, setSalesReport] = useState([0, 0, 0, 0]);

    const fetchData = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_jpos_back}/stats/get-statistics`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setStats(response.data);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSalesReport = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_jpos_back}/stats/get-sales-report`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setSalesReport(response.data);
                startGraph();
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const startGraph = () => {
        const accessoriesCtx = accessoriesChartRef.current.getContext('2d');

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(accessoriesCtx, {
            type: 'bar',
            data: {
                labels: ['Rings', 'Necklaces & Pendants', 'Earrings', 'Bracelets'],
                datasets: [
                    {
                        label: 'Accessories Sold',
                        data: salesReport,
                        backgroundColor: ['#9b59b6', '#3498db', '#e74c3c', '#2ecc71'],
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Accessories Sales Report'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Items Sold'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Accessories'
                        }
                    }
                }
            }
        });
    };

    const startCustomBuildGraph = () => {
        const customBuildCtx = customBuildChartRef.current.getContext('2d');

        if (customBuildChartInstanceRef.current) {
            customBuildChartInstanceRef.current.destroy();
        }

        customBuildChartInstanceRef.current = new Chart(customBuildCtx, {
            type: 'doughnut',
            data: {
                labels: ['Custom Design', 'Build Jewelry'],
                datasets: [
                    {
                        label: 'Custom vs Build',
                        data: [30, 70], // hardcoded data
                        backgroundColor: ['#ff6384', '#36a2eb'],
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Custom vs Build Jewelry Report'
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.raw || '';
                                if (context.label === 'Custom Design') {
                                    return `Custom Design: ${value}`;
                                } else if (context.label === 'Build Jewelry') {
                                    return `Build Jewelry: ${value}`;
                                }
                                return `${label}: ${value}`;
                            }
                        }
                    }
                },
                onClick: function (event, elements) {
                    if (elements.length > 0) {
                        const clickedElementIndex = elements[0].index;
                        const label = customBuildChartInstanceRef.current.data.labels[clickedElementIndex];
                        alert(label);
                    }
                }
            }
        });
    };

    useEffect(() => {
        fetchData();
        fetchSalesReport();
        startGraph();
        startCustomBuildGraph();

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
            if (customBuildChartInstanceRef.current) {
                customBuildChartInstanceRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        startGraph();
    }, [salesReport]);

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-lg-4 col-md-12 mb-3 d-flex">
                    <PopularProducts />
                </div>
                <div className="col-lg-8 col-md-12 mb-3 d-flex">
                    <div className="card w-100 h-100">
                        <div className="card-body">
                            <h2>Statistics</h2>
                            <div className="d-flex justify-content-between">
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faChartLine} size="2x" color="#9b59b6" />
                                    <p>{stats.noSales} Sales</p>
                                </div>
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faUsers} size="2x" color="#2980b9" />
                                    <p>{stats.noCustomers} Customers</p>
                                </div>
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faShoppingCart} size="2x" color="#e74c3c" />
                                    <p>{stats.noOrders} Orders</p>
                                </div>
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faDollarSign} size="2x" color="#27ae60" />
                                    <p>{formatPrice(stats.revenue)} Revenue</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-12 mb-3 d-flex">
                    <div className="card h-100 w-100 text-center">
                        <div className="card-body">
                            <canvas ref={customBuildChartRef} className={styles.customBuildChart}></canvas>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12 mb-3 d-flex">
                    <div className="card w-100 h-100">
                        <div className="card-body">
                            <h3>Sales Report</h3>
                            <canvas ref={accessoriesChartRef} className={styles.revenueChart}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
