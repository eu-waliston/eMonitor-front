import React, { useState, useEffect } from 'react';
import "./Chat.scss";
import Nav from "../Nav/Nav"
import MessageStudent from "../Message-Student/Message-Student";
import MessageMonitor from "../Message-Monitor/Message-Monitor";

//Icons
import { AiOutlineSend } from "react-icons/ai";
import { BsFiles } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Chat = () => {

    const URL_Insert = "https://emonitor-tsa0.onrender.com/api/v1/tickets/insert-message"
    const URL_Get = "https://emonitor-tsa0.onrender.com/api/v1/tickets/get-messages"
    const TICKETID = parseInt(localStorage.getItem("ticketId"), 10);
    const TOKEN = localStorage.getItem('token');
    const ROLE = localStorage.getItem('role');

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageSenderId, setSenderId] = useState(0);

    const navigation = useNavigate();

    useEffect(() => {
        handleGetMessages();
    }, []);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            await fetch(URL_Insert, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
                body: JSON.stringify({
                    content: message,
                    ticketId: TICKETID
                }),
            })

            setMessage("");
            handleGetMessages();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }

    const handleGetMessages = async () => {
        try {
            const response = await fetch(`${URL_Get}?ticketId=${TICKETID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + TOKEN
                }
            })

            if (response.ok) {
                const data = await response.json();
                setMessages(data);

                {/* A primeira mensagem é sempre do aluno, então o senderId da primeira mensagem representa o aluno. */ }

                if (data.length > 0) {
                    setSenderId(data[1].senderId);
                }
            } else {
                console.error('response !=== ok', response.status);
            }
        } catch (error) {
            console.error('Erro ao receber mensagem:', error);
        }
    }

    const handleClick = () => {
        if(ROLE === "MONITOR") {
            navigation("/lobby-monitor")
        } else if(ROLE === "STUDENT") {
            navigation("/lobby-student")
        }
    }

    return (
        <div className="chat-component">
            <Nav />
            <button className='back--btn'>
                < FaHome className='back-icon' onClick={() => handleClick()} />
            </button>
            <div className="chat--window">
                <div className="chat">
                    {
                        messages.map((message) => (
                            ROLE === "STUDENT" ? (
                                message.senderId === messageSenderId ? (
                                    <MessageMonitor
                                        key={message.id}
                                        content={message.content}
                                    />
                                ) : (
                                    <MessageStudent
                                        key={message.id}
                                        content={message.content}
                                    />
                                )
                            ) : (
                                message.senderId === messageSenderId ? (
                                    <MessageStudent
                                        key={message.id}
                                        content={message.content}
                                    />
                                ) : (
                                    <MessageMonitor
                                        key={message.id}
                                        content={message.content}
                                    />
                                )
                            )
                        ))
                    }
                </div>

                <form className="chat--form" onSubmit={handleSendMessage}>
                    <div className="chat--option">
                        <BsFiles className="icon-clip" />
                        <input
                            type="search"
                            className="input-text"
                            value={message}
                            onChange={handleMessageChange}
                            required
                        />
                        <button
                            className="send-button"
                            type="submit"
                        >
                            <AiOutlineSend className="icon-send" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chat;