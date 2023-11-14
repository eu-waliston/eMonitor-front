import "./Register.scss"
import { URL } from '../../scripts/scripts';

import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";


// Components
import Spinner from "../Spinner/Spinner"

// Icons
import { MdOutlineArrowBack } from "react-icons/md";

const CadUser = () => {
    const URL_RegisterMonitor = URL + '/api/v1/auth/register-monitor'

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [popupText, setPopupText] = useState("");
    const [popColor, setPopupColor] = useState("");

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
        setIsLoading(true);
        navigate('/', { replace: true });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(URL_RegisterMonitor, {
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
                setPopupText("Cadastro realizado com sucesso!<br/>Aguardando aprovação de um administrador!");
                setShowPopup(true);
            } else {
                setPopupColor("#FA8072");
                setPopupText("Problema no cadastro!<br/>Tente novamente!");
                setShowPopup(true);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao registrar: ', error);
        }
    }

    const createMarkup = (text) => {
        return { __html: text };
    };

    return (
        <div className="register-container">

            <span
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
            </span>

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
                                min="1" max="20"
                            />
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                onChange={handleEmailChange}
                                required
                                min="1" max="20"
                            />
                            <input
                                className="input"
                                type="password"
                                placeholder="Senha"
                                onChange={handlePasswordChange}
                                required
                                min="1" max="20"
                                minLength="8"
                            />

                            <button className="btnr" type="submit">
                                Cadastrar
                            </button>

                        </form>


                        <Popup
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
                            <div dangerouslySetInnerHTML={createMarkup(popupText)} />
                        </Popup>
                    </div>
                )
            }

        </div>
    )
}

export default CadUser;