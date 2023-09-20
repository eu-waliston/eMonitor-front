import {Routes, Route} from "react-router-dom";

//Rota Inicial assim que o usuário abrir o site
import WelcomePage from "../pages/Welcome/Welcome-Page";

//3 Rotas responsaveis por cadastro de usuario e escolha de modelo de cadastro
import Choice from "../pages/Choice/Choice";
import MonitorRegister from "../components/Register/MonitorRegister"
import EstudanteRegister from "../components/Register/StudentRegister";

//Rota de Login geral da aplicação
import Login from "../components/Login/Login";

//2 Rotas referntes ao Lobby do estudante e do monitor


const AllRoutes = () => {
    return (
        <Routes>
            <Route path={"/"} element={< WelcomePage />}/>
            <Route path={"/choice"} element={< Choice />}/>
            <Route path={"/monitor-register"} element={< MonitorRegister />}/>
            <Route path={"/student-register"} element={< EstudanteRegister />}/>
            <Route path={"/login"} element={< Login />}/>
        </Routes>
    )
}   

export default AllRoutes;