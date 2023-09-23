import React, { useState, useEffect } from 'react';
import './LobbyStudent.scss';

import { BsExclamationCircleFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

const LobbyStudent = () => {
    const TOKEN = localStorage.getItem('token');
    const ROLE = localStorage.getItem('role');
    const URL = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/get-tickets'

    const [ticketInfo, setTicketInfo] = useState([])

    useEffect(() => {
        handleGetTicket();
    }, []);

    const handleGetTicket = async () => {
        console.log("handleGetTicket");
        try {
            const response = await fetch(URL, {
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

        <div className="Lobby-student">
            
            <div className="container">
            < Nav />

            <div className="Lobby">

                <div className="ticket-list">
                    {ticketInfo.map((ticket, index) => (
                        <div className="ticket" key={index}>

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

                            <div className="ticket-read-icon">
                                {ticket.status === "OPEN" ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
                            </div>

                        </div>
                    ))}
                </div>

                {/* Caso esse componente venha a ser usado para monitor e student no futuro
                    basta descomentar e então o FAB só aparecerá para o student
                {ROLE === "STUDENT" && (*/}
                <Link to={"/ticket-subject-choice"}>
                    <button className="fab-button">+</button>
                </Link>
                {/*)}*/}

            </div>
            </div>

        </div>
    );
}


export default LobbyStudent;
