import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
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
import StaffFrame from './pages/frame/StaffFrame';
import CustomerFrame from './pages/frame/CustomerFrame';
import CashThanksPage from './pages/CashThanksPage';
import OnlineThanksPage from './pages/OnlineThanksPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import BuildYourOwnFrame from './pages/frame/BuildYourOwnFrame';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import PaymentHandler from './PaymentHandler';
import ManageRequestsPage from './pages/ManageRequestsPage';
import ManageStaffPage from './pages/ManageStaffPage';



const router = createBrowserRouter([
  {
    path: '/',
    element: <CustomerFrame />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />, //Customer exclusive
        errorElement: <NotFoundPage />
      },
      {
        path: 'custom-design',
        element: <CustomDesignPage /> //Customer exclusive
      },
      {
        path: 'diamond-price-list',
        element: <DiamondPriceListPage /> //Customer exclusive
      },
      {
        path: 'login',
        element: <LoginPage /> //Customer, Staff
      },
      {
        path: 'register',
        element: <RegisterPage /> //Customer
      },
      {
        path: 'cash-completed',
        element: <CashThanksPage />
      },
      {
        path: 'online-completed',
        element: <OnlineThanksPage />
      },
      {
        path: 'build-your-own',
        element: <BuildYourOwnFrame />,
        children: [
          {
            path: 'choose-setting',
            element: <ChooseSetting />
          },
          {
            path: 'choose-diamond',
            element: <ChooseDiamond />
          },
          {
            path: 'complete-product',
            element: <CompleteProduct />
          },
          {
            path: 'diamond-details/:diamondId',
            element: <DiamondDetails />
          },
          {
            path: 'setting-details/:designId',
            element: <SettingDetails />
          },

        ]
      },
      {
        path: '/profile',
        element: <ProfilePage /> //Customer
      },
      {
        path: '/profile/your-request',
        element: <CustomerRequestDetailsPage />
      },
      {
        path: '/profile/your-orders',
        element: <CustomerOrdersPage />
      }
    ]
  },
  {
    path: '/staff',
    element: <StaffFrame />,
    children: [
      {
        path: 'request',
        element: <RequestPage /> //Staff
      },
      {
        path: 'history',
        element: <HistoryPage /> // Staff
      },
      {
        path: 'request/select/:orderId',
        element: <RequestDetailPage />
      },
      {
        path: 'manage-requests',
        element: <ManageRequestsPage/>
      },
      {
        path: 'manage-staff',
        element: <ManageStaffPage/>
      }
    ]
  },
  {
    path: '/payment-callback',
    element: <PaymentHandler/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
