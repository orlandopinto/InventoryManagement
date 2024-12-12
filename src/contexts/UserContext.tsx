import { createContext, useContext, useEffect, useState } from "react"
import { AuthLoginResult } from "../types/Auth"

type Props = { children: React.ReactNode }

const UserContext = createContext<AuthLoginResult>({ isAuthenticated: false } as AuthLoginResult)

export const UserProvider = ({ children }: Props) => {
     const [user, setUser] = useState<AuthLoginResult | null>(null)
     const [token, setToken] = useState<string | null>(null)
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

     const loginUser = (user: AuthLoginResult, tokenFromLogin: string) => {
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", tokenFromLogin)
          setUser(user);
          setToken(token)
     }

     const logout = () => {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          setUser(null)
          setToken(null)
     }

     return <UserContext.Provider value={{ user, token, loginUser, logout }}>
          {isReady ? children : null}
     </UserContext.Provider>
}

export const useAuth = () => useContext(UserContext)