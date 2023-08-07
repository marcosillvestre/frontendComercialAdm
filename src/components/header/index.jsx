import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import aw from '../../assets/aw.png';
import { useUser } from '../../hooks/userContext';
import { Adduser, ComissionScreen, Container, GetContracts, Image, LogOut, Name } from "./styles";


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
        <Container user >
            <nav>
                <a href="/controle-comercial"> <Image src={aw} alt="American way" /></a>
            </nav>
            {user ?
                <>
                    <nav>
                        {userData?.role === 'comercial' || userData?.role === 'gerencia' ?
                            <Link to="/contratos-por-assinar"><GetContracts style={{ height: "3rem", width: "3rem" }} /></Link> : ""}
                    </nav>
                    <nav>
                        {userData?.role === 'direcao' ?
                            <Link to="/cadastro"><Adduser style={{ height: "3rem", width: "3rem" }} /></Link> : ""}
                    </nav>


                    <nav>
                        {userData?.role === 'direcao' || userData?.role === 'administrativo' ?
                            <Link to="/controle-comissional"><ComissionScreen style={{ height: "3rem", width: "3rem" }} /></Link> : ""}
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