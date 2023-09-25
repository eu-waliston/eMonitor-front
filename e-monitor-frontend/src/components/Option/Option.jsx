import React from "react";
import "./Option.scss";
import { Link } from "react-router-dom";

const Option = () => {

    const sendOptionName = (optionName) => {
        localStorage.setItem("TAG", optionName)
        return <p>{optionName}</p>
    }

    return (
        <div className="options--section">
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Matematica")}>Matematica</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Artes")}>Artes</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Portuges")}>Portugues</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Ingles")}>Ingles</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Biologia")}>Biologia</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Historia")}>Historia</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Ed.Fisica")}>Ed.Fisica</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Fisica")}>Fisica</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Filosofia")}>Filosofia</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Sociologia")}>Sociologia</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Quimica")}>Quimica</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Geografia")}>Geografia</Link>

            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Outros")}>Outros</Link>
        </div>
    )
}

export default Option;