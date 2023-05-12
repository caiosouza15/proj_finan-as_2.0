import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App';
import { ErrorPage } from './ErrorPage';
import TableItems from './components/TableItems';
import FormItem from './components/FormItem/index';

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
          path: "/createItem/:id?",
          element: <FormItem />,
        },
      ],
  }, 
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
