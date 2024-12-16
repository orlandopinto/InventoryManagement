import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Login from "../views/account/Login";
import Register from "../views/account/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import About from "../views/index/About";
import Logout from "../views/account/Logout";
import App from "../App";
import Dashboard from "../views/index/Dashboard";
import UserIndex from "../views/users/index";
import AddUser from "../views/users/AddUser";

const DashboardComponent = Layout(Dashboard);
const AboutComponent = Layout(About);
const UserIndexComponent = Layout(UserIndex);
const AddUserComponent = Layout(AddUser);

export const AppRoutes = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "login", element: <Login /> },
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
                    path: "/users/AddUser",
                    element: (
                        <ProtectedRoutes>
                            <AddUserComponent />
                        </ProtectedRoutes>
                    )
                },
                {
                    path: "/users/AddUser/:id",
                    element: (
                        <ProtectedRoutes>
                            <AddUserComponent />
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