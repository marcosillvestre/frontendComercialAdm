import React from 'react'

import ContractData from '../../components/contractData'
import MiniDrawer from '../../components/sideBar'
import SureSendModal from '../../components/sureSendModal'
import { useUser } from '../../hooks/userContext'
import URI from '../utils/utils'
import { Box, Button, Container, SendContract } from './styles'

const Contracts = () => {
    const [emmit, setEmmit] = React.useState(false)

    const { contracts, headers, setContracts, userData, setFilteredContracts, logOut } = useUser()

    const personalText = {
        googleDrive: "Ao emitir pelo Google drive você poderá encontra-lo apenas em sua pasta do drive para impressão, ele também será enviado ao Conta Azul!",
        autentique: "Ao enviar um contrato via Autentique você pode encontra-lo no Google Drive, ele também será enviado ao Conta Azul!",
        contaAzul: "Ao enviar um contrato ao Conta Azul ele somente estará disponível no Conta Azul!"
    }

    async function data(e) {
        if (e.length !== 0) {
            await URI.get(`/contrato/${e}`, { headers })
                .then(info => {
                    info.data && filteringBySeller(info.data)
                }).catch(err => {
                    if (err.response.data.error === 'token invalid') {
                        alert("Faça login novamente, seu acesso expirou")
                        window.location.href = "/"
                        logOut()
                    }
                })
        }
    }

    function filteringBySeller(info) {
        if (info.length > 0) {
            if (userData.role === 'comercial') {
                const data = info.filter(res => res.vendedor.toLowerCase().includes(userData.name.toLowerCase()))
                setContracts(data)
            } else {
                setContracts(info)

            }
        } else {
            setContracts([{ "name": "Não há ninguém na etapa de matrícula nesse funil!", "contrato": "❌" }])
        }
    }

    function filterData(e) {
        if (e !== "Não há ninguém na etapa de matrícula nesse funil!") {
            const data = contracts.filter(res => res.contrato === e)
            setFilteredContracts(data)
        }
    }


    return (

        <Container>
            <MiniDrawer />

            <header className='search'>
                <p>Funil:</p>
                <select onChange={(e) => data(e.target.value)}>
                    <option value=""></option>
                    <option value="Funil-de-Vendas-PTB">Ptb</option>
                    <option value="Funil-de-Rematrícula-PTB">Rematrícula PTB</option>
                    <option value="Funil-de-Vendas-Centro"> Centro</option>
                    <option value="Funil-de-Rematriculas-Centro">Rematrícula Centro</option>
                </select>

                <p>Cliente: </p>
                <input onChange={(e) => filterData(e.target.value)} list='person' />
                <datalist id='person'>
                    {
                        contracts && contracts.map(res => (
                            <option key={res.contrato} value={res.contrato}>{res.name}</option>

                        ))
                    }
                </datalist>

                <span className='emmit'>
                    <Button open={emmit} onClick={() => setEmmit(!emmit)}>Emitir Contrato </Button>
                    <Box emmit={emmit} >
                        <SendContract> <SureSendModal data={"Autentique"} text={personalText.autentique} /></SendContract>
                        <SendContract> <SureSendModal data={"Google Drive"} text={personalText.googleDrive} /></SendContract>
                        <SendContract> <SureSendModal data={"Conta Azul"} text={personalText.contaAzul} /></SendContract>
                    </Box>
                </span>
            </header>

            <ContractData />


        </Container>
    )

}

export default Contracts