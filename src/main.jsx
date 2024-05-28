import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {Toaster, toast} from 'sonner';
import HomePage from './pages/HomePage';
import CustomDesignPage from './pages/CustomDesignPage';
import NotFoundPage from './pages/NotFoundPage';
import DiamondPriceListPage from './pages/DiamondPriceListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './main.css';

const router = createBrowserRouter([{
  path: '/',
  element: <HomePage/>,
  errorElement: <NotFoundPage/>
},
{
  path: '/custom-design',
  element: <CustomDesignPage/>
},
{
  path: '/diamond-price-list',
  element: <DiamondPriceListPage/>
},
{
  path: '/customer-login',
  element: <LoginPage/>
},
{
  path: '/customer-register',
  element: <RegisterPage/>
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
