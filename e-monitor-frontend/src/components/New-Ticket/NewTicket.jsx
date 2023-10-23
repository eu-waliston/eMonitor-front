import React from 'react';
import './NewTicket.scss';
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Nav from "../Nav/Nav"
import Option from '../Option/Option';

function NewTicket() {

    const navigate = useNavigate();

    return (
        <div className="newticket-component">
            <button
                className='action-btn'
                onClick={
                    (e) => {
                        e.preventDefault();
                        navigate('/lobby-student', { replace: true })
                    }
                }

                aria-describedby='claim'
            >
                <MdOutlineArrowBack className="action-icon" />
            </button>

            <div className="ticket__box">
                <h2 className='text__h2'> Escolha a qual área pertence a sua dúvida: </h2>
                <div className="ticket__list">
                    <Option />
                </div>
            </div>
        </div>
    )
}

export default NewTicket;