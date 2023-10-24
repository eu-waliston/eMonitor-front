import React from "react";
import "./Message-Student.scss";

const MessageStudent = (props) => {
    const content = props.content;
    const isImage = typeof content === "string" && content.startsWith("data:image");

    return (
        <div className="message-student-component">
            <div className="message-student-box">
                {isImage ? (
                    <img src={content} alt="Image Preview" />
                ) : (
                    //<img src={content} alt="Image Preview" />
                    <p className="message-monitor-text">{content}</p>
                )}
            </div>
        </div>
    )
}

export default MessageStudent;