import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import LoginMonitor from "../Components/Login-Monitor/Login-Monitor";
import Lobby from "../Components/Lobby-User/Lobby-User";
import LobbyUser from "../Components/Lobby-User/Lobby-User";
import LobbyMonitor from "../Components/Lobby-Monitor/Lobby-Monitor";
import Chat from "../Components/Chat/Chat";
import NewTicket from "../Components/New-Ticket/New-Ticket";
import Ticket from "../Components/Ticket/Ticket";
import Spinner from "../Components/Spinner/Spinner"

import CadUSer from "../Components/Register/UserRegister"
import CadMonitor from "../Components/Register/MonitorRegister"


const AllRoutes = () => {
    return (
        <Routes>
            
            <Route path="/" element={ < Home />} /> {/* Login*/} 
            <Route path="/login-monitor" element={ < LoginMonitor />} />
            <Route path="/lobby" element={ < Lobby />} />

            <Route path="/lobby-user" element={ < LobbyUser />} />
            <Route path="/lobby-monitor" element={ < LobbyMonitor />} />

   
            <Route path="/new-ticket" element={ < NewTicket />} />
            <Route path="/ticket" element={ < Ticket />} />
            <Route path="/chat" element={ < Chat />} />

            <Route path="/spinner" element={ <Spinner />} />


            {/*Register Section*/}
            <Route path="/user-register" element={ <CadUSer />} />
            <Route path="/monitor-register" element={ <CadMonitor />} />

        </Routes>
    )
}

export default AllRoutes;