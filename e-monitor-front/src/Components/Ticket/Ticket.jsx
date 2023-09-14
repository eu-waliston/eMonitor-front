import React, { useState } from "react";
import "./Ticket.css";
import Nav from "../Nav/Nav"
import { Link, useNavigate } from "react-router-dom";

const Ticket = () => {

    const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXJ1dG8xX3V6dWNyYWNraUBnbWFpbC5jb20iLCJpYXQiOjE2OTQ3MTU1OTYsImV4cCI6MTY5NDc1ODc5Nn0.vuw7sDFyPrmCnhXYl5gDeTDGdFzoh-rM6PbkoNdSzJQ"

    const navigate = useNavigate();
    const [optionName, setOptionName] = useState("");
    const [title, setTitle] = useState(""); // Estado para o título
    const [description, setDescription] = useState(""); // Estado para a descrição


    React.useEffect(() => {
        if (localStorage.getItem("TAG")) {
            setOptionName(localStorage.getItem("TAG"))
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title,
            description,
        };

        console.log("Dados a serem enviados:", data);
        setTimeout(() => {
            navigate('/chat', { replace: true });
        }, 2000);
    };


    function handleSendTicket() {
        fetch('https://emonitor-tsa0.onrender.com/insert-ticket', {
            method: 'POST',
            body: JSON.stringify({
                subject: title,
                content: description
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': TOKEN
            }
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error))
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
                    <form className="ticekt--form" onSubmit={handleSubmit}>

                        <label>Titulo</label>
                        <input type={"text"} id="ds" value={title}
                            onChange={(e) => setTitle(e.target.value)} />

                        <label>Descrição:</label>
                        <textarea cols="30" rows="10" id="fs" value={description}
                            onChange={(e) => setDescription(e.target.value)}></textarea>

                        <div className="controls">
                            <button type="submit" className="back--icon send" onClick={() => handleSendTicket()}>
                                Enviar
                            </button>
                            {/* TODO: "Certeza que quer cancelar?" - (Pop-Up)*/}
                            <Link to={"/new-ticket"} className="back--icon return">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Ticket;