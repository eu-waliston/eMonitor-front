import React from "react";
import "./Message-Monitor.scss";

const MessageMonitor = (props) => {
    return (
        <div className="message-component">
            <div className="message--box">
                    <p className="message--text">{props.content}</p>
            </div>
        </div>
    )
}

export default MessageMonitor;