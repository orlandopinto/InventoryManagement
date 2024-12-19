import "./auth.css";
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { encrypt } from "../../utilities/EncryptDecryptManager";
import AccountController from "../../controllers/AccountController";
import { Link, useNavigate } from "react-router-dom";
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { LoginViewModel } from "../../types/AccountTypes";
import { useAuth } from "../../contexts/useAuth";
import { AuthProfile } from "../../types/AuthProfile";
import { CustomError } from "../../models/CustomError";
import { LoginResult } from "../../interfaces/IAccount";
import logo from '../../assets/images/logo.png'
import LanguageSwitcher from "../../components/common/LanguageSwitcher";

const Login = () => {
    const [validated, setValidated] = useState(false);

    const initializeLogin = {
        id: "",
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(initializeLogin);


    const navigate = useNavigate()
    const { ShowMessageToast } = useShowMessageToast()
    const { loginUser } = useAuth()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    async function onLogin() {
        const loginVewModel: LoginViewModel = { id: "", email: formData.email, password: encrypt(formData.password) }
        const controller = new AccountController()
        await controller.Login(loginVewModel).then(data => {
            const dataLoginresult: LoginResult = data as unknown as LoginResult
            if (!dataLoginresult.isAuthenticated) {
                ShowMessageToast('Usuario o contraseña invalida.', MESSAGE_TOAST_ERROR_TYPE.ERROR);
                return
            }
            const user: AuthProfile = {
                userName: dataLoginresult.userName as string,
                email: loginVewModel.email as string,
                fullName: dataLoginresult.fullName as string,
                isAuthenticated: true,
                tokenResult: dataLoginresult.tokenResult!
            }
            loginUser(user, dataLoginresult.tokenResult!);
            navigate('/dashboard');
        }).catch(err => {
            const error = err as CustomError
            ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
        })
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            setValidated(true);
        }
        else {
            onLogin();
        }
    }

    return (
        <>
            <div className="w-100 d-flex justify-content-end p-2">
                <LanguageSwitcher />
            </div>
            <section className="login-section">
                <div className="container">
                    <Card className="form-signin m-auto  p-5">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <div className="w-100 pt-2 pb-5 text-center">
                                    <img src={logo} alt="logo" style={{ width: 150 }} />
                                </div>
                                <div>
                                    <h4><strong>Iniciar sesión</strong></h4>
                                    <p>Por favor, inicie sesión en su cuenta</p>
                                </div>
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Correo electrónico:</Form.Label>
                                        <Form.Control type="email" id="email" name="email" onChange={handleChange} required />
                                    </Form.Group>
                                </Col >
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contraseña:</Form.Label>
                                        <Form.Control type="password" id="password" name="password" onChange={handleChange} required />
                                    </Form.Group>
                                    <div>
                                        <p>¿Has olvidado tu contraseña?</p>
                                    </div>
                                </Col >
                            </Row>
                            <Row>
                                <Col xl={12} className="text-center">
                                    <Button className="w-100" size="lg" id="btnSubmit" type="submit" variant='primary'>Iniciar sesión</Button>
                                </Col>
                                <div className="pt-2">
                                    ¿No tienes una cuenta? <Link to={"/account/register"}>Regístrate</Link>
                                </div>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Login;
