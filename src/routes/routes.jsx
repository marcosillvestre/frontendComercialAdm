
import { createBrowserRouter } from "react-router-dom";
// import AddNewRegister from '../app/pages/AddRegister';
// import ComissionControll from '../app/pages/ComissionControl';
// import Contracts from "../app/pages/ContractsForGetSign";
// import { Control } from "../app/pages/Control";
// import Home from "../app/pages/Home";
// import Login from "../app/pages/Login";
// import Register from "../app/pages/Register";
// import Historic from "../app/pages/pages/Historic";
// import RecoverPassword from "../app/pages/recoverPassword";


import {
    AddNewRegister, ComissionControll, Contracts, Control,
    Historic,
    Home, Login,
    RecoverPassword,
    Register
} from '../app/pages/source.jsx';

const user = localStorage.getItem('userData')
const comissionalAcess = JSON.parse(user)?.role === 'direcao' || JSON.parse(user)?.role === 'administrativo' ? true : false
const commandAccess = JSON.parse(user)?.role === 'direcao' || JSON.parse(user)?.role === 'administrativo' || JSON.parse(user)?.role === 'gerencia' ? true : false
const directory = JSON.parse(user)?.role === 'direcao' ? true : false


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        exact: true,
    },
    {
        path: "/redefinir-senha",
        element: <RecoverPassword />,
    },
    {
        path: "/contratos-por-assinar",
        element: user === null || user === undefined ? <Login /> : <Contracts />,
    },
    {
        path: "/controle-comissional",
        element: comissionalAcess ? <ComissionControll /> : <Control />,
    },
    {
        path: "/controle-comissional/grafico",
        element: comissionalAcess ? <ComissionControll /> : <Control />,
    },
    {
        path: "/cadastro",
        element: directory ? <Register /> : <Login />,
    },

    {
        path: "/cadastro/lista",
        element: directory ? <Register /> : <Login />,
    },
    {
        path: "/novo-cadastro",
        element: directory ? <AddNewRegister /> : <Login />,
    },
    {
        path: "/controle-comercial",
        element: user === null || user === undefined ? <Login /> : <Control />,
    },
    {
        path: "/historico",
        element: commandAccess === null || commandAccess === undefined ? <Login /> : <Historic />,
    },
]);




export default Routes