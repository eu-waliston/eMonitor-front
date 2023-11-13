import "./Ticket.scss";
import { URL } from '../../scripts/scripts';

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import Spinner from "../Spinner/Spinner"

// Icons
import { MdOutlineArrowBack } from "react-icons/md";

const Ticket = () => {
    const navigate = useNavigate();

    const URL_InsertTicket = URL + '/api/v1/tickets/insert-ticket';
    const TOKEN = localStorage.getItem('token');

    const [isLoading, setIsLoading] = useState(false);

    const [optionName, setOptionName] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const areas = {
        "MATEMATICA": "Matemática",
        "ARTES": "Artes",
        "PORTUGUES": "Português",
        "INGLES": "Inglês",
        "BIOLOGIA": "Biologia",
        "HISTORIA": "História",
        "ED_FISICA": "Ed.Física",
        "FISICA": "Física",
        "FILOSOFIA": "Filosofia",
        "SOCIOLOGIA": "Sociologia",
        "QUIMICA": "Química",
        "GEOGRAFIA": "Geografia",
        "OUTROS": "Outros"
    };

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
        setIsLoading(true);

        try {
            const response = await fetch(URL_InsertTicket, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
                body: JSON.stringify({
                    subject: title,
                    content: description,
                    topic: optionName.toUpperCase(),
                }),
            })

            setIsLoading(false);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("ticketId", data);

                navigate('/chat', { replace: true });
            } else {
                console.error('Erro ao enviar o ticket');
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <div className="ticket--component">

            <button
                className='action-btn'
                onClick={
                    (e) => {
                        e.preventDefault();
                        navigate('/ticket-subject-choice', { replace: true })
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
                    //<Nav />
                    <div className="ticket--section">

                        <div className="ticket--info">
                            <img src={`./public/Icons/${optionName}.png`} alt="Icone da disciplina" />
                            <p className="ticekt-p">{areas[optionName]}</p>
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
                )
            }
        </div>
    )
}

export default Ticket;