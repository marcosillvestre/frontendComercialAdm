
import { createBrowserRouter } from "react-router-dom";

import { paths } from "../app/constants/paths.js";
import {
    AddNewRegister, ComissionControll, Contracts, Control,
    CustomFields,
    Historic,
    Home, Login,
    RecoverPassword,
    Register,
    Settings
} from '../app/pages/source.jsx';
import { MiniDrawer } from '../components/source.jsx';


const user = localStorage.getItem('userData')
const comissionalAcess = JSON.parse(user)?.role === 'direcao' || JSON.parse(user)?.role === 'administrativo' ? true : false
const directory = JSON.parse(user)?.role === 'direcao' ? true : false


const Routes = createBrowserRouter([
    {
        path: paths.config,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /> <Settings /> </>,
    },
    {
        path: paths.configCustomFields,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /> <CustomFields /> </>,
    },
    {
        path: paths.home,
        element: <Home />,
        exact: true,
    },
    {
        path: paths.redefinePass,
        element: <RecoverPassword />,

    },
    {
        path: paths.signContracts,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Contracts /> </>
    },
    {
        path: paths.comissionalControl,
        element: comissionalAcess ? <><MiniDrawer /><ComissionControll /></> : <><MiniDrawer /><Control /></>
    },

    {
        path: paths.configRegister,
        element: directory ? <><MiniDrawer /><Register /> </> : <Login />,
    },


    {
        path: paths.consfigRegisterList,
        element: directory ? <><MiniDrawer /><Register /></> : <Login />,
    },
    {
        path: paths.newRegister,
        element: directory ? <><MiniDrawer /><AddNewRegister /></> : <Login />,
    },
    {
        path: paths.control,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Control /></>
    },
    {
        path: paths.historic,
        element: directory === null || directory === undefined ? <><MiniDrawer /><Control /></> : <><MiniDrawer /><Historic /></>
    },
]);




export default Routes