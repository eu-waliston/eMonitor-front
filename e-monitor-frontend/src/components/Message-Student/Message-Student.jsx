import React from "react";
import "./Message-Student.scss";

const MessageStudent = (props) => {
    return (
        <div className="message-student-component">
            <div className="message-student-box">
                {/*<div className="message--content">*/}
                    <p className="message-student-text">{props.content}</p>
                {/*</div>*/}
            </div>
        </div>
    )
}

export default MessageStudent;