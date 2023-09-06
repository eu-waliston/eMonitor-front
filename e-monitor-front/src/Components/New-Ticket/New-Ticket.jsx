import React from 'react';
import './New-Ticket.css';
import { Link } from 'react-router-dom';
import Nav from "../Nav/Nav"

function NewTicket(props) {
    const Tickets = ["Matematica", "Artes", "Portuges", "Ingles", "Biologia", "Historia", "Fisica", "Ed. Fisica", "Filosofia", "Sociologia", "Quimica", "Geografia", "Outros"]
    function TicketName(TicketName) {
        switch (Tickets) {
            case 0:
                <p>{Tickets[0]}</p>
                break;

            case 1:
                <p>{Tickets[1]}</p>
                break;

            case 2:
                <p>{Tickets[2]}</p>
                break;

            case 3:
                <p>{Tickets[3]}</p>
                break;

            case 4:
                <p>{Tickets[4]}</p>
                break;

            case 5:
                <p>{Tickets[5]}</p>
                break;

            case 6:
                <p>{Tickets[6]}</p>
                break;

            case 7:
                <p>{Tickets[7]}</p>
                break;

            case 8:
                <p>{Tickets[8]}</p>
                break;

            case 9:
                <p>{Tickets[9]}</p>
                break;

            case 10:
                <p>{Tickets[10]}</p>
                break;

            case 11:
                <p>{Tickets[11]}</p>
                break;

            case 12:
                <p>{Tickets[12]}</p>
                break;

            case 13:
                <p>{Tickets[13]}</p>
                break;

            default:
                <p>"..."</p>
                break;
        }
    }
    return (
        <div className="newticket_page">
            <Nav />
            <div className="ticket__box">
                <h2 className='text__h2'>Escolha a qual área pertence a sua dúvida:</h2>
                <div className="ticket__list">

                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[0]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[1]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[2]}</Link>


                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[3]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[4]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[5]}</Link>


                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[6]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[7]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[8]}</Link>


                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[9]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[10]}</Link>
                    <Link title={props.TicketName} to="/ticket" className='icon--ticket'>{Tickets[11]}</Link>

                    <Link onTicketName={TicketName} to="/ticket" className='icon--ticket'>{Tickets[12]}</Link>

                </div>

            </div>

        </div>
    )
}

export default NewTicket;