import React from 'react';
import './NewTicket.scss';

import Nav from "../Nav/Nav"
import Option from '../Option/Option';

function NewTicket() {

    return (
        <div className="newticket-component">
            <Nav />
            <div className="ticket__box">
                <h2 className='text__h2'>Escolha a qual área pertence a sua dúvida:</h2>
                <div className="ticket__list">
                    <Option />
                </div>

            </div>

        </div>
    )
}

export default NewTicket;