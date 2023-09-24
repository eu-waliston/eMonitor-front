import React, { useState, useEffect } from 'react';
import "./Chat.scss";
import Nav from "../Nav/Nav"
import Message from "../Message/Message";

//Icons
import { AiOutlineSend } from "react-icons/ai";
import { BsFiles } from "react-icons/bs";

const Chat = () => {

    const URL_Insert = "https://emonitor-tsa0.onrender.com/api/v1/tickets/insert-message"
    const URL_Get = "https://emonitor-tsa0.onrender.com/api/v1/tickets/get-messages"
    const TicketID = localStorage.getItem("ticketId");
    const TOKEN = localStorage.getItem('token');

    const [message, setMessage] = useState("");

    useEffect(() => {
        handleGetMessages();
    }, []);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(URL_Insert, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + TOKEN
                },
                body: JSON.stringify({
                    content: message,
                    ticketId: parseInt(TicketID, 10)
                }),
            })

            setMessage("");
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    }

    const handleGetMessages = async () => {
        try {
            const response = await fetch(`${URL_Get}?TicketID=${parseInt(TicketID, 10)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + TOKEN
                }
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data)
            } else {
                console.error('Erro ao receber mensagem:', response.status);
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