import { createContext, useContext, useEffect, useState } from "react"
import { AuthProfile } from "../types/AuthProfile";
import { useNavigate } from "react-router-dom";
import { TokenResult } from "../interfaces/IAccount";
import { decrypt, encrypt } from "../utilities/EncryptDecryptManager";

type Props = { children: React.ReactNode }

type UserContextType = {
     user: AuthProfile | null;
     tokenResult: TokenResult | null;
     loginUser: (user: AuthProfile, tokenResult: TokenResult) => void;
     logout: () => void;
     isLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
     const navigate = useNavigate();
     const [tokenResult, setTokenResult] = useState<TokenResult | null>(null);
     const [user, setUser] = useState<AuthProfile | null>(null);
     const [isReady, setIsReady] = useState(false)

     useEffect(() => {
          const ciphertext: string | null = localStorage.getItem("authorizaction")
          const user = ciphertext ? decrypt(ciphertext) : null
          const tokenResult = localStorage.getItem("tokenResult")
          if (user && tokenResult) {
               setUser(JSON.parse(user));
               setTokenResult(JSON.parse(tokenResult) as TokenResult);
          }
          setIsReady(true)
     }, [])

     const loginUser = (user: AuthProfile, tokenResult: TokenResult) => {
          localStorage.setItem("authorizaction", encrypt(JSON.stringify(user)))
          localStorage.setItem("tokenResult", JSON.stringify(tokenResult))
          setUser(user);
          setTokenResult(tokenResult as TokenResult)
          navigate("/dashboard");
     }

     const isLoggedIn = () => {
          return !!user;
     };

     const logout = () => {
          localStorage.removeItem("authorizaction")
          localStorage.removeItem("tokenResult")
          setUser(null)
          setTokenResult(null)
          navigate("/account/login");
     }

     return <UserContext.Provider value={{ loginUser, user, tokenResult, logout, isLoggedIn }}>
          {isReady ? children : null}
     </UserContext.Provider>
}

export const useAuth = () => useContext(UserContext)