import React, { useState, useEffect } from 'react';
import './LobbyMonitor.scss';

import { AiOutlineReload, AiOutlineCheckCircle } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { BsExclamationCircleFill } from "react-icons/bs"
import Nav from '../Nav/Nav';
import { BiRefresh } from 'react-icons/bi';

const LobbyMonitor = () => {
    const navigate = useNavigate();
    const TOKEN = localStorage.getItem('token');
    const URL_Get = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/get-tickets'
    const URL_Claim = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/claim-ticket';
    const URL_Close = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/close-ticket';
    const TICKETID = localStorage.getItem('ticketId');

    const [ticketInfo, setTicketInfo] = useState([])

    useEffect(() => {
        handleGetTicket();
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
                const sortedTickets = [...data].sort((a, b) => {
                    if (a.status === 'OPEN') return -1;
                    if (a.status === 'IN_PROGRESS' && b.status !== 'OPEN') return -1;
                    return 1;
                });
                setTicketInfo(sortedTickets)
            } else {
                console.error('Erro na solicitação:', response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }

    {/* EStá dando 403 
        ToDo: mudar a url para ficar igual a do get-messages, tirar o body*/}
    const claimTicket = async () => {
        try {
            fetch(`${URL_Claim}?ticketId=${TICKETID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
            })

            handleGetTicket();                                                                                                                                                                                     
        } catch (error) {
            console.error(error)
        }
    }

    const closeTicket = async () => {
        try {
            fetch(`${URL_Close}?ticketId=${TICKETID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
            })

            handleGetTicket();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="lobby-monitor">
            <div className="container">
                < Nav />
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

                                        {/*<img src={ticket.userImage} alt="User" id='user-img' />*/}
                                        <div className="ticket-info">
                                            <h3 className="ticket-title">{ticket.subject}</h3>
                                            <div className="ticket-date">
                                                {/*new Date(ticket.date).toLocaleDateString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit'
                                            })*/}
                                            </div>
                                        </div>
                                        {/* ToDo: Trocar o ícone e pensar sobre onde os 2 botões vão ficar */}
                                        {
                                            ticket.status === "OPEN" ? (
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
                                                    <TfiWrite className="action-icon" />
                                                </button>
                                            ) : (
                                                ticket.status === "IN_PROGRESS" ? (
                                                    <button
                                                        className='action-btn'
                                                        onClick={
                                                            (e) => {
                                                                e.stopPropagation();
                                                                localStorage.setItem("ticketId", ticket.id);
                                                                closeTicket()
                                                            }
                                                        }
                                                    >
                                                        <AiOutlineCheckCircle className="action-icon" />
                                                    </button>
                                                ) : (
                                                    'CLOSED'
                                                )
                                            )
                                        }

                                        {/*ToDo: trocar por um número */}
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