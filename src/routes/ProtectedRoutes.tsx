// import React from "react";

// import { Navigate, Outlet } from "react-router-dom";
// import { useLocalStorage } from "../utilities/useLocalStorage";

// const ProtectedRoutes = () => {
// 	// TODO: Use authentication token
//     const { getItem } = useLocalStorage();
//     const userValue = getItem("user");
// 	return userValue ? <Outlet /> : <Navigate to="/login"  replace />;
// };

// export default ProtectedRoutes;

// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useLocalStorage } from "../utilities/useLocalStorage";

// const ProtectedRoutes = (props) => {
//     const { getItem } = useLocalStorage();
//     const isAuthenticate: boolean = getItem("user") !== null

//     if (!isAuthenticate) return <Navigate to="/login" />;

//     if (isAuthenticate) {
//         return <Outlet {...props} />;
//     }
// };

// export default ProtectedRoutes;

import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocalStorage } from "../utilities/useLocalStorage";
import { AuthContext } from "../contexts/UserContext";

const ProtectedRoutes = (props) => {
    // const { isAuthenticated } = useContext(AuthContext)
    // const { getItem } = useLocalStorage()

    // const isUserLogged: boolean = getItem("user") !== null

    // if (!isAuthenticated || isUserLogged) return <Navigate to="/login" />;

    // if (isAuthenticated) {
    //     return <Outlet {...props} />;
    // }
    return <Outlet {...props} />;
};

export default ProtectedRoutes;