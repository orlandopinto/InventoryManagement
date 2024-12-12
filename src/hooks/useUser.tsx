import { useContext } from "react";
import { useLocalStorage } from "../utilities/useLocalStorage";
import { AuthContext } from "../contexts/ContextProvider";

// NOTE: optimally move this into a separate file
export interface User {
    isAuthenticated: boolean,
    email?: string,
    fullName?: string,
    isAdmin?: boolean,
    userName?: string,
    token?: string
}

export const useUser = () => {
    const { userAuth, setUserAuth } = useContext(AuthContext);
    const { setItem, removeItem } = useLocalStorage();

    const addUserAuth = (userAuth: User) => {
        setUserAuth(userAuth);
        setItem("user", JSON.stringify(userAuth));
    };

    const removeUserAuth = () => {
        setUserAuth({ isAuthenticated: false });
        removeItem("user")
    };

    return { userAuth, addUserAuth, removeUserAuth, setUserAuth };
};