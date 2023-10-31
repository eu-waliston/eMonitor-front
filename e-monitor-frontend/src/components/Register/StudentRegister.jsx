import React, { useState } from "react";
import "./Register.scss"
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner"
import { MdOutlineArrowBack } from "react-icons/md";

const StudentRegister = () => {
    const URL = "https://emonitor-tsa0.onrender.com/api/v1/auth/register-student";

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

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
                    name: name,
                    email: email,
                    password: password
                }),
            })

            setIsLoading(false);

            if (response.ok) {
                processResponse(response)
            } else {
                console.error('Erro ao registrar');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao registrar: ', error);
        }
    }

    const processResponse = async (response) => {
        try {
            const data = await response.json();
            const token = data.token;
            const role = data.role;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            if (role === "STUDENT") {
                navigate('/lobby-student', { replace: true });
            } else {
                console.log("Role Error");
            }
        } catch (error) {
            console.error('Erro ao processar resposta:', error);
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
                            />

                            <button className="btn--register" type="submit">
                                Cadastrar
                            </button>

                        </form>
                    </div>
                )
            }

        </div>
    )
}


export default StudentRegister;