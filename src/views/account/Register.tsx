import "./auth.css";
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { encrypt } from "../../utilities/EncryptDecryptManager";
import AccountController from "../../controllers/AccountController";
import { Link, useNavigate } from "react-router-dom";
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { AccountViewModel, LoginViewModel, RegisterViewModel } from "../../types/AccountTypes";
import { useAuth } from "../../contexts/useAuth";
import { AuthProfile } from "../../types/AuthProfile";
import { CustomError } from "../../models/CustomError";
import { AccountExistsResult, LoginResult, RegisterResult } from "../../interfaces/IAccount";
import logo from '../../assets/images/logo.png'
import LanguageSwitcher from "../../components/common/LanguageSwitcher";

const Register = () => {
    const [validated, setValidated] = useState(false);

    const initializeLogin = {
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [formData, setFormData] = useState(initializeLogin);


    const navigate = useNavigate()
    let controller;
    const { ShowMessageToast } = useShowMessageToast()
    //const { loginUser } = useAuth()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value,
        });
    };

    async function onAccountExists(): Promise<boolean> {
        let result: boolean = false;
        const controller = new AccountController()
        const accountViewModel: AccountViewModel = { account: formData.email }
        await controller.AccountExists(accountViewModel).then(data => {
            const dataRegisterResult: AccountExistsResult = data as unknown as AccountExistsResult;
            if (!dataRegisterResult.result) {
                ShowMessageToast('Se ha producido un error al verificar la cuenta, intente de nuevo!', MESSAGE_TOAST_ERROR_TYPE.ERROR);
                return
            }
            result = dataRegisterResult.result;
        })
            .catch(err => {
                const error = err as CustomError
                ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
            })
        return result;
    };

    async function onRegister() {
        if (formData.password !== formData.confirmPassword) {
            ShowMessageToast('las contraseñas no coinciden.', MESSAGE_TOAST_ERROR_TYPE.ERROR);
            return;
        }
        if (!isValidEmail(formData.email)) {
            ShowMessageToast('correo electrónico inválido.', MESSAGE_TOAST_ERROR_TYPE.ERROR);
            return;
        }

        await onAccountExists().then(async accountExist => {

            if (accountExist) {
                ShowMessageToast('Cuenta de usuario existente, por favor especifique una diferenete e intente de nuevo!', MESSAGE_TOAST_ERROR_TYPE.ERROR);
                return
            }
            const controller = new AccountController()
            const registerViewModel: RegisterViewModel = { email: formData.email, password: encrypt(formData.password) }
            await controller.Register(registerViewModel).then(data => {
                const dataRegisterResult: RegisterResult = data as unknown as RegisterResult;
                console.log('register response: ' + dataRegisterResult)
                if (!dataRegisterResult.result) {
                    ShowMessageToast('Se ha producido un error al registrar la cuenta, intente de nuevo!', MESSAGE_TOAST_ERROR_TYPE.ERROR);
                    return
                }
                ShowMessageToast('Usuario registrado con éxito, inicie sesión para acceder al sistema!', MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
                navigate('/account/login');
            }).catch(err => {
                const error = err as CustomError
                ShowMessageToast(error.message, MESSAGE_TOAST_ERROR_TYPE.ERROR);
            })
        })
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (e.currentTarget.checkValidity() === false) {
            setValidated(true);
        }
        else {
            onRegister();
        }
    }

    const isValidEmail = (email: string) => {
        // Email validation logic here (e.g., regex)
        // Return true if valid, false otherwise
        return /\S+@\S+\.\S+/.test(email);
    };

    return (
        <>
            <div className="w-100 d-flex justify-content-end p-2">
                <LanguageSwitcher />
            </div>
            <section className="register-section">
                <div className="container">
                    <Card className="form-signin m-auto  p-5">
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <div className="w-100 pt-2 pb-5 text-center">
                                    <img src={logo} alt="logo" style={{ width: 150 }} />
                                </div>
                                <div>
                                    <h4><strong>Crear una cuenta</strong></h4>
                                    <p>Continúa donde lo dejaste</p>
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
                                </Col >
                            </Row>
                            <Row>
                                <Col xl={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Contraseña:</Form.Label>
                                        <Form.Control type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} required />
                                    </Form.Group>
                                </Col >
                            </Row>
                            <Row>
                                <Col xl={12} className="text-center">
                                    <Button className="w-100" size="lg" id="btnSubmit" type="submit" variant='primary'>Regístrate</Button>
                                </Col>
                                <div className="pt-2">
                                    ¿Ya eres usuario? <Link to={"/account/login"}>Inicia sesión</Link>
                                </div>
                            </Row>
                        </Form>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Register;
