import React, { useState, useEffect } from 'react';
import './LobbyMonitor.scss';

import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsExclamationCircleFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

const LobbyMonitor = () => {
    const navigate = useNavigate();
    const TOKEN = localStorage.getItem('token');
    const URL_Get = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/get-tickets'
    const URL_Claim = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/claim-ticket';
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
                setTicketInfo(data)
            } else {
                console.error('Erro na solicitação:', response.status);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const claimTicket = async (ticketId) => {
        try {
            fetch(URL_Claim, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
                body: JSON.stringify({
                    ticketId: TICKETID
                }),
        })
        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className="lobby-monitor">
            <div className="container">
                < Nav />

                <div className="Lobby">

                    <div className="ticket-list">
                        {ticketInfo.map((ticket, index) => (
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

                                <div className='actionButtons'>
                                    <button
                                        className='claim-ticket'
                                        onClick={
                                            () => {claimTicket(ticket.id)}
                                        }
                                    >
                                        <AiOutlineSend className="icon-send" />
                                    </button>
                                </div>
                                {/*TODO: trocar por um número */}
                                <div className="ticket-read-icon">
                                    {ticket.status === "OPEN" ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
                                </div>

                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
}

export default LobbyMonitor;