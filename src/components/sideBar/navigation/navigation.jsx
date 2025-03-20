import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from 'react-router-dom';
import { paths } from "../../../app/constants/paths";
import { useUser } from "../../../hooks/userContext";
import {
    ComissionScreen,
    GetContracts,
    Home,
    Links
} from "../styles";

export const Navigation = (openSidebar) => {
    const { userData } = useUser()


    const url = useLocation()
    const pages = [
        { name: 'Controle Comercial', url: paths.control.path, icon: <Home />, access: paths.control.access },
        { name: 'Emitir Contratos', url: paths.signContracts.path, icon: <GetContracts />, access: paths.signContracts.access },
        { name: 'Relatórios', url: paths.comissionalControl.path, icon: <ComissionScreen />, access: paths.comissionalControl.access },
        { name: 'Pedidos', url: paths.orders.path, icon: <ShoppingBasketIcon />, access: paths.orders.access },
        { name: 'Configurações', url: paths.config.path, icon: <SettingsIcon />, access: paths.config.access },
    ]

    return (
        <div>
            {
                userData.name === "Marco" &&
                pages.map((text) => (
                    text.access.some(res => res === userData.role) &&
                    <label htmlFor="link"
                        key={text.name}
                    >

                        <ListItem
                            disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 60,
                                    justifyContent: openSidebar.open ? 'initial' : 'right',
                                    px: 2,
                                }}
                            >
                                <Links
                                    id="link"
                                    key={text.name}
                                    to={text.url}
                                    active={url.pathname === text.url && true} >

                                    {text.icon}
                                    {text.name}

                                    <ListItemText
                                        primary={text.name}
                                        sx={{ opacity: openSidebar.open ? 1 : 0 }}
                                    />

                                </Links>

                            </ListItemButton>

                        </ListItem>
                    </label>
                ))

            }
        </div >
    )
}

Navigation.propTypes = {}

// export default CreateUsersForm
