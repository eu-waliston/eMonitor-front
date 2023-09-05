import React from 'react';
import './Lobby-Monitor.css';

import { BsExclamationCircleFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

function Lobby() {

    return (
        <div className="page">
            < Nav />
            <div className="Lobby">
                <div className="ticket-list">
                    {dummyTickets.map((ticket, index) => (
                        <div className="ticket" key={index}>
                            <img src={ticket.userImage} alt="User" id='user-img' />
                            <div className="ticket-info">
                                <h3 className="ticket-title">{ticket.title}</h3>
                                <div className="ticket-date">
                                    {new Date(ticket.date).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit'
                                    })}
                                </div>
                            </div>
                            <div className="ticket-read-icon">
                                {ticket.read ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

const dummyTickets = [
    {
        userImage: './Images/user-03.png',
        title: 'Título1',
        date: '2023-08-28',
        read: true,
    },
    {
        userImage: './Images/user-01.png',
        title: 'Título2',
        date: '2023-08-27',
        read: false,
    },
    // ... Add more dummy tickets
];

export default Lobby;