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
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Matematica")}>Matemática</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Artes")}>Artes</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Portuges")}>Português</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Ingles")}>Inglês</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Biologia")}>Biologia</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Historia")}>História</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Ed.Fisica")}>Ed.Física</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Fisica")}>Física</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Filosofia")}>Filosofia</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Sociologia")}>Sociologia</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Quimica")}>Química</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Geografia")}>Geografia</Link>

            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("Outros")}>Outros</Link>
        </div>
    )
}

export default Option;