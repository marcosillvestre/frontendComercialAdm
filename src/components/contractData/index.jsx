import { useData } from '../../hooks/dataContext.jsx'
import { useUser } from '../../hooks/userContext'
import { Box, Button, Container, ContainerData, NavBar, SendContract, TableBody } from './styles'
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
import { useEffect, useState } from 'react'
import { parseNumber } from '../../app/utils/functions/parseNumbers.jsx'
import { useCampaign } from '../../hooks/campaign/campaignContext.hook.jsx'
import { useInsume } from '../../hooks/insumes/insumesContext.hook.jsx'
import { SureSendModal } from '../source.jsx'
import OfficeIntensivo from './templates/office-intensivo.jsx'
export const ContractData = () => {
    gsap.registerPlugin(Flip)

    const { filteredContracts, material, setmaterial, tax, settax } = useUser()
    const { content, view, setView } = useData()
    const [emmit, setEmmit] = useState(false)
    const [camp, setcamp] = useState({})


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


    // const parsingFloats = (number1, number2) => {
    //     if (number1 !== undefined && number2 !== undefined) {
    //         const first = number1.includes(",") ? number1.replace(",", ".") : parseFloat(number1)
    //         const secc = number2.includes(",") ? number2.replace(",", ".") : parseFloat(number2)

    //         let data = first - secc
    //         let rounded = data.toFixed(2)
    //         return rounded
    //     }

    // }

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

    const personalText = {
        PDF: "Ao emitir via PDF o download começará em instantes!",
        autentique: "Ao enviar um contrato via Autentique você deve selecionar um arquivo PDF já existente. Ele será enviado via whatsapp, você também poderá copiar o link para enviar ao cliente!",
        contaAzul: "Ao enviar um contrato ao Conta Azul ele somente estará disponível no Conta Azul!"
    }

    const { campaignQuery } = useCampaign()
    const { InsumeQuery, setTake } = useInsume()



    console.log(InsumeQuery)

    const [paymentParcels, setPaymentParcels] = useState([])



    const possibi = {
        'PIX - Pagamento Instantâneo': "price_cash",
        'Cartão de Crédito': "price_card",
        'Cartão de Débito': "price_cash",
        'Dinheiro': "price_cash",
        'Cartão de Crédito via Link': "price_card",
        'PIX Cobrança': "price_cash",
        'Transferência Bancária': "price_cash",
        'Boleto Bancário': "price_ticket",

        'Sem pagamento': undefined,
        'Isenção': undefined,
    }

    const defineValue = (array, search) => {
        let value = []

        for (let index = 0; index < array.length; index++) {
            const element = array[index];


            const splited = element.split(" / ")
            const material = search.find(f => f.sku === splited[1])

            material !== undefined &&
                value.push(material[possibi[filteredContracts.mdFormaPg]])
        }
        return value.reduce((acc, curr) => acc + curr, 0)
    }

    async function filterCampaigns() {
        if (!filteredContracts.campanha) return {
            parcel: undefined,
            material: undefined,
            tax: undefined,
        }
        const settedCampaign = await filteredContracts.campanha
        let parcel;
        let material;
        let tax;
        for (const element of settedCampaign) {
            const campaignFiltered = campaignQuery.data.find(res => res.name === element && res.status === true)

            if (!campaignFiltered) continue

            const { for: destiny } = campaignFiltered

            if (destiny === "Parcel") {
                parcel = campaignFiltered
            }
            if (destiny === "Material") {
                material = campaignFiltered
            }
            if (destiny === "Tax") {
                tax = campaignFiltered
            }
        }

        return {
            parcel,
            material,
            tax
        }
    }



    ////////////// Só serao ativados se houver uma campanha nesse contrato
    const activeCampaignForParcel = (campaignParcel) => {

        let array = []


        for (let index = 0; index < parseInt(filteredContracts?.numeroParcelas); index++) {

            const campaignDescount = campaignParcel.descountType === "Percentage" ?
                (filteredContracts.valorCurso / parseNumber(filteredContracts.numeroParcelas) -
                    parseNumber(filteredContracts.descontoPorParcela)) * campaignParcel.value / 100 :
                campaignParcel.value

            index + 1 <= campaignParcel.affectedParcels ?
                array.push({
                    valor:
                        ((filteredContracts.valorCurso / parseNumber(filteredContracts.numeroParcelas) -
                            parseNumber(filteredContracts.descontoPorParcela)) -
                            campaignDescount).toFixed(2)
                }) :
                array.push({
                    valor:
                        (filteredContracts.valorCurso / parseNumber(filteredContracts.numeroParcelas) -
                            parseNumber(filteredContracts.descontoPorParcela)).toFixed(2)
                })
        }
        setPaymentParcels(array)
    }

    const activeCampaignForMaterial = async (campaignMaterial, campaign) => {

        const mdValor = await defineValue(filteredContracts.materialDidatico, campaign)

        const campaignDescount = campaignMaterial.descountType === "Percentage" ?
            (parseNumber(mdValor) * campaignMaterial.value / 100) :
            campaignMaterial.value


        const materials = []

        const descount = campaignDescount / filteredContracts.materialDidatico.length

        filteredContracts.materialDidatico.map(res => {
            const splited = res.split(" / ")
            const material = campaign.find(f => f.sku === splited[1])


            material !== undefined &&
                materials.push({
                    name: material.name,
                    sku: material.sku,
                    price: material[possibi[filteredContracts.mdFormaPg]] - descount
                })
        })


        setmaterial({
            materials,
            total: materials.reduce((acc, curr) => acc + curr.price, 0)
        })

    }

    const activeCampaignForTax = async (campaignTax) => {

        const campaignDescount = campaignTax.descountType === "Percentage" ?
            (350 * campaignTax.value / 100) :
            campaignTax.value

        settax({
            total: 350 - filteredContracts.tmDesconto - campaignDescount
        })

    }

    //////////////Serão ativados caso não haja campanha ativa no contrato
    const sincValueForMaterial = async (campaignMaterial) => {

        const materials = []

        filteredContracts.materialDidatico.map(res => {
            const splited = res.split(" / ")
            const material = campaignMaterial.insumes.find(f => f.sku === splited[1])

            material !== undefined &&
                materials.push({
                    name: material.name,
                    sku: material.sku,
                    price: possibi[filteredContracts.mdFormaPg] ? material[possibi[filteredContracts.mdFormaPg]] : 0
                })
        })



        setmaterial({
            materials,
            total: materials.reduce((acc, curr) => acc + curr.price, 0) - parseNumber(filteredContracts.mdDesconto)
        })
    }


    const sincValueForParcel = async () => {

        let array = []

        for (let index = 0; index < parseInt(filteredContracts?.numeroParcelas); index++) {

            array.push({
                valor:
                    (filteredContracts.valorCurso / parseNumber(filteredContracts.numeroParcelas) -
                        parseNumber(filteredContracts.descontoPorParcela)).toFixed(2)
            })
        }

        setPaymentParcels(array)
    }

    const sincValueForTax = async () => {

        settax({
            total: 350 - parseNumber(filteredContracts?.tmDesconto)
        })
    }



    useEffect(() => {
        if (
            paymentParcels.length === 0 ||
            InsumeQuery.isSuccess
        ) {
            const isThereActive = async () => await filterCampaigns()


            isThereActive()
                .then(res => {

                    const { material, parcel, tax } = res
                    setcamp(res)
                    setTake(300)


                    material ? activeCampaignForMaterial(material, InsumeQuery.data.insumes) : sincValueForMaterial(InsumeQuery.data)
                    parcel ? activeCampaignForParcel(parcel) : sincValueForParcel()
                    tax ? activeCampaignForTax(tax) : sincValueForTax(tax)
                })
        }
    }, [filteredContracts, InsumeQuery?.data])




    return (
        <Container>
            {
                filteredContracts !== undefined &&

                <NavBar>
                    <span>
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
                    </span>

                    <span className='emmit' >
                        <Button
                            className='defaultButton'
                            open={emmit && true}
                            onClick={() => setEmmit(!emmit)}
                        >
                            Emitir Contrato
                        </Button>

                        <Box $emmit={emmit && true} >
                            <SendContract
                                className='defaultButton'

                                $emmit={emmit && true}>
                                <SureSendModal
                                    data={"PDF"}
                                    text={personalText.PDF} />
                            </SendContract>
                            <SendContract
                                className='defaultButton'
                                $emmit={emmit && true}>
                                <SureSendModal
                                    data={"Autentique"}
                                    text={personalText.autentique} />
                            </SendContract>
                            <SendContract
                                className='defaultButton'

                                $emmit={emmit && true}>
                                <SureSendModal
                                    data={"Conta Azul"}
                                    text={personalText.contaAzul} />
                            </SendContract>
                        </Box>
                    </span>

                </NavBar>
            }

            {
                view === 'table' ?

                    <section
                        className='box'
                    >
                        <div
                            className='container flex'
                        >
                            <span>

                                <ContainerData>
                                    <h3>Dados pessoais:</h3>
                                    <table >
                                        <tbody >
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
                                        </tbody>
                                    </table>

                                </ContainerData>
                            </span>

                        </div>

                        <div
                            className='container flex'
                        >
                            <ContainerData>
                                <h3>Dados pedagógicos:</h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Unidade</th>
                                            <th>formato</th>
                                            <th>Carga Horária</th>
                                            <th>PA. Data</th>
                                            <th>Tipo</th>
                                            <th>Classe</th>
                                        </tr>

                                        <tr>
                                            <TableBody empty={filteredContracts.unidade === "" || filteredContracts.unidade === undefined}>{filteredContracts.unidade}</TableBody>
                                            <TableBody empty={filteredContracts.formato === "" || filteredContracts.formato === undefined}>{filteredContracts.formato}</TableBody>
                                            <TableBody empty={filteredContracts.cargaHoraria === "" || filteredContracts.cargaHoraria === undefined}>{filteredContracts.cargaHoraria}</TableBody>
                                            <TableBody empty={filteredContracts.paDATA === "" || filteredContracts.paDATA === undefined}>{filteredContracts.paDATA}</TableBody>
                                            <TableBody empty={filteredContracts.tipoModalidade === "" || filteredContracts.tipoModalidade === undefined}>{filteredContracts.tipoModalidade}</TableBody>
                                            <TableBody empty={filteredContracts.classe === "" || filteredContracts.classe === undefined}>{filteredContracts.classe}</TableBody>
                                        </tr>

                                        <tr>
                                            <th>Material Didático</th>
                                            <th>Background</th>
                                            <th>Subclasse</th>
                                            <th>Observações para o pedagógico</th>

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
                                            <TableBody empty={filteredContracts.subclasse === "" || filteredContracts.subclasse === undefined}>{filteredContracts.subclasse}</TableBody>
                                            <TableBody >{filteredContracts.observacaoRd}</TableBody>


                                        </tr>
                                    </tbody>
                                </table>
                            </ContainerData>

                        </div>


                        <div
                            className='container flex'
                        >
                            {camp.parcel !== undefined &&
                                <nav className='flex'>
                                    <h1 >Campanha ativa: {camp.parcel?.description}</h1>
                                </nav>
                            }

                            <span
                                className='campaigns'
                            >
                                <ContainerData>

                                    <h3>Dados financeiros(parcela):</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Primeira parcela</th>
                                                <th>Última parcela</th>
                                                <th>Número de parcelas</th>
                                                <th>valor cheio da Mensalidade</th>

                                            </tr>

                                            <tr>
                                                <TableBody empty={filteredContracts.dataPrimeiraParcelaMensalidade === "" || filteredContracts.dataPrimeiraParcelaMensalidade === undefined}>{filteredContracts.dataPrimeiraParcelaMensalidade}</TableBody>
                                                <TableBody empty={filteredContracts.dataUltimaParcelaMensalidade === "" || filteredContracts.dataUltimaParcelaMensalidade === undefined}>{filteredContracts.dataUltimaParcelaMensalidade}</TableBody>
                                                <TableBody empty={filteredContracts.numeroParcelas === "" || filteredContracts.numeroParcelas === undefined}>{filteredContracts.numeroParcelas}</TableBody>
                                                <TableBody empty={filteredContracts.valorMensalidade === "" || filteredContracts.valorMensalidade === undefined}>R$ {filteredContracts.valorMensalidade}</TableBody>

                                            </tr>
                                            <tr>

                                                <th>Parcelas Afetadas</th>
                                                <th>Valor do curso</th>
                                                <th>Forma de pagamento</th>
                                                <th>Desconto por Parcela</th>

                                            </tr>

                                            <tr>

                                                <TableBody >
                                                    {
                                                        camp.parcel !== undefined ?
                                                            camp.parcel.affectedParcels :
                                                            0
                                                    }
                                                </TableBody>
                                                <TableBody nonMandatory={filteredContracts.valorCurso === "" || filteredContracts.valorCurso === undefined} > {filteredContracts.valorCurso}</TableBody>
                                                <TableBody empty={filteredContracts.ppFormaPg === "" || filteredContracts.ppFormaPg === undefined}> {filteredContracts.ppFormaPg}</TableBody>
                                                <TableBody empty={filteredContracts.descontoPorParcela === "" || filteredContracts.descontoPorParcela === undefined}>R$ {filteredContracts.descontoPorParcela}</TableBody>

                                            </tr>

                                        </tbody>
                                    </table>
                                </ContainerData>

                                <ContainerData>
                                    <nav>
                                        <h3>Parcelas:</h3>
                                        <span>

                                        </span>
                                    </nav>
                                    <span
                                        className='divider'
                                    >

                                        {
                                            paymentParcels.map((res, index) => (


                                                <div key={index}
                                                >
                                                    <p>parcela n° {index + 1} :</p>
                                                    <input type="number"
                                                        defaultValue={res.valor}
                                                        disabled
                                                    />
                                                </div>
                                            ))
                                        }

                                    </span>
                                </ContainerData>

                            </span>
                        </div>



                        <div
                            className='container flex'
                        >
                            {camp.material !== undefined &&
                                <nav className='flex'>
                                    <h1 >Campanha ativa: {camp.material?.description}</h1>
                                </nav>
                            }
                            <span
                                className='campaigns'
                            >
                                <ContainerData>
                                    <h3>Dados financeiros(Material didático):</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Material didatico</th>
                                                <th>Valor do Material Didático</th>

                                            </tr>

                                            <tr>
                                                <TableBody empty={filteredContracts.materialDidatico === "" || filteredContracts.materialDidatico === undefined}>
                                                    {filteredContracts.materialDidatico.map(res => (
                                                        <p key={res}>
                                                            {res},
                                                        </p>
                                                    ))}</TableBody>

                                                <TableBody empty={filteredContracts.mdValor === "" || filteredContracts.mdValor === undefined}>R$ {filteredContracts.mdValor}</TableBody>

                                            </tr>
                                            <tr>
                                                <th>Forma de pagamento </th>
                                                <th>Desconto</th>

                                            </tr>

                                            <tr>

                                                <TableBody empty={filteredContracts.mdFormaPg === "" || filteredContracts.mdFormaPg === undefined}>{filteredContracts.mdFormaPg}</TableBody>
                                                <TableBody empty={filteredContracts.mdDesconto === "" || filteredContracts.mdDesconto === undefined}> R${filteredContracts.mdDesconto}</TableBody>

                                            </tr>

                                        </tbody>
                                    </table>
                                </ContainerData>

                                <ContainerData>
                                    <nav>
                                        <h3>Valor:</h3>
                                    </nav>
                                    <span
                                        className='divider'
                                    >


                                        <div
                                        >
                                            <label htmlFor="">

                                                <p>parcela única:</p>
                                                <input type="number"
                                                    defaultValue={material && material.total}
                                                    disabled
                                                // onChange={ }
                                                />
                                            </label>
                                        </div>


                                    </span>
                                </ContainerData>
                            </span>

                        </div>

                        <div
                            className='container flex'
                        >
                            {camp.tax !== undefined &&
                                <nav className='flex'>
                                    <h1 >Campanha ativa: {camp.tax?.description}</h1>
                                </nav>
                            }
                            <span
                                className='campaigns'
                            >

                                <ContainerData>
                                    <h3>Dados financeiros(Taxa de matrícula):</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th>Data de vencimento</th>
                                                <th>Forma de pagamento</th>
                                                <th>Desconto</th>

                                            </tr>

                                            <tr>
                                                <TableBody empty={filteredContracts.tmVencimento === "" || filteredContracts.tmVencimento === undefined}>{filteredContracts.tmVencimento}</TableBody>
                                                <TableBody empty={filteredContracts.tmFormaPg === "" || filteredContracts.tmFormaPg === undefined}>R$ {filteredContracts.tmFormaPg}</TableBody>
                                                <TableBody empty={filteredContracts.tmDesconto === "" || filteredContracts.tmDesconto === undefined}>R$ {filteredContracts.tmDesconto}</TableBody>

                                            </tr>

                                        </tbody>
                                    </table>
                                </ContainerData>

                                <ContainerData>
                                    <nav>
                                        <h3>Valor:</h3>
                                    </nav>
                                    <span
                                        className='divider'
                                    >


                                        <div
                                        >
                                            <label htmlFor="">

                                                <p>parcela única:</p>
                                                <input type="number"
                                                    defaultValue={tax && tax.total}
                                                    disabled
                                                // onChange={ }
                                                />
                                            </label>
                                        </div>


                                    </span>
                                </ContainerData>
                            </span>

                        </div>
                    </section>
                    :
                    <div ref={content}>
                        {
                            archives[filteredContracts !== undefined &&
                            filteredContracts.subclasse]
                        }
                    </div>


            }
        </Container>
    )
}
