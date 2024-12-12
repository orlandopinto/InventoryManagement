import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import React from 'react';

let root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <RouterProvider router={AppRoutes}>
            <App />
        </RouterProvider>
    </React.StrictMode>
);