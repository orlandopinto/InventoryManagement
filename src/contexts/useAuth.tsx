import { createContext, useContext, useEffect, useState } from "react"
import { UserProfile } from "../types/types";
import { useNavigate } from "react-router-dom";

type Props = { children: React.ReactNode }

type UserContextType = {
     user: UserProfile | null;
     token: string | null;
     loginUser: (user: UserProfile, token: string) => void;
     logout: () => void;
     isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
     const navigate = useNavigate();
     const [token, setToken] = useState<string | null>(null);
     const [user, setUser] = useState<UserProfile | null>(null);
     const [isReady, setIsReady] = useState(false)

     useEffect(() => {
          const user = localStorage.getItem("user")
          const token = localStorage.getItem("token")
          if (user && token) {
               setUser(JSON.parse(user));
               setToken(token);
          }
          setIsReady(true)
     }, [])

     const loginUser = (user: UserProfile, token: string) => {
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          setUser(user);
          setToken(token)
          navigate("/dashboard");
     }

     const isLoggedIn = () => {
          return !!user;
     };


     const logout = () => {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          setUser(null)
          setToken(null)
          navigate("/");
     }

     return <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn }}>
          {isReady ? children : null}
     </UserContext.Provider>
}

export const useAuth = () => useContext(UserContext)