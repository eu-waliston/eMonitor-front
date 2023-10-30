import React, { useState } from "react";
import "./Register.scss"
//import Popup from "reactjs-popup";
//import "reactjs-popup/dist/index.css";
import { MdOutlineArrowBack } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner"

const CadUser = () => {
    const URL = "https://emonitor-tsa0.onrender.com/api/v1/auth/register-monitor";

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    //const [showPopup, setShowPopup] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   // const [popupText, setPopupText] = useState("");
   // const [popColor, setPopupColor] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const processResponse = async (response) => {
        try {
            const data = await response.json();
            const token = data.token;
            const role = data.role;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (role === "MONITOR") {
                navigate('/lobby-monitor', { replace: true });
                setIsLoading(false);
            } else {
                console.log("Role Error");
            }
        } catch (error) {
            console.error('Erro ao processar resposta:', error);
        }
    }

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
                    name: name,
                    email: email,
                    password: password
                }),
            })

            setIsLoading(false);

            if (response.ok) {
                setPopupColor("#90EE90");
                setPopupText("Cadastro realizado com sucesso!");
                setShowPopup(true);
                setTimeout(() => {
                    setIsLoading(true);
                    processResponse(response);
                }, 3000)
            } else {
                setPopupColor("#FA8072");
                setPopupText("Problema ao cadastrar monitor!\nTente novamente!");
                setShowPopup(true);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao registrar: ', error);
        }
    }

    return (
        <div className="register-container">

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
                    <div className="login-container">
                        <div className="logo-container">
                            <img src='./Images/logo.png' alt="App Logo" className="img_logo animate__animated animate__pulse animate__slow	3s animate__infinite	infinite" />
                        </div>

                        <form className="login-fields" action="POST" onSubmit={handleSubmit}>

                            <input
                                className="input"
                                type="text"
                                placeholder="Nome"
                                onChange={handleNameChange}
                                required
                            />
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                onChange={handleEmailChange}
                                required
                            />
                            <input
                                className="input"
                                type="password"
                                placeholder="Senha"
                                onChange={handlePasswordChange}
                                required
                            />

                            <button className="btnr" type="submit">
                                Cadastrar
                            </button>

                        </form>

                      {/*  <Popup
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


export default CadUser;