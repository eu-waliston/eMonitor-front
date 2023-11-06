import React, { useState } from "react";
import Popup from "reactjs-popup";

// Icons
import { MdReportProblem } from "react-icons/md";

const ReportButton = (ticketId, reportedPersonId) => {

    const URL = ''

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleReport = async (e) => {
        e.preventDefault();

        try {
            await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            })
            
            // Se um número de protocolo for ser exibido:
            /*try {
                const data = await response.json();
            } catch (error) {
                console.log(error);
            }*/
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Popup
            trigger={
                <button className='report--btn' >
                    <MdReportProblem className='back-icon' />
                </button>
            }

            contentStyle={{
                borderRadius: "15px",
                padding: "20px",
                background: "#195f89",
                border: "none",
                fontWeight: "bold",
                minWidth: "330px",
                maxWidth: "400px",
                boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.2)",
            }}

            modal >
            {(close) => (
                <div>
                    <div className="">
                        <form className="ticket--form" onSubmit={null}>

                            <label>Titulo</label>
                            <input
                                type={"text"}
                                id="ds"
                                value={title}
                                onChange={handleTitleChange}
                                required
                            />

                            <label>Descrição:</label>
                            <textarea
                                cols="30"
                                rows="10"
                                id="fs"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            >
                            </textarea>
                        </form>
                    </div>
                    <div className="button-container">
                        <button className="button" onClick={() => handleReport}>Denunciar</button>
                        <button className="button" onClick={close}>Cancelar</button>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default ReportButton;