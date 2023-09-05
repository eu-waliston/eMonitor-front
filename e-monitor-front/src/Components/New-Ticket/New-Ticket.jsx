import React from 'react';
import './New-Ticket.css';
import { Link } from 'react-router-dom';
import Nav from "../Nav/Nav"

function NewTicket() {
    return (
        <div className="newticket_page">
            <Nav />
            <div className="ticket__box">
                <h2 className='text__h2'>Escolha a qual área pertence a sua dúvida:</h2>
                <div className="ticket__list">

                    <Link to="/matematica" className='icon--ticket'>Matemática</Link>
                    <Link to="/portugues" className='icon--ticket'>Artes</Link>
                    <Link to="/fisica" className='icon--ticket'>Português</Link>


                    <Link to="/matematica" className='icon--ticket'>Inglês</Link>
                    <Link to="/portugues" className='icon--ticket'>Biologia</Link>
                    <Link to="/fisica" className='icon--ticket'>História</Link>


                    <Link to="/matematica" className='icon--ticket'>Física</Link>
                    <Link to="/portugues" className='icon--ticket'>Educação Física</Link>
                    <Link to="/fisica" className='icon--ticket'>Filosofia</Link>


                    <Link to="/matematica" className='icon--ticket'>Sociologia</Link>
                    <Link to="/portugues" className='icon--ticket'>Química</Link>
                    <Link to="/fisica" className='icon--ticket'>Geografia</Link>

                </div>

            </div>

        </div>
    )
}

export default NewTicket;