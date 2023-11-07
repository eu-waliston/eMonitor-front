import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { URL } from '../../scripts/scripts';

// Components
import Spinner from "../Spinner/Spinner"
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

// Icons
import { MdOutlineArrowBack } from "react-icons/md";


const AdminLogin = () => {

    const URL_Login = URL + '/api/v1/auth/login'

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [popupText, setPopupText] = useState("");
    const [popColor, setPopupColor] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(URL_Login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            })

            setIsLoading(false);

            if (response.ok) {
                processResponse(response);
            } else {
                setPopupColor("#FA8072");
                setPopupText("Problema no login!Tente novamente!");
                setShowPopup(true);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao fazer login:', error);
        }
    };

    const processResponse = async (response) => {
        try {
            const data = await response.json();
            const role = data.role;

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', role);

            if (role === "ADMIN") {
                setPopupColor("#90EE90");
                setPopupText("Login realizado com sucesso!");
                setShowPopup(true);

                setTimeout(() => {
                    setIsLoading(true);
                    navigate('/lobby-admin', { replace: true });
                }, 1000);
            } else {
                setPopupColor("#FA8072");
                setPopupText("Usuário não é autorizado!");
                setShowPopup(true);
            }
        } catch (error) {
            console.error('Erro ao processar resposta:', error);
        }
    }

    const {
        watch,
        formState: { errors },
    } = useForm()

    return (
        <div className="login-container">
            <button
                className='action-btn'
                onClick={
                    (e) => {
                        e.preventDefault();
                        navigate('/', { replace: true })
                    }
                }
                aria-describedby='claim'
            >
                <MdOutlineArrowBack className="action-icon" />
            </button>

            {isLoading ?
                (
                    <Spinner />
                ) : (
                    <div className="container">
                        <div className="logo-container">
                            <img src='./Images/logo.png' alt="App Logo" className="img_logo" />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="login-fields">
                                <input
                                    className="input"
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    min="1" max="20"
                                />
                                {errors.exampleRequired && <span>Este campo é obrigatório</span>}
                                <input
                                    className="input"
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    min="1" max="16"
                                />
                                {errors.exampleRequired && <span>Este campo é obrigatório</span>}
                                <h6 className="remember" >
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    Lembre minha senha
                                </h6>
                                <div>
                                    <button
                                        type="submit"
                                        className="btn"
                                    >
                                        ENTRAR
                                    </button>
                                </div>
                                <Link className="recover">esqueci minha senha</Link>
                            </div>
                        </form>

                        <Popup
                            open={showPopup}
                            closeOnDocumentClick={true}
                            onClose={handlePopupClose}
                            modal={true}
                            contentStyle={{
                                borderRadius: "10px",
                                padding: "20px",
                                backgroundColor: popColor,
                                border: "none",
                                fontWeight: "bold",
                                width: "30%"
                            }}
                            trigger={<button style={{ display: "none" }}></button>}
                        >
                            <div>{popupText}</div>
                        </Popup>
                    </div>
                )
            }
        </div>
    )

}


export default AdminLogin;