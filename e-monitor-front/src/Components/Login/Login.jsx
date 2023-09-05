import React from "react";
import "./Login.css"
import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="login-container">

            <div className="login-container">
                <div className="logo-container">
                    <img src='./Images/logo.png' alt="App Logo" className="img_logo" />
                    <h2><span className="title--logo">E</span>-Monitor</h2>
                </div>
                <div className="login-fields">
                    <input className="input" type="text" placeholder="CPF/Matrícula" />
                    <input className="input" type="password" placeholder="Senha" />
                    <h6 className="remember" >
                        <input type="checkbox" name="" id="" />
                        Lembre minha senha
                    </h6>
                    <Link to={"/lobby_user"} className="btn">
                        ENTRAR
                    </Link>
                    <Link to={"/lobby_monitor"} className="btn">
                        ENTRAR2
                    </Link>
                    <Link>esqueci minha senha</Link>
                </div>
            </div>

        </div>
    )
}

export default Login;