import { useData } from '../../hooks/dataContext.jsx'
import { useUser } from '../../hooks/userContext'
import { Box, Button, ComeBackButton, Container, ContainerData, NavBar, SendContract, TableBody } from './styles'



import ReplyIcon from '@mui/icons-material/Reply'
import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'
import { useEffect, useLayoutEffect, useState } from 'react'
import { parseNumber } from '../../app/utils/functions/parseNumbers.jsx'
import { useCampaign } from '../../hooks/campaign/campaignContext.hook.jsx'
import { useSignContracts } from '../../hooks/signContracts/sign.hook.jsx'
import { SureSendModal } from '../source.jsx'
import { PDFFile } from './templates/contract.jsx'


export const ContractData = () => {
    gsap.registerPlugin(Flip)

    const { filteredContracts, setFilteredContracts } = useUser()
    const { content, view, setView } = useData()
    const [emmit, setEmmit] = useState(false)
    const [camp, setcamp] = useState({})
    const { setContractOptions, allContracts, setContract } = useSignContracts()


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





    const [paymentParcels, setPaymentParcels] = useState({
        parcels: [],
        total: 0,
        descount: 0
    })
    const [material, setmaterial] = useState()
    const [tax, settax] = useState()



    const paymentMethodsForMaterials = {
        "Boleto": "price_ticket",
        "Cartão de crédito via link": "price_link",
        "Cartão de crédito via outro bancos": "price_card",
        "Cartão de débito via outros bancos": "price_cash",
        "Dinheiro": "price_ticket",
        "PIX - Pagamento Instantâneo": "price_cash",
        "Pix": "price_cash",
        "Pix cobrança": "price_cash",
        "Sem pagamento": "price_selling",
        "Isenção": "price_selling",
        "Transferência bancária": "price_cash",
        "Outros": "price_ticket",
    }

    const paymentMethodsForParcels = {
        "boleto": 0.1,
        "cartão de débito via outros bancos": 0.1,
        "dinheiro": 0.1,
        "pix cobrança": 0.1,
        "transferência bancária": 0.1,

        "sem pagamento": 0,
        "isenção": 0,
        "outros": 0,

        "débito automático": 0.15,
        "cartão de crédito via link": 0.15,

        "cartão de crédito via outro bancos": 0.2,

        "pix": 0.3,
    }


    const defineValueForParcels = (cursoValor, type, parcelsNumber) => {
        const typePayment = type.toLowerCase()
        if (paymentMethodsForParcels[typePayment.toLowerCase()] === undefined) return alert("Forma de pagamento para parcelas impróprio! Corrija no RD")


        const descountForPontuality =
            (cursoValor / parcelsNumber) * paymentMethodsForParcels[typePayment]

        return {
            fullValue: cursoValor,
            descount: paymentMethodsForParcels[typePayment] === 0.1 ?
                Math.ceil(descountForPontuality) * parcelsNumber : (descountForPontuality * parcelsNumber).toFixed(2),
            descountForPontuality: paymentMethodsForParcels[typePayment] === 0.1 ?
                Math.ceil(descountForPontuality) : descountForPontuality.toFixed(2)
        }
    }


    const defineValueForMaterials = async (array, search) => {
        let value = []

        if (!paymentMethodsForMaterials[filteredContracts["Forma de pagamento do MD"]]) return alert("Forma de pagamento para os materiais didáticos impróprio! Corrija no RD")


        for (let index = 0; index < array.length; index++) {
            const element = array[index];


            const splited = element.split(" / ")
            const material = search.find(f => f.sku === splited[1])

            material !== undefined &&
                value.push({
                    fullValue: material["price_ticket"],
                    total: material[paymentMethodsForMaterials[filteredContracts["Forma de pagamento do MD"]]],
                })
        }


        const total = value.reduce((acc, curr) => acc + curr.total, 0).toFixed(2)
        const descount = (value.reduce((acc, curr) => acc + curr.fullValue, 0) - total).toFixed()


        return { total, descount }
    }


    const defineDescountValueForType = (value, descount, descountType) => {

        const types = {
            Percentage: (value * descount) / 100,
            Exchange: value - descount,
            Value: descount
        }

        return types[descountType]
    }


    async function filterCampaigns() {
        if (!filteredContracts["Tipo de Campanha / Convênio"]) return {
            parcel: undefined,
            material: undefined,
            tax: undefined,
        }
        const settedCampaign = await filteredContracts["Tipo de Campanha / Convênio"]
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
    const activeCampaignForParcel = async (campaignParcel) => {

        const { fullValue, descount, descountForPontuality } = await defineValueForParcels(
            filteredContracts["valorCurso"],
            filteredContracts["Forma de pagamento da parcela"],
            parseNumber(filteredContracts["Número de parcelas do curso"])
        )

        let array = []


        for (let index = 0; index < parseInt(filteredContracts["Número de parcelas do curso"]); index++) {

            const campaignDescount = await defineDescountValueForType(
                (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])),
                campaignParcel.value,
                campaignParcel.descountType
            )

            index + 1 <= campaignParcel.affectedParcels ?
                array.push({
                    valor:
                        ((fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])) -
                            campaignDescount).toFixed(2)
                }) :
                array.push({
                    valor:
                        (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])).toFixed(2)
                })
        }

        setPaymentParcels({
            parcels: array,
            total: fullValue,
            descount,
            descountForPontuality
        })

        filteredContracts["parcel"] = {
            parcels: array,
            descount,
            campaign: campaignParcel,
            total: fullValue,
            descountForPontuality,

        }

    }

    const activeCampaignForMaterial = async (campaignMaterial, insumes) => {

        const { total, descount } = await defineValueForMaterials(filteredContracts["Material didático"], insumes);
        const mdValor = total - parseNumber(filteredContracts["Valor do desconto material didático"])


        const campaignDescount = await defineDescountValueForType(
            mdValor,
            campaignMaterial.value,
            campaignMaterial.descountType
        )

        const materials = []

        for (let index = 0; index < parseNumber(filteredContracts["Quantidade de parcelas MD"]); index++) {
            materials.push({
                valor: ((mdValor - campaignDescount) / parseNumber(filteredContracts["Quantidade de parcelas MD"])).toFixed(2)
            })
        }
        setmaterial({
            materials,
            total: total,
            descount
        })

        filteredContracts["material"] = {
            materials,
            total: total,
            campaign: campaignMaterial,
            descount

        }

    }

    const activeCampaignForTax = async (campaignTax) => {
        const value = 350 - parseNumber(filteredContracts["Valor do Desconto na Taxa de Matrícula"])

        const campaignDescount = await defineDescountValueForType(
            value,
            campaignTax.value,
            campaignTax.descountType
        )

        const taxValue = value - campaignDescount

        const tx = []
        for (let index = 0; index < filteredContracts["Quantidade de parcelas TM "]; index++) {

            tx.push({ valor: (taxValue / filteredContracts["Quantidade de parcelas TM "]).toFixed(2) })
        }
        settax({
            taxes: tx,
            total: taxValue
        })

        filteredContracts["tax"] = {
            taxes: tx,
            total: taxValue,
            campaign: campaignTax,
            descount: campaignDescount
        }
    }
    ///////////////////////////////







    //////////////Serão ativados caso não haja campanha ativa no contrato
    const sincValueForMaterial = async (campaignMaterial) => {

        const { total, descount } = await defineValueForMaterials(filteredContracts["Material didático"], campaignMaterial)

        const mdValor = total - parseNumber(filteredContracts["Valor do desconto material didático"])

        let materials = []
        for (let index = 0; index < parseNumber(filteredContracts["Quantidade de parcelas MD"]); index++) {
            materials.push({ valor: (mdValor / parseNumber(filteredContracts["Quantidade de parcelas MD"])).toFixed(2) })
        }

        setmaterial({
            materials,
            total: total,
            descount

        })


        filteredContracts["material"] = {
            materials,
            total: total,
            descount
        }
    }



    const sincValueForParcel = async () => {

        const { fullValue, descount, descountForPontuality } = await defineValueForParcels(
            filteredContracts["valorCurso"],
            filteredContracts["Forma de pagamento da parcela"],
            parseNumber(filteredContracts["Número de parcelas do curso"])
        )
        let array = []

        for (let index = 0; index < parseInt(filteredContracts["Número de parcelas do curso"]); index++) {

            array.push({
                valor: (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])).toFixed(2)
            })
        }


        setPaymentParcels({
            parcels: array,
            total: array.reduce((acc, curr) => acc + parseNumber(curr.valor), 0),
            descount,
            descountForPontuality
        })

        filteredContracts["parcel"] = {
            parcels: array,
            total: array.reduce((acc, curr) => acc + parseNumber(curr.valor), 0),
            descount,
            descountForPontuality
        }
    }


    const sincValueForTax = async () => {

        const taxValue = 350 - parseNumber(filteredContracts["Valor do Desconto na Taxa de Matrícula"])
        const tx = []
        for (let index = 0; index < filteredContracts["Quantidade de parcelas TM "]; index++) {

            tx.push({ valor: (taxValue / filteredContracts["Quantidade de parcelas TM "]).toFixed(2) })
        }
        settax({
            taxes: tx,
            total: taxValue
        })

        filteredContracts["tax"] = {
            taxes: tx,
            total: taxValue,
            descount: parseNumber(filteredContracts["Valor do Desconto na Taxa de Matrícula"])
        }
    }
    /////////////////////////////////////

    useLayoutEffect(() => {
        if (paymentParcels.parcels.length === 0) {


            const isThereActive = async () => await filterCampaigns()
            isThereActive()
                .then(async res => {
                    setcamp(res)
                    const { material, parcel, tax } = res

                    material ? activeCampaignForMaterial(material, filteredContracts['products']) : sincValueForMaterial(filteredContracts['products'])

                    parcel ? activeCampaignForParcel(parcel) : sincValueForParcel()
                    tax ? activeCampaignForTax(tax) : sincValueForTax(tax)
                })
        }
    }, [filteredContracts])

    const [activeNavbar, setActiveNavbar] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setActiveNavbar(window.scrollY > 100); // Altera para `true` quando passa de 100px
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <Container>
            {
                filteredContracts !== undefined &&

                <NavBar active={activeNavbar} >
                    <ComeBackButton
                        active={activeNavbar}
                        className='defaultButton button'
                        onClick={() => {
                            setFilteredContracts(undefined)
                            setContractOptions(allContracts)
                            setContract(null)
                        }}>
                        <ReplyIcon />
                    </ComeBackButton>

                    <span
                        className='view emmit'
                    >
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

                    <span className='emmit flex' >

                        <Button
                            className='defaultButton button'
                            open={emmit && true}
                            onClick={() => setEmmit(!emmit)}
                        >
                            Emitir Contrato
                        </Button>

                        <Box $emmit={emmit && true} >
                            {/* <SendContract
                                className='defaultButton'

                                $emmit={emmit && true}>
                                <SureSendModal
                                    data={"PDF"}
                                    text={personalText.PDF} />
                            </SendContract> */}
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
                                                <th>Nome completo</th>
                                                <th>Email</th>
                                                <th>profissão</th>
                                                <th>CPF</th>

                                            </tr>
                                            <tr >
                                                <TableBody empty={filteredContracts["Nome do  "] === "" || filteredContracts["Nome do responsável"] === undefined}>{filteredContracts["Nome do responsável"]}</TableBody>
                                                <TableBody empty={filteredContracts.email === "" || filteredContracts.Email === undefined}>{filteredContracts.Email}</TableBody>
                                                <TableBody nonMandatory={filteredContracts["Profissão"] === "" || filteredContracts["Profissão"] === undefined}>{filteredContracts["Profissão"]}</TableBody>
                                                <TableBody empty={filteredContracts["CPF"] === "" || filteredContracts["CPF"] === undefined}>{filteredContracts["CPF"]}</TableBody>

                                            </tr>
                                            <tr>
                                                <th>Responsável</th>

                                                <th>nascimento resp</th>
                                                <th>Celular</th>
                                                <th>Código do contrato</th>

                                            </tr>
                                            <tr>
                                                <TableBody empty={filteredContracts.vendedor === "" || filteredContracts.vendedor === undefined}>{filteredContracts.vendedor}</TableBody>


                                                <TableBody empty={filteredContracts["Data de nascimento do  responsável"] === "" || filteredContracts["Data de nascimento do  responsável"] === undefined}>{filteredContracts["Data de nascimento do  responsável"]}</TableBody>
                                                <TableBody empty={filteredContracts.CelularResponsavel === "" || filteredContracts.CelularResponsavel === undefined}>{filteredContracts.CelularResponsavel}</TableBody>
                                                <TableBody empty={filteredContracts["Nº do contrato"] === "" || filteredContracts["Nº do contrato"] === undefined}>{filteredContracts["Nº do contrato"]}</TableBody>

                                            </tr>

                                            <tr> <h3>Endereço via CEP</h3></tr>

                                            <tr>
                                                <th>cep</th>
                                                <th>Número</th>
                                                <th>complemento</th>
                                                <th>Endereço</th>

                                            </tr>

                                            <tr >
                                                <TableBody empty={filteredContracts["CEP"] === undefined}>{filteredContracts["CEP"]}</TableBody>
                                                <TableBody empty={filteredContracts["Número"] === undefined}>{filteredContracts["Número"]}</TableBody>
                                                <TableBody empty={filteredContracts["Complemento"] === undefined}>{filteredContracts["Complemento"]}</TableBody>
                                                <TableBody empty={filteredContracts["Endereco"] === undefined}>{filteredContracts["Endereco"]}</TableBody>


                                            </tr>
                                            <tr>

                                                <th>estado </th>
                                                <th>bairro</th>
                                                <th>cidade</th>
                                            </tr>
                                            <tr >

                                                <TableBody empty={filteredContracts["Uf"] === undefined}>{filteredContracts["Uf"]}</TableBody>
                                                <TableBody empty={filteredContracts["Bairro"] === undefined}>{filteredContracts["Bairro"]}</TableBody>
                                                <TableBody empty={filteredContracts["Cidade"] === undefined}>{filteredContracts["Cidade"]}</TableBody>
                                            </tr>

                                            <tr> <h3>Aluno</h3></tr>
                                            <tr>
                                                <th>nome Aluno</th>
                                                <th>nascimento Aluno</th>
                                                <th>Idade</th>

                                            </tr>
                                            <tr>
                                                <TableBody empty={filteredContracts["Nome do aluno"] === "" || filteredContracts["Nome do aluno"] === undefined}>{filteredContracts["Nome do aluno"]}</TableBody>
                                                <TableBody empty={filteredContracts["Data de nascimento do aluno"] === "" || filteredContracts["Data de nascimento do aluno"] === undefined}>{filteredContracts["Data de nascimento do aluno"]}</TableBody>
                                                <TableBody empty={filteredContracts["Idade do Aluno"] === "" || filteredContracts["Idade do Aluno"] === undefined}>{filteredContracts["Idade do Aluno"]}</TableBody>

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
                                            <TableBody empty={filteredContracts["Unidade"] === "" || filteredContracts["Unidade"] === undefined}>{filteredContracts["Unidade"]}</TableBody>
                                            <TableBody empty={filteredContracts["Formato de Aula"] === "" || filteredContracts["Formato de Aula"] === undefined}>{filteredContracts["Formato de Aula"]}</TableBody>
                                            <TableBody empty={filteredContracts["Carga horário do curso"] === "" || filteredContracts["Carga horário do curso"] === undefined}>{filteredContracts["Carga horário do curso"]}</TableBody>
                                            <TableBody empty={filteredContracts["Data da primeira aula"] === "" || filteredContracts["Data da primeira aula"] === undefined}>{filteredContracts["Data da primeira aula"]}</TableBody>
                                            <TableBody empty={filteredContracts["Tipo/ modalidade"] === "" || filteredContracts["Tipo/ modalidade"] === undefined}>{filteredContracts["Tipo/ modalidade"]}</TableBody>
                                            <TableBody empty={filteredContracts["Classe"] === "" || filteredContracts["Classe"] === undefined}>{filteredContracts["Classe"]}</TableBody>
                                        </tr>

                                        <tr>
                                            <th>Material Didático</th>
                                            <th>Background</th>
                                            <th>Subclasse</th>
                                            <th>Observações para o pedagógico</th>

                                        </tr>
                                        <tr>
                                            <TableBody empty={filteredContracts["Material didático"] === "" || filteredContracts["Material didático"] === undefined}>
                                                {filteredContracts["Material didático"].map(res => (
                                                    <p key={res}>
                                                        {res},
                                                    </p>
                                                ))}</TableBody>

                                            <TableBody empty={filteredContracts["Background do Aluno"] === "" || filteredContracts["Background do Aluno"] === undefined}>
                                                {filteredContracts["Background do Aluno"]}
                                            </TableBody>
                                            <TableBody empty={filteredContracts["Subclasse"] === "" || filteredContracts["Subclasse"] === undefined}>{filteredContracts["Subclasse"]}</TableBody>
                                            <TableBody >{filteredContracts["Observações importantes para o pedagógico:"]}</TableBody>


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
                                                <th>valor da Mensalidade</th>
                                                <th>Parcelas</th>
                                                <th>Curso</th>

                                            </tr>

                                            <tr>
                                                <TableBody empty={filteredContracts["Data de vencimento da primeira parcela"] === "" || filteredContracts["Data de vencimento da primeira parcela"] === undefined}>{filteredContracts["Data de vencimento da primeira parcela"]}</TableBody>
                                                <TableBody empty={filteredContracts["Data de vencimento da última parcela"] === "" || filteredContracts["Data de vencimento da última parcela"] === undefined}>{filteredContracts["Data de vencimento da última parcela"]}</TableBody>
                                                <TableBody empty={paymentParcels.parcels.length === 0}>R$ {paymentParcels.parcels[paymentParcels?.parcels.length - 1]?.valor}</TableBody>
                                                <TableBody empty={filteredContracts["Número de parcelas do curso"] === "" || filteredContracts["Número de parcelas do curso"] === undefined}>{filteredContracts["Número de parcelas do curso"]}</TableBody>
                                                <TableBody nonMandatory={filteredContracts["service"] === "" || filteredContracts["service"] === undefined} > {filteredContracts["service"]}</TableBody>

                                            </tr>
                                            <tr>

                                                <th>Parcelas Afetadas</th>
                                                <th>Valor do curso</th>
                                                <th>Forma de pagamento</th>
                                                <th>Desconto por pontualidade</th>

                                            </tr>

                                            <tr>

                                                <TableBody >{camp.parcel !== undefined ? camp.parcel.affectedParcels : 0}</TableBody>
                                                <TableBody nonMandatory={filteredContracts["valorCurso"] === "" || filteredContracts["valorCurso"] === undefined} > {filteredContracts["valorCurso"]}</TableBody>
                                                <TableBody empty={filteredContracts["Forma de pagamento da parcela"] === "" || filteredContracts["Forma de pagamento da parcela"] === undefined}> {filteredContracts["Forma de pagamento da parcela"]}</TableBody>
                                                <TableBody empty={paymentParcels === undefined}>R$ {paymentParcels?.descountForPontuality}</TableBody>

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
                                            paymentParcels.parcels.map((res, index) => (


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
                                                <th>Parcelas </th>

                                            </tr>

                                            <tr>
                                                <TableBody empty={filteredContracts["Material didático"] === "" || filteredContracts["Material didático"] === undefined}>
                                                    {filteredContracts["Material didático"].map(res => (
                                                        <p key={res}>
                                                            {res},
                                                        </p>
                                                    ))}</TableBody>


                                                <TableBody> R${material && material.total}</TableBody>
                                                <TableBody empty={filteredContracts["Quantidade de parcelas MD"] === "" || filteredContracts["Quantidade de parcelas MD"] === undefined}>{filteredContracts["Quantidade de parcelas MD"]}</TableBody>

                                            </tr>
                                            <tr>
                                                <th>Forma de pagamento </th>
                                                <th>Desconto por método de pagamento</th>
                                                <th>Desconto concedido</th>

                                            </tr>

                                            <tr>

                                                <TableBody empty={filteredContracts["Forma de pagamento do MD"] === "" || filteredContracts["Forma de pagamento do MD"] === undefined}>{filteredContracts["Forma de pagamento do MD"]}</TableBody>
                                                <TableBody empty={material === undefined}> R${material?.descount}</TableBody>
                                                <TableBody >{parseNumber(filteredContracts["Valor do desconto material didático"])}</TableBody>

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
                                        {
                                            material &&
                                            material.materials.map((res, index) => (
                                                <div
                                                    key={index}
                                                >
                                                    <label htmlFor="">

                                                        <p>parcela n° {index + 1}:</p>
                                                        <input type="number"
                                                            defaultValue={res.valor}
                                                            disabled
                                                        />
                                                    </label>
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
                                                <th>Parcelas</th>

                                            </tr>

                                            <tr>
                                                <TableBody empty={filteredContracts["Data de pagamento TM"] === "" || filteredContracts["Data de pagamento TM"] === undefined}>{filteredContracts["Data de pagamento TM"]}</TableBody>
                                                <TableBody empty={filteredContracts["Forma de pagamento TM"] === "" || filteredContracts["Forma de pagamento TM"] === undefined}> {filteredContracts["Forma de pagamento TM"]}</TableBody>
                                                <TableBody empty={filteredContracts["Valor do Desconto na Taxa de Matrícula"] === undefined}>R${parseNumber(filteredContracts["Valor do Desconto na Taxa de Matrícula"])}</TableBody>
                                                <TableBody empty={filteredContracts["Quantidade de parcelas TM "] === "" || filteredContracts["Quantidade de parcelas TM "] === undefined}>{filteredContracts["Quantidade de parcelas TM "]}</TableBody>

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
                                        {
                                            tax &&
                                            tax.taxes.map((res, index) => (


                                                <div
                                                    key={index}
                                                >
                                                    <label htmlFor="">

                                                        <p>parcela n° {index + 1}:</p>
                                                        <input type="number"
                                                            defaultValue={res.valor}
                                                            disabled
                                                        />
                                                    </label>
                                                </div>
                                            ))
                                        }


                                    </span>
                                </ContainerData>
                            </span>

                        </div>
                    </section>
                    :
                    <div ref={content} >
                        {
                            filteredContracts !== undefined &&
                            <div style={{ display: 'grid', gap: "2rem" }}>
                                <PDFFile id='content' data={filteredContracts} parcel={paymentParcels} campaign={camp} />
                            </div>
                        }
                    </div>


            }
        </Container>
    )
}
