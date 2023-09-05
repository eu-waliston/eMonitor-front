import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
<<<<<<< HEAD
import Chat from "../Components/Chat/Chat";
import Lobby_user from "../Components/Lobby-User/Lobby-User";
import Lobby_monitor from "../Components/Lobby-Monitor/Lobby-Monitor";
=======

import Lobby from "../Components/Lobby-User/Lobby-User";
import Chat from "../Components/Chat/Chat";


import Lobby_user from "../Components/Lobby-User/Lobby-User";
import Lobby_monitor from "../Components/Lobby-Monitor/Lobby-Monitor";
import LoginMonitor from "../Components/Login-Monitor/Login-Monitor";


>>>>>>> main-waliston

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ < Home />} />
<<<<<<< HEAD
            <Route path="/chat" element={ < Chat />} />
            <Route path="/lobby_user" element={ < Lobby_user />} />
            <Route path="/lobby_monitor" element={ < Lobby_monitor />} />
=======
            <Route path="/login-monitor" element={ < LoginMonitor />} />

            <Route path="/lobby" element={ < Lobby />} />
            <Route path="/chat" element={ < Chat />} />

            <Route path="/lobby_user" element={ < Lobby_user />} />
            <Route path="/lobby_monitor" element={ < Lobby_monitor />} />

>>>>>>> main-waliston
        </Routes>
    )
}

export default AllRoutes;