
import { createBrowserRouter } from "react-router-dom";

import {
    AddNewRegister, ComissionControll, Contracts, Control,
    Historic,
    Home, Login,
    RecoverPassword,
    Register
} from '../app/pages/source.jsx';
import MiniDrawer from '../components/sideBar';



const user = localStorage.getItem('userData')
const comissionalAcess = JSON.parse(user)?.role === 'direcao' || JSON.parse(user)?.role === 'administrativo' ? true : false
// const commandAccess = JSON.parse(user)?.role === 'direcao' || JSON.parse(user)?.role === 'administrativo' || JSON.parse(user)?.role === 'gerencia' ? true : false
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
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Contracts /> </>
    },
    {
        path: "/controle-comissional",
        element: comissionalAcess ? <><MiniDrawer /><ComissionControll /></> : <><MiniDrawer /><Control /></>,
    },
    {
        path: "/controle-comissional/grafico",
        element: comissionalAcess ? <><MiniDrawer /><ComissionControll /></> : <><MiniDrawer /><Control /></>
    },
    {
        path: "/cadastro",
        element: directory ? <><MiniDrawer /><Register /> </> : <Login />,
    },

    {
        path: "/cadastro/lista",
        element: directory ? <><MiniDrawer /><Register /></> : <Login />,
    },
    {
        path: "/novo-cadastro",
        element: directory ? <><MiniDrawer /><AddNewRegister /></> : <Login />,
    },
    {
        path: "/controle-comercial",
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Control /></>
    },
    {
        path: "/historico",
        element: directory === null || directory === undefined ? <><MiniDrawer /><Control /></> : <><MiniDrawer /><Historic /></>
    },
]);




export default Routes