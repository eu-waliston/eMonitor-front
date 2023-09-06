import React from "react";
import "./Option.css";
import { Link } from "react-router-dom";

const Option = () => {

    return (
        <div className="options--section">
            <Link to="/ticket" className='icon--ticket'>Matematica</Link>
            <Link to="/ticket" className='icon--ticket'>Artes</Link>
            <Link to="/ticket" className='icon--ticket'>Portuges</Link>


            <Link to="/ticket" className='icon--ticket'>Ingles</Link>
            <Link to="/ticket" className='icon--ticket'>Biologia</Link>
            <Link to="/ticket" className='icon--ticket'>Historia</Link>


            <Link to="/ticket" className='icon--ticket'>Ed. Fisica</Link>
            <Link to="/ticket" className='icon--ticket'>Fisica</Link>
            <Link to="/ticket" className='icon--ticket'>Filosofia</Link>


            <Link to="/ticket" className='icon--ticket'>Sociologia</Link>
            <Link to="/ticket" className='icon--ticket'>Quimica</Link>
            <Link to="/ticket" className='icon--ticket'>Geografia</Link>

            <Link to="/ticket" className='icon--ticket'>Outros</Link>
        </div>
    )
}

export default Option;