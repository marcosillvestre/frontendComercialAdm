
import { createBrowserRouter } from "react-router-dom";
import ComissionControll from '../app/ComissionControl';
import Contracts from "../app/ContractsForGetSign";
import { Control } from "../app/Control";
import Home from "../app/Home";
import Login from "../app/Login";
import Register from "../app/Register";
import RecoverPassword from "../app/recoverPassword";

const user = localStorage.getItem('userData')
const comissionalAcess = JSON.parse(user)?.role === 'direcao' || JSON.parse(user)?.role === 'administrativo' ? true : false

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
        path: "/controle-comercial",
        element: user === null || user === undefined ? <Login /> : <Control />,
    }
]);




export default Routes