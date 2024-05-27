import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage';
import CustomDesignPage from './pages/CustomDesignPage';

const router = createBrowserRouter([{
  path: '/',
  element: <HomePage/>,
  errorElement: <NotFoundPage/>
},
{
  path: '/custom-design',
  element: <CustomDesignPage/>
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
