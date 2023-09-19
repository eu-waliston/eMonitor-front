import React, { useState } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
//import { Alert } from '@mui/material';

const Login = () => {

    const URL = "https://emonitor-tsa0.onrender.com/api/v1/auth/login"

    const navigate = useNavigate();

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

        try {
            console.error('Tentativa de login1');
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            console.error('Tentativa de login2');

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem('token', token);
                console.error('Login ok: ' + token);

                /*TODO: Diferenciar monitor e user*/
                setTimeout(() => {
                    navigate('/lobby-user', { replace: true });
                }, 2000);

            } else {
                console.error('Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="login-container">
            <div className="logo-container">
                <img src='./Images/logo.png' alt="App Logo" className="img_logo" />
                <h2><span className="title--logo">E</span>-Monitor</h2>
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

                    <Link className="monit" to={"/login-monitor"}>monitor</Link>

                    <Link className="recover">esqueci minha senha</Link>
                </div>
            </form>

        </div>
    )
}

export default Login;