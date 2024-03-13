import noContract from '../../assets/noContract.svg'
import { useData } from '../../hooks/dataContext.jsx'
import { useUser } from '../../hooks/userContext'
import { ButtonLink, Container, NavBar, TableBody } from './styles'
import Excel from './templates/excel.jsx'
import Idioma from './templates/idioma.jsx'
import Office from './templates/office.jsx'
import Particulares from './templates/particulares.jsx'
import Standard from './templates/standard.jsx'

export const ContractData = () => {

    const { filteredContracts } = useUser()
    const { content, view, setView } = useData()


    const archives = {
        "Kids": <Idioma id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Teens": <Idioma id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Adults and YA": <Idioma id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Little Ones": <Idioma id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Español - En grupo": <Idioma id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Standard One": <Standard id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Fluency Way One - X": <Particulares id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Fluency Way Double - X": <Particulares id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Fluency Way Triple - X": <Particulares id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Español - X1": <Particulares id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Español - X2": <Particulares id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Español - X3": <Particulares id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Pacote Office Essentials": <Office id='content' data={filteredContracts !== undefined && filteredContracts[0]} />,
        "Excel Avaçado": <Excel id='content' data={filteredContracts !== undefined && filteredContracts[0]} />
    }

    console.log(filteredContracts)

    return (
        <Container>
            {
                filteredContracts?.length > 0 &&
                <NavBar>
                    <p>Vizualização em:</p>
                    <div className='buttons'>
                        <ButtonLink
                            onClick={() => setView('table')}
                            open={view === 'table'}
                        >
                            Tabela
                        </ButtonLink>
                        ou
                        <ButtonLink
                            onClick={() => setView('template')}
                            open={view === 'template'}
                        >
                            Template
                        </ButtonLink>
                    </div>
                </NavBar>
            }

            {
                filteredContracts?.length > 0 ? filteredContracts.map(res => (
                    view === 'table' ?
                        <table key={res.contrato}>
                            <tbody key={res.contrato}>
                                <tr style={{ fontWeight: 'bold' }}>Pessoal:</tr>
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
                                    <TableBody empty={res.name === "" || res.name === undefined}>{res.name}</TableBody>
                                    <TableBody empty={res.email === "" || res.email === undefined}>{res.email}</TableBody>
                                    <TableBody empty={res.contrato === "" || res.contrato === undefined}>{res.contrato}</TableBody>
                                    <TableBody empty={res.dataMatricula === "" || res.dataMatricula === undefined}>{res.dataMatricula}</TableBody>
                                    <TableBody empty={res.cpf === "" || res.cpf === undefined}>{res.cpf}</TableBody>
                                    <TableBody empty={res.DatadeNascdoResp === "" || res.DatadeNascdoResp === undefined}>{res.DatadeNascdoResp}</TableBody>
                                    <TableBody empty={res.CelularResponsavel === "" || res.CelularResponsavel === undefined}>{res.CelularResponsavel}</TableBody>
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
                                    <TableBody empty={res.EnderecoResponsavel === "" || res.EnderecoResponsavel === undefined}>{res.EnderecoResponsavel}</TableBody>
                                    <TableBody empty={res.NumeroEnderecoResponsavel === "" || res.NumeroEnderecoResponsavel === undefined}>{res.NumeroEnderecoResponsavel}</TableBody>
                                    <TableBody empty={res.complemento === "" || res.complemento === undefined}>{res.complemento}</TableBody>
                                    <TableBody empty={res.bairro === "" || res.bairro === undefined}>{res.bairro}</TableBody>
                                    <TableBody empty={res.cidade === "" || res.cidade === undefined}>{res.cidade}</TableBody>
                                    <TableBody empty={res.estado === "" || res.estado === undefined}>{res.estado}</TableBody>
                                    <TableBody empty={res.cep === "" || res.cep === undefined}>{res.cep}</TableBody>
                                </tr>
                                <tr>
                                    <th>estado Cívil</th>
                                    <th>profissão</th>
                                    <th>nome Aluno</th>
                                    <th>nascimento Aluno</th>
                                </tr>
                                <tr>
                                    <TableBody empty={res.estadoCivil === "" || res.estadoCivil === undefined}>{res.estadoCivil}</TableBody>
                                    <TableBody empty={res.profissao === "" || res.profissao === undefined}>{res.profissao}</TableBody>
                                    <TableBody empty={res.nomeAluno === "" || res.nomeAluno === undefined}>{res.nomeAluno}</TableBody>
                                    <TableBody empty={res.nascimentoAluno === "" || res.nascimentoAluno === undefined}>{res.nascimentoAluno}</TableBody>
                                </tr>


                                <tr style={{ fontWeight: 'bold' }}>Pedagógico:</tr>
                                <tr>
                                    <th>Unidade</th>
                                    <th>formato</th>
                                    <th>Subclasse</th>
                                    <th>Carga Horária</th>
                                    <th>PA. Data</th>
                                    <th>Tipo/Modalidade</th>
                                    <th>Classe</th>
                                </tr>

                                <tr>
                                    <TableBody empty={res.unidade === "" || res.unidade === undefined}>{res.unidade}</TableBody>
                                    <TableBody empty={res.formato === "" || res.formato === undefined}>{res.formato}</TableBody>
                                    <TableBody empty={res.subclasse === "" || res.subclasse === undefined}>{res.subclasse}</TableBody>
                                    <TableBody empty={res.cargaHoraria === "" || res.cargaHoraria === undefined}>{res.cargaHoraria}</TableBody>
                                    <TableBody empty={res.paDATA === "" || res.paDATA === undefined}>{res.paDATA}</TableBody>
                                    <TableBody empty={res.tipoModalidade === "" || res.tipoModalidade === undefined}>{res.tipoModalidade}</TableBody>
                                    <TableBody empty={res.classe === "" || res.classe === undefined}>{res.classe}</TableBody>
                                </tr>

                                <tr>
                                    <th>Material didático</th>
                                    <th>Valor do material didático</th>
                                </tr>
                                <tr>
                                    <TableBody empty={res.materialDidatico === "" || res.materialDidatico === undefined}>
                                        {res.materialDidatico.map(res => (
                                            <p key={res}>
                                                {res},
                                            </p>
                                        ))}</TableBody>
                                    <TableBody empty={res.mdValor === "" || res.mdValor === undefined}>R$ {res.mdValor}</TableBody>

                                </tr>



                                <tr style={{ fontWeight: 'bold' }}>Financeiro:</tr>

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

                                    <TableBody empty={res.dataPrimeiraParcelaMensalidade === "" || res.dataPrimeiraParcelaMensalidade === undefined}>{res.dataPrimeiraParcelaMensalidade}</TableBody>
                                    <TableBody empty={res.dataUltimaParcelaMensalidade === "" || res.dataUltimaParcelaMensalidade === undefined}>{res.dataUltimaParcelaMensalidade}</TableBody>
                                    <TableBody empty={res.descontoTotal === "" || res.descontoTotal === undefined}>R$ {res.descontoTotal}</TableBody>
                                    <TableBody empty={res.descontoPorParcela === "" || res.descontoPorParcela === undefined}>R$ {res.descontoPorParcela}</TableBody>
                                    <TableBody empty={res.valorMensalidade === "" || res.valorMensalidade === undefined}>R$ {res.valorMensalidade}</TableBody>
                                    <TableBody >R$ {parseFloat(parseInt(res.valorMensalidade) - parseInt(res.descontoPorParcela))}</TableBody>
                                    <TableBody empty={res?.valorCurso === "" || res.valorCurso === undefined} >R$ {res?.valorCurso}</TableBody>
                                </tr>
                                <tr>
                                    <th>Número de Parcelas</th>
                                    <th>Dia Vencimento</th>
                                    <th>Taxa de matrícula</th>

                                </tr>
                                <tr>
                                    <TableBody empty={res.numeroParcelas === "" || res.numeroParcelas === undefined}>{res.numeroParcelas}</TableBody>
                                    <TableBody empty={res.diaVenvimento === "" || res.diaVenvimento === undefined}>{res.diaVenvimento}</TableBody>
                                    <TableBody empty={res.tmValor === "" || res.tmValor === undefined}>R$ {res.tmValor}</TableBody>

                                </tr>

                            </tbody>
                        </table>
                        :
                        <div key={res.contrato} ref={content}>
                            {
                                archives[filteredContracts !== undefined && filteredContracts[0].subclasse]
                            }
                        </div>
                ))

                    :
                    <div >
                        <details >
                            <p className='parag'>Deseja emitir um contrato ? Selecione
                                o Funil de vendas desejado na opção <q>Funil</q> e logo em seguida na
                                opção <q>Cliente</q> selecione a sua matrícula no RD Station
                                que já está na etapa de Matrícula!
                            </p>
                        </details>
                        <img style={{ margin: '5rem auto' }} src={noContract} alt="Empty data representation" />
                    </div>
            }
        </Container>
    )
}
