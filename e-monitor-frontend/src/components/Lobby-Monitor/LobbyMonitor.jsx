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

    const [showClaim, setShowClaim] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const [popupText, setPopupText] = useState('');

    const [whichTab, setWhichTab] = useState('myTickets');

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
        const organizedTickets = {
            OPEN: [],
            IN_PROGRESS: [],
            CLOSED: []
        };

        data.forEach(ticket => {
            if (ticket.status === 'OPEN') {
                organizedTickets.OPEN.push(ticket);
            } else if (ticket.status === 'IN_PROGRESS') {
                organizedTickets.IN_PROGRESS.push(ticket);
            } else if (ticket.status === 'CLOSED') {
                organizedTickets.CLOSED.push(ticket);
            }
        });

        return organizedTickets;
    };


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

    const makeTicket = (ticket, index, status) => {
        return (
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


                {status}
            </div>
        )
    }

    const makeTicketInProgress = (ticket, index) => {
        const actionButton = (
            <div>
                <button
                    className='action-btn'
                    onClick={(e) => {
                        e.stopPropagation();
                        setPopupText('Ao confirmar, esse ticket será fechado e você não poderá mais enviar mensagens.');
                        setTicketId(ticket.id);
                        setShowClose(true);
                    }}
                >
                    <AiOutlineCheckCircle className="action-icon" />
                </button>
                <ConfirmActions
                    showPopup={showClose}
                    setshowPopup={setShowClose}
                    popupText={popupText}
                    confirmAction={(confirmed) => {
                        if (confirmed) {
                            closeTicket();
                        }
                    }}
                />
            </div>
        );

        return (
            makeTicket(ticket, index, actionButton)
        )
    }

    const makeTicketOpen = (ticket, index) => {

        const actionButton = (
            <div>
                <button
                    className='action-btn'
                    onClick={
                        (e) => {
                            e.stopPropagation();
                            setPopupText('Ao confirmar, esse ticket não estará mais disponível para outros monitores e você estará assumindo a responsabilidade de respondê-lo.');
                            setTicketId(ticket.id);
                            setShowClaim(true);

                            localStorage.setItem("ticketId", ticket.id);
                            localStorage.setItem("ticketStatus", ticket.status);
                        }
                    }

                    aria-describedby='claim'
                >
                    <TfiWrite className="action-icon" />
                </button>
                < ConfirmActions
                    showPopup={showClaim}
                    setshowPopup={setShowClaim}
                    popupText={popupText}
                    confirmAction={(confirmed) => {
                        if (confirmed) {
                            claimTicket()
                            navigate('/chat', { replace: false })
                        } else {
                            console.log('Não confirmou')
                        }
                    }}
                />
            </div>
        )

        return (
            makeTicket(ticket, index, actionButton)
        )
    }

    const makeTicketClosed = (ticket, index) => {
        return (
            makeTicket(ticket, index, 'CLOSED')
        )
    }

    return (
        <div className="lobby-monitor">
            <div className="container">
                < Nav />

                <div className='swap-page'>
                    <button className='button' onClick={() => setWhichTab('myTickets')}>Meus Tickets</button>
                    <button className='button' onClick={() => setWhichTab('newTickets')}>Novos Tickets</button>
                    <button className='button' onClick={() => setWhichTab('closedTickets')}>Tickets Fechados</button>
                </div>

                <FilterMenu updateFilters={setFilters} />
                <button className='reload--btn'>
                    < AiOutlineReload className='reload-icon' onClick={() => handleGetTicket()} />
                </button>

                <div className="Lobby">

                    <div className="ticket-list">

                        {
                            whichTab === 'myTickets' && ticketInfo.IN_PROGRESS !== undefined ? (
                                filterTickets(ticketInfo.IN_PROGRESS, filters).map((ticket, index) => (
                                    makeTicketInProgress(ticket, index)
                                ))
                            ) : (whichTab === 'newTickets' && ticketInfo.OPEN !== undefined ? (
                                filterTickets(ticketInfo.OPEN, filters).map((ticket, index) => (
                                    makeTicketOpen(ticket, index)
                                ))
                            ) : (whichTab === 'closedTickets' && ticketInfo.CLOSED !== undefined ? (
                                filterTickets(ticketInfo.CLOSED, filters).map((ticket, index) => (
                                    makeTicketClosed(ticket, index)
                                ))
                            ) : (
                                <div className="no-tickets">
                                    <h1>Ainda não há tickets!</h1>
                                </div>
                            )))
                        }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default LobbyMonitor;