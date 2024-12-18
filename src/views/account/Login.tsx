import "./auth.css";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { encrypt } from "../../utilities/EncryptDecryptManager";
import AccountController from "../../controllers/AccountController";
import { useNavigate } from "react-router-dom";
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { LoginViewModel } from "../../types/AccountTypes";
import { useAuth } from "../../contexts/useAuth";
import { AuthProfile } from "../../types/AuthProfile";
import { CustomError } from "../../models/CustomError";

const Login = () => {
    const navigate = useNavigate()
    let controller;
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

    async function onLogin() {
        const loginVewModel: LoginViewModel = { Id: "", Email: email, Password: encrypt(password) }
        controller = new AccountController()
        await controller.Login(loginVewModel).then(data => {
            if (!data.isAuthenticated) {
                ShowMessageToast('Usuario o contraseña invalida.', MESSAGE_TOAST_ERROR_TYPE.ERROR);
                return
            }
            const user: AuthProfile = {
                userName: data.userName,
                email: email,
                fullName: data.fullName!,
                isAuthenticated: true,
                tokenResult: data.tokenResult!
            }
            loginUser(user, data.tokenResult!);
            navigate('/dashboard');
        }).catch(err => {
            const error = err as CustomError
            ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
        })
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
        </section>
    );
};

export default Login;
