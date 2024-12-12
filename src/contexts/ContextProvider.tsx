import { Children, createContext, useContext, useState } from "react";
import { User } from "../hooks/useUser";

interface AuthContext {
    userAuth: User;
    setUserAuth: (user: User) => void;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContext>({
    userAuth: { isAuthenticated: false },
    setUserAuth: () => { },
    setIsAuthenticated: () => { },
});

const ContextProvider = ({ children }) => {
    const { userAuth, setUserAuth, setIsAuthenticated } = useContext(AuthContext)

    const [x, setX] = useState<boolean>();
    setIsAuthenticated(true);
    const value = {
        userAuth: userAuth,
        setUserAuth: setUserAuth,
        setIsAuthenticated: setIsAuthenticated
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider;