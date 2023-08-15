import React from 'react'

import axios from 'axios'
import Header from '../../components/header'
import { useUser } from '../../hooks/userContext'
import URI from '../utils/utils'
import { Box, Button, Container, SendContract } from './styles'

const Contracts = () => {
    const [emmit, setEmmit] = React.useState(false)

    const webhookGerente = "https://hook.us1.make.com/36kd4bq6u7n66flns4gbzshehem5fw7l"
    const webhookGerenteImpresso = "https://hook.us1.make.com/e3hnjh27wp6in88nxulgqwmda4dr4tol"

    const webhookVendedora1 = "https://hook.us1.make.com/oawrexoyph599vfsb6319q290dnag45d"
    const webhookVendedora1Impresso = "https://hook.us1.make.com/b2yule57cpdg0t8hxuf7ofhj1lrcm6rj"

    // const webhookVendedora2 = "https://hook.us1.make.com/4ddy8s1atvi7qvzrvqgln1tlwy98jjsw"
    // const webhookVendedora3 = "https://hook.us1.make.com/2aa3stdmay5vcat5pla5nuy4ubcdv91e"
    // const webhookVendedora4 = "https://hook.us1.make.com/89stu7vdp6dxocgl837ekvw1z9mgafdb"

    const webhookPrincipal = "https://hook.us1.make.com/ghzwtbkkjlkzfhdg3qiysocrfmhr2ucx"
    const webhookPrincipalImpresso = "https://hook.us1.make.com/u5dh3xbxpzbexvnd9bvu1mzfym3nx87r"

    const webhookAdministrativo = "https://hook.us1.make.com/hpqek8mfkdd4nqexrrwp8k6ytojdlodn"
    const webhookAdministrativoImpresso = "https://hook.us1.make.com/7vkxorul0jiegksx2xgoo8bm86l0mqyj"


    const [filteredContracts, setFilteredContracts] = React.useState()
    const { contracts, headers, setContracts, userData } = useUser()

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
                const data = info.filter(res => res.vendedor.toLowerCase().includes(userData.name))
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
        const obj = filteredContracts[0]
        obj["dataEmissao"] = date.toLocaleDateString()
        obj["parcelaComDesconto"] = parseInt(obj["valorParcela"]) - parseInt(obj["descontoPorParcela"])
        obj["diaVencimento"] = obj["diaVenvimento"].split("/")[0]

        let link

        if (userData.role === 'gerencia') {
            link = webhookGerente
        }

        if (userData.role === 'comercial') {
            if (userData.name.includes("aracelly")) {
                link = webhookVendedora1
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
    }

    async function senderImpressContract() {

        const obj = filteredContracts[0]
        obj["dataEmissao"] = date.toLocaleDateString()
        obj["parcelaComDesconto"] = parseInt(obj["valorParcela"]) - parseInt(obj["descontoPorParcela"])
        obj["diaVencimento"] = obj["diaVenvimento"].split("/")[0]

        let link

        if (userData.role === 'gerencia') {
            link = webhookGerenteImpresso
        }

        if (userData.role === 'comercial') {
            if (userData.name.includes("aracelly")) {
                link = webhookVendedora1Impresso
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
    }

    async function contaAzulSender() {
        const data = {
            "name": `${filteredContracts[0].name}`
        }
        await axios.post("https://connection-with-conta-azul-rbv6l.ondigitalocean.app/cadastros", data)
            .then(res => {
                console.log(res.data)
            })

    }
    return (

        <Container>
            <Header data={userData} />

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

            <table>
                {filteredContracts && filteredContracts.map(res => (
                    <tbody key={res.contrato}>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Contrato</th>
                            <th>Data matrícula</th>
                            <th>Classe</th>
                            <th>Unidade</th>
                            <th>Valor do Curso</th>
                        </tr>
                        <tr key={res.contrato}>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.contrato}</td>
                            <td>{res.dataMatricula}</td>
                            <td>{res.classe}</td>
                            <td>{res.unidade}</td>
                            <td>R$ {res?.valorCurso}</td>

                        </tr>


                        <tr>
                            <th>CPF</th>
                            <th>nascimento resp</th>
                            <th>Celular</th>
                            <th>Endereço</th>
                            <th>Número</th>
                            <th>complemento</th>
                            <th>bairro</th>

                        </tr>

                        <tr >
                            <td>{res.cpf}</td>
                            <td>{res.DatadeNascdoResp}</td>
                            <td>{res.CelularResponsavel}</td>
                            <td>{res.EnderecoResponsavel}</td>
                            <td>{res.NumeroEnderecoResponsavel}</td>
                            <td>{res.complemento}</td>
                            <td>{res.bairro}</td>
                        </tr>
                        <tr>
                            <th>cidade</th>
                            <th>estado </th>
                            <th>cep</th>
                            <th>estado Cívil</th>
                            <th>profissão</th>
                            <th>nome Aluno</th>
                            <th>nascimento Aluno</th>
                        </tr>
                        <tr>
                            <td>{res.cidade}</td>
                            <td>{res.estado}</td>
                            <td>{res.cep}</td>
                            <td>{res.estadoCivil}</td>
                            <td>{res.profissao}</td>
                            <td>{res.nomeAluno}</td>
                            <td>{res.nascimentoAluno}</td>
                        </tr>
                        <tr>
                            <th>formato</th>
                            <th>Subclasse</th>
                            <th>Carga Horária</th>
                            <th>PA Data</th>
                            <th>Mensalidade</th>
                            <th>Número de Parcelas</th>
                            <th>Dia Vencimento</th>
                        </tr>
                        <tr>
                            <td>{res.formato}</td>
                            <td>{res.subclasse}</td>
                            <td>{res.cargaHoraria}</td>
                            <td>{res.paDATA}</td>
                            <td>R$ {res.valorMensalidade}</td>
                            <td>{res.numeroParcelas}</td>
                            <td>{res.diaVenvimento}</td>
                        </tr>
                        <tr>
                            <th>Primeira Parcela</th>
                            <th>última Parcela</th>
                            <th>desconto Total</th>
                            <th>Desconto por Parcela</th>
                            <th>testemunha 1</th>
                            <th>testemunha 2</th>
                            <th>Tipo/Modalidade</th>
                        </tr>
                        <tr>

                            <td>{res.dataPrimeiraParcelaMensalidade}</td>
                            <td>{res.dataUltimaParcelaMensalidade}</td>
                            <td>R$ {res.descontoTotal}</td>
                            <td>R$ {res.descontoPorParcela}</td>
                            <td>{res.testemunha1}</td>
                            <td>{res.testemunha2}</td>
                            <td>{res.tipoModalidade}</td>
                        </tr>
                    </tbody>
                ))}

            </table>

            <span>
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