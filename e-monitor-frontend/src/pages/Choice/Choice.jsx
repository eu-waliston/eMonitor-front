import React from "react";
import "./Choice.scss";
import { Link } from "react-router-dom";

//import {MdSchool} from "react-icons/md/index"
import { IoMdSchool } from "react-icons/io"
import { PiStudentBold } from "react-icons/pi"

const Choice = () => {
    return (
        <div className="choice--container">
            <div className="container">
                <img
                    src="./Images/logo.png"
                    alt="logo do website"
                    className="logo-choice"
                />

                <p>Você irá se registrar como: </p>

                <Link to={"/monitor-register"} className="btn--choice">
                    <IoMdSchool className="icon" />
                    monitor
                </Link>

                <p>ou</p>

                <Link to={"/student-register"} className="btn--choice">
                    <PiStudentBold className="icon" />
                    estudante
                </Link>
            </div>

        </div>
    )
}

export default Choice;