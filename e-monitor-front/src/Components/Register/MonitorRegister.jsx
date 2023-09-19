import React from "react";
import "./Register.css"
import { Link } from "react-router-dom";

const CadUser = () => {
    return (
        <div className="register-container">

            <div className="login-container">
                <div className="logo-container">
                    <img src='./Images/logo.png' alt="App Logo" className="img_logo" />
                    <h2><span className="title--logo">E</span>-Monitor</h2>
                </div>
                <div className="login-fields">
                    <input className="input" type="text" placeholder="Nome" />
                    <input className="input" type="text" placeholder="Email" />
                    <input className="input" type="password" placeholder="Senha" />
                    <Link to={"/lobby-user"} className="btn">
                        Cadastrar
                    </Link>
                </div>
            </div>

        </div>
    )
}


export default CadUser;