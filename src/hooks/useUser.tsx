import { useContext } from "react";
import { useLocalStorage } from "../utilities/useLocalStorage";
import { AuthContext } from "../contexts/ContextProvider";

// NOTE: optimally move this into a separate file
export interface User {
    id: string;
    name: string;
    email: string;
    authToken?: string;
}

export const useUser = () => {
    const { user, setUser } = useContext(AuthContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: User) => {
        setUser(user);
        setItem("user", JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem("user", "");
    };

    return { user, addUser, removeUser, setUser };
};