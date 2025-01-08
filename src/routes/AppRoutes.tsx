import App from "../App";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../layouts/Layout";
import Login from "../views/account/Login";
import Register from "../views/account/Register";

import ProtectedRoutes from "./ProtectedRoutes";

import About from "../views/index/About";
import Logout from "../views/account/Logout";
import Dashboard from "../views/index/Dashboard";

import UserIndex from "../views/users/index";
import AddUser from "../views/users/AddUser";

import PageNotFound from "../views/index/PageNotFound";
import EmailSender from '../views/tools/EmailSender'

import AttributesIndex from "../views/attributes/index";
import CategoryIndex from "../views/categories/index";
import AddUpdateCategory from '../views/categories/AddUpdateCategory'

import SubCategoryIndex from "../views/subcategories/index";
import AddUpdateSubCategory from '../views/subcategories/AddUpdateSubCategory'

import DiscountIndex from '../views/discounts/index'
import AddUpdateDiscount from '../views/discounts/AddUpdateDiscount'

import StatusIndex from '../views/status/index'
import AddUpdateStatus from '../views/status/AddUpdateStatus'

const ProtectedDashboard = Layout(Dashboard);
const ProtectedAbout = Layout(About);
const ProtectedUserIndex = Layout(UserIndex);
const ProtectedAddUser = Layout(AddUser);

const ProtectedCategoryIndex = Layout(CategoryIndex);
const ProtectedAddUpdateCategory = Layout(AddUpdateCategory);

const ProtectedSubCategoryIndex = Layout(SubCategoryIndex);
const ProtectedAddUpdateSubCategory = Layout(AddUpdateSubCategory);

const ProtectedAttributesIndex = Layout(AttributesIndex);

const ProtectedDiscountIndex = Layout(DiscountIndex);
const ProtectedAddUpdateDiscount = Layout(AddUpdateDiscount);

const ProtectedStatusIndex = Layout(StatusIndex);
const ProtectedAddUpdateStatus = Layout(AddUpdateStatus);

const ProtectedEmailSender = Layout(EmailSender);

export const AppRoutes = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "/account/login", element: <Login /> },
                { path: "/account/logout", element: <Logout /> },
                { path: "/account/register", element: <Register /> },

                { path: "/about", element: (<ProtectedRoutes><ProtectedAbout /></ProtectedRoutes>) },
                { path: "/dashboard", element: (<ProtectedRoutes><ProtectedDashboard /></ProtectedRoutes>) },

                { path: "/users", element: (<ProtectedRoutes><ProtectedUserIndex /></ProtectedRoutes>) },
                { path: "/users/adduser", element: (<ProtectedRoutes><ProtectedAddUser /></ProtectedRoutes>) },
                { path: "/users/adduser/:id", element: (<ProtectedRoutes><ProtectedAddUser /></ProtectedRoutes>) },

                { path: "/categories", element: (<ProtectedRoutes><ProtectedCategoryIndex /></ProtectedRoutes>) },
                { path: "/categories/AddUpdateCategory", element: (<ProtectedRoutes><ProtectedAddUpdateCategory /></ProtectedRoutes>) },
                { path: "/categories/AddUpdateCategory/:id", element: (<ProtectedRoutes><ProtectedAddUpdateCategory /></ProtectedRoutes>) },

                { path: "/attributes", element: (<ProtectedRoutes><ProtectedAttributesIndex /></ProtectedRoutes>) },
                { path: "/subcategories", element: (<ProtectedRoutes><ProtectedSubCategoryIndex /></ProtectedRoutes>) },
                { path: "/subcategories/AddUpdateSubCategory", element: (<ProtectedRoutes><ProtectedAddUpdateSubCategory /></ProtectedRoutes>) },
                { path: "/subcategories/AddUpdateSubCategory/:id", element: (<ProtectedRoutes><ProtectedAddUpdateSubCategory /></ProtectedRoutes>) },

                { path: "/discounts", element: (<ProtectedRoutes><ProtectedDiscountIndex /></ProtectedRoutes>) },
                { path: "/discounts/AddUpdateDiscount", element: (<ProtectedRoutes><ProtectedAddUpdateDiscount /></ProtectedRoutes>) },
                { path: "/discounts/AddUpdateDiscount/:id", element: (<ProtectedRoutes><ProtectedAddUpdateDiscount /></ProtectedRoutes>) },

                { path: "/status", element: (<ProtectedRoutes><ProtectedStatusIndex /></ProtectedRoutes>) },
                { path: "/status/AddUpdateStatus", element: (<ProtectedRoutes><ProtectedAddUpdateStatus /></ProtectedRoutes>) },
                { path: "/status/AddUpdateStatus/:id", element: (<ProtectedRoutes><ProtectedAddUpdateStatus /></ProtectedRoutes>) },

                { path: "/tools/emailsender", element: (<ProtectedRoutes><ProtectedEmailSender /></ProtectedRoutes>) },
                {
                    path: "*",
                    element: (<PageNotFound />)
                }
            ]
        }
    ]
);