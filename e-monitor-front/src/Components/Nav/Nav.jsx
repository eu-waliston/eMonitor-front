import React from "react";
import "./Nav.css";

import { FiArrowLeft } from 'react-icons/fi';
import { Link } from "react-router-dom";



const Nav = () => {
    return (
        <div className="header">
            <button className="menu-button">&#9776;</button>
        </div>
    )
}

export default Nav;