import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsIcon from '@mui/icons-material/Settings';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { paths } from '../../app/constants/paths.js';
import { useUser } from '../../hooks/userContext';
import { CloserClick, Header } from '../source.jsx';
import { ComissionScreen, GetContracts, History, Home, Links } from './styles';


const drawerWidth = 250;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(0)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => {
    return ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    });
});

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { userData } = useUser()


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const url = useLocation()


    return (
        <>
            <CloserClick
                open={open}
                fn={setOpen} opacity={.3}
            />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{ backgroundColor: '#2E2F8E' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">

                            <Header data={userData} open={open} />

                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader >
                        <IconButton onClick={handleDrawerClose} style={{ marginTop: "1rem" }} >
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider style={{ marginTop: "1rem" }} />

                    <List>
                        {[
                            { name: 'Controle Comercial', url: paths.control, icon: <Home />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
                            { name: 'Emitir Contratos', url: paths.signContracts, icon: <GetContracts />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
                            { name: 'Relatórios', url: paths.comissionalControl, icon: <ComissionScreen />, access: ['administrativo', 'direcao', 'gerencia'] },

                            { name: 'Novos Cadastros', url: paths.newRegister, icon: <PersonAddAlt1Icon />, access: ['direcao',] },
                            { name: 'Histórico', url: paths.historic, icon: <History />, access: ['direcao'] },

                            { name: 'Configurações', url: paths.config, icon: <SettingsIcon />, access: ['direcao'] },
                        ]
                            .map((text) => (
                                text.access.some(res => res === userData.role) &&

                                <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 60,
                                            justifyContent: open ? 'initial' : 'right',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 1 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                        </ListItemIcon>



                                        <Links key={text.name} to={text.url} active={url.pathname === text.url} >
                                            {text.icon}
                                            <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                                        </Links>




                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>

                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                </Box>
            </Box>
        </>

    );
}