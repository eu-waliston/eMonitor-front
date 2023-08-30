import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Lobby from "../Components/Lobby-User/Lobby-User";

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ < Home />} />
            <Route path="/lobby" element={ < Lobby />} />
        </Routes>
    )
}

export default AllRoutes;