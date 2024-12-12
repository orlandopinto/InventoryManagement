import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../views/account/Login";
import Register from "../views/account/Register";
import Home from "../views/index/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import About from "../views/index/About";
import Logout from "../views/account/Logout";
import App from "../App";
import Dashboard from "../views/index/Dashboard";
import UserIndex from "../views/users/index";
import Acceso from "../views/account/acceso";

const DashboardComponent = Layout(Dashboard);
const AboutComponent = Layout(About);
const UserIndexComponent = Layout(UserIndex);

export const AppRoutes = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "acceso", element: <Acceso /> },
                { path: "logout", element: <Logout /> },
                { path: "register", element: <Register /> },
                {
                    path: "/dashboard",
                    element: (
                        <ProtectedRoutes>
                            <DashboardComponent />
                        </ProtectedRoutes>
                    )
                },
                {
                    path: "/users",
                    element: (
                        <ProtectedRoutes>
                            <UserIndexComponent />
                        </ProtectedRoutes>
                    )
                },
                {
                    path: "/about",
                    element: (
                        <ProtectedRoutes>
                            <AboutComponent />
                        </ProtectedRoutes>
                    )
                }
            ]
        }
    ]
);