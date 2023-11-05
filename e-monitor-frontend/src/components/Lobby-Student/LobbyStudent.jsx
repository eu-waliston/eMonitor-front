import './LobbyStudent.scss';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

// Components
import Nav from '../Nav/Nav';
import FilterMenu from '../FilterMenu/FilterMenu';

// Icons
import { AiOutlineReload } from "react-icons/ai";
import { BsExclamationCircleFill } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";

const LobbyStudent = () => {
    const navigate = useNavigate();

    const getTickets_URL = 'http://emonitor.inf.ufsm.br/api/v1/tickets/get-tickets'
    const renameTicket_URL = 'http://emonitor.inf.ufsm.br/api/v1/tickets/rename-ticket'
    const token = localStorage.getItem('token');
    const ticketId = localStorage.getItem('ticketId');

    const [ticketInfo, setTicketInfo] = useState([])

    const [newTitle, setNewTitle] = useState("");
    const [isRenaming, setIsRenaming] = useState(false);
    const [renamingTicketId, setRenamingTicketId] = useState(null);

    const [filters, setFilters] = useState([]);

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

    useEffect(() => {
        handleGetTicket();
    }, []);

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    }

    const filterAndOrganizeTickets = (tickets, filters) => {
        if (filters.length === 0) {
            return [...tickets].reverse();
        } else {
            return [...tickets].reverse().filter((ticket) => filters.includes(ticket.topicId));
        }
    }

    const handleGetTicket = async () => {
        try {
            const response = await fetch(getTickets_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            if (response.ok) {
                const data = await response.json();
                setTicketInfo(data);
            } else {
                console.error('Erro na solicitação:', response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleRenameTicket = async () => {
        try {
            const response = await fetch(renameTicket_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    id: ticketId,
                    newSubject: newTitle
                }),
            })

            setTimeout(() => {
                handleGetTicket();
            }, 1500)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="Lobby-student">
            <div className="container">

                < Nav />
                <FilterMenu updateFilters={setFilters} />
                <button className='reload--btn' onClick={() => {
                        handleGetTicket()
                    }}>
                    < AiOutlineReload className='reload-icon' />
                </button>

                <div className="Lobby">

                    <div className="ticket-list">
                        {
                            ticketInfo.length === 0 ? (
                                <div className="no-tickets">
                                    <h1 >Ainda não há tickets!</h1>
                                </div>
                            ) : (
                                filterAndOrganizeTickets(ticketInfo, filters).map((ticket, index) => (
                                    <div
                                        className="ticket"
                                        key={index}
                                        onClick={
                                            () => {
                                                localStorage.setItem("ticketId", ticket.id);
                                                navigate('/chat', { replace: true })
                                            }
                                        }
                                    >
                                        <div className="ticket-info">
                                            {
                                                isRenaming && renamingTicketId === ticket.id ? (
                                                    <input
                                                        className="input-title"
                                                        type="text"
                                                        placeholder={ticket.subject}
                                                        value={newTitle}
                                                        onChange={handleTitleChange}
                                                        onBlur={() => {
                                                            setIsRenaming(false);
                                                            setRenamingTicketId(null);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                handleRenameTicket();
                                                                setIsRenaming(false);
                                                            }
                                                        }}
                                                        onClick={(e) => { e.stopPropagation() }}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <div className="ticket-info">
                                                        <h3 className="ticket-title">{ticket.subject}</h3>
                                                        <p className="ticket-topic">{areas[ticket.topicId]}</p>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    setRenamingTicketId(ticket.id);
                                                    setNewTitle("");
                                                    e.stopPropagation();
                                                    setIsRenaming(true);
                                                }
                                            }

                                            aria-describedby='claim'
                                        >
                                            <BiSolidEdit className="action-icon" />
                                        </button>

                                        <div className="ticket-read-icon">
                                            {ticket.status === "OPEN" ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
                                        </div>

                                    </div>
                                ))
                            )}
                    </div>

                    <Link to={"/ticket-subject-choice"}>
                        <button className="fab-button">+</button>
                    </Link>

                </div>
            </div>

        </div>
    )
}

export default LobbyStudent;