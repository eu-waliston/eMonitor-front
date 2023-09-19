import React, {useState} from 'react';
import './Lobby-User.css';

import { BsExclamationCircleFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

function Lobby() {
    //const TOKEN = localStorage.getItem('token');
    const TOKEN2 = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhIiwiaWF0IjoxNjk1MDg5NzQ3LCJleHAiOjE2OTUxMzI5NDd9.x-oDeSaBqSfawSFnWyAutgdI6ErEzlL4VBb_vdCP5OY"
    const URL = 'https://emonitor-tsa0.onrender.com/get-tickets'
    const [ticketInfo, setTicketInfo] = useState({})

    function handleSendTicket() {
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN2
            }
        })
            .then(response => response.json())
            .then(data => setTicketInfo(data))
            .catch(error => console.error(error))
    }

    handleSendTicket()

    return (

        <div className="Lobby-m">
            < Nav />
            <div className="Lobby">
                <div className="ticket-list">
                    {dummyTickets.map((ticket, index) => (
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
                                {ticket.status == "CLOSE" ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
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

const dummyTickets = [
    {
        id: 1,
        subject: "titleTest",
        topicId: null,
        studentCreatorId: 27,
        assignedMonitorId: 2,
        status: "OPEN",
        users: []
    },
    {
        id: 1,
        subject: "titleTest",
        topicId: null,
        studentCreatorId: 27,
        assignedMonitorId: 2,
        status: "OPEN",
        users: []
    },
    {
        id: 1,
        subject: "titleTest",
        topicId: null,
        studentCreatorId: 27,
        assignedMonitorId: 2,
        status: "OPEN",
        users: []
    }
    // ... Add more dummy tickets
];

export default Lobby;
