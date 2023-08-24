import React from 'react'

import axios from 'axios'
import ContractData from '../../components/contractData'
import MiniDrawer from '../../components/sideBar'
import { useUser } from '../../hooks/userContext'
import URI from '../utils/utils'
import { Box, Button, Container, SendContract } from './styles'

const Contracts = () => {
    const [emmit, setEmmit] = React.useState(false)

    const webhookGerente = "https://hook.us1.make.com/36kd4bq6u7n66flns4gbzshehem5fw7l"
    const webhookGerenteImpresso = "https://hook.us1.make.com/e3hnjh27wp6in88nxulgqwmda4dr4tol"

    const webhookVendedora1 = "https://hook.us1.make.com/oawrexoyph599vfsb6319q290dnag45d"
    const webhookVendedora1Impresso = "https://hook.us1.make.com/b2yule57cpdg0t8hxuf7ofhj1lrcm6rj"

    const webhookVendedora2 = "https://hook.us1.make.com/zk795dt1no3oaypygq048x84bao0smdr"
    const webhookVendedora2Impresso = "https://hook.us1.make.com/tve9e0v23qlguiqhqfyd894jplvamrq1"

    // const webhookVendedora3 = "https://hook.us1.make.com/2aa3stdmay5vcat5pla5nuy4ubcdv91e"
    // const webhookVendedora4 = "https://hook.us1.make.com/89stu7vdp6dxocgl837ekvw1z9mgafdb"

    const webhookPrincipal = "https://hook.us1.make.com/ghzwtbkkjlkzfhdg3qiysocrfmhr2ucx"
    const webhookPrincipalImpresso = "https://hook.us1.make.com/u5dh3xbxpzbexvnd9bvu1mzfym3nx87r"

    const webhookAdministrativo = "https://hook.us1.make.com/hpqek8mfkdd4nqexrrwp8k6ytojdlodn"
    const webhookAdministrativoImpresso = "https://hook.us1.make.com/7vkxorul0jiegksx2xgoo8bm86l0mqyj"


    const { contracts, headers, setContracts, userData, filteredContracts, setFilteredContracts } = useUser()

    const date = new Date()

    async function data(e) {
        if (e.length !== 0) {
            await URI.get(`/contrato/${e}`, { headers })
                .then(info => {

                    info.data && filteringBySeller(info.data)
                }).catch(err => alert(err.data))
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
            setContracts([{ "name": "Não há ninguém na etapa de matrícula nesse funil!", "contrato": "123" }])
        }
    }

    function filterData(e) {
        if (e !== "Não há ninguém na etapa de matrícula nesse funil!") {
            const data = contracts.filter(res => res.name === e)
            setFilteredContracts(data)
        }
    }


    async function senderContract() {
        if (filteredContracts?.length > 0) {

            const obj = filteredContracts[0]
            obj["dataEmissao"] = date.toLocaleDateString()
            let desc = obj["descontoPorParcela"].split(',')

            obj["valorParcelaDataCerta"] = parseFloat(obj["valorParcela"]) - parseFloat(`${desc[0]}.${desc[1]}`)
            obj["descontoParcelaDataCorreta"] = obj["valorParcelaDataCerta"].toFixed(2)
            obj["diaVencimento"] = obj["diaVenvimento"].split("/")[0]

            let link

            if (userData.role === 'gerencia') {
                link = webhookGerente
            }

            if (userData.role === 'comercial') {
                if (userData.name.toLowerCase().includes("aracelly")) {
                    link = webhookVendedora1
                }

                if (userData.name.toLowerCase().includes("sophia")) {
                    link = webhookVendedora2
                }

            }
            if (userData.role === 'direcao') {
                link = webhookPrincipal
            }
            if (userData.role === 'administrativo') {
                link = webhookAdministrativo
            }

            await axios.post(link, obj)
                .then(res => {
                    alert(res.data)
                })

            contaAzulSender()
        } else {
            alert("Não tem ninguém escolhido para emitir o contrato, você precisa escolher alguém!")
        }
    }

    async function senderImpressContract() {
        if (filteredContracts?.length > 0) {

            const obj = filteredContracts[0]
            obj["dataEmissao"] = date.toLocaleDateString()
            let desc = obj["descontoPorParcela"].split(',')

            obj["valorParcelaDataCerta"] = parseFloat(obj["valorParcela"]) - parseFloat(`${desc[0]}.${desc[1]}`)
            obj["descontoParcelaDataCorreta"] = obj["valorParcelaDataCerta"].toFixed(2)
            obj["diaVencimento"] = obj["diaVenvimento"].split("/")[0]

            console.log(desc)

            let link

            if (userData.role === 'gerencia') {
                link = webhookGerenteImpresso
            }

            if (userData.role === 'comercial') {
                if (userData.name.toLowerCase().includes("aracelly")) {
                    link = webhookVendedora1Impresso
                }
                if (userData.name.toLowerCase().includes("sophia")) {
                    link = webhookVendedora2Impresso
                }
            }
            if (userData.role === 'direcao') {
                link = webhookPrincipalImpresso
            }
            if (userData.role === 'administrativo') {
                link = webhookAdministrativoImpresso
            }

            await axios.post(link, obj)
                .then(res => {
                    alert(res.data)
                })

            contaAzulSender()
        } else {
            alert("Não tem ninguém escolhido para emitir o contrato, você precisa escolher alguém!")
        }
    }

    async function contaAzulSender() {
        const data = {
            "name": `${filteredContracts[0].name}`
        }
        await axios.post("https://connection-with-conta-azul-rbv6l.ondigitalocean.app/cadastros", data)
            .then(() => {
                alert("Matrícula enviada com sucesso ao Conta azul")
            })
    }


    return (

        <Container>
            <MiniDrawer />

            <div className='search'>
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
                            <option key={res.contrato} value={res.name}>{res.name}</option>

                        ))
                    }
                </datalist>
            </div>

            <ContractData />

            <span className='emmit'>
                <Button open={emmit} onClick={() => setEmmit(!emmit)}>Emitir Contrato </Button>
                <Box emmit={emmit} >
                    <SendContract onClick={() => senderContract()}> Online</SendContract>
                    <SendContract onClick={() => senderImpressContract()}> Impresso</SendContract>
                </Box>
            </span>
        </Container>
    )
}

export default Contracts