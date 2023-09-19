import React, { useState } from "react";
import "./Register.css"
import { useNavigate } from "react-router-dom";

const CadMonitor = () => {
    const URL = "https://emonitor-tsa0.onrender.com/api/v1/auth/register-student";

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();

        const userData = {
            name,
            email,
            password
        };

        console.log("Dados a serem enviados:", userData);
        setTimeout(() => {
            navigate('/lobby-user', { replace: true });
        }, 2000);
    }

    function handleSendTicket() {
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),

            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    }

    return (
        <div className="register-container">

            <div className="login-container">
                <div className="logo-container">
                    <img src='./Images/logo.png' alt="App Logo" className="img_logo" />
                    <h2><span className="title--logo">E</span>-Monitor</h2>
                </div>

                <form className="login-fields" action="POST" onSubmit={handleSubmit}>

                    <input
                        className="input"
                        type="text"
                        placeholder="Nome"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="input"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="btnr" onClick={() => handleSendTicket()}>
                        Cadastrar
                    </button>

                </form>
            </div>

        </div>
    )
}


export default CadMonitor;