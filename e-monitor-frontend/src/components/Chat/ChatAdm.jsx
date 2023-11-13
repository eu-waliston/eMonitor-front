import "./Chat.scss";
import "../ReportButton/ReportButton.scss";
import { URL } from '../../scripts/scripts';

import React, { useState, useEffect, useRef } from 'react';
import Linkify from 'react-linkify';

// Components
import Nav from "../Nav/Nav"
import MessageStudent from "../Message-Student/Message-Student";
import MessageMonitor from "../Message-Monitor/Message-Monitor";
import ReportButton from "../ReportButton/ReportButton";

// Icons
import { AiOutlineSend, AiOutlinePaperClip } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Chat = () => {
    const navigation = useNavigate();

    const URL_GetMessages = URL + '/api/v1/tickets/get-messages'
    const token = localStorage.getItem('token');
    const ticketId = localStorage.getItem('ticketId');
    const role = localStorage.getItem('role');
    const authorId = localStorage.getItem('authorId');

    const [messages, setMessages] = useState([]);
    const [messageSenderId, setSenderId] = useState(null);
    
    const [leftLabel,  setLeftLabel] = useState("Monitor: ");
    const [rightLabel, setRightLabel] = useState("Estudante: ");

    useEffect(() => {
        handleGetMessages();
    }, []);

    useEffect(() => {
        if (messageSenderId !== null) {
            if (messageSenderId === parseInt(authorId)) {
                setLeftLabel("Monitor: Denunciado");
                setRightLabel("Estudante: Denunciante");
            } else {
                setLeftLabel("Monitor: Denunciante");
                setRightLabel("Estudante: Denunciado");
            }
        }
    }, [messageSenderId, authorId]);
    

    const handleGetMessages = async () => {
        try {
            const response = await fetch(`${URL_GetMessages}?ticketId=${ticketId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })

            try {
                const data = await response.json();
                setMessages(data);
                setSenderId(data[0].senderId);
            } catch (error) {
                console.error('Erro ao receber mensagem:', error);
            }
        } catch (error) {
            console.error('Erro ao receber mensagem:', error);
        }
    }

    const handleClickHome = () => {
        navigation("/lobby-admin");
    }

    const renderMessagesStudent = (message) => {
        if (message.attachments[0] === undefined) message.attachments[0] = "";

        if (message.content !== "" && message.attachments[0] !== "") {
            return <div>
                {makeMessagesStudent(message, message.attachments[0])}
                {makeMessagesStudent(message, message.content)}
            </div>
        } else if (message.content !== "" && message.attachments[0] === "") {
            return makeMessagesStudent(message, message.content)
        } else if (message.content === "" && message.attachments[0] !== "") {
            return makeMessagesStudent(message, message.attachments[0])
        }
    }

    const makeMessagesStudent = (message, data) => {
        if (message.senderId === messageSenderId) {
            return <MessageStudent
                key={message.id}
                content={
                    <Linkify>{data}</Linkify>
                }
            />
        } else {
            return <MessageMonitor
                key={message.id}
                content={
                    <Linkify>{data}</Linkify>
                }
            />
        }
    }

    const renderMessagesMonitor = (message) => {
        if (message.attachments[0] === undefined) message.attachments[0] = "";

        if (message.content !== "" && message.attachments[0] !== "") {
            return <div>
                {makeMessagesMonitor(message, message.attachments[0])}
                {makeMessagesMonitor(message, message.content)}
            </div>
        } else if (message.content !== "" && message.attachments[0] === "") {
            return makeMessagesMonitor(message, message.content)
        } else if (message.content === "" && message.attachments[0] !== "") {
            return makeMessagesMonitor(message, message.attachments[0])
        }
    }

    function makeMessagesMonitor(message, data) {
        if (message.senderId === messageSenderId) {
            return <MessageMonitor
                key={message.id}
                content={
                    <Linkify>{data}</Linkify>
                }
            />
        } else {
            return <MessageStudent
                key={message.id}
                content={
                    <Linkify>{data}</Linkify>
                }
            />
        }
    }

    return (
        <div className="chat-component">

            <Nav />
            <button className='left-label'  >
                <p className="left-string">{leftLabel}</p>
            </button>
            <button className='right-label'  >
                <p className="right-string">{rightLabel}</p>
            </button>
            <button className='back--btn' onClick={() => handleClickHome()} >
                < FaHome className='back-icon' />
            </button>

            <div className="chat--window">
                <div className="chat">
                    {
                        messages.map((message) => (
                            role === "MONITOR" ? (
                                renderMessagesMonitor(message)
                            ) : (
                                renderMessagesStudent(message)
                            )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat;