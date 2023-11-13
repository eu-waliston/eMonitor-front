import './LobbyMonitor.scss';
import { URL } from '../../scripts/scripts';

import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Components
import Nav from '../Nav/Nav';
import FilterMenu from '../FilterMenu/FilterMenu';
import ConfirmActions from '../ConfirmActions/ConfirmActions';

// Icons
import { AiOutlineReload, AiOutlineCheckCircle } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { BsExclamationCircleFill } from "react-icons/bs"

const LobbyMonitor = () => {
    const navigate = useNavigate();
    const URL_Get = URL + '/api/v1/tickets/get-tickets'
    const URL_Claim = URL + '/api/v1/tickets/claim-ticket';
    const URL_Close = URL + '/api/v1/tickets/close-ticket';
    const token = localStorage.getItem('token');
    const [ticketId, setTicketId] = useState(null);

    const [ticketInfo, setTicketInfo] = useState([])
    const [filters, setFilters] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [popupText, setPopupText] = useState('');

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

    const organizeTickets = (data) => {
        return [...data].sort((a, b) => {
            if (a.status === 'OPEN') return -1;
            if (a.status === 'IN_PROGRESS' && b.status !== 'OPEN') return -1;
            return 1;
        });
    }

    const filterTickets = (tickets, filters) => {
        if (filters.length === 0) {
            return tickets;
        } else {
            return [...tickets].filter((ticket) => filters.includes(ticket.topicId));
        }
    }

    const handleGetTicket = async () => {
        try {
            const response = await fetch(URL_Get, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })

            if (response.ok) {
                const data = await response.json();
                setTicketInfo(organizeTickets(data))
            } else {
                console.error('Erro na solicitação:', response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const claimTicket = async () => {
        try {
            fetch(`${URL_Claim}?ticketId=${ticketId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
            })

            setTimeout(() => {
                handleGetTicket();
            }, 1500)

        } catch (error) {
            console.error(error)
        }
    }

    const closeTicket = async () => {
        try {
            fetch(`${URL_Close}?ticketId=${ticketId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
            })

            setTimeout(() => {
                handleGetTicket();
            }, 1500)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="lobby-monitor">
            <div className="container">
                < Nav />
                <FilterMenu updateFilters={setFilters} />
                <button className='reload--btn'>
                    < AiOutlineReload className='reload-icon' onClick={() => handleGetTicket()} />
                </button>
                <div className="Lobby">

                    <div className="ticket-list">
                        {
                            ticketInfo.length === 0 ? (
                                <div className="no-tickets">
                                    <h1>Ainda não há tickets!</h1>
                                </div>
                            ) : (
                                filterTickets(ticketInfo, filters).map((ticket, index) => (
                                    <div
                                        className="ticket"
                                        key={index}
                                        onClick={
                                            () => {
                                                localStorage.setItem("ticketId", ticket.id);
                                                localStorage.setItem("ticketStatus", ticket.status);
                                                navigate('/chat', { replace: false })
                                            }
                                        }
                                    >
                                        <div className="ticket-info">
                                            <h3 className="ticket-title">{ticket.subject}</h3>
                                            <p className="ticket-status">{areas[ticket.topicId]}</p>
                                        </div>
                                        {
                                            ticket.status === "OPEN" ? (
                                                <div>
                                                    <button
                                                        className='action-btn'
                                                        onClick={
                                                            (e) => {
                                                                e.stopPropagation();
                                                                setPopupText('Ao confirmar, esse ticket não estará mais disponível para outros monitores e você estará assumindo a responsabilidade de respondê-lo.');
                                                                setTicketId(ticket.id);
                                                                setShowPopup(true);
                                                            }
                                                        }

                                                        aria-describedby='claim'
                                                    >
                                                        <TfiWrite className="action-icon" />
                                                    </button>
                                                    < ConfirmActions
                                                        showPopup={showPopup}
                                                        setshowPopup={setShowPopup}
                                                        popupText={popupText}
                                                        confirmAction={(confirmed) => {
                                                            if (confirmed) {
                                                                claimTicket()
                                                            } else {
                                                                console.log('Não confirmou')
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                ticket.status === "IN_PROGRESS" ? (
                                                    <div>
                                                        <button
                                                            className='action-btn'
                                                            onClick={
                                                                (e) => {
                                                                    e.stopPropagation();

                                                                    setPopupText('Ao confirmar, esse ticket será fechado e você não poderá mais enviar mensagens.');
                                                                    setTicketId(ticket.id);
                                                                    setShowPopup(true);
                                                                }
                                                            }
                                                        >
                                                            <AiOutlineCheckCircle className="action-icon" />
                                                        </button>
                                                        < ConfirmActions
                                                            showPopup={showPopup}
                                                            setshowPopup={setShowPopup}
                                                            popupText={popupText}
                                                            confirmAction={(confirmed) => {
                                                                if (confirmed) {
                                                                    closeTicket();
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                ) : (
                                                    'CLOSED'
                                                )
                                            )
                                        }

                                        <div className="ticket-read-icon">
                                            {ticket.status === "OPEN" ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
                                        </div>

                                    </div>
                                ))
                            )}
                    </div>

                </div>
            </div>

        </div>
    )
}
export default LobbyMonitor;