import React from "react";
import "./Message-Monitor.scss";

const MessageMonitor = (props) => {
    const content = props.content;
    const data = content.props.children
    const isImage = /^data:image\/(jpeg|png|jpg|gif);base64,/.test(data);

    return (
        <div className="message-monitor-container">
            <div className="message-monitor-box">
                {isImage ? (
                    <img
                        className="attachment"
                        src={data}
                        alt="Image Preview"
                    />
                ) : (
                    <p>{content}</p>
                )}
            </div>
        </div>
    )
}

export default React.memo(MessageMonitor);