import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

type Pros = { children: React.ReactNode }

const ProtectedRoutes = ({ children }: Pros) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth()
    return isLoggedIn() ? (
        <>
            {children}
        </>) : (
        <Navigate to="/account/login" state={{ from: location }} replace />
    )
};

export default ProtectedRoutes;