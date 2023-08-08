import React from 'react'

import axios from 'axios'
import Header from '../../components/header'
import { useUser } from '../../hooks/userContext'
import URI from '../utils/utils'
import { Container, SendButton } from './styles'

const Contracts = () => {

    const webhookGerenteComercial = "https://hook.us1.make.com/36kd4bq6u7n66flns4gbzshehem5fw7l"
    const webhookVendedora1 = "https://hook.us1.make.com/oawrexoyph599vfsb6319q290dnag45d"
    // const webhookVendedora2 = "https://hook.us1.make.com/4ddy8s1atvi7qvzrvqgln1tlwy98jjsw"
    // const webhookVendedora3 = "https://hook.us1.make.com/2aa3stdmay5vcat5pla5nuy4ubcdv91e"
    // const webhookVendedora4 = "https://hook.us1.make.com/89stu7vdp6dxocgl837ekvw1z9mgafdb"
    const webhookPrincipal = "https://hook.us1.make.com/ghzwtbkkjlkzfhdg3qiysocrfmhr2ucx"
    const webhookAdministrativo = "https://hook.us1.make.com/hpqek8mfkdd4nqexrrwp8k6ytojdlodn"


    const [filteredContracts, setFilteredContracts] = React.useState()
    const { contracts, headers, setContracts, userData } = useUser()

    const date = new Date()

    async function data(e) {
        await URI.get(`/contrato/${e}`, { headers })
            .then(async info => {
                if (userData.role === 'comercial') {
                    const data = info.data.filter(res => res.vendedor.toLowerCase().includes(userData.name))
                    setContracts(data)
                } else {
                    setContracts(info.data)

                }

            })

    }

    function filterData(e) {
        const data = contracts.filter(res => res.name === e)
        setFilteredContracts(data)
    }

    async function senderContract() {
        const obj = filteredContracts[0]
        obj["dataEmissao"] = date.toLocaleDateString()
        obj["parcelaComDesconto"] = parseInt(obj["valorParcela"]) - parseInt(obj["descontoPorParcela"])
        obj["diaVencimento"] = obj["diaVenvimento"].split("/")[0]

        let link

        if (userData.role === 'gerencia') {
            link = webhookGerenteComercial
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
    }

    return (

        <Container>
            <Header data={userData} />

            <div>

                <select onChange={(e) => data(e.target.value)}>
                    <option value=""></option>
                    <option value="ptb">PTB</option>
                    <option value="centro">centro</option>
                </select>
                <input onChange={(e) => filterData(e.target.value)} list='person' />
                <datalist id='person'>
                    {
                        contracts.map(res => (
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
                            <th>Tipo/Modalidade</th>

                        </tr>
                        <tr key={res.contrato}>
                            <td>{res.name}</td>
                            <td>{res.email}</td>
                            <td>{res.contrato}</td>
                            <td>{res.dataMatricula}</td>
                            <td>{res.classe}</td>
                            <td>{res.unidade}</td>
                            <td>{res.tipoModalidade}</td>
                        </tr>


                        <tr>
                            <th>CPF</th>
                            <th>nascimento resp</th>
                            <th>Celular</th>
                            <th>Endereco</th>
                            <th>Numero</th>
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
                            <th>estado civil</th>
                            <th>cep</th>
                            <th>estadoCivil</th>
                            <th>profissao</th>
                            <th>nomeAluno</th>
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
                            <th>subclasse</th>
                            <th>cargaHoraria</th>
                            <th>paDATA</th>
                            <th>Mensalidade</th>
                            <th>numeroParcelas</th>
                            <th>diaVenvimento</th>
                        </tr>
                        <tr>
                            <td>{res.formato}</td>
                            <td>{res.subclasse}</td>
                            <td>{res.cargaHoraria}</td>
                            <td>{res.paDATA}</td>
                            <td>{res.valorMensalidade}</td>
                            <td>{res.numeroParcelas}</td>
                            <td>{res.diaVenvimento}</td>
                        </tr>
                        <tr>
                            <th>Primeira Parcela</th>
                            <th>Ultima Parcela</th>
                            <th>descontoTotal</th>
                            <th>pp Com Desconto</th>
                            <th>testemunha 1</th>
                            <th>testemunha 2</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>{res.dataPrimeiraParcelaMensalidade}</td>
                            <td>{res.dataUltimaParcelaMensalidade}</td>
                            <td>{res.descontoTotal}</td>
                            <td>{parseInt(res.valorParcela) - parseInt(res.descontoPorParcela)}</td>
                            <td>{res.testemunha1}</td>
                            <td>{res.testemunha2}</td>
                            <td></td>
                        </tr>
                    </tbody>
                ))}

            </table>


            <SendButton onClick={() => senderContract()}>Emitir Contrato</SendButton>
        </Container>
    )
}

export default Contracts