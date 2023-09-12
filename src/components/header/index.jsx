import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import LogoutIcon from '@mui/icons-material/Logout';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import aw from '../../assets/awbr.png';
import { useUser } from '../../hooks/userContext';
import { Adduser, Box, ComissionScreen, Container, GetContracts, Image, Links, LogOut, Name, Nav } from "./styles";


const Header = (parsed) => {
    const { logOut, userData } = useUser(false)
    const [open, setOpen] = useState(false)
    const [user, setUser] = React.useState()

    const location = useLocation()

    function unLog() {
        logOut()
    }
    useEffect(() => {
        if (parsed?.data !== undefined) {
            setUser(true)
        }

    }, [parsed])



    return (
        <Container open={parsed.open} >
            <nav>
                <a href="/controle-comercial">
                    <Image src={aw} alt="American way" location={location.pathname === '/controle-comercial' ? true : undefined} /> :
                </a>
            </nav>

            {user &&
                <>
                    <Nav location={location.pathname === '/controle-comercial' ? true : undefined} >
                        <Box isOpen={open} >
                            <>
                                <nav>
                                    <Links to="/contratos-por-assinar"><GetContracts /></Links>
                                </nav>
                                <nav>
                                    {userData?.role === 'direcao' &&
                                        <Links to="/cadastro"><Adduser /></Links>}
                                </nav>


                                <nav>
                                    {userData?.role === 'direcao' || userData.role === 'administrativo' ?
                                        <Links to="/controle-comissional"><ComissionScreen /></Links> : ""
                                    }
                                </nav>
                            </>
                        </Box>
                        {open ?
                            <div className='arrow' onClick={() => setOpen(!open)}> <KeyboardArrowDownIcon /></div>
                            :
                            <div className='arrow' onClick={() => setOpen(!open)}><KeyboardArrowUpIcon /></div>
                        }
                    </Nav>


                    <nav className='nav-name'>
                        <p>Olá,</p><Name>{parsed?.data?.name}</Name>
                        <LogOut location={location.pathname === '/controle-comercial' ? true : undefined} to="/" onClick={() => unLog()}> Sair  </LogOut>
                        <LogoutIcon style={{ color: "#f13434" }} />
                    </nav>
                </>



            }



        </Container>
    )
}

export default Header