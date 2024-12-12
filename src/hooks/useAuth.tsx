import { useEffect } from "react";
import { useUser, User } from "./useUser";
import { useLocalStorage } from "../utilities/useLocalStorage";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    // we can re export the user methods or object from this hook
    const { userAuth, addUserAuth, removeUserAuth, setUserAuth } = useUser();
    const { getItem } = useLocalStorage();
    const navigate = useNavigate()

    useEffect(() => {
        const user = getItem("userAuth");
        if (user) {
            addUserAuth(JSON.parse(user));
        }
    }, [addUserAuth, getItem]);

    const loginAuth = (user: User) => {
        addUserAuth(user);
    };

    const logoutAuth = () => {
        removeUserAuth();
        navigate("/login");
    };

    return { userAuth, loginAuth, logoutAuth, setUserAuth };
};