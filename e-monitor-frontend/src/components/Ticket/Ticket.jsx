import React, { useState } from "react";
import "./Ticket.scss";
import Nav from "../Nav/Nav"

import { useNavigate } from "react-router-dom";

const Ticket = () => {

    const TOKEN = localStorage.getItem('token');
    const URL = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/insert-ticket';

    const navigate = useNavigate();


    const [optionName, setOptionName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    React.useEffect(() => {
        if (localStorage.getItem("TAG")) {
            setOptionName(localStorage.getItem("TAG"))
        }
    }, [])

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
                body: JSON.stringify({
                    subject: title,
                    content: description
                }),
            });

            if (response.ok) {
                setTimeout(() => {
                    navigate('/chat', { replace: true });
                }, 2000);
            } else {
                console.error('Erro ao enviar o ticket');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="ticket--component">
            <Nav />
            <div className="ticket--section">

                <div className="ticket--info">
                    <img src={`./Icons/${optionName}.png`} alt="Icone da disciplina" />
                    <p className="ticekt-p">{optionName}</p>
                </div>
                <div >
                    <form className="ticket--form" onSubmit={handleSubmit}>

                        <label>Titulo</label>
                        <input
                            type={"text"}
                            id="ds"
                            value={title}
                            onChange={handleTitleChange}
                            required
                        />

                        <label>Descrição:</label>
                        <textarea
                            cols="30"
                            rows="10"
                            id="fs"
                            value={description}
                            onChange={handleDescriptionChange}
                            required
                        >
                        </textarea>

                        <div className="controls">
                            <button
                                type="submit"
                                className="back--icon send"
                            >
                                Enviar
                            </button>

                            {/* TODO: "Certeza que quer cancelar?" - (Pop-Up)*/}
                            <button
                                className="back--icon return"
                                type="button"
                                onClick={() => navigate('/ticket-subject-choice', { replace: true })}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Ticket;