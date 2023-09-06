import React from "react";
import "./Option.css";
import { Link } from "react-router-dom";

const Option = () => {
    const Tickets = ["Matematica", "Artes", "Portuges", "Ingles", "Biologia", "Historia", "Fisica", "Ed. Fisica", "Filosofia", "Sociologia", "Quimica", "Geografia", "Outros"]

    function sandTicketName(id) {
        return Tickets[id];
    }

    return (
        <div className="options--section">
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[0]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[1]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[2]}</Link>


            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[3]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[4]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[5]}</Link>


            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[6]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[7]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[8]}</Link>


            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[9]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[10]}</Link>
            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[11]}</Link>

            <Link to="/ticket" className='icon--ticket' onClick={sandTicketName}>{Tickets[12]}</Link>
        </div>
    )
}

export default Option;