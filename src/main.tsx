import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Garage from "./components/Garage/Garage.tsx";
import App from "./App.tsx";
import Winners from "./components/Winners.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {index: true, element: <Navigate to="/garage" replace />},
            {path: 'garage', element: <Garage/>},
            {path: 'winners', element: <Winners/>},
        ],
    },
])

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
