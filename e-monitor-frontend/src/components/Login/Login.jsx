import React, { useState } from "react";
import "./Login.scss"
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner"

const Login = () => {

    const URL = "https://emonitor-tsa0.onrender.com/api/v1/auth/login"

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
                processResponse(response)
            } else {
                console.error('Erro ao fazer login');
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

    return (
        <div className="login-container">

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
                                    /* TODO: mudar para type="email" */
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                                <input
                                    className="input"
                                    name="password"
                                    type="password"
                                    placeholder="Senha"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                                <h6 className="remember" >
                                    <input
                                        type="checkbox"
                                        name=""
                                        id=""
                                    />
                                    Lembre minha senhaa
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
                    </div>
                )
            }

        </div>
    )
}

export default Login;