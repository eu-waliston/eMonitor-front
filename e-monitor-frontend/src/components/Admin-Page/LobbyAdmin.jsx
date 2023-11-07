import './LobbyAdmin.scss';
import { URL } from '../../scripts/scripts';


import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Icons
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { MdOutlinePersonRemove, MdOutlinePlaylistRemove } from "react-icons/md";

function AdminPage() {
    const navigate = useNavigate();

    const URL_Get = URL + '/api/v1/tickets/get-tickets'
    const TOKEN = localStorage.getItem('token');
    const TICKETID = localStorage.getItem('ticketId');

    const [onSolicitacoes, setOnSolicitacoes] = useState(true);
    const [ticketInfo, setTicketInfo] = useState([])

    const [solicitacoes, setSolicitacoes] = useState([]);
    const [denuncias, setDenuncias] = useState([]);

    useEffect(() => {
        handleGetTicket();
        //handleGetSolicitacoes();
        //handleGetDenuncias();
    }, []);

    const handleGetTicket = async () => {
        try {
            const response = await fetch(URL_Get, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                }
            })

            if (response.ok) {
                const data = await response.json();
                setTicketInfo(data)
            } else {
                console.error('Erro na solicitação:', response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="admin-page">
            <h1 className='page--title'>Admin Page</h1>

            <div className='swap-page'>
                <button className='button' onClick={() => setOnSolicitacoes(true)}>Solicitações</button>
                <button className='button' onClick={() => setOnSolicitacoes(false)}>Denuncias</button>
            </div>

            {
                onSolicitacoes ? (
                    ticketInfo.length === 0 ? (
                        <div className="no-tickets">
                            <h1>Ainda não há Solicitações!</h1>
                        </div>
                    ) : (
                        ticketInfo.map((ticket, index) => (
                            <div
                                className="ticket"
                                key={index}
                                onClick={
                                    () => {
                                        localStorage.setItem("ticketId", ticket.id);
                                        navigate('/chat', { replace: false })
                                    }
                                }
                            >
                                <div className="ticket-info">
                                    <h3 className="ticket-title">{ticket.subject}</h3>
                                    <p className="ticket-status">{ticket.topicId}</p>
                                </div>

                                <button
                                    className='action-btn'
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            localStorage.setItem("ticketId", ticket.id);
                                            claimTicket()
                                        }
                                    }

                                    aria-describedby='claim'
                                >
                                    <AiOutlineCheck className='action-icon' />
                                </button>

                                <button
                                    className='action-btn'
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            localStorage.setItem("ticketId", ticket.id);
                                            claimTicket()
                                        }
                                    }

                                    aria-describedby='claim'
                                >
                                    <AiOutlineClose className='action-icon' />
                                </button>

                            </div>
                        ))
                    )
                ) : (
                    ticketInfo.length === 0 ? (
                        <div className="no-tickets">
                            <h1>Ainda não há Solicitações!</h1>
                        </div>
                    ) : (
                        ticketInfo.map((ticket, index) => (
                            <div
                                className="ticket"
                                key={index}
                                onClick={
                                    () => {
                                        localStorage.setItem("ticketId", ticket.id);
                                        navigate('/chat', { replace: false })
                                    }
                                }
                            >
                                <div className="ticket-info">
                                    <h3 className="ticket-title">{ticket.subject}</h3>
                                    <p className="ticket-status">{ticket.topicId}</p>
                                </div>
    
                                <button
                                    className='action-btn'
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            localStorage.setItem("ticketId", ticket.id);
                                            claimTicket()
                                        }
                                    }
    
                                    aria-describedby='claim'
                                >
                                    <MdOutlinePersonRemove className='action-icon' />
                                </button>
    
                                <button
                                    className='action-btn'
                                    onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            localStorage.setItem("ticketId", ticket.id);
                                            claimTicket()
                                        }
                                    }
    
                                    aria-describedby='claim'
                                >
                                    <MdOutlinePlaylistRemove className='action-icon' />
                                </button>
    
                            </div>
                        ))
                    )
                )
            }
        </div>
    )
}

export default AdminPage;
