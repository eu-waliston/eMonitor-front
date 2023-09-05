import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
<<<<<<< HEAD
import Lobby from "../Components/Lobby-User/Lobby-User";
import Chat from "../Components/Chat/Chat";

=======
import Lobby_user from "../Components/Lobby-User/Lobby-User";
import Lobby_monitor from "../Components/Lobby-Monitor/Lobby-Monitor";
>>>>>>> 1dd4899d3b883afc940fe5c6756ec5ebcb9883b8

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ < Home />} />
<<<<<<< HEAD
            <Route path="/lobby" element={ < Lobby />} />
            <Route path="/chat" element={ < Chat />} />
=======
            <Route path="/lobby_user" element={ < Lobby_user />} />
            <Route path="/lobby_monitor" element={ < Lobby_monitor />} />
>>>>>>> 1dd4899d3b883afc940fe5c6756ec5ebcb9883b8
        </Routes>
    )
}

export default AllRoutes;