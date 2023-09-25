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
                setTicketInfo(data)
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
                {/* ToDo: Mudar o ícone e colocar no lugar certinho */}
                <div className="header">
                    <button
                        className='btn-reload'
                        onClick={handleGetTicket}
                    >
                        <AiOutlineSend className="icon-send" />
                    </button>
                </div>
                <div className="Lobby">

                    <div className="ticket-list">
                        {ticketInfo.map((ticket, index) => (
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

                                <div className='actionButtons'>
                                    {/* ToDo: Trocar o ícone e pensar sobre onde os 2 botões vão ficar */}
                                    <button
                                        className='claim-ticket'
                                        onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                localStorage.setItem("ticketId", ticket.id);
                                                claimTicket()
                                            }
                                        }
                                    >
                                        <AiOutlineSend className="icon-send" />
                                    </button>
                                    <button
                                        className='close-ticket'
                                        onClick={
                                            (e) => {
                                                e.stopPropagation();
                                                localStorage.setItem("ticketId", ticket.id);
                                                closeTicket()
                                            }
                                        }
                                    >
                                        <AiOutlineSend className="icon-send" />
                                    </button>
                                </div>
                                {/*ToDo: trocar por um número */}
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