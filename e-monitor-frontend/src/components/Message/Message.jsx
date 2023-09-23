import React from "react";
import "./Message.scss";

const Message = () => {
    return (
        <div className="message-component">
            <div className="message--box">
                <div className="message--content">
                    <p className="message--text">Olá, eu sou o bot da E-Monitor, como posso te ajudar?</p>
                </div>
            </div>
        </div>
    )
}

export default Message;