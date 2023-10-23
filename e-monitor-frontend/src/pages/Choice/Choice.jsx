import React from "react";
import "./Choice.scss";
import { Link, useNavigate } from "react-router-dom";

//import {MdSchool} from "react-icons/md/index"
import { IoMdSchool } from "react-icons/io"
import { PiStudentBold } from "react-icons/pi"
import { MdOutlineArrowBack } from "react-icons/md";

const Choice = () => {

    const navigate = useNavigate();

    return (
        <div className="choice--container">

            <button
                className='action-btn'
                onClick={
                    (e) => {
                        e.preventDefault();
                        navigate('/', { replace: true })
                    }
                }

                aria-describedby='claim'
            >
                <MdOutlineArrowBack className="action-icon" />
            </button>

            <div className="container">
                <img
                    src="./Images/logo.png"
                    alt="logo do website"
                    className="logo-choice animate__animated animate__pulse animate__slow	3s animate__infinite	infinite"
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