import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../views/account/Login";
import Register from "../views/account/Register";
import Home from "../views/index/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import About from "../views/index/About";

const HomeComponent = Layout(Home);
const AboutComponent = Layout(About);

export const AppRoutes = createBrowserRouter(
    [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/",
            element: <ProtectedRoutes />,
            children: [
                {
                    path: "/",
                    element: <HomeComponent />,
                },
                {
                    path: "/about",
                    element: <AboutComponent />,
                }
            ],
        },
    ]
);

