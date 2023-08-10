import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import React, { useEffect, useState } from 'react';
import aw from '../../assets/aw.png';
import { useUser } from '../../hooks/userContext';
import { Adduser, Box, ComissionScreen, Container, GetContracts, Image, Links, LogOut, Name } from "./styles";


const Header = (parsed) => {
    const { logOut, userData } = useUser(false)
    const [open, setOpen] = useState(false)
    const [user, setUser] = React.useState()

    function unLog() {
        logOut()
    }
    useEffect(() => {
        if (parsed?.data !== undefined) {
            setUser(true)
        }

    }, [parsed])



    return (
        <Container >
            <nav>
                <a href="/controle-comercial"> <Image src={aw} alt="American way" /></a>
            </nav>

            {user ?
                <>
                    <nav className='navbar'>
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

                    </nav>

                    <nav className='nav-name'>
                        <p>Olá,</p><Name>{parsed?.data?.name}</Name>
                        <LogOut to="/" onClick={() => unLog()}> Sair </LogOut>
                    </nav>
                </>


                : ""
            }



        </Container>
    )
}

export default Header