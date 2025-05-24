
import { createBrowserRouter } from "react-router-dom";

import { paths } from "../app/constants/paths.js";
import { Campaigns } from "../app/pages/Config/Campaigns/index.jsx";
import { Products } from "../app/pages/Config/Products/index.jsx";
import { Services } from "../app/pages/Config/Services/index.jsx";
import { Supliers } from "../app/pages/Config/Supliers/index.jsx";

import Invoice from "../app/pages/Orders/template/invoice.jsx";

import { HistoricOrders } from "../app/pages/historicOrders/index.jsx";

import { ComissionControll, Contracts, Control, CustomFields, Home, Login, Orders, RecoverPassword, Register, Settings } from '../app/pages/source.jsx';

import { BillingRules } from "../app/pages/Config/BillingRules/index.jsx";
import { MiniDrawer } from '../components/source.jsx';
import ErrorPage from "../errorHandling/error-page.jsx";

const user = JSON.parse(localStorage.getItem('userData'))


const {
    config, home, redefinePass,
    signContracts, orders, nestedOrder, comissionalControl,
    users, control, nestedControl, configCustomFields,
    campaign, products, services, supliers, historicOrders, billingRule

} = paths



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
        path: campaign.path,
        element: campaign.access.find(res => res === user?.role) ? <><MiniDrawer /><Campaigns /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: supliers.path,
        element: supliers.access.find(res => res === user?.role) ? <><MiniDrawer /><Supliers /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: billingRule.path,
        element: billingRule.access.find(res => res === user?.role) ? <><MiniDrawer /><BillingRules /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: products.path,
        element: products.access.find(res => res === user?.role) ? <><MiniDrawer /><Products /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: services.path,
        element: services.access.find(res => res === user?.role) ? <><MiniDrawer /><Services /> </> : <Login />,
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
        path: historicOrders.path,
        element: historicOrders.access.find(res => res === user?.role) ? <><MiniDrawer /><HistoricOrders /> </> : <Login />,
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
        path: users.path,
        element: users.access.find(res => res === user?.role) ? <><MiniDrawer /><Register /> </> : <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: configCustomFields.path,
        element: configCustomFields.access.find(res => res === user?.role) ? <><MiniDrawer /><CustomFields /> </> : <Login />,
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