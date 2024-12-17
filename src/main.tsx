import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

let root = createRoot(document.getElementById('root') as HTMLElement);

if (localStorage.getItem('theme') === null)
    localStorage.setItem('theme', 'light')

const currentTheme: string = localStorage.getItem('theme') as string;
document.documentElement.setAttribute("data-bs-theme", currentTheme);
root.render(
    <RouterProvider router={AppRoutes}>
        <App />
    </RouterProvider>
);