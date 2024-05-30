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
import RequestQuotationPage from './pages/RequestQuotationPage';
import RequestPage from './pages/RequestPage';
import FrameSidebar from './pages/FrameSidebar';
import FrameNavbar from './pages/FrameNavbar';
import './main.css';

const router = createBrowserRouter([{
  path: '/',
  element: <FrameNavbar />,
  errorElement: <NotFoundPage />,
  children: [
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/custom-design',
      element: <CustomDesignPage />
    },
    {
      path: '/diamond-price-list',
      element: <DiamondPriceListPage />
    },
    {
      path: '/customer-login',
      element: <LoginPage />
    },
    {
      path: '/customer-register',
      element: <RegisterPage />
    },
  ]
},
{
  path: '/manage-request',
  element: <RequestQuotationPage />
},
{
  path: '/requests',
  element: <RequestPage />
},
{
  path: '/profile',
  element: <FrameSidebar />,
  children: [
    {
      path:'/profile',
      element:<ProfilePage/>
    },
    {
      path: '/profile/request',
      element: <RequestPage />
    }
  ]
}]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
