import React from "react";
import "./Chat.scss";
import Nav from "../Nav/Nav"
import Message from "../Message/Message";

//Icons
import { AiOutlineSend } from "react-icons/ai";
import { BsFiles } from "react-icons/bs";

const Chat = () => {
    return (
        <div className="chat-component">
            <Nav />
            <div className="chat--window">
                <div className="chat">
                    
                </div>
                <div className="chat--option">
                    <BsFiles className="icon-clip"/>
                    <input type="search" className="input-text"/>
                    <button className="send-button">
                    <AiOutlineSend  className="icon-send"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;