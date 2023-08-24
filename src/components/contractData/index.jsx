import { useUser } from '../../hooks/userContext'
import { Container, TableBody } from './styles'


const ContracTableBodyata = () => {

    const { filteredContracts } = useUser()
    return (
        <Container>

            {
                filteredContracts?.length > 0 ? filteredContracts.map(res => (
                    <table key={res.contrato}>
                        <tbody key={res.contrato}>
                            <tr><b>Pessoal:</b></tr>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Contrato</th>
                                <th>Data matrícula</th>
                                <th>CPF</th>
                                <th>nascimento resp</th>
                                <th>Celular</th>
                            </tr>
                            <tr key={res.contrato}>
                                <TableBody empty={res.name === ""}>{res.name}</TableBody>
                                <TableBody empty={res.email === ""}>{res.email}</TableBody>
                                <TableBody empty={res.contrato === ""}>{res.contrato}</TableBody>
                                <TableBody empty={res.dataMatricula === ""}>{res.dataMatricula}</TableBody>
                                <TableBody empty={res.cpf === ""}>{res.cpf}</TableBody>
                                <TableBody empty={res.DatadeNascdoResp === ""}>{res.DatadeNascdoResp}</TableBody>
                                <TableBody empty={res.CelularResponsavel === ""}>{res.CelularResponsavel}</TableBody>
                            </tr>


                            <tr>
                                <th>Endereço</th>
                                <th>Número</th>
                                <th>complemento</th>
                                <th>bairro</th>
                                <th>cidade</th>
                                <th>estado </th>
                                <th>cep</th>

                            </tr>

                            <tr >
                                <TableBody empty={res.EnderecoResponsavel === ""}>{res.EnderecoResponsavel}</TableBody>
                                <TableBody empty={res.NumeroEnderecoResponsavel === ""}>{res.NumeroEnderecoResponsavel}</TableBody>
                                <TableBody empty={res.complemento === ""}>{res.complemento}</TableBody>
                                <TableBody empty={res.bairro === ""}>{res.bairro}</TableBody>
                                <TableBody empty={res.cidade === ""}>{res.cidade}</TableBody>
                                <TableBody empty={res.estado === ""}>{res.estado}</TableBody>
                                <TableBody empty={res.cep === ""}>{res.cep}</TableBody>
                            </tr>
                            <tr>
                                <th>estado Cívil</th>
                                <th>profissão</th>
                                <th>nome Aluno</th>
                                <th>nascimento Aluno</th>
                            </tr>
                            <tr>
                                <TableBody empty={res.estadoCivil === ""}>{res.estadoCivil}</TableBody>
                                <TableBody empty={res.profissao === ""}>{res.profissao}</TableBody>
                                <TableBody empty={res.nomeAluno === ""}>{res.nomeAluno}</TableBody>
                                <TableBody empty={res.nascimentoAluno === ""}>{res.nascimentoAluno}</TableBody>
                            </tr>


                            <tr><b>Pedagógico:</b></tr>
                            <tr>
                                <th>Unidade</th>
                                <th>formato</th>
                                <th>Subclasse</th>
                                <th>Carga Horária</th>
                                <th>PA Data</th>
                                <th>Tipo/Modalidade</th>
                                <th>Classe</th>

                            </tr>
                            <tr>
                                <TableBody empty={res.unidade === ""}>{res.unidade}</TableBody>
                                <TableBody empty={res.formato === ""}>{res.formato}</TableBody>
                                <TableBody empty={res.subclasse === ""}>{res.subclasse}</TableBody>
                                <TableBody empty={res.cargaHoraria === ""}>{res.cargaHoraria}</TableBody>
                                <TableBody empty={res.paDATA === ""}>{res.paDATA}</TableBody>
                                <TableBody empty={res.tipoModalidade === ""}>{res.tipoModalidade}</TableBody>
                                <TableBody empty={res.classe === ""}>{res.classe}</TableBody>
                            </tr>


                            <tr><b>Financeiro:</b></tr>

                            <tr>
                                <th>Primeira Parcela</th>
                                <th>última Parcela</th>
                                <th>desconto Total</th>
                                <th>Desconto por Parcela</th>
                                <th>valor cheio da Mensalidade</th>
                                <th>Valor da Mensalidade com Desconto</th>
                                <th>Valor do Curso</th>
                            </tr>
                            <tr>

                                <TableBody empty={res.dataPrimeiraParcelaMensalidade === ""}>{res.dataPrimeiraParcelaMensalidade}</TableBody>
                                <TableBody empty={res.dataUltimaParcelaMensalidade === ""}>{res.dataUltimaParcelaMensalidade}</TableBody>
                                <TableBody empty={res.descontoTotal === ""}>R$ {res.descontoTotal}</TableBody>
                                <TableBody empty={res.descontoPorParcela === ""}>R$ {res.descontoPorParcela}</TableBody>
                                <TableBody empty={res.valorMensalidade === ""}>R$ {res.valorMensalidade}</TableBody>
                                <TableBody >R$ {parseFloat(parseInt(res.valorMensalidade) - parseInt(res.descontoPorParcela))}</TableBody>
                                <TableBody empty={res?.valorCurso === ""} >R$ {res?.valorCurso}</TableBody>
                            </tr>
                            <tr>
                                <th>Número de Parcelas</th>
                                <th>Dia Vencimento</th>
                                <th>testemunha 1</th>
                                <th>testemunha 2</th>
                            </tr>
                            <tr>
                                <TableBody empty={res.numeroParcelas === ""}>{res.numeroParcelas}</TableBody>
                                <TableBody empty={res.diaVenvimento === ""}>{res.diaVenvimento}</TableBody>
                                <TableBody empty={res.testemunha1 === ""}>{res.testemunha1}</TableBody>
                                <TableBody empty={res.testemunha2 === ""}>{res.testemunha2}</TableBody>


                            </tr>

                        </tbody>
                    </table>
                )
                ) :
                    <details>
                        <p className='parag'>Deseja emitir um contrato ? Selecione
                            o Funil de vendas desejado na opção <q>Funil</q> e logo em seguida na <br />
                            opção <q>Cliente</q> selecione a sua matrícula no RD Station
                            que já está na etapa de Matrícula!
                        </p>
                    </details>
            }
        </Container>
    )
}

export default ContracTableBodyata