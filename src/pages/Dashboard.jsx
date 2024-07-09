import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/Dashboard.module.css';
import axios from 'axios';
import { formatPrice, formatDate } from '/src/helper_function/ConvertFunction';

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
            })
            if (response.status === 200) {
                setProductList(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const products = [
        { name: 'Four Stone Emerald Diamond Engagement Ring In Platinum', price: '$999.29' },
        { name: 'Channel Set Round Diamond Engagement Ring In 14k White Gold (2 Ct. Tw.)', price: '$72.40' },
        { name: 'Seven Stone Oval Diamond Engagement Ring In Platinum (1 Ct.Tw.)', price: '$99' },
        { name: 'Asscher-Cut Diamond Engagement Ring In 14k White Gold', price: '$249.99' },
        { name: 'Two Stone Engagement Ring With Half Moon Diamond In 14k White Gold (1/2 Ct. Tw.)', price: '$79.40' },
        { name: 'Studio Double Halo Gala Diamond Engagement Ring In Platinum (7/8 Ct. Tw.)', price: '$129.48' }
    ];

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
                        : <>
                            <li>
                                No recent products
                            </li>
                        </>
                }
            </ul>
        </div>
    );
};

const DashboardComponent = () => {
    const accessoriesChartRef = useRef(null);
    const chartInstanceRef = useRef(null);
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
            })
            if (response.status === 200) {
                setStats(response.data);
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchSalesReport = async () => {
        try {
            const response = await axios({
                method: 'get',
                url: `${import.meta.env.VITE_jpos_back}/stats/get-sales-report`,
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
            if (response.status === 200) {
                setSalesReport(response.data);
                startGraph();
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }

    useEffect(() => {
        fetchData();
        fetchSalesReport();
        // Destroy the previous chart instance if it exists

        startGraph();

        // Clean up the chart instance on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        startGraph();
    }, [salesReport])

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-lg-4 col-md-12 mb-3 d-flex">
                    <div className="card h-100 w-100 text-center">
                        <div className="card-body">
                            <h2 className='d-flex justify-content-center align-items-center h-100 fs-1'>DASHBOARD</h2>
                        </div>
                    </div>
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
                    <PopularProducts />
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
