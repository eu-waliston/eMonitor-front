import "./Chat.scss";

import React, { useState, useEffect } from 'react';
import Linkify from 'react-linkify';

// Components
import Nav from "../Nav/Nav"
import MessageStudent from "../Message-Student/Message-Student";
import MessageMonitor from "../Message-Monitor/Message-Monitor";

// Icons
import { AiOutlineSend, AiOutlinePaperClip } from "react-icons/ai";
import { FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Chat = () => {

    const navigation = useNavigate();

    const insertMessage_URL = "https://emonitor-tsa0.onrender.com/api/v1/tickets/insert-message"
    const getmessages_URL = "https://emonitor-tsa0.onrender.com/api/v1/tickets/get-messages"
    const token = localStorage.getItem('token');
    const ticketId = localStorage.getItem('ticketId');
    const role = localStorage.getItem('role');

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [messageSenderId, setSenderId] = useState(0);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
        handleGetMessages();
    }, []);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleAttachmentChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            setAttachment(event.target.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        try {
            await fetch(insertMessage_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                },
                body: JSON.stringify({
                    content: message,
                    attachments: [attachment],
                    ticketId: ticketId
                }),
            });

            setMessage("");
            setAttachment("");
            handleGetMessages();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        }
    };

    const handleGetMessages = async () => {
        try {
            const response = await fetch(`${getmessages_URL}?ticketId=${ticketId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
                setSenderId(data[0].senderId)
            } else {
                console.error('response !=== ok', response.status);
            }
        } catch (error) {
            console.error('Erro ao receber mensagem:', error);
        }
    }

    const handleClickHome = () => {
        navigation("/lobby-"+role.toLowerCase());
    }

    const renderMessagesStudent = (message) => {
        var data
        if(message.content === ""){
            data = message.attachments[0]
        } else {
            data = message.content
        }

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

    function renderMessagesMonitor(message) {
        var data
        if(message.content === ""){
            data = message.attachments[0]
        } else {
            data = message.content
        }

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
                {
                    // ToDo: Arrumar o ícone e a posição  do botão.
                    attachment && (
                        <div className="attachment--container">
                            <button className="attachment--close" onClick={() => setAttachment("")}>
                                X
                            </button>
                            <div className="attachment">
                                <img
                                    src={attachment}
                                    alt="Attachment Preview"
                                    className="attachment-preview"
                                />
                            </div>
                        </div>
                    )
                }
                <form className="chat--form" onSubmit={handleSendMessage}>
                    <div className="chat--option">
                        <label htmlFor="attachmentInput">
                            <AiOutlinePaperClip className="icon-clip" />
                        </label>

                        <input
                            type="file"
                            id="attachmentInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleAttachmentChange}
                        />

                        <input
                            type="search"
                            className="input-text"
                            value={message}
                            onChange={handleMessageChange}
                            {
                                ...(!attachment && { required: true })
                            }
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