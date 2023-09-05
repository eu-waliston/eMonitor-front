import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Chat from "../Components/Chat/Chat";
import Lobby_user from "../Components/Lobby-User/Lobby-User";
import Lobby_monitor from "../Components/Lobby-Monitor/Lobby-Monitor";
import New_ticket from "../Components/New-Ticket/New-Ticket";


const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ < Home />} />
            <Route path="/chat" element={ < Chat />} />
            <Route path="/lobby_user" element={ < Lobby_user />} />
            <Route path="/lobby_monitor" element={ < Lobby_monitor />} />
            <Route path="/new_ticket" element={ < New_ticket />} />
        </Routes>
    )
}

export default AllRoutes;