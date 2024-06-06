import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CustomDesignPage from './pages/CustomDesignPage';
import NotFoundPage from './pages/NotFoundPage';
import DiamondPriceListPage from './pages/DiamondPriceListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/Profile';
import RequestPage from './pages/RequestPage';
import HistoryPage from './pages/HistoryPage';
import CustomerRequestDetailsPage from './pages/CustomerRequestDetailsPage';
import RequestDetailPage from './pages/RequestDetailsPage';
import ChooseSetting from './pages/build-your-own/ChooseSetting';
import ChooseDiamond from './pages/build-your-own/ChooseDiamond';
import CompleteProduct from './pages/build-your-own/CompleteProduct';
import DiamondDetails from './pages/build-your-own/DiamondDetails';
import SettingDetails from './pages/build-your-own/SettingDetails';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage /> //Customer exclusive
  },
  {
    path: '/custom-design',
    element: <CustomDesignPage /> //Customer exclusive
  },
  {
    path: '/diamond-price-list',
    element: <DiamondPriceListPage /> //Customer exclusive
  },
  {
    path: '/login',
    element: <LoginPage /> //Customer, Staff
  },
  {
    path: '/customer-register',
    element: <RegisterPage /> //Customer
  },
  {
    path: '/build-your-own/choose-setting',
    element: <ChooseSetting />
  },
  {
    path: '/build-your-own/choose-diamond',
    element: <ChooseDiamond />
  },
  {
    path: '/build-your-own/complete-product',
    element: <CompleteProduct />
  },
  {
    path: '/diamond-details/:diamondId',
    element: <DiamondDetails />
  },
  {
    path: '/setting-details/:designId',
    element: <SettingDetails />
  },
  {
    path: '/profile',
    element: <ProfilePage /> //Customer, Staff
  },
  {
    path: '/profile/your-request',
    element: <CustomerRequestDetailsPage />
  },
  {
    path: '/profile/request',
    element: <RequestPage /> //Staff
  },
  {
    path: '/profile/history',
    element: <HistoryPage /> //Staff
  },
  {
    path: '/profile/request/:orderId',
    element: <RequestDetailPage /> //Staff
  }]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
