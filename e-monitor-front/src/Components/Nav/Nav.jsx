import React, { useState } from "react";
import "./Nav.css";

import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"
import { GrClose } from "react-icons/gr"

import { AiOutlineUser } from "react-icons/ai"
import { BsFillGearFill, BsInfoSquareFill } from "react-icons/bs"
import { BiLogOutCircle } from "react-icons/bi"


const Nav = () => {
    const [nav, Setnav] = useState(true);

    function handleClick() {
        Setnav(!nav)
    }

    return (
        <div className={nav ? "header" : "header--toggled"}>
            <button className="menu-button" onClick={handleClick}>
                {nav ? <FaBars className="btn--icon" /> : <GrClose className="btn--icon" id="rr" />}
            </button>
            <div className={nav ? "itens--menu-toggled" : "itens--menu"}>
                <div className="menu--icon">
                    <Link className="menu-icons" ><AiOutlineUser className="icons"/>Perfil</Link>
                    <Link className="menu-icons" ><BsFillGearFill className="icons"/>Configurações</Link>
                    <Link className="menu-icons" ><BsInfoSquareFill className="icons"/>Informações</Link>
                    <Link to={"/"} className="menu-icons" ><BiLogOutCircle className="icons"/>Sair</Link>
                </div>
            </div>
        </div>
    )
}

export default Nav;