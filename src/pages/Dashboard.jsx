import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../css/Dashboard.module.css';

const PopularProducts = () => {
    const products = [
        { name: 'Four Stone Emerald Diamond Engagement Ring In Platinum', price: '$999.29' },
        { name: 'Channel Set Round Diamond Engagement Ring In 14k White Gold (2 Ct. Tw.)', price: '$72.40' },
        { name: 'Seven Stone Oval Diamond Engagement Ring In Platinum (1 Ct.Tw.)', price: '$99' },
        { name: 'Asscher-Cut Diamond Engagement Ring In 14k White Gold', price: '$249.99' },
        { name: 'Two Stone Engagement Ring With Half Moon Diamond In 14k White Gold (1/2 Ct. Tw.)', price: '$79.40' },
        { name: 'Studio Double Halo Gala Diamond Engagement Ring In Platinum (7/8 Ct. Tw.)', price: '$129.48' }
    ];

    return (
        <div className={`${styles.popularProducts} card`}>
            <h3>Popular Products</h3>
            <p>Total 10.4k Visitors</p>
            <ul className="list-unstyled">
                {products.map((product, index) => (
                    <li key={index} className={`${styles.productItem} d-flex justify-content-between`}>
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const DashboardComponent = () => {
    const accessoriesChartRef = useRef(null);

    useEffect(() => {
        const accessoriesCtx = accessoriesChartRef.current.getContext('2d');
        new Chart(accessoriesCtx, {
            type: 'bar',
            data: {
                labels: ['Rings', 'Necklaces & Pendants', 'Earrings', 'Bracelets'],
                datasets: [
                    {
                        label: 'Accessories Sold',
                        data: [150, 50, 100, 75],
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
    }, []);

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col-lg-4 col-md-12 mb-3">
                    <div className="card text-center">
                        <div className="card-body">
                            <h2>Congratulations John! 🎉</h2>
                            <p>Best seller of the month</p>
                            <h1>$48.9k</h1>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 col-md-12 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h2>Statistics</h2>
                            <div className="d-flex flex-wrap justify-content-between">
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faChartLine} size="2x" color="#9b59b6" />
                                    <p>230k Sales</p>
                                </div>
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faUsers} size="2x" color="#2980b9" />
                                    <p>8.549k Customers</p>
                                </div>
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faShoppingCart} size="2x" color="#e74c3c" />
                                    <p>1.423k Products</p>
                                </div>
                                <div className="text-center p-2">
                                    <FontAwesomeIcon icon={faDollarSign} size="2x" color="#27ae60" />
                                    <p>$9745 Revenue</p>
                                </div>
                            </div>
                            <p className="text-right text-muted">Updated 1 month ago</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-12 mb-3">
                    <PopularProducts />
                </div>
                <div className="col-lg-8 col-md-12 mb-3">
                    <div className="card">
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