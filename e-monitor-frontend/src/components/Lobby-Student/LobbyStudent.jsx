import React, { useState } from 'react';
import './LobbyStudent.scss';

import { BsExclamationCircleFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

const LobbyStudent = () => {

    const TOKEN = localStorage.getItem('token');
    const URL = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/get-tickets'

    const [ticketInfo, setTicketInfo] = useState([])

    function handleSendTicket() {
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + TOKEN
            }
        })
            .then(response => response.json())
            .then(data => setTicketInfo(data))
            .catch(error => console.error(error))
    }

    handleSendTicket()

    return (

        <div className="Lobby-student">

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

                <Link to={"/new-ticket"}>
                    <button className="fab-button">+</button>
                </Link>

            </div>

        </div>
    );
}


export default LobbyStudent;
