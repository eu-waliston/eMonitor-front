import React, { useState } from "react";
import "./Ticket.css";
import Nav from "../Nav/Nav"
import { Link } from "react-router-dom";

const Ticket = () => {
    //TODO --- função para pegar as infromações do FORM e passar como uma PROP para o component de chat
    const [content, setContent] = useState([])
    
    function setTicketInfo(num, name) {

    }
    return (
        <div className="ticket--component">
            <Nav />

            <div className="ticket--section">
                <div className="ticket--info">
                        
                </div>
                <div >
                    <form  className="ticekt--form">
                        <label>Titulo</label>
                        <input type="text" />

                        <label>Descrição:</label>
                        <textarea cols="30" rows="10"></textarea>

                        <div className="controls">
                            <Link to={"/chat"} className="back--icon send">Enviar</Link>
                            <Link to={"/new-ticket"} className="back--icon return">Cancelar</Link>
                        </div>
                    </form>



                </div>
            </div>
        </div>
    )
}

export default Ticket;