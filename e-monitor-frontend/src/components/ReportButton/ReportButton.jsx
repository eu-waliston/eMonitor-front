import React, { useState } from "react";
import Popup from "reactjs-popup";

// Components
import { URL } from '../../scripts/scripts';

// Icons
import { MdReportProblem } from "react-icons/md";

const ReportButton = (props) => {

    const URL_ReportTicket = URL + '/api/v1/tickets/report-ticket'

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleReport = async (e, close) => {
        e.preventDefault();

        try {
            await fetch(URL_ReportTicket, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({
                    ticketId: props.ticketId,
                    context: description,
                    title: title
                })
            })

            close();
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
                background: "#fff",
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
                            <h2>Criar denúncia</h2>
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
                        <button className="button" onClick={(e) => handleReport(e, close)}>Denunciar</button>
                        <button className="button" onClick={close}>Cancelar</button>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default ReportButton;