import React, { useState } from "react";
import "./Ticket.css";
import Nav from "../Nav/Nav"
import { Link } from "react-router-dom";

const Ticket = () => {
    const TOKEN = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXJ1dG9fdXp1Y3JhY2tpQGdtYWlsLmNvbSIsImlhdCI6MTY5NDY0MjAxOSwiZXhwIjoxNjk0Njg1MjE5fQ.lJ1uWM5zbu-NoHJXTRamlvL1tNEF5ibD9pVoxvuNnBM"
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

        // Aqui você pode fazer a solicitação POST para o servidor com os dados do formulário (title e description)
        const data = {
            title,
            description,
        };

        // Substitua esta parte com a lógica real de envio para o servidor
        console.log("Dados a serem enviados:", data);

        // Redirecione ou faça qualquer outra ação necessária após o envio
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
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXJ1dG9fdXp1Y3JhY2tpQGdtYWlsLmNvbSIsImlhdCI6MTY5NDY0NTExMiwiZXhwIjoxNjk0Njg4MzEyfQ.0nBkSVm6ZZ89yBwPTr84QItYO2R-pPYeRtam30JMmO0'
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
                            <Link to={"/new-ticket"} className="back--icon return">Cancelar</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Ticket;