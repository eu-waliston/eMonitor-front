import React from "react";
import "./Message-Student.scss";

const MessageStudent = (props) => {
    const content = props.content;
    const data = content.props.children
    const isImage = /^data:image\/(jpeg|png|jpg|gif);base64,/.test(data);

    return (
        <div className="message-student-component">
            <div className="message-student-box">
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

export default React.memo(MessageStudent);