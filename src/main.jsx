import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App';
import { ErrorPage } from './ErrorPage';
import  CreateItem  from './components/CreateItem/index';
import TableItems from './components/TableItems';

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <TableItems />,
        },       
        {
          path: "/createItem",
          element: <CreateItem />,
        },
      ],
  }, 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
