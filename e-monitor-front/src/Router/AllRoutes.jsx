import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import LoginMonitor from "../Components/Login-Monitor/Login-Monitor";
import Lobby from "../Components/Lobby-User/Lobby-User";
import Lobby_user from "../Components/Lobby-User/Lobby-User";
import Lobby_monitor from "../Components/Lobby-Monitor/Lobby-Monitor";
import Chat from "../Components/Chat/Chat";
import New_ticket from "../Components/New-Ticket/New-Ticket";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ < Home />} />
            <Route path="/login-monitor" element={ < LoginMonitor />} />
            <Route path="/lobby" element={ < Lobby />} />
            <Route path="/lobby_user" element={ < Lobby_user />} />
            <Route path="/lobby_monitor" element={ < Lobby_monitor />} />
            <Route path="/chat" element={ < Chat />} />
            <Route path="/new_ticket" element={ < New_ticket />} />
        </Routes>
    )
}

export default AllRoutes;