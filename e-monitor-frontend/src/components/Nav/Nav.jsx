import React, { useState } from "react";
import "./Nav.scss";

import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai"
import { BsFillGearFill, BsInfoSquareFill } from "react-icons/bs"
import { BiLogOutCircle } from "react-icons/bi"
import { MdClose } from "react-icons/md"
import {VscThreeBars} from "react-icons/vsc"


const Nav = () => {
    const [nav, Setnav] = useState(true);

    function handleClick() {
        Setnav(!nav)
    }

    return (
        <div>

            <div className="menu-button" onClick={handleClick}>
                {nav ? <VscThreeBars className="btn--icon" /> : <MdClose className="btn--icon"/>}
            </div>

            <div className={nav ? "itens--menu-toggled" : "itens--menu"}>
                <div className="menu--icon">
                    <Link className="menu-icons" ><AiOutlineUser className="icons" />Perfil</Link>
                    <Link className="menu-icons" ><BsFillGearFill className="icons" />Configurações</Link>
                    <Link className="menu-icons" ><BsInfoSquareFill className="icons" />Informações</Link>
                    <Link to={"/"} className="menu-icons" ><BiLogOutCircle className="icons" />Sair</Link>
                </div>
            </div>
        </div>
    )
}

export default Nav;