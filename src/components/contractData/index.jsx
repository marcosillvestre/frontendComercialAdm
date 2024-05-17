import noContract from '../../assets/noContract.svg'
import { useData } from '../../hooks/dataContext.jsx'
import { useUser } from '../../hooks/userContext'
import { ButtonLink, Container, NavBar, TableBody } from './styles'
import Excel from './templates/excel.jsx'
import Idioma from './templates/idioma.jsx'
import Office from './templates/office.jsx'
import Particulares from './templates/particulares.jsx'
import Standard from './templates/standard.jsx'

import ExcelPromo from './templates/excel-promo.jsx'
import IdiomaPromo from './templates/idioma-promo.jsx'
import OfficePromo from './templates/office-promo.jsx'
import ParticularesPromo from './templates/particulares-promo.jsx'
import StandardPromo from './templates/standard-promo.jsx'

import StandardPromoRem from './templates/standard-promo-rem.jsx'
import StandardRem from './templates/standard-rem.jsx'

export const ContractData = () => {

    const { filteredContracts } = useUser()
    const { content, view, setView } = useData()


    let bool = filteredContracts !== undefined && filteredContracts.length !== 0
    let body = filteredContracts !== undefined && filteredContracts[0]

    let standard;

    if (bool) {
        if (filteredContracts[0].promocao === "Não" && filteredContracts[0].background !== "Rematrícula") {
            standard = <Standard id='content' data={body} />
        }
        if (filteredContracts[0].promocao !== "Não" && filteredContracts[0].background !== "Rematrícula") {
            standard = <StandardPromo id='content' data={body} />
        }
        if (filteredContracts[0].promocao !== "Não" && filteredContracts[0].background === "Rematrícula") {
            standard = <StandardPromoRem id='content' data={body} />
        }
        if (filteredContracts[0].promocao === "Não" && filteredContracts[0].background === "Rematrícula") {
            standard = <StandardRem id='content' data={body} />
        }
    }

    const archives = {
        "Standard One": standard,
        "Adults and YA": bool ? filteredContracts[0].promocao === "Não" ? <Idioma id='content' data={body} /> : <IdiomaPromo id='content' data={body} /> : "",

        "Kids": bool ? filteredContracts[0].promocao === "Não" ? <Idioma id='content' data={body} /> : <IdiomaPromo id='content' data={body} /> : "",
        "Teens": bool ? filteredContracts[0].promocao === "Não" ? <Idioma id='content' data={body} /> : <IdiomaPromo id='content' data={body} /> : "",
        "Little Ones": bool ? filteredContracts[0].promocao === "Não" ? <Idioma id='content' data={body} /> : <IdiomaPromo id='content' data={body} /> : "",
        "Español - En grupo": bool ? filteredContracts[0].promocao === "Não" ? <Idioma id='content' data={body} /> : <IdiomaPromo id='content' data={body} /> : "",
        "Fluency Way One - X": bool ? filteredContracts[0].promocao === "Não" ? <Particulares id='content' data={body} /> : <ParticularesPromo id='content' data={body} /> : "",
        "Fluency Way Double - X": bool ? filteredContracts[0].promocao === "Não" ? <Particulares id='content' data={body} /> : <ParticularesPromo id='content' data={body} /> : "",
        "Fluency Way Triple - X": bool ? filteredContracts[0].promocao === "Não" ? <Particulares id='content' data={body} /> : <ParticularesPromo id='content' data={body} /> : "",
        "Español - X1": bool ? filteredContracts[0].promocao === "Não" ? <Particulares id='content' data={body} /> : <ParticularesPromo id='content' data={body} /> : "",
        "Español - X2": bool ? filteredContracts[0].promocao === "Não" ? <Particulares id='content' data={body} /> : <ParticularesPromo id='content' data={body} /> : "",
        "Español - X3": bool ? filteredContracts[0].promocao === "Não" ? <Particulares id='content' data={body} /> : <ParticularesPromo id='content' data={body} /> : "",
        "Pacote Office Essentials": bool ? filteredContracts[0].promocao === "Não" ? <Office id='content' data={body} /> : <OfficePromo id='content' data={body} /> : "",
        "Excel Avaçado": bool ? filteredContracts[0].promocao === "Não" ? <Excel id='content' data={body} /> : <ExcelPromo id='content' data={body} /> : ""
    }



    const parsingFloats = (number1, number2) => {
        if (number1 !== undefined && number2 !== undefined) {
            const first = number1.includes(",") ? number1.replace(",", ".") : parseFloat(number1)
            const secc = number2.includes(",") ? number2.replace(",", ".") : parseFloat(number2)

            let data = first - secc
            let rounded = data.toFixed(2)
            return rounded
        }

    }

    return (
        <Container>
            {
                filteredContracts?.length > 0 &&
                <NavBar>
                    <p>Visualização em</p>
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
                            Contrato
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
                                    <th>Data Matrícula</th>
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
                                    <TableBody empty={
                                        res.CelularResponsavel === "" ||
                                        res.CelularResponsavel === undefined}>
                                        {res.CelularResponsavel}</TableBody>
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
                                    <th>Responsável</th>
                                </tr>
                                <tr>
                                    <TableBody empty={res.estadoCivil === "" || res.estadoCivil === undefined}>{res.estadoCivil}</TableBody>
                                    <TableBody nonMandatory={res.profissao === "" || res.profissao === undefined}>{res.profissao}</TableBody>
                                    <TableBody empty={res.nomeAluno === "" || res.nomeAluno === undefined}>{res.nomeAluno}</TableBody>
                                    <TableBody empty={res.nascimentoAluno === "" || res.nascimentoAluno === undefined}>{res.nascimentoAluno}</TableBody>
                                    <TableBody empty={res.vendedor === "" || res.vendedor === undefined}>{res.vendedor}</TableBody>

                                </tr>


                                <tr style={{ fontWeight: 'bold' }}>Pedagógico:</tr>
                                <tr>
                                    <th>Unidade</th>
                                    <th>formato</th>
                                    <th>Carga Horária</th>
                                    <th>PA. Data</th>
                                    <th>Tipo</th>
                                    <th>Classe</th>
                                    <th>Subclasse</th>
                                </tr>

                                <tr>
                                    <TableBody empty={res.unidade === "" || res.unidade === undefined}>{res.unidade}</TableBody>
                                    <TableBody empty={res.formato === "" || res.formato === undefined}>{res.formato}</TableBody>
                                    <TableBody empty={res.cargaHoraria === "" || res.cargaHoraria === undefined}>{res.cargaHoraria}</TableBody>
                                    <TableBody empty={res.paDATA === "" || res.paDATA === undefined}>{res.paDATA}</TableBody>
                                    <TableBody empty={res.tipoModalidade === "" || res.tipoModalidade === undefined}>{res.tipoModalidade}</TableBody>
                                    <TableBody empty={res.classe === "" || res.classe === undefined}>{res.classe}</TableBody>
                                    <TableBody empty={res.subclasse === "" || res.subclasse === undefined}>{res.subclasse}</TableBody>
                                </tr>

                                <tr>
                                    <th>Material Didático</th>
                                    <th>Background</th>
                                </tr>
                                <tr>
                                    <TableBody empty={res.materialDidatico === "" || res.materialDidatico === undefined}>
                                        {res.materialDidatico.map(res => (
                                            <p key={res}>
                                                {res},
                                            </p>
                                        ))}</TableBody>

                                    <TableBody empty={res.background === "" || res.background === undefined}>
                                        {res.background}
                                    </TableBody>


                                </tr>



                                <tr style={{ fontWeight: 'bold' }}>Financeiro:</tr>

                                <tr>

                                    <th>Observações do rd</th>
                                    <th>Primeira Parcela</th>
                                    <th>última Parcela</th>
                                    <th>Desconto Total</th>
                                    <th>Desconto por Parcela</th>
                                    <th>valor cheio da Mensalidade</th>
                                    <th>Valor da Mensalidade com Desconto</th>
                                </tr>
                                <tr>
                                    <TableBody nonMandatory={res.observacaoRd === "" || res.observacaoRd === undefined}>{res.observacaoRd}</TableBody>
                                    <TableBody empty={res.dataPrimeiraParcelaMensalidade === "" || res.dataPrimeiraParcelaMensalidade === undefined}>{res.dataPrimeiraParcelaMensalidade}</TableBody>
                                    <TableBody empty={res.dataUltimaParcelaMensalidade === "" || res.dataUltimaParcelaMensalidade === undefined}>{res.dataUltimaParcelaMensalidade}</TableBody>
                                    <TableBody empty={res.descontoTotal === "" || res.descontoTotal === undefined}>R$ {res.descontoTotal}</TableBody>
                                    <TableBody empty={res.descontoPorParcela === "" || res.descontoPorParcela === undefined}>R$ {res.descontoPorParcela}</TableBody>
                                    <TableBody empty={res.valorMensalidade === "" || res.valorMensalidade === undefined}>R$ {res.valorMensalidade}</TableBody>
                                    <TableBody >R$ {parseFloat(parseFloat(res.valorMensalidade) - parseFloat(res.descontoPorParcela.includes(",") ? `${res.descontoPorParcela.split(",")[0]}.${res.descontoPorParcela.split(",")[1]}` : res.descontoPorParcela))}</TableBody>
                                </tr>
                                <tr>
                                    <th>Valor do Curso</th>
                                    <th>Número de Parcelas</th>
                                    <th>Dia Vencimento</th>
                                    <th>Taxa de Matrícula</th>

                                    <th>Valor do Material Didático</th>
                                    <th>Desconto no Material Didático</th>
                                    <th>Valor do Material Didático com Desconto</th>

                                </tr>
                                <tr>
                                    <TableBody empty={res?.valorCurso === "" || res.valorCurso === undefined} >R$ {res?.valorCurso}</TableBody>

                                    <TableBody empty={res.numeroParcelas === "" || res.numeroParcelas === undefined}>{res.numeroParcelas}</TableBody>
                                    <TableBody empty={res.diaVenvimento === "" || res.diaVenvimento === undefined}>{res.diaVenvimento}</TableBody>
                                    <TableBody empty={res.tmValor === "" || res.tmValor === undefined}>R$ {res.tmValor}</TableBody>
                                    <TableBody empty={res.mdValor === "" || res.mdValor === undefined}>R$ {res.mdValor}</TableBody>

                                    <TableBody empty={isNaN(parseInt(res.mdDesconto)) || res.mdDesconto === undefined}>R$ {res.mdDesconto}</TableBody>
                                    <TableBody empty={isNaN(parseInt(res.mdDesconto)) || res.mdDesconto === undefined}>
                                        R$ {parsingFloats(res.mdValor, res.mdDesconto)}
                                    </TableBody>

                                </tr>

                                <tr>
                                    <th>Parcelas Afetadas</th>
                                    <th>Desconto nas Primeiras Parcelas</th>
                                    <th>Demais Parcelas</th>
                                    <th>Desconto nas Demais Parcelas</th>
                                    <th>Promoção</th>
                                </tr>
                                <tr>
                                    <TableBody nonMandatory={res?.parcelasAfetadas === "" || res.parcelasAfetadas === undefined} > {res?.parcelasAfetadas}</TableBody>
                                    <TableBody nonMandatory={res?.descontoPrimeirasParcelas === "" || res.descontoPrimeirasParcelas === undefined} >R$ {res?.descontoPrimeirasParcelas}</TableBody>
                                    <TableBody nonMandatory={res?.demaisParcelas === "" || res.demaisParcelas === undefined} >R$ {res?.demaisParcelas}</TableBody>
                                    <TableBody nonMandatory={res?.descontoDemaisParcelas === "" || res.descontoDemaisParcelas === undefined} >R$ {res?.descontoDemaisParcelas}</TableBody>
                                    <TableBody promo={res?.promocao === "Sim"}> {res?.promocao}</TableBody>
                                </tr>
                            </tbody>
                        </table>
                        :
                        <div key={res.contrato} ref={content}>
                            {
                                archives[filteredContracts !== undefined &&
                                filteredContracts[0].subclasse]
                            }
                        </div>
                ))

                    :
                    <div className='empty'>
                        <img style={{ margin: '5rem auto' }} src={noContract} alt="Empty data representation" />
                    </div>
            }
        </Container>
    )
}
