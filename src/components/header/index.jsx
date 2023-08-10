
import React, { useEffect } from 'react';
import aw from '../../assets/aw.png';
import { useUser } from '../../hooks/userContext';
import { Adduser, Box, ComissionScreen, Container, GetContracts, Image, Links, LogOut, Name } from "./styles";


const Header = (parsed) => {
    const { logOut, userData } = useUser(false)
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

            <nav className='navbar'>
                <Box >
                    {user ?
                        <>
                            <nav>
<<<<<<< HEAD

=======
>>>>>>> test
                                <Links to="/contratos-por-assinar"><GetContracts /></Links>
                            </nav>
                            <nav>
                                {userData?.role === 'direcao' &&
                                    <Links to="/cadastro"><Adduser /></Links>}
                            </nav>


                            <nav>
<<<<<<< HEAD
                                {userData?.role === 'direcao' || userData.role === 'administrativo' &&
                                    <Links to="/controle-comissional"><ComissionScreen /></Links>
                                }
=======
                                {userData?.role === 'direcao' || userData?.role === 'administrativo' ?
                                    <Links to="/controle-comissional"><ComissionScreen /></Links> : ""}
>>>>>>> test
                            </nav>


                        </>
                        : ""
                    }
                </Box>


            </nav>
            <nav className='nav-name'>
                <p>Olá,</p><Name>{parsed?.data?.name}</Name>
                <LogOut to="/" onClick={() => unLog()}> Sair </LogOut>
            </nav>



        </Container>
    )
}

export default Header