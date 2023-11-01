import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./Login.scss"
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner"
import { MdOutlineArrowBack } from "react-icons/md";

import { useForm } from "react-hook-form"

const Login = () => {

    const URL = "https://emonitor-tsa0.onrender.com/api/v1/auth/login"

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
            const response = await fetch(URL, {
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
                setPopupColor("#90EE90");
                setPopupText("Login realizado com sucesso!");
                setShowPopup(true);
                setTimeout(() => {
                    setIsLoading(true);
                    processResponse(response);
                }, 1000)
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
            const token = data.token;
            const role = data.role;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (role === "STUDENT") {
                navigate('/lobby-student', { replace: true });
            } else if (role === "MONITOR") {
                navigate('/lobby-monitor', { replace: true });
            } else {
                console.log("Role Error");
            }
        } catch (error) {
            console.error('Erro ao processar resposta:', error);
        }
    }


    const {
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => console.log(data)
    
      console.log(watch("example")) // watch input value by passing the name of it

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

                  { /*      <Popup
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
                        </Popup> */}
                    </div>
                )
            }

        </div>
    )
}

export default Login;