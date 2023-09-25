import React, { useState, useEffect } from 'react';
import "./Chat.scss";
import Nav from "../Nav/Nav"
import MessageStudent from "../Message-Student/Message-Student";
import MessageMonitor from "../Message-Monitor/Message-Monitor";

//Icons
import { AiOutlineSend } from "react-icons/ai";
import { BsFiles } from "react-icons/bs";

const Chat = () => {

    const URL_Insert = "https://emonitor-tsa0.onrender.com/api/v1/tickets/insert-message"
    const URL_Get = "https://emonitor-tsa0.onrender.com/api/v1/tickets/get-messages"
    const TICKETID = parseInt(localStorage.getItem("ticketId"), 10);
    const TOKEN = localStorage.getItem('token');

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageSenderId, setSenderId] = useState(0);

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

                {/* A primeira mensagem é sempre do aluno, então o senderId da primeira mensagem representa o aluno. */}
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

    return (
        <div className="chat-component">
            <Nav />
            <div className="chat--window">
                <div className="chat">

                    {messages.map((message, index) => (
                        message.senderId === messageSenderId ? (
                            <MessageStudent
                                key={index}
                                content={message.content}
                            />
                        ) : (
                            <MessageMonitor
                                key={index}
                                content={message.content}
                            />
                        )
                    ))}
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