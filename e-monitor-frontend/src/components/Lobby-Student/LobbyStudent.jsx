import React, { useState, useEffect } from 'react';
import './LobbyStudent.scss';

import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsExclamationCircleFill } from "react-icons/bs"
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

const LobbyStudent = () => {
    const navigate = useNavigate();
    const TOKEN = localStorage.getItem('token');
    const URL = 'https://emonitor-tsa0.onrender.com/api/v1/tickets/get-tickets'
    const TICKETID = localStorage.getItem('ticketId');

    const [ticketInfo, setTicketInfo] = useState([])
    const [title, setTitle] = useState("");
    const [isRenaming, setIsRenaming] = useState(false);
    const [renamingTicketId, setRenamingTicketId] = useState(null);

    useEffect(() => {
        handleGetTicket();
    }, []);

    const handleGetTicket = async () => {
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

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const renameTicket = async () => {
        try {
            await fetch(`https://emonitor-tsa0.onrender.com/api/v1/tickets/rename-ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
                body: JSON.stringify({
                    id: TICKETID,
                    newSubject: title
                }),
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (

        <div className="Lobby-student">

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
                                    <h1 >Ainda não há tickets!</h1>
                                </div>
                            ) : (
                                ticketInfo.map((ticket, index) => (
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
                                            {
                                                isRenaming && renamingTicketId === ticket.id ? (
                                                    <input 
                                                        className="input-title"
                                                        type="text" 
                                                        placeholder= {ticket.subject}
                                                        value={title} 
                                                        onChange={handleTitleChange}
                                                        onBlur={() => {
                                                            setIsRenaming(false);
                                                            setRenamingTicketId(null);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                renameTicket();
                                                                setIsRenaming(false);
                                                            }
                                                        }}
                                                        onClick={(e) => { e.stopPropagation()}}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <h3 className="ticket-title">{ticket.subject}</h3>
                                                )
                                            }
                                            
                                            <div className="ticket-date">
                                            {/*new Date(ticket.date).toLocaleDateString('pt-BR', {
                                                day: '2-digit',
                                                month: '2-digit'
                                            })*/}
                                            </div>
                                        </div>

                                        <button
                                            className='action-btn'
                                            onClick={
                                                (e) => {
                                                    //localStorage.setItem("ticketId", ticket.id);
                                                    setRenamingTicketId(ticket.id);
                                                    setTitle("");
                                                    e.stopPropagation();
                                                    setIsRenaming(true);
                                                }
                                            }

                                            aria-describedby='claim'
                                        >
                                            <BiSolidEdit className="action-icon" />
                                        </button>

                                        <div className="ticket-read-icon">
                                            {ticket.status === "OPEN" ? <BsExclamationCircleFill className='exclamation-icons' /> : ""}
                                        </div>

                                    </div>
                                ))
                            )}
                    </div>

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