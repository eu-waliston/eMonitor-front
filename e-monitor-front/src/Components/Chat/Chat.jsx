import React from "react";
import "./Chat.css";
import Nav from "../Nav/Nav"

//Icons
import { AiOutlineSend } from "react-icons/ai";
import { BsFiles } from "react-icons/bs";

const Chat = () => {
    return (
        <div className="chat-component">
            <Nav />
            <div className="chat--window">
                <div className="chat"></div>
                <div className="caht--option">
                    <BsFiles className="icon-clip"/>
                    <input type="search" className="input-text"/>
                    <button className="icon-send">
                    <AiOutlineSend  className="ic"/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat;