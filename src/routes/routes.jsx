
import { createBrowserRouter } from "react-router-dom";

import { paths } from "../app/constants/paths.js";
import Invoice from "../app/pages/Orders/template/invoice.jsx";
import {
    ComissionControll, Contracts, Control,
    Home, Login,
    Orders,
    RecoverPassword,
    Register,
    Settings
} from '../app/pages/source.jsx';
import { MiniDrawer } from '../components/source.jsx';
import ErrorPage from "../errorHandling/error-page.jsx";

const user = JSON.parse(localStorage.getItem('userData'))


const {
    config, home, redefinePass,
    signContracts, orders, nestedOrder, comissionalControl,
    configRegister, control, nestedControl } = paths



const Routes = createBrowserRouter([

    {
        path: config.path,
        element: config.access.find(res => res === user?.role) ? <><MiniDrawer /> <Settings /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: home.path,
        element: <Home />,
        errorElement: <ErrorPage />,
        exact: true,
    },
    {
        path: redefinePass.path,
        element: <RecoverPassword />,
        errorElement: <ErrorPage />,

    },
    {
        path: signContracts.path,
        element: signContracts.access.find(res => res === user?.role) ? <><MiniDrawer /><Contracts /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: orders.path,
        element: orders.access.find(res => res === user?.role) ? <><MiniDrawer /><Orders /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: nestedOrder.path,
        element: nestedOrder.access.find(res => res === user?.role) ? <><MiniDrawer /><Invoice /></> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: comissionalControl.path,
        element: comissionalControl.access.find(res => res === user?.role) ? <><MiniDrawer /><ComissionControll /></> : <Login />,
        errorElement: <ErrorPage />,
    },

    {
        path: configRegister.path,
        element: configRegister.access.find(res => res === user?.role) ? <><MiniDrawer /><Register /> </> : <Login />,
        errorElement: <ErrorPage />,
    },

    {
        path: control.path,
        element: control.access.find(res => res === user?.role) ? <><MiniDrawer /><Control /></> : <Login />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: nestedControl.path,
                element: nestedControl.access.find(res => res === user?.role) ? <><MiniDrawer /><Control /></> : <Login />,
            },
        ]
    }

]);




export default Routes