import React, { useState, useEffect } from 'react';
import './LobbyMonitor.scss';

import { AiOutlineReload, AiOutlineCheckCircle } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { BsExclamationCircleFill } from "react-icons/bs"
import Nav from '../Nav/Nav';

const LobbyMonitor = () => {
    const navigate = useNavigate();
    const URL_Get = 'http://emonitor.inf.ufsm.br/api/v1/tickets/get-tickets'
    const URL_Claim = 'http://emonitor.inf.ufsm.br/api/v1/tickets/claim-ticket';
    const URL_Close = 'http://emonitor.inf.ufsm.br/api/v1/tickets/close-ticket';
    const TOKEN = localStorage.getItem('token');
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

    const claimTicket = async () => {
        try {
            fetch(`${URL_Claim}?ticketId=${TICKETID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
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
            fetch(`${URL_Close}?ticketId=${TICKETID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
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
                                        <div className="ticket-info">
                                            <h3 className="ticket-title">{ticket.subject}</h3>
                                            <p className="ticket-status">{ticket.topicId}</p>
                                        </div>
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