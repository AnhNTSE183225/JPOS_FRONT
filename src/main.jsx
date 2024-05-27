import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import CustomDesignPage from './pages/CustomDesignPage';
import NotFoundPage from './pages/NotFoundPage';
import DiamondPriceListPage from './pages/DiamondPriceListPage';
import LoginPage from './pages/LoginPage';

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
  path: '/login',
  element: <LoginPage/>
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
