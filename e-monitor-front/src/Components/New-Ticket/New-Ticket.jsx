import React from 'react';
import './New-Ticket.css';
import { Link } from 'react-router-dom';
import Nav from "../Nav/Nav"

function NewTicket() {
    const Tickets = ["Matematica", "Artes", "Portuges", "Ingles", "Biologia", "Historia", "Fisica", "Ed. Fisica", "Filosofia", "Sociologia", "Quimica", "Geografia", "Outros"]
    return (
        <div className="newticket_page">
            <Nav />
            <div className="ticket__box">
                <h2 className='text__h2'>Escolha a qual área pertence a sua dúvida:</h2>
                <div className="ticket__list">

                    <Link to="/ticket" className='icon--ticket'>Matemática</Link>
                    <Link to="/ticket" className='icon--ticket'>Artes</Link>
                    <Link to="/ticket" className='icon--ticket'>Português</Link>


                    <Link to="/ticket" className='icon--ticket'>Inglês</Link>
                    <Link to="/ticket" className='icon--ticket'>Biologia</Link>
                    <Link to="/ticket" className='icon--ticket'>História</Link>


                    <Link to="/ticket" className='icon--ticket'>Física</Link>
                    <Link to="/ticket" className='icon--ticket'>Educação Física</Link>
                    <Link to="/ticket" className='icon--ticket'>Filosofia</Link>


                    <Link to="/ticket" className='icon--ticket'>Sociologia</Link>
                    <Link to="/ticket" className='icon--ticket'>Química</Link>
                    <Link to="/ticket" className='icon--ticket'>Geografia</Link>

                    <Link to="/ticket" className='icon--ticket'>Outros</Link>

                </div>

            </div>

        </div>
    )
}

export default NewTicket;