import "./auth.css";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import ToastContainerComponent from '../../components/common/ToastContainerComponent'
import { Card } from "react-bootstrap";
import { encrypt } from "../../utilities/EncryptDecryptManager";
import AccountController from "../../controllers/AccountController";
import { useNavigate } from "react-router-dom";
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { LoginViewModel } from "../../types/AccountTypes";
import { LoginResult } from "../../interfaces/IAccount";
import { User } from "../../hooks/useUser";
import { AuthLoginResult } from "../../types/Auth";
import { useAuth } from "../../contexts/UserContext";

const Login = () => {
    const navigate = useNavigate()
    const controller = new AccountController()
    const { ShowMessageToast } = useShowMessageToast()
    const { loginUser } = useAuth()

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    async function onLogin(): Promise<LoginResult> {
        let respuesta: LoginResult = { isAuthenticated: false };
        const loginVewModel: LoginViewModel = { Id: "", Email: email, Password: encrypt(password) }
        await controller.Login(loginVewModel).then((response => {
            if ((response as User).token) {
                const authLoginResult: AuthLoginResult = {
                    isAuthenticated: (response as User).token === "" ? false : true,
                    Email: email,
                    FullName: (response as User).fullName,
                    UserName: (response as User).userName
                }
                loginUser(authLoginResult, (response as User).token);
                navigate('/');
            }
            else {
                ShowMessageToast('Usuario o contraseña incorrecta.', MESSAGE_TOAST_ERROR_TYPE.ERROR);
                return;
            }
        }));
        return respuesta;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    }

    return (
        <section>
            <div className="container">
                <Card className="form-signin m-auto  p-5">
                    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                        <h1 className="h3 mb-3 fw-normal">Login</h1>
                        <div className="form-floating">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} required />
                            <label htmlFor="email">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
                    </form>
                </Card>
            </div>
            <ToastContainerComponent />
        </section>
    );
};

export default Login;
