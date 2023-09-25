import React from "react";
import "./Message-Student.scss";

const MessageStudent = (props) => {
    return (
        <div className="message-component">
            <div className="message--box">
                {/*<div className="message--content">*/}
                    <p className="message--text">{props.content}</p>
                {/*</div>*/}
            </div>
        </div>
    )
}

export default MessageStudent;