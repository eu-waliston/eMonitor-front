import React, { useState } from "react";
import "./Login.css"
import { Link } from "react-router-dom"

const Login = () => {
    const [currentPage, setCurrentPage] = useState('login');

    // const navigateTo = (page) => {
    //      setCurrentPage(page);
    // };

    // const handleLogin = () => {
    // Simulação de autenticação bem-sucedida (substitua por sua lógica real)
    //     const isAuthenticated = true;
    //
    //     if (isAuthenticated) {
    //         navigateTo('lobby');
    //      }
    //  };



    return (
        <div className="login-container">

            <div className="login-container">
                <div className="logo-container">
                    <img src='./Images/logo.png' alt="App Logo" className="img_logo" />
                    <h2><span className="title--logo">E</span>Monitor</h2>
                </div>
                <div className="login-fields">
                    <input className="input" type="text" placeholder="CPF/Matrícula" />
                    <input className="input" type="password" placeholder="Senha" />
                    <h6 className="remember" >
                        <input type="checkbox" name="" id="" />
                        Lembre minha senha
                    </h6>
                    {/* <button onClick={handleLogin}>ENTRAR</button> */}
                    <Link to={"/lobby"} className="btn">
                        ENTRAR
                    </Link>
                    <a href="#">esqueci minha senha</a>
                </div>
            </div>

        </div>
    )
}

export default Login;