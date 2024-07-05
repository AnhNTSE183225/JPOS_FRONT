import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faShoppingCart, faDollarSign } from '@fortawesome/free-solid-svg-icons';
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
        <div className={styles.popularProducts}>
            <h3>Popular Products</h3>
            <p>Total 10.4k Visitors</p>
            <ul>
                {products.map((product, index) => (
                    <li key={index} className={styles.productItem}>
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const DashboardComponent = () => {
    const revenueChartRef = useRef(null);

    useEffect(() => {
        const revenueCtx = revenueChartRef.current.getContext('2d');
        new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                datasets: [
                    {
                        label: 'Earning',
                        data: [200, 180, 210, 150, 190, 160, 220, 210, 230],
                        backgroundColor: '#9b59b6',
                    },
                    {
                        label: 'Expense',
                        data: [-100, -90, -110, -70, -80, -60, -50, -40, -100],
                        backgroundColor: '#e74c3c',
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);

    return (
        <div className={styles.dashboard}>
            <div className={styles.topSection}>
                <div className={`${styles.card} ${styles.smallCard}`}>
                    <h2>Congratulations John! 🎉</h2>
                    <p>Best seller of the month</p>
                    <h1>$48.9k</h1>
                </div>
                <div className={`${styles.card} ${styles.statistics}`}>
                    <h2>Statistics</h2>
                    <div className={styles.statsGrid}>
                        <div className={styles.stat}>
                            <FontAwesomeIcon icon={faChartLine} size="2x" color="#9b59b6" />
                            <p>230k Sales</p>
                        </div>
                        <div className={styles.stat}>
                            <FontAwesomeIcon icon={faUsers} size="2x" color="#2980b9" />
                            <p>8.549k Customers</p>
                        </div>
                        <div className={styles.stat}>
                            <FontAwesomeIcon icon={faShoppingCart} size="2x" color="#e74c3c" />
                            <p>1.423k Products</p>
                        </div>
                        <div className={styles.stat}>
                            <FontAwesomeIcon icon={faDollarSign} size="2x" color="#27ae60" />
                            <p>$9745 Revenue</p>
                        </div>
                    </div>
                    <p className={styles.updated}>Updated 1 month ago</p>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.popularProductsWrapper}>
                    <PopularProducts />
                </div>
                <div className={`${styles.card} ${styles.revenueReport}`}>
                    <h3>Revenue Report</h3>
                    <canvas ref={revenueChartRef} className={styles.revenueChart}></canvas>
                    <div className={styles.budgetInfo}>
                        <h3>$25,825</h3>
                        <p>Budget: $56,800</p>
                        <button className={`${styles.button} ${styles.increaseButton}`}>Increase Budget</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardComponent;
    