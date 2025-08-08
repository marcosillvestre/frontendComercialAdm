import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { useLocation } from 'react-router-dom';
import { paths } from "../../../app/constants/paths";
import { useUser } from "../../../hooks/userContext";
import {
    ComissionScreen,
    GetContracts,
    Home,
    Links
} from "../styles";

export const Navigation = () => {
    const { userData, openSidebar } = useUser()



    const url = useLocation()
    const pages = [
        { name: 'Controle Comercial', url: paths.control.path, icon: <Home />, access: paths.control.access },
        { name: 'Emitir Contratos', url: paths.signContracts.path, icon: <GetContracts />, access: paths.signContracts.access },
        { name: 'Relatórios', url: paths.comissionalControl.path, icon: <ComissionScreen />, access: paths.comissionalControl.access },
        { name: 'Pedidos', url: paths.orders.path, icon: <ShoppingBasketIcon />, access: paths.orders.access },
        { name: 'Histórico de pedidos', url: paths.historicOrders.path, icon: <WorkHistoryIcon />, access: paths.historicOrders.access },
        { name: 'Configurações', url: paths.config.path, icon: <SettingsIcon />, access: paths.config.access },
    ]


    return (
        <div>
            {
                pages.map((text) => (
                    text.access.some(res => res === userData.role) &&
                    <label htmlFor="link"
                        key={text.name}
                    >

                        <ListItem
                            disablePadding sx={{ display: 'block' }}
                            style={{ backgroundColor: url.pathname === text.url ? "#d2d2d2" : "" }}

                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 40,
                                    justifyContent: openSidebar ? 'initial' : 'right',
                                    px: 2,
                                }}
                            >
                                <Links
                                    id="link"
                                    key={text.name}
                                    to={text.url}
                                    open={openSidebar}
                                >

                                    {text.icon}
                                    {text.name}


                                </Links>

                            </ListItemButton>

                        </ListItem>
                    </label>
                ))

            }
        </div >
    )
}
