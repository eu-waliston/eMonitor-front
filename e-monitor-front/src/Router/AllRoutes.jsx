import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Lobby from "../Components/Lobby-User/Lobby-User";
import Chat from "../Components/Chat/Chat";


const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ < Home />} />
            <Route path="/lobby" element={ < Lobby />} />
            <Route path="/chat" element={ < Chat />} />
        </Routes>
    )
}

export default AllRoutes;