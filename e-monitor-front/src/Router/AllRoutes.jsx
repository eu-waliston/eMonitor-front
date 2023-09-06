import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import LoginMonitor from "../Components/Login-Monitor/Login-Monitor";
import Lobby from "../Components/Lobby-User/Lobby-User";
import LobbyUser from "../Components/Lobby-User/Lobby-User";
import LobbyMonitor from "../Components/Lobby-Monitor/Lobby-Monitor";
import Chat from "../Components/Chat/Chat";
import NewTicket from "../Components/New-Ticket/New-Ticket";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ < Home />} />
            <Route path="/login-monitor" element={ < LoginMonitor />} />
            <Route path="/lobby" element={ < Lobby />} />
            <Route path="/lobby-user" element={ < LobbyUser />} />
            <Route path="/lobby-monitor" element={ < LobbyMonitor />} />
            <Route path="/chat" element={ < Chat />} />
            <Route path="/new-ticket" element={ < NewTicket />} />
        </Routes>
    )
}

export default AllRoutes;