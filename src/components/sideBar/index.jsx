import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useUser } from '../../hooks/userContext';
import { CloserClick, Header } from '../source.jsx';

import { toast } from 'react-toastify';
import { useContractsHook } from '../../hooks/contracts/contracts.hook.jsx';
import { useCustomFields } from '../../hooks/customFields/customFIelds.hook.jsx';
import { useUsers } from '../../hooks/users/usersContext.hook.jsx';
import { Contracts } from './contracts/contract.create.jsx';
import { CustomFields } from './customFields/customField.create.jsx';
import { Navigation } from './navigation/navigation.jsx';
import {
    Form,
    Submit
} from './styles';
import { CreateUsersForm } from './users/customField.create.jsx';

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

    const { openSidebar, setOpenSidebar, typeSidebar,
        setTypeSidebar, userData } = useUser()

    const { person, createUsers } = useUsers()

    const { customFields,
        createCustomFIeld, } = useCustomFields()


    const { createContracts, contractData } = useContractsHook()



    const handleDrawerOpen = () => {
        setOpenSidebar(true);
        setTypeSidebar(0)
    };



    const handleDrawerClose = () => {
        setTypeSidebar(0)
        setOpenSidebar(false);
    };



    const submit = (type) => {
        const submitCustomField = () => {
            if (!customFields.label) {
                return alert("O 'nome do campo' é obrigatório!")
            }
            createCustomFIeld.mutateAsync()


        }

        const submitContracts = () => {
            if (!contractData.some(r => r.label === 'name') && !contractData.some(r => r.label === 'user')) {
                return alert("Os campos 'Nome' e 'Vendedor' são obrigatórios!")
            }

            createContracts.mutateAsync()

        }

        const submitUsers = () => {

            if (!person.name || !person.email || !person.password || !person.confirmPassword || !person.role) {
                return toast.error("Preencha todos os campos")
            }
            if (person.password !== person.confirmPassword) {
                return toast.error("As senhas devem coincidir")
            }
            createUsers.mutateAsync()


        }

        type === 1 && submitCustomField()
        type === 2 && submitContracts()
        type === 3 && submitUsers()

    }








    return (
        <>
            <CloserClick
                open={openSidebar}
                fn={setOpenSidebar} opacity={0}
            />
            <Box sx={{ display: 'flex', }}>
                <CssBaseline />
                <AppBar position="fixed" open={openSidebar} sx={{ backgroundColor: '#2E2F8E' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(openSidebar && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">

                            <Header data={userData} open={openSidebar} />

                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={openSidebar}>
                    <DrawerHeader >
                        <IconButton onClick={handleDrawerClose} style={{ marginTop: "1rem" }} >
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider style={{ marginTop: "1rem" }} />
                    <List>
                        {
                            typeSidebar === 0 &&
                            <Navigation />
                        }
                        <Form>
                            {
                                typeSidebar === 1 &&
                                <CustomFields />

                            }
                            {
                                typeSidebar === 2 &&
                                <Contracts />
                            }

                            {
                                typeSidebar === 3 &&
                                <CreateUsersForm />

                            }
                            <hr />

                            {
                                typeSidebar !== 0 &&
                                <Submit
                                    placeholder="Enviar"
                                    onClick={() => submit(typeSidebar)}
                                >
                                    Enviar
                                </Submit>}

                        </Form>

                    </List>


                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />

                </Box>
            </Box >
        </>

    );
}