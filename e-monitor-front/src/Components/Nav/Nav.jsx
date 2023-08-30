import React, {useState} from "react";
import "./Nav.css";

import { Link } from "react-router-dom";
import { FaBars} from "react-icons/fa"
import {GrClose} from "react-icons/gr"


const Nav = () => {
    const [nav, Setnav] = useState(true);

    function handleClick() {
        Setnav(!nav)
    }

    return (
        <div className={nav ? "header" : "header--toggled"}>
            <button className="menu-button" onClick={handleClick}>
                {nav ? <FaBars className="btn--icosn"/> : <GrClose  className="btn--icosn"/>}
            </button>

        </div>
    )
}

export default Nav;