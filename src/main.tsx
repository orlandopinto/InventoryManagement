import './index.css'
import App from './App'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { StrictMode } from 'react';

let root = createRoot(document.getElementById('root') as HTMLElement);

if (localStorage.getItem('theme') === null)
    localStorage.setItem('theme', 'light')

// window.onscroll = function () { scrollFunction() };

// function scrollFunction() {
//     if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
//         document.getElementById("topNavbar").style.padding = "30px 10px";
//         document.getElementById("logo").style.fontSize = "25px";
//     } else {
//         document.getElementById("topNavbar").style.padding = "80px 10px";
//         document.getElementById("logo").style.fontSize = "35px";
//     }
// }

const currentTheme: string = localStorage.getItem('theme') as string;
document.documentElement.setAttribute("data-bs-theme", currentTheme);
root.render(
    <RouterProvider router={AppRoutes}>
        <StrictMode>
            <App />
        </StrictMode>
    </RouterProvider>
);