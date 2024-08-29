
import { createBrowserRouter } from "react-router-dom";

import { paths } from "../app/constants/paths.js";
import {
    ComissionControll, Contracts, Control,
    CustomFields,
    Home, Login,
    Orders,
    RecoverPassword,
    Register,
    Settings
} from '../app/pages/source.jsx';
import { MiniDrawer } from '../components/source.jsx';
import ErrorPage from "../errorHandling/error-page.jsx";


const user = localStorage.getItem('userData')
const directory = JSON.parse(user)?.role === 'direcao' ? true : false


const Routes = createBrowserRouter([

    {
        path: paths.config,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /> <Settings /> </>,
        errorElement: <ErrorPage />,
    },
    {
        path: paths.configCustomFields,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /> <CustomFields /> </>,
        errorElement: <ErrorPage />,
    },
    {
        path: paths.home,
        element: <Home />,
        errorElement: <ErrorPage />,
        exact: true,
    },
    {
        path: paths.redefinePass,
        element: <RecoverPassword />,
        errorElement: <ErrorPage />,

    },
    {
        path: paths.signContracts,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Contracts /> </>,
        errorElement: <ErrorPage />,
    },
    {
        path: paths.orders,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Orders /> </>,
        errorElement: <ErrorPage />,
    },
    {
        path: paths.comissionalControl,
        element: <><MiniDrawer /><ComissionControll /></>,
        errorElement: <ErrorPage />,
    },

    {
        path: paths.configRegister,
        element: directory ? <><MiniDrawer /><Register /> </> : <Login />,
        errorElement: <ErrorPage />,
    },

    {
        path: paths.consfigRegisterList,
        element: directory ? <><MiniDrawer /><Register /></> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: paths.control,
        element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Control /></>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: paths.nestedControl,
                element: user === null || user === undefined ? <Login /> : <><MiniDrawer /><Control /></>,
            },
        ]
    }

]);




export default Routes