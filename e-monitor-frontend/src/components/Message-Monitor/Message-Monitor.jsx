import React from "react";
import "./Message-Monitor.scss";

const MessageMonitor = (props) => {
    return (
        <div className="message-monitor-container">
            <div className="message-monitor-box">
                    <p className="message-monitor-text">{props.content}</p>
            </div>
        </div>
    )
}

export default MessageMonitor;