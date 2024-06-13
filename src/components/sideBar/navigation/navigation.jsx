import SettingsIcon from '@mui/icons-material/Settings';
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
        { name: 'Controle Comercial', url: paths.control, icon: <Home />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
        { name: 'Emitir Contratos', url: paths.signContracts, icon: <GetContracts />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
        { name: 'Relatórios', url: paths.comissionalControl, icon: <ComissionScreen />, access: ['administrativo', 'direcao', 'gerencia', 'comercial'] },
        { name: 'Configurações', url: paths.config, icon: <SettingsIcon />, access: ['direcao'] },
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
