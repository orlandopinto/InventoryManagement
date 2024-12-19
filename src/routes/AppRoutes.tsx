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
import CategoryIndex from "../views/categories/index";
import AddUpdateCategory from '../views/categories/AddUpdateCategory'
import PageNotFound from "../views/index/PageNotFound";

const DashboardComponent = Layout(Dashboard);
const AboutComponent = Layout(About);
const UserIndexComponent = Layout(UserIndex);
const AddUserComponent = Layout(AddUser);
const AddUpdateCategoryComponent = Layout(AddUpdateCategory);
const CategoryIndexComponent = Layout(CategoryIndex);

export const AppRoutes = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "/account/login", element: <Login /> },
                { path: "/account/logout", element: <Logout /> },
                { path: "/account/register", element: <Register /> },
                {
                    path: "/about",
                    element: (<ProtectedRoutes><AboutComponent /></ProtectedRoutes>)
                },
                {
                    path: "/dashboard",
                    element: (<ProtectedRoutes><DashboardComponent /></ProtectedRoutes>)
                },
                {
                    path: "/users",
                    element: (<ProtectedRoutes><UserIndexComponent /></ProtectedRoutes>)
                },
                {
                    path: "/users/AddUser",
                    element: (<ProtectedRoutes><AddUserComponent /></ProtectedRoutes>)
                },
                {
                    path: "/users/AddUser/:id",
                    element: (<ProtectedRoutes><AddUserComponent /></ProtectedRoutes>)
                },
                {
                    path: "/categories",
                    element: (<ProtectedRoutes><CategoryIndexComponent /></ProtectedRoutes>)
                },
                {
                    path: "/categories/AddUpdateCategory",
                    element: (<ProtectedRoutes><AddUpdateCategoryComponent /></ProtectedRoutes>)
                },
                {
                    path: "/categories/AddUpdateCategory/:id",
                    element: (<ProtectedRoutes><AddUpdateCategoryComponent /></ProtectedRoutes>)
                },
                {
                    path: "*",
                    element: (<PageNotFound />)
                }
            ]
        }
    ]
);