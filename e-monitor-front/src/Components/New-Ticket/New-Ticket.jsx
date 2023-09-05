import React from 'react';
import './New-Ticket.css';
import { Link } from 'react-router-dom';

function NewTicket() {
    return (
        <div className="page">
            <h2 className='text'>Escolha a qual área pertence a sua dúvida:</h2>
            <div className="subject-box">
                <Link to="/matematica">Matemática</Link>
            </div>
            <div className="subject-box">
                <Link to="/portugues">Português</Link>
            </div>
            <div className="subject-box">
                <Link to="/fisica">Física</Link>
            </div>
        </div>
    )
}

export default NewTicket;