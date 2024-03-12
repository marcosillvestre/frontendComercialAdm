import React from 'react'

import { ContractData, SureSendModal } from '../../../components/source.jsx'
import { useUser } from '../../../hooks/userContext'
// import URI from '../../utils/utils.jsx'
import URI from '../../utils/utils.jsx'
import { Box, Button, Container, SendContract } from './styles'

export const Contracts = () => {
    const [emmit, setEmmit] = React.useState(false)

    const { contracts, headers, setContracts, userData, setFilteredContracts, logOut } = useUser()


    const personalText = {
        PDF: "Ao emitir via PDF o arquivo será baixado logo em seguida, ele também será enviado ao Conta Azul!",
        autentique: "Ao enviar um contrato via Autentique você pode encontra-lo no Google Drive, ele também será enviado ao Conta Azul!",
        contaAzul: "Ao enviar um contrato ao Conta Azul ele somente estará disponível no Conta Azul!"
    }

    async function data(e) {
        if (e.length !== 0) {
            await URI.get(`/contrato/${e}`, { headers })
                // await axios.get(`http://localhost:7070/contrato/${e}`, { headers })
                .then(info => {
                    info.data && filteringBySeller(info.data)
                }).catch(err => {
                    if (err.response.data.error === 'token invalid') {
                        window.location.href = "/"
                        alert("Faça login novamente, seu acesso expirou")
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

            <header className='search'>
                <div className='inputs'>
                    <p>Funil:</p>
                    <select onChange={(e) => data(e.target.value)}>
                        <option value=""></option>
                        <option value="Funil-de-Vendas-PTB">Ptb</option>
                        <option value="Funil-de-Rematrícula-PTB">Rematrícula PTB</option>
                        <option value="Funil-de-Vendas-Centro"> Centro</option>
                        <option value="Funil-de-Rematrículas-Centro">Rematrícula Centro</option>
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
                </div>

                <div></div>
                <div></div>

                <span className='emmit' >
                    <Button
                        open={emmit}
                        onClick={() => setEmmit(!emmit)}
                    >
                        Emitir Contrato
                    </Button>

                    <Box $emmit={emmit} >
                        <SendContract $emmit={emmit}>
                            <SureSendModal
                                data={"Autentique"}
                                text={personalText.autentique} />
                        </SendContract>
                        <SendContract $emmit={emmit}>
                            <SureSendModal
                                data={"PDF"}
                                text={personalText.PDF} />
                        </SendContract>
                        <SendContract $emmit={emmit}>
                            <SureSendModal
                                data={"Conta Azul"}
                                text={personalText.contaAzul} />
                        </SendContract>
                    </Box>
                </span>
            </header>

            <ContractData />


        </Container>
    )

}




