import React from "react";
import "./Message-Student.scss";

const Message = (content) => {
    return (
        <div className="message-component">
            <div className="message--box">
                <div className="message--content">
                    <p className="message--text">${content}</p>
                </div>
            </div>
        </div>
    )
}

export default Message;