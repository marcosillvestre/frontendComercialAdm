import React from 'react'

import { ContractData, Select, SureSendModal } from '../../../components/source.jsx'
import { useUser } from '../../../hooks/userContext'
import { paths } from '../../constants/paths.js'
import URI from '../../utils/utils.jsx'
import { Box, Button, Container, Header, SendContract } from './styles'


export const Contracts = () => {
    const [emmit, setEmmit] = React.useState(false)

    const { contracts, setContracts,
        userData, setFilteredContracts, logOut,
        filteredContracts } = useUser()

    const personalText = {
        PDF: "Ao emitir via PDF o arquivo será baixado logo em seguida, ele também será enviado ao Conta Azul!",
        autentique: <p>
            Ao enviar um contrato via Autentique você deve
            selecionar um contrato já existente.
            Ele será enviado via
            whatsapp, após enviar você poderá copiar o link
            para para o cliente!
        </p>,
        contaAzul: "Ao enviar um contrato ao Conta Azul ele somente estará disponível no Conta Azul!"
    }

    async function data(e) {
        if (e.value !== '') {
            // await axios.get(`http://localhost:7070/contrato/${e}`, { headers })
            await URI.get(`/contrato/${e}`)
                .then(info => {
                    info.data && filteringBySeller(info.data)
                }).catch(err => {
                    if (err.response.data.error === 'token invalid') {
                        window.location.href = paths.home
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

            <Header className='search'>
                <nav>
                    <div className='inputs'>
                        <label htmlFor="">

                            <p>Funil:</p>
                            <Select
                                label={""}
                                option={
                                    [
                                        { name: "Funil-de-Vendas-PTB" },
                                        { name: "Funil-de-Rematrícula-PTB" },
                                        { name: "Funil-de-Vendas-Centro" },
                                        { name: "Funil-de-Rematrículas-Centro" },
                                    ]
                                }
                                width="12rem"
                                field="type"
                                fn={[data]}
                            />
                        </label>

                        <label htmlFor="">
                            <p>Cliente: </p>
                            <input onChange={(e) => filterData(e.target.value)} list='person' />
                            <datalist id='person'>
                                {
                                    contracts && contracts.map(res => (
                                        <option
                                            key={res.contrato}
                                            value={res.contrato}
                                        >{res.name}</option>

                                    ))
                                }
                            </datalist>

                        </label>
                    </div>


                    {
                        filteredContracts !== undefined &&
                        filteredContracts[0] !== undefined &&
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
                                        data={"PDF"}
                                        text={personalText.PDF} />
                                </SendContract>
                                <SendContract $emmit={emmit}>
                                    <SureSendModal
                                        data={"Autentique"}
                                        text={personalText.autentique} />
                                </SendContract>
                                <SendContract $emmit={emmit}>
                                    <SureSendModal
                                        data={"Conta Azul"}
                                        text={personalText.contaAzul} />
                                </SendContract>
                            </Box>
                        </span>
                    }
                </nav>
            </Header>

            <ContractData />


        </Container>
    )

}




