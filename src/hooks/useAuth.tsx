import { useEffect } from "react";
import { useUser, User } from "./useUser";
import { useLocalStorage } from "../utilities/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    // we can re export the user methods or object from this hook
    const { user, addUser, removeUser, setUser } = useUser();
    const { getItem } = useLocalStorage();
    const navigate = useNavigate()

    useEffect(() => {
        const user = getItem("user");
        if (user) {
            addUser(JSON.parse(user));
        }
    }, [addUser, getItem]);

    const login = (user: User) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
        navigate("/login");
    };

    return { user, login, logout, setUser };
};