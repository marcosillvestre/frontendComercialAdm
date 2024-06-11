
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import React, { useEffect, useState } from 'react';
import { paths } from '../../app/constants/paths';
import aw from '../../assets/awbr.png';
import { useUser } from '../../hooks/userContext';
import { CloserClick } from '../closeClick';
import {
    Container,
    Image,
    LogOut, Name,
    NavList,
    WithNotifications
} from "./styles";

export const Header = (parsed) => {
    const { logOut, userData, setTypeSidebar, setOpenSidebar } = useUser(false)
    const [nav, setNav] = useState(false)
    const [user, setUser] = React.useState()



    function unLog() {
        logOut()
    }

    useEffect(() => {
        if (parsed?.data !== undefined) {
            setUser(true)
        }

    }, [parsed])


    const links = [
        { link: paths.configRegister, label: "Painel de usuários" },
        // { link: paths.configCustomFields, label: "Configurar campos" },
        { link: paths.config, label: "Todas as configurações" },
    ]


    return (
        <>
            <CloserClick
                open={nav}
                fn={setNav} opacity={0}
            />
            <Container open={parsed.open} >
                <nav>
                    <a href={paths.control}>
                        <Image src={aw} alt="American way" /> :
                    </a>
                </nav>

                {user &&
                    <nav className='nav-name'>
                        {
                            userData.role === "direcao" &&
                            <>
                                <div className='anchor'>
                                    <SettingsIcon
                                        onMouseOver={() => setNav(true)}
                                    />

                                    <NavList
                                        active={nav && true}
                                    >
                                        {
                                            links.map(res => (
                                                <ol key={res.link}>
                                                    <a href={res.link}>
                                                        {res.label}
                                                    </a>
                                                </ol>

                                            ))
                                        }
                                    </NavList>

                                </div>

                                <button
                                    className='anchor'
                                    onClick={() => {
                                        setTypeSidebar(4)
                                        setOpenSidebar(true)
                                    }}
                                >
                                    <WithNotifications />
                                </button>
                            </>
                        }
                        <p>Olá,</p><Name>{parsed?.data?.name}</Name>
                        <LogOut to={paths.home} onClick={() => unLog()}> Sair
                            <LogoutIcon style={{ color: "#f13434" }} />
                        </LogOut>
                    </nav>
                }

            </Container>
        </>
    )
}
