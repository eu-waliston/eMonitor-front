import React from "react";
import "./Login-Monitor.css"
import { Link } from "react-router-dom"

const LoginMonitor = () => {
    return (
        <div className="login-container-m">

            <div className="login-container">
                <div className="logo-container">
                    <Link to={"/"}>
                    <img src='./Images/logo.png' alt="App Logo" className="img_logo" />
                    </Link>
                    
                    <h2><span className="title--logo">E</span>-Monitor</h2>
                </div>
                <div className="login-fields">
                    <input className="input" type="text" placeholder="Email" />
                    <input className="input" type="password" placeholder="Senha" />
                    <h6 className="remember" >
                        <input type="checkbox" name="" id="" />
                        Lembre minha senha
                    </h6>
                    <Link to={"/lobby-monitor"} className="btn">
                        ENTRAR
                    </Link>

                    <Link className="cad">criar conta</Link>
                    <Link className="recover">esqueci minha senha</Link>
                </div>
            </div>

        </div>
    )
}

export default LoginMonitor;