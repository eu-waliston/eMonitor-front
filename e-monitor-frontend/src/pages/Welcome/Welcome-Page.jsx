import React from "react";
import "./Welcome.scss";
import {Link} from "react-router-dom";

const WelcomePage = () => {
    return (
        <div className="welcome-page">
            <div className="container">
                <img 
                    src="./Images/logo.png" 
                    alt="logo do website" 
                    className="logo-principal animate__animated animate__bounce animate__slow	3s animate__infinite	infinite"
                />
                
                <p className="semititle">Olá seja bem-vindo(a) ao: </p>
                <h1 className="title">E-Monitor</h1>
                <Link to={"/login"} className="btn--entrar">Entrar</Link>
                <p className="subtitle--principal">Ainda não tem uma conta? cadastre-se <Link to={"/choice"} className="link--cadastro">aqui</Link></p>
            </div>
        </div>
    )
} 

export default WelcomePage;