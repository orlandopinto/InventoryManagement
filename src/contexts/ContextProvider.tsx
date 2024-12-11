import { Children, createContext, useContext, useState } from "react";
import { User } from "../hooks/useUser";

interface AuthContext {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean,
    setIsAuthenticated:  React.Dispatch<React.SetStateAction<boolean>>;

}

export const AuthContext = createContext<AuthContext>({
    user: null,
    setUser: () => { },
    isAuthenticated: false,
    setIsAuthenticated: () => {}
});

const ContextProvider = ({ children }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const [x, setX] = useState<boolean>();
    setIsAuthenticated(true);
    const value = {
        isAuthenticated: true,
        setIsAuthenticated: setIsAuthenticated
    }
    return (
        <AuthContext.Provider value={isAuthenticated, setIsAuthenticated}>
            {children}
        </AuthContext.Provider>
    )
}

export default ContextProvider;