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
import EmailSender from '../views/tools/EmailSender'
import SubCategoryIndex from "../views/subcategories/index";

const ProtectedDashboard = Layout(Dashboard);
const ProtectedAbout = Layout(About);
const ProtectedUserIndex = Layout(UserIndex);
const ProtectedAddUser = Layout(AddUser);
const ProtectedAddUpdateCategory = Layout(AddUpdateCategory);
const ProtectedCategoryIndex = Layout(CategoryIndex);
const ProtectedEmailSender = Layout(EmailSender);
const ProtectedSubCategoryIndex = Layout(SubCategoryIndex);

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
                    element: (<ProtectedRoutes><ProtectedAbout /></ProtectedRoutes>)
                },
                {
                    path: "/dashboard",
                    element: (<ProtectedRoutes><ProtectedDashboard /></ProtectedRoutes>)
                },
                {
                    path: "/users",
                    element: (<ProtectedRoutes><ProtectedUserIndex /></ProtectedRoutes>)
                },
                {
                    path: "/users/adduser",
                    element: (<ProtectedRoutes><ProtectedAddUser /></ProtectedRoutes>)
                },
                {
                    path: "/users/adduser/:id",
                    element: (<ProtectedRoutes><ProtectedAddUser /></ProtectedRoutes>)
                },
                {
                    path: "/categories",
                    element: (<ProtectedRoutes><ProtectedCategoryIndex /></ProtectedRoutes>)
                },
                {
                    path: "/categories/AddUpdateCategory",
                    element: (<ProtectedRoutes><ProtectedAddUpdateCategory /></ProtectedRoutes>)
                },
                {
                    path: "/categories/AddUpdateCategory/:id",
                    element: (<ProtectedRoutes><ProtectedAddUpdateCategory /></ProtectedRoutes>)
                },
                {
                    path: "/subcategories",
                    element: (<ProtectedRoutes><ProtectedSubCategoryIndex /></ProtectedRoutes>)
                },
                {
                    path: "/tools/emailsender",
                    element: (<ProtectedRoutes><ProtectedEmailSender /></ProtectedRoutes>)
                },
                {
                    path: "*",
                    element: (<PageNotFound />)
                }
            ]
        }
    ]
);