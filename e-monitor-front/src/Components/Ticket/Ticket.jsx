import React from "react";
import "./Ticket.css";
import Nav from "../Nav/Nav"
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom";

const Ticket = () => {
    return (
        <div className="ticket--component">
            <Nav />

            <div className="ticket--section">
                <div className="ticket--info"></div>
                <div className="ticekt--form">
                    <label>Titulo</label>
                    <input type="text" />

                    <label>Descrição:</label>
                    <textarea cols="30" rows="10"></textarea>
                    <div className="controls">
                        <Link to={"/chat"} className="back--icon">Enviar</Link>
                        <Link to={"/new-ticket"} className="back--icon">Cancelar</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Ticket;