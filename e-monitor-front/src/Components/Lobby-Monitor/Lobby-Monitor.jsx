import React, { useState, useEffect } from 'react';
import './Lobby-Monitor.css';

import { BsExclamationCircleFill } from "react-icons/bs"
import Nav from '../Nav/Nav';
import axios from 'axios';

const URL = "https://emonitor-tsa0.onrender.com/get-tickets"
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNYWtpYXZlbGlrb0BnbWFpbC5jb20iLCJpYXQiOjE2OTQ3MzMyMzEsImV4cCI6MTY5NDc3NjQzMX0.3ZoANSTe3eiFpVeMU5BgopHNOAGYX-X27tP0CIsEBxk";

const Lobby = () => {

    axios({
        method: 'get',
        url: URL,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': TOKEN
        }
    }).then(function (response) {
        let data = response.data
        data.forEach(element => {
            console.log(element)
        });
    });


    
    return (

        <div className="Lobby-m">
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
                                {/*TODO: trocar por um número */}
                                <div className="ticket-read-icon">
                                    {ticket.read ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
                                </div>
                            </div>
                        ))}
                    </div>
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