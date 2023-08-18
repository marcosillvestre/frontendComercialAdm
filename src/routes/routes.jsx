
import { createBrowserRouter } from "react-router-dom";
import ComissionControll from '../app/ComissionControl';
import Contracts from "../app/ContractsForGetSign";
import { Control } from "../app/Control";
import Login from "../app/Login";
import Register from "../app/Register";

const user = localStorage.getItem('userData')
const comissionalAcess = JSON.parse(user)?.role === 'direcao' || JSON.parse(user)?.role === 'administrativo' ? true : false

const directory = JSON.parse(user)?.role === 'direcao' ? true : false


const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        exact: true,
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
        path: "/cadastro",
        element: directory ? <Register /> : <Login />,
    },
    {
        path: "/controle-comercial",
        element: user === null || user === undefined ? <Login /> : <Control />,
    }
]);




export default Routes