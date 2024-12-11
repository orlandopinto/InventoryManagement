import "./auth.css";
import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decrypt } from "../../utilities/EncryptDecryptManager";
import AccountController from "../../controllers/AccountController";
import { Users } from "../../types/Users";
import { LoginType } from "../../types/Auth";
import { useAuth } from "../../hooks/useAuth";
import { User } from "../../hooks/useUser";
import { useNavigate, useNavigation } from "react-router-dom";

const Login = () => {
    const controller = new AccountController()
    const { login } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [data, setData] = useState<string[] | null | undefined>(null);
    const [user, setUser] = useState<Users | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        getData()
    }, []);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const getData = async () => {
        await controller.GetAllUsers()
            .then((response => {
                if (typeof response === "object") {
                    setData(response);
                }
            }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const users: Users[] = JSON.parse(JSON.stringify(data))
        const user = users?.find(f => f.email == email)
        if (user !== undefined) {

            setUser(user)
            const userLogged: LoginType = {
                email: user.email,
                password: user.passwordHash,
                remember_me: false
            };

            //console.log('userLogged: ' + JSON.stringify(userLogged))

            if (password != decrypt(user.passwordHash)) {
                toast.error('Usuario o contraseña incorrecta.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }
            else {
                const usuario: User = {
                    id: "123",
                    name: 'orlando',
                    email: 'opinto@gmail.com',
                    authToken: '1232342342342'
                }
                login(usuario);
                navigate('/');

                // toast.success('usuario válido!', {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                //     theme: "colored",
                // });
                // return;
            }
        }
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </section>
    );
};

export default Login;
