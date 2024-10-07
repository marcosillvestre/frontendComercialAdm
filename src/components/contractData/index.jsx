import { useData } from '../../hooks/dataContext.jsx'
import { useUser } from '../../hooks/userContext'
import { Container, NavBar, TableBody } from './styles'
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

import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import noContract from '../../assets/noContract.svg'
import OfficeIntensivo from './templates/office-intensivo.jsx'
export const ContractData = () => {
    gsap.registerPlugin(Flip)

    const { filteredContracts } = useUser()
    const { content, view, setView } = useData()


    let bool = filteredContracts !== undefined

    let standard;


    if (bool) {
        if (filteredContracts.promocao === "Não" && filteredContracts.background !== "Rematrícula") {
            standard = <Standard id='content' data={filteredContracts} />
        }
        if (filteredContracts.promocao !== "Não" && filteredContracts.background !== "Rematrícula") {
            standard = <StandardPromo id='content' data={filteredContracts} />
        }
        if (filteredContracts.promocao !== "Não" && filteredContracts.background === "Rematrícula") {
            standard = <StandardPromoRem id='content' data={filteredContracts} />
        }
        if (filteredContracts.promocao === "Não" && filteredContracts.background === "Rematrícula") {
            standard = <StandardRem id='content' data={filteredContracts} />
        }
    }

    const archives = {
        "Standard One": standard,
        "Adults and YA": bool ? filteredContracts.promocao === "Não" ? <Idioma id='content' data={filteredContracts} /> : <IdiomaPromo id='content' data={filteredContracts} /> : "",

        "Kids": bool ? filteredContracts.promocao === "Não" ? <Idioma id='content' data={filteredContracts} /> : <IdiomaPromo id='content' data={filteredContracts} /> : "",
        "Teens": bool ? filteredContracts.promocao === "Não" ? <Idioma id='content' data={filteredContracts} /> : <IdiomaPromo id='content' data={filteredContracts} /> : "",
        "Little Ones": bool ? filteredContracts.promocao === "Não" ? <Idioma id='content' data={filteredContracts} /> : <IdiomaPromo id='content' data={filteredContracts} /> : "",
        "Español - En grupo": bool ? filteredContracts.promocao === "Não" ? <Idioma id='content' data={filteredContracts} /> : <IdiomaPromo id='content' data={filteredContracts} /> : "",


        "Fluency Way 4X - X": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",

        "Fluency Way One - X": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",
        "Fluency Way One -X": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",
        "Fluency Way Double -X": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",
        "Fluency Way Triple - X": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",
        "Español - X1": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",
        "Español -  X2": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",
        "Español - X3": bool ? filteredContracts.promocao === "Não" ? <Particulares id='content' data={filteredContracts} /> : <ParticularesPromo id='content' data={filteredContracts} /> : "",
        "Pacote Office Essentials": bool ? filteredContracts.promocao === "Não" ? <Office id='content' data={filteredContracts} /> : <OfficePromo id='content' data={filteredContracts} /> : "",
        "Excel Avaçado": bool ? filteredContracts.promocao === "Não" ? <Excel id='content' data={filteredContracts} /> : <ExcelPromo id='content' data={filteredContracts} /> : "",
        "Office Essential Intensivo": <OfficeIntensivo id='content' data={filteredContracts} />
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

    const buttonsLinks = document.querySelectorAll(".button-link")
    const active = document.querySelector(".active")

    buttonsLinks.forEach((button, idx) => {
        button.addEventListener('click', () => {

            const ac = button.classList.contains('ac')
            if (!ac) {
                button.classList.add('ac')
                buttonsLinks.forEach((other, otherIdx) => {
                    idx !== otherIdx && other.classList.remove('ac')
                })

            }
            const state = Flip.getState(active)
            button.appendChild(active)

            Flip.from(state, {
                duration: 1.5,
                absolute: true,
                ease: 'elastic.out(1,0.5)'
            })

        })
    })


    return (
        <Container>
            {
                filteredContracts !== undefined &&

                <NavBar>
                    <p>Visualização em</p>
                    <div className='buttons'>
                        <div
                            onClick={() => setView('table')}
                            open={view === 'table'}
                            className='button-link ac'
                        >
                            <p>Tabela </p>
                            <div className='active'></div>
                        </div>

                        |

                        <div
                            onClick={() => setView('template')}
                            open={view === 'template'}
                            className='button-link'

                        >
                            <p>Contrato</p>
                        </div>
                    </div>
                </NavBar>
            }

            {
                filteredContracts !== undefined ?
                    view === 'table' ?
                        <table >
                            <tbody >
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
                                <tr >
                                    <TableBody empty={filteredContracts.name === "" || filteredContracts.name === undefined}>{filteredContracts.name}</TableBody>
                                    <TableBody empty={filteredContracts.email === "" || filteredContracts.email === undefined}>{filteredContracts.email}</TableBody>
                                    <TableBody empty={filteredContracts.contrato === "" || filteredContracts.contrato === undefined}>{filteredContracts.contrato}</TableBody>
                                    <TableBody empty={filteredContracts.dataMatricula === "" || filteredContracts.dataMatricula === undefined}>{filteredContracts.dataMatricula}</TableBody>
                                    <TableBody empty={filteredContracts.cpf === "" || filteredContracts.cpf === undefined}>{filteredContracts.cpf}</TableBody>
                                    <TableBody empty={filteredContracts.DatadeNascdoResp === "" || filteredContracts.DatadeNascdoResp === undefined}>{filteredContracts.DatadeNascdoResp}</TableBody>
                                    <TableBody empty={
                                        filteredContracts.CelularResponsavel === "" ||
                                        filteredContracts.CelularResponsavel === undefined}>
                                        {filteredContracts.CelularResponsavel}</TableBody>
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
                                    <TableBody empty={filteredContracts.EnderecoResponsavel === "" || filteredContracts.EnderecoResponsavel === undefined}>{filteredContracts.EnderecoResponsavel}</TableBody>
                                    <TableBody empty={filteredContracts.NumeroEnderecoResponsavel === "" || filteredContracts.NumeroEnderecoResponsavel === undefined}>{filteredContracts.NumeroEnderecoResponsavel}</TableBody>
                                    <TableBody empty={filteredContracts.complemento === "" || filteredContracts.complemento === undefined}>{filteredContracts.complemento}</TableBody>
                                    <TableBody empty={filteredContracts.bairro === "" || filteredContracts.bairro === undefined}>{filteredContracts.bairro}</TableBody>
                                    <TableBody empty={filteredContracts.cidade === "" || filteredContracts.cidade === undefined}>{filteredContracts.cidade}</TableBody>
                                    <TableBody empty={filteredContracts.estado === "" || filteredContracts.estado === undefined}>{filteredContracts.estado}</TableBody>
                                    <TableBody empty={filteredContracts.cep === "" || filteredContracts.cep === undefined}>{filteredContracts.cep}</TableBody>
                                </tr>
                                <tr>
                                    <th>estado Cívil</th>
                                    <th>profissão</th>
                                    <th>nome Aluno</th>
                                    <th>nascimento Aluno</th>
                                    <th>Responsável</th>
                                </tr>
                                <tr>
                                    <TableBody empty={filteredContracts.estadoCivil === "" || filteredContracts.estadoCivil === undefined}>{filteredContracts.estadoCivil}</TableBody>
                                    <TableBody nonMandatory={filteredContracts.profissao === "" || filteredContracts.profissao === undefined}>{filteredContracts.profissao}</TableBody>
                                    <TableBody empty={filteredContracts.nomeAluno === "" || filteredContracts.nomeAluno === undefined}>{filteredContracts.nomeAluno}</TableBody>
                                    <TableBody empty={filteredContracts.nascimentoAluno === "" || filteredContracts.nascimentoAluno === undefined}>{filteredContracts.nascimentoAluno}</TableBody>
                                    <TableBody empty={filteredContracts.vendedor === "" || filteredContracts.vendedor === undefined}>{filteredContracts.vendedor}</TableBody>

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
                                    <TableBody empty={filteredContracts.unidade === "" || filteredContracts.unidade === undefined}>{filteredContracts.unidade}</TableBody>
                                    <TableBody empty={filteredContracts.formato === "" || filteredContracts.formato === undefined}>{filteredContracts.formato}</TableBody>
                                    <TableBody empty={filteredContracts.cargaHoraria === "" || filteredContracts.cargaHoraria === undefined}>{filteredContracts.cargaHoraria}</TableBody>
                                    <TableBody empty={filteredContracts.paDATA === "" || filteredContracts.paDATA === undefined}>{filteredContracts.paDATA}</TableBody>
                                    <TableBody empty={filteredContracts.tipoModalidade === "" || filteredContracts.tipoModalidade === undefined}>{filteredContracts.tipoModalidade}</TableBody>
                                    <TableBody empty={filteredContracts.classe === "" || filteredContracts.classe === undefined}>{filteredContracts.classe}</TableBody>
                                    <TableBody empty={filteredContracts.subclasse === "" || filteredContracts.subclasse === undefined}>{filteredContracts.subclasse}</TableBody>
                                </tr>

                                <tr>
                                    <th>Material Didático</th>
                                    <th>Background</th>
                                </tr>
                                <tr>
                                    <TableBody empty={filteredContracts.materialDidatico === "" || filteredContracts.materialDidatico === undefined}>
                                        {filteredContracts.materialDidatico.map(res => (
                                            <p key={res}>
                                                {res},
                                            </p>
                                        ))}</TableBody>

                                    <TableBody empty={filteredContracts.background === "" || filteredContracts.background === undefined}>
                                        {filteredContracts.background}
                                    </TableBody>


                                </tr>



                                <tr style={{ fontWeight: 'bold' }}>Financeiro:</tr>

                                <tr>

                                    <th>Observações para o financeiro</th>
                                    <th>Primeira Parcela</th>
                                    <th>última Parcela</th>
                                    <th>Desconto Total</th>
                                    <th>Desconto por Parcela</th>
                                    <th>valor cheio da Mensalidade</th>
                                    <th>Valor da Mensalidade com Desconto</th>
                                </tr>
                                <tr>
                                    <TableBody nonMandatory={filteredContracts.obsFinanceiro === "" || filteredContracts.obsFinanceiro === undefined}>{filteredContracts.obsFinanceiro}</TableBody>
                                    <TableBody empty={filteredContracts.dataPrimeiraParcelaMensalidade === "" || filteredContracts.dataPrimeiraParcelaMensalidade === undefined}>{filteredContracts.dataPrimeiraParcelaMensalidade}</TableBody>
                                    <TableBody empty={filteredContracts.dataUltimaParcelaMensalidade === "" || filteredContracts.dataUltimaParcelaMensalidade === undefined}>{filteredContracts.dataUltimaParcelaMensalidade}</TableBody>
                                    <TableBody empty={filteredContracts.descontoTotal === "" || filteredContracts.descontoTotal === undefined}>R$ {filteredContracts.descontoTotal}</TableBody>
                                    <TableBody empty={filteredContracts.descontoPorParcela === "" || filteredContracts.descontoPorParcela === undefined}>R$ {filteredContracts.descontoPorParcela}</TableBody>
                                    <TableBody empty={filteredContracts.valorMensalidade === "" || filteredContracts.valorMensalidade === undefined}>R$ {filteredContracts.valorMensalidade}</TableBody>
                                    <TableBody >R$ {parsingFloats(filteredContracts.valorMensalidade, filteredContracts.descontoPorParcela)} </TableBody>

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
                                    <TableBody empty={filteredContracts.valorCurso === "" || filteredContracts.valorCurso === undefined} >R$ {filteredContracts.valorCurso}</TableBody>

                                    <TableBody empty={filteredContracts.numeroParcelas === "" || filteredContracts.numeroParcelas === undefined}>{filteredContracts.numeroParcelas}</TableBody>
                                    <TableBody empty={filteredContracts.diaVenvimento === "" || filteredContracts.diaVenvimento === undefined}>{filteredContracts.diaVenvimento}</TableBody>
                                    <TableBody empty={filteredContracts.tmValor === "" || filteredContracts.tmValor === undefined}>R$ {filteredContracts.tmValor}</TableBody>
                                    <TableBody empty={filteredContracts.mdValor === "" || filteredContracts.mdValor === undefined}>R$ {filteredContracts.mdValor}</TableBody>

                                    <TableBody empty={isNaN(parseInt(filteredContracts.mdDesconto)) || filteredContracts.mdDesconto === undefined}>R$ {filteredContracts.mdDesconto}</TableBody>
                                    <TableBody empty={isNaN(parseInt(filteredContracts.mdDesconto)) || filteredContracts.mdDesconto === undefined}>
                                        R$ {parsingFloats(filteredContracts.mdValor, filteredContracts.mdDesconto)}
                                    </TableBody>

                                </tr>

                                <tr>
                                    <th>Parcelas Afetadas</th>
                                    <th>Desconto nas Primeiras Parcelas</th>
                                    <th>Demais Parcelas</th>
                                    <th>Desconto nas Demais Parcelas</th>
                                    <th>Promoção</th>
                                    <th>Tipo de assinatura</th>
                                </tr>
                                <tr>
                                    <TableBody nonMandatory={filteredContracts.parcelasAfetadas === "" || filteredContracts.parcelasAfetadas === undefined} > {filteredContracts.parcelasAfetadas}</TableBody>
                                    <TableBody nonMandatory={filteredContracts.descontoPrimeirasParcelas === "" || filteredContracts.descontoPrimeirasParcelas === undefined} >R$ {filteredContracts.descontoPrimeirasParcelas}</TableBody>
                                    <TableBody nonMandatory={filteredContracts.demaisParcelas === "" || filteredContracts.demaisParcelas === undefined} >R$ {filteredContracts.demaisParcelas}</TableBody>
                                    <TableBody nonMandatory={filteredContracts.descontoDemaisParcelas === "" || filteredContracts.descontoDemaisParcelas === undefined} >R$ {filteredContracts.descontoDemaisParcelas}</TableBody>
                                    <TableBody promo={filteredContracts.promocao === "Sim"}> {filteredContracts.promocao}</TableBody>
                                    <TableBody > {filteredContracts.acFormato}</TableBody>
                                </tr>
                            </tbody>
                        </table>
                        :
                        <div ref={content}>
                            {
                                archives[filteredContracts !== undefined &&
                                filteredContracts.subclasse]
                            }
                        </div>

                    :
                    <div className='empty'>
                        <img style={{ margin: '5rem auto' }} src={noContract} alt="Empty data representation" />
                    </div>
            }
        </Container>
    )
}
