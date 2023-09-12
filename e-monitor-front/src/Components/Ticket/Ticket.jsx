import React from "react";
import "./Ticket.css";
import Nav from "../Nav/Nav"
import { Link } from "react-router-dom";

const Ticket = () => {
    const [ optionName, setOptionName] = React.useState("");

    React.useEffect(() => {
        if(localStorage.getItem("TAG")) {
            setOptionName(localStorage.getItem("TAG"))
        }
    }, [])

    let URL = "https://emonitor-tsa0.onrender.com/insert-ticket"

    const handleSubmit = (title, content) => {

    }

    return (
        <div className="ticket--component">
            <Nav />

            <div className="ticket--section">
                
                <div className="ticket--info">
                    <img src={`./Icons/${optionName}.png`} alt="Icone da disciplina" />
                    <p className="ticekt-p">{optionName}</p>   
                </div>
                <div >
                    <form  className="ticekt--form" onChange={handleSubmit}>
                        <label>Titulo</label>
                        <input type="text" id="ds"/>

                        <label>Descrição:</label>
                        <textarea cols="30" rows="10" id="fs"></textarea>

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