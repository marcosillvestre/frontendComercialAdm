import SettingsIcon from '@mui/icons-material/Settings';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation } from 'react-router-dom';
import { paths } from "../../../app/constants/paths";
import { useUser } from "../../../hooks/userContext";
import {
    ComissionScreen,
    GetContracts,
    History,
    Home,
    Links,
} from "../styles";

export const Navigation = (openSidebar) => {
    const { userData } = useUser()

    const url = useLocation()
    const pages = [
        { name: 'Controle Comercial', url: paths.control, icon: <Home />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
        { name: 'Emitir Contratos', url: paths.signContracts, icon: <GetContracts />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
        { name: 'Relatórios', url: paths.comissionalControl, icon: <ComissionScreen />, access: ['administrativo', 'direcao', 'gerencia'] },

        { name: 'Histórico', url: paths.historic, icon: <History />, access: ['direcao'] },

        { name: 'Configurações', url: paths.config, icon: <SettingsIcon />, access: ['direcao'] },
    ]

    return (
        <div>
            {
                pages.map((text) => (
                    text.access.some(res => res === userData.role) &&

                    <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                                minHeight: 60,
                                justifyContent: openSidebar.open ? 'initial' : 'right',
                                px: 2.5,
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: openSidebar.open ? 1 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                            </ListItemIcon>

                            {

                                <Links
                                    key={text.name}
                                    to={text.url}
                                    active={url.pathname === text.url} >

                                    {text.icon}
                                    {text.name}
                                    <ListItemText
                                        primary={text.name}
                                        sx={{ opacity: openSidebar.open ? 1 : 0 }}
                                    />
                                </Links>

                            }

                        </ListItemButton>
                    </ListItem>
                ))

            }
        </div>
    )
}

Navigation.propTypes = {}

// export default CreateUsersForm
