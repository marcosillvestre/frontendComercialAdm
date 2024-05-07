import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { paths } from '../../app/constants/paths.js';
import { useUser } from '../../hooks/userContext';
import { CloserClick, Header, Select } from '../source.jsx';

import { toast } from 'react-toastify';
import { useContractsHook } from '../../hooks/contracts/contracts.hook.jsx';
import { useCustomFields } from '../../hooks/customFields/customFIelds.hook.jsx';
import {
    ButtonIcon,
    ComissionScreen,
    Form,
    GetContracts, History, Home, Input,
    Label,
    Links, Submit
} from './styles';


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
        setTypeSidebar, cfSrted, users } = useUser()

    const { userData } = useUser()

    const { options, setOptions, setCustomFields,
        multiSelectOptions, setMultiSelectOptions,
        createCustomFIeld } = useCustomFields()


    const { createContracts, setContractData
    } = useContractsHook()

    const url = useLocation()


    const [fieldData, setFieldData] = useState([])
    // const [options, setOptions] = useState([])
    // const [multiSelectOptions, setMultiSelectOptions] = useState([])


    const handleDrawerOpen = () => {
        setOpenSidebar(true);
        setTypeSidebar(0)
    };





    const handleDrawerClose = () => {
        setTypeSidebar(0)
        setOpenSidebar(false);
    };


    const pages = [
        { name: 'Controle Comercial', url: paths.control, icon: <Home />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
        { name: 'Emitir Contratos', url: paths.signContracts, icon: <GetContracts />, access: ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico'] },
        { name: 'Relatórios', url: paths.comissionalControl, icon: <ComissionScreen />, access: ['administrativo', 'direcao', 'gerencia'] },

        // { name: 'Novos Cadastros', url: paths.newRegister, icon: <PersonAddAlt1Icon />, access: ['direcao',] },
        { name: 'Histórico', url: paths.historic, icon: <History />, access: ['direcao'] },

        { name: 'Configurações', url: paths.config, icon: <SettingsIcon />, access: ['direcao'] },
    ]

    const [required, setRequired] = useState(false)

    const opt = useRef()


    console.log(multiSelectOptions)
    console.log(fieldData)
    console.log(typeSidebar)

    const sender = async (field, data) => {
        if (field !== undefined && data !== undefined) {
            if (typeSidebar === 1) {
                setFieldData({ ...fieldData, [field]: data })
            }
            if (typeSidebar === 2) {
                setFieldData([...fieldData, { label: field, value: data }])

            }
        }
    }
    const multiSelectSender = async (field, data) => {
        const index = multiSelectOptions.findIndex(r => r.label === field)

        setMultiSelectOptions(multiSelectOptions.some(r => r?.label === field) ?
            [{ label: field, value: [...multiSelectOptions[index].value, data] }] :
            [...multiSelectOptions, { label: field, value: [data] }]
        )

    }


    const submit = (type) => {
        const submitCustomField = () => {
            if (!fieldData.label) {
                return alert("O 'nome do campo' é obrigatório!")
            }

            setCustomFields(fieldData)
            toast.promise(
                createCustomFIeld.mutateAsync(),
                {
                    pending: 'Conferindo os dados',
                    success: 'Campo criado com sucesso',
                    error: 'Algo deu errado'
                }

            )
        }

        const submitContracts = async () => {
            if (!fieldData.name && !fieldData.user) {
                return alert("Os campos 'Nome' e 'Vendedor' são obrigatórios!")
            }

            setContractData(fieldData)
            toast.promise(
                createContracts.mutateAsync(),
                {
                    pending: 'Conferindo os dados',
                    success: 'Novo contrato criado com sucesso',
                    error: 'Algo deu errado'
                }

            )
        }

        type === 1 ? submitCustomField() : submitContracts()
        // handleDrawerClose()
    }




    const possibilities = {
        "String": 'text',
        "Number": 'number',
        "Date": 'date',
    }



    return (
        <>
            <CloserClick
                open={openSidebar}
                fn={setOpenSidebar} opacity={.3}
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
                            pages.map((text) => (
                                text.access.some(res => res === userData.role) &&

                                <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 60,
                                            justifyContent: openSidebar ? 'initial' : 'right',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: openSidebar ? 1 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                        </ListItemIcon>

                                        {

                                            <Links key={text.name} to={text.url} active={url.pathname === text.url} >
                                                {text.icon}
                                                <ListItemText primary={text.name} sx={{ opacity: openSidebar ? 1 : 0 }} />
                                            </Links>

                                        }

                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                        <Form>
                            {
                                typeSidebar === 1 &&
                                < >
                                    <Label htmlFor="">
                                        <p>Nome do campo:</p>
                                        <Input
                                            type="text"
                                            onBlur={(e) => sender("label", e.target.value)}
                                        />
                                    </Label>

                                    <Label htmlFor="">
                                        <p>Tipo:</p>
                                        <Select
                                            label={"String"}
                                            option={
                                                [
                                                    { name: "Texto" },
                                                    { name: "Número" },
                                                    { name: "Data" },
                                                    { name: "Seleção única" },
                                                    { name: "Multi-Select" }
                                                ]
                                            }
                                            width="100%"
                                            field="type"
                                            where="customField"
                                            fn={[sender]}
                                        />
                                    </Label>
                                    <Label htmlFor="">
                                        <p>Obrigatório:</p>

                                        <FormGroup>
                                            <FormControlLabel
                                                control={<Switch />}
                                                label=""
                                                onClick={() => {
                                                    setRequired(!required)
                                                    sender("required", !required)
                                                }}
                                            />
                                        </FormGroup>
                                    </Label>

                                    {
                                        fieldData.type &&
                                        fieldData.type.includes('Select') &&
                                        <Label htmlFor="">
                                            <p>Opções:</p>
                                            <div
                                                className='container'
                                            >

                                                <Input
                                                    type="text"
                                                    name="options"
                                                    style={{ width: "9rem" }}
                                                    ref={opt}
                                                />
                                                <ButtonIcon
                                                    onClick={() => {
                                                        opt.current.value !== '' &&
                                                            setOptions([...options, opt.current.value])
                                                    }}
                                                >
                                                    <SendIcon />

                                                </ButtonIcon>
                                            </div>
                                            <div
                                                className='container-options-group'>

                                                {
                                                    options &&
                                                    options.map((res, index) => (
                                                        <span
                                                            className='options-group'
                                                            key={index}
                                                            onClick={() => {
                                                                setOptions(options.filter(r => r !== res))
                                                            }}
                                                        >

                                                            <p >{res}</p>
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                        </Label>
                                    }
                                </>
                            }
                            {
                                typeSidebar === 2 &&
                                <>
                                    <Label >
                                        <p>Nome</p>
                                        < Input
                                            type="text"
                                            onBlur={(e) => {
                                                sender("name", e.target.value)
                                            }}
                                        />
                                    </Label>
                                    <Label >
                                        <p>Vendedor</p>
                                        <Select
                                            label={""}
                                            option={users}
                                            width="100%"
                                            field={"user"}
                                            where="newContract"
                                            fn={[sender]}
                                        />
                                    </Label>
                                    {
                                        cfSrted &&
                                        cfSrted.map(res => (
                                            <Label key={res.id}>
                                                <p>{res.label}</p>
                                                {
                                                    possibilities[res.type] ?
                                                        < Input
                                                            type={res.type}
                                                            onBlur={(e) => {
                                                                sender(res.label, e.target.value)
                                                            }}
                                                        />
                                                        :
                                                        <div
                                                            className='multi-container'>
                                                            <div
                                                                className='container'
                                                            >
                                                                <Select
                                                                    label={res.options[0]}
                                                                    option={res.options.map(opt => {
                                                                        return { "name": opt }
                                                                    })}
                                                                    width="100%"
                                                                    field={res.label}
                                                                    where="newContract"
                                                                    fn={[res.type === "MultiSelect" ? multiSelectSender : sender]}
                                                                />
                                                                {
                                                                    res.type === "MultiSelect" &&
                                                                    <ButtonIcon
                                                                        onClick={() => {
                                                                            sender(res.label, multiSelectOptions.filter(ms => ms.label === res.label)[0].value)
                                                                            toast.success("Gravado com sucesso")

                                                                        }}
                                                                    >
                                                                        <SendIcon />
                                                                    </ButtonIcon>
                                                                }
                                                            </div>

                                                            {
                                                                res.type === "MultiSelect" &&
                                                                multiSelectOptions.some(r => r.label === res.label) &&
                                                                < div
                                                                    className='container-options-group'>
                                                                    {
                                                                        multiSelectOptions
                                                                            .map((r, index) => (
                                                                                r.label === res.label &&
                                                                                r.value.map(v => (
                                                                                    <span
                                                                                        className='options-group'
                                                                                        key={index}
                                                                                        onClick={() => {
                                                                                            let data = multiSelectOptions.filter(m => m.label === r.label)[0]
                                                                                            data.value = data.value.filter(dv => dv !== v)
                                                                                            setMultiSelectOptions([data])

                                                                                            data.value.length !== 0 ?
                                                                                                setFieldData([...fieldData.filter(fd => fd.label !== res.label), data]) :
                                                                                                setFieldData(fieldData.filter(fd => fd.label !== res.label))
                                                                                        }}
                                                                                    >
                                                                                        <p key={v}>{v}</p>


                                                                                    </span>
                                                                                ))
                                                                            ))
                                                                    }
                                                                </div>

                                                            }
                                                        </div>


                                                }
                                            </Label>
                                        ))
                                    }


                                </>
                            }
                            <hr />

                            <Submit
                                placeholder="Enviar"
                                onClick={() => submit(typeSidebar)}
                            >
                                Enviar
                            </Submit>

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