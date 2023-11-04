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
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("MATEMATICA")}>Matemática</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("ARTES")}>Artes</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("PORTUGUES")}>Português</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("INGLES")}>Inglês</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("BIOLOGIA")}>Biologia</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("HISTORIA")}>História</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("ED_FISICA")}>Ed.Física</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("FISICA")}>Física</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("FILOSOFIA")}>Filosofia</Link>


            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("SOCIOLOGIA")}>Sociologia</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("QUIMICA")}>Química</Link>
            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("GEOGRAFIA")}>Geografia</Link>

            <Link to="/new-ticket" className='icon--ticket' onClick={() => sendOptionName("OUTROS")}>Outros</Link>
        </div>
    )
}

export default Option;