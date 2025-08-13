import html2pdf from 'html2pdf.js';
import { useData } from '../../hooks/dataContext.jsx';
import { useUser } from '../../hooks/userContext';
import { Aside, Button, ComeBackButton, ComeBackDiv, Container, ContainerData, InputsData, Main, NavBar } from './styles';

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useLayoutEffect, useState } from 'react';
import { dateCalculator } from '../../app/utils/functions/getDates.jsx';
import { changeCurrency, parseNumber } from '../../app/utils/functions/parseNumbers.jsx';
import { useSignContracts } from '../../hooks/signContracts/sign.hook.jsx';
import { InputRegister } from '../inputs/input.update.register/index.jsx';
import { SureSendModal } from '../source.jsx';
import { PDFFile } from './templates/contract.jsx';


export const ContractData = () => {
    gsap.registerPlugin(Flip)

    const { filteredContracts, setFilteredContracts } = useUser();
    const { content, view, setView } = useData()
    const [camp, setcamp] = useState({})
    const { setContract } = useSignContracts()
    const [loading, setLoading] = useState(false)




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

    const [paymentParcels, setPaymentParcels] = useState({
        parcels: [],
        total: 0,
        descount: 0
    })
    const [material, setmaterial] = useState()
    const [tax, settax] = useState()


    const paymentMethodsForMaterials = {
        "Boleto": 0,
        "Cartão de crédito via link": 0,
        "PIX - Pagamento Instantâneo": 0,
        "Sem pagamento": 0,
        "Isenção": 0,
        "Outros": 0,
        "Boleto via outros bancos": 0,

        "Cartão de crédito via outro bancos": 0.2,

        "Cartão de débito via outros bancos": 0.3,
        "Dinheiro": 0.3,
        "Pix": 0.3,
        "Pix cobrança": 0.3,
        "Transferência bancária": 0.3,
    }

    const paymentMethodsForParcels = {
        "boleto": 0.1,
        "boleto via outros bancos": 0.25,
        "cartão de débito via outros bancos": 0.1,
        "dinheiro": 0.25,
        "pix cobrança": 0.1,
        "transferência bancária": 0.1,

        "sem pagamento": 0,
        "isenção": 0,
        "outros": 0.1,

        "débito automático": 0.15,
        "cartão de crédito via link": 0.125,

        "cartão de crédito via outro bancos": 0.175,

        "pix": 0.25,
    }

    const defineDescountValueForTypePayment = (fullValue, parcelsNumber, type, table) => {
        if (table[type] === undefined) return alert("Forma de pagamento impróprio, confira seus dados")

        const value = (fullValue / parcelsNumber) * table[type];

        return {
            total: fullValue,
            descount: value * parcelsNumber,
            descountForPontuality: value
        }
    }

    const sincMaterials = (array, search) => {
        let value = []

        for (let index = 0; index < array.length; index++) {
            const element = array[index];


            const splited = element.split(" / ")
            const material = search.find(f => f.code === splited[1])

            material !== undefined &&
                value.push(material)
        }


        return {
            totalPriceSale: value.reduce((acc, curr) => acc + parseNumber(curr.priceSale), 0),
            array: value
        }
    }


    const defineValueForParcels = (cursoValor, type, parcelsNumber) => {
        const typePayment = type.toLowerCase()
        if (paymentMethodsForParcels[typePayment.toLowerCase()] === undefined) return alert("Forma de pagamento para parcelas impróprio! Corrija no RD")


        const descountForPontuality =
            (cursoValor / parcelsNumber) * paymentMethodsForParcels[typePayment]


        return {
            fullValue: cursoValor,
            descount: paymentMethodsForParcels[typePayment] === 0.1 ?
                Math.ceil(descountForPontuality) * parcelsNumber :
                (descountForPontuality * parcelsNumber).toFixed(2),
            descountForPontuality: paymentMethodsForParcels[typePayment] === 0.1 ?
                Math.ceil(descountForPontuality) : descountForPontuality.toFixed(2)
        }
    }

    const descountForEachMd = async (totalPriceSale) => {

        const { total, descount } = await defineDescountValueForTypePayment(
            totalPriceSale,
            filteredContracts["Quantidade de parcelas MD"],
            filteredContracts["Forma de pagamento do MD"],
            paymentMethodsForMaterials
        )

        return { valor: total, descount }
    }

    const defineValueForMaterials = async (array, search) => {
        let value = []

        if (!paymentMethodsForMaterials[filteredContracts["Forma de pagamento do MD"]]) return alert("Forma de pagamento para os materiais didáticos impróprio! Corrija no RD")


        for (let index = 0; index < array.length; index++) {
            const element = array[index];


            const splited = element.split(" / ")
            const material = search.find(f => f.code === splited[1])

            material !== undefined &&
                value.push({
                    fullValue: material["priceSale"],
                    total: material["priceSale"],
                })
        }


        const total = value.reduce((acc, curr) => acc + parseFloat(curr.total), 0)
        const descount = (value.reduce((acc, curr) => acc + parseFloat(curr.fullValue), 0) - total)

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
        const settedCampaign = await filteredContracts["Tipo de Campanha / Convênio"];

        let parcel;
        let material;
        let tax;


        for (const element of settedCampaign) {

            const campaignFiltered = filteredContracts['campaigns'].find(res => res.name === element)

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

        const { fullValue, descountForPontuality } = await defineValueForParcels(
            filteredContracts["valorCurso"],
            filteredContracts["Forma de pagamento da parcela"],
            parseNumber(filteredContracts["Número de parcelas do curso"])
        )

        let array = []


        const campaignDescount = await defineDescountValueForType(
            (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])),
            campaignParcel.value,
            campaignParcel.descountType
        )


        for (let index = 0; index < parseInt(filteredContracts["Número de parcelas do curso"]); index++) {

            index + 1 <= campaignParcel.affectedParcels ?
                array.push({
                    valor:
                        (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"]) -
                            campaignDescount).toFixed(2),
                    descount:
                        ((fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])) -
                            (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"]) - campaignDescount)).toFixed(2)
                }) :
                array.push({
                    valor:
                        (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])).toFixed(2),
                    descount:
                        (
                            (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])) -
                            (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"]) - descountForPontuality)

                        ).toFixed(2)
                })
        }

        setPaymentParcels({
            parcels: array,
            total: fullValue,
            descount: array.reduce((acc, curr) => parseFloat(curr.descount) + acc, 0),
            descountForPontuality
        })

        filteredContracts["parcel"] = {
            parcels: array,
            descount: array.reduce((acc, curr) => parseFloat(curr.descount) + acc, 0),
            campaign: campaignParcel,
            total: fullValue,
            descountForPontuality,

        }

    }

    const activeCampaignForMaterial = async (campaignMaterial, insumes) => {

        const { total, descount } = await defineValueForMaterials(filteredContracts["Material didático"], insumes);


        const campaignDescount = await defineDescountValueForType(
            total,
            campaignMaterial.value,
            campaignMaterial.descountType
        )


        const materials = []

        for (let index = 0; index < parseNumber(filteredContracts["Quantidade de parcelas MD"]); index++) {
            materials.push({
                valor: ((total - campaignDescount) / parseNumber(filteredContracts["Quantidade de parcelas MD"])).toFixed(2)
            })
        }

        setmaterial({
            materials,
            total,
            descount: descount + campaignDescount
        })

        filteredContracts["material"] = {
            materials,
            total: total,
            campaign: campaignMaterial,
            descount: descount + campaignDescount

        }

    }

    const activeCampaignForTax = async (campaignTax) => {
        const value = 350 - parseNumber(filteredContracts["Valor do Desconto na TM"])

        const campaignDescount = await defineDescountValueForType(
            value,
            campaignTax.value,
            campaignTax.descountType
        )

        const taxValue = value - campaignDescount
        const quantityParcels = filteredContracts["Quantidade de parcelas TM "] ? filteredContracts["Quantidade de parcelas TM "] : 1


        const tx = []
        for (let index = 0; index < quantityParcels; index++) {

            tx.push({ valor: (taxValue / quantityParcels).toFixed(2) })
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
    const sincValueForMaterial = async (material, campaignMaterial) => {

        const materials = [];
        const { totalPriceSale, array } = await sincMaterials(material, campaignMaterial);

        const { valor: total, descount } = await descountForEachMd(totalPriceSale);

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const eachAccount = await descountForEachMd(element.priceSale);

            materials.push(eachAccount);
        }


        setmaterial({
            materials,
            total: total,
            descount

        })

        const account = (total - descount) / filteredContracts["Quantidade de parcelas MD"];
        const rounded = Math.ceil(account * 100) / 100

        filteredContracts["material"] = {
            materials,
            parcels: new Array(parseNumber(filteredContracts["Quantidade de parcelas MD"]))
                .fill({ valor: rounded }),
            total: total,
            descount
        }
    }

    const sincValueForParcel = async () => {

        const { fullValue, descountForPontuality } = await defineValueForParcels(
            filteredContracts["valorCurso"],
            filteredContracts["Forma de pagamento da parcela"],
            parseNumber(filteredContracts["Número de parcelas do curso"])
        )
        let array = []

        for (let index = 0; index < parseInt(filteredContracts["Número de parcelas do curso"]); index++) {

            array.push({
                valor: (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])).toFixed(2),
                descount:
                    (
                        (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"])) -
                        (fullValue / parseNumber(filteredContracts["Número de parcelas do curso"]) - descountForPontuality)

                    ).toFixed(2)
            })
        }


        setPaymentParcels({
            parcels: array,
            total: array.reduce((acc, curr) => acc + parseNumber(curr.valor), 0),
            descount: array.reduce((acc, curr) => parseFloat(curr.descount) + acc, 0),
            descountForPontuality
        })

        filteredContracts["parcel"] = {
            parcels: array,
            total: array.reduce((acc, curr) => acc + parseNumber(curr.valor), 0),
            descount: array.reduce((acc, curr) => parseFloat(curr.descount) + acc, 0),
            descountForPontuality
        }
    }


    const sincValueForTax = async () => {

        const taxValue = 350 - parseNumber(filteredContracts["Valor do Desconto na TM"]);
        const quantityParcels = filteredContracts["Quantidade de parcelas TM "] ? filteredContracts["Quantidade de parcelas TM "] : 1

        const tx = []
        for (let index = 0; index < quantityParcels; index++) {

            tx.push({ valor: (taxValue / quantityParcels).toFixed(2) })
        }
        settax({
            taxes: tx,
            total: taxValue
        })

        filteredContracts["tax"] = {
            taxes: tx,
            total: taxValue,
            descount: parseNumber(filteredContracts["Valor do Desconto na TM"])
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

                    material ? activeCampaignForMaterial(material, filteredContracts['products']) : sincValueForMaterial(filteredContracts["Material didático"], filteredContracts['products'])

                    parcel ? activeCampaignForParcel(parcel) : sincValueForParcel()
                    tax ? activeCampaignForTax(tax) : sincValueForTax(tax)
                })
        }
    }, [filteredContracts])




    const keys = Object.keys(filteredContracts)
        .filter(res => res !== 'id' && res !== 'service' && res !== 'tax' && res !== 'material' && res !== 'parcel' && res !== 'products' && res !== 'campaigns');

    const render = () => {
        setLoading(true);
        const butt = document.getElementById("createDoc");
        butt.innerText = 'Carregando';
        const element = document.getElementById("container1");


        var opt = {
            margin: [0, 0.5, 0, 0],
            filename: `adesao-${filteredContracts["Nome do responsável"]}+${filteredContracts["id"]}`,

            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, letterRendering: true },
            jsPDF: {
                unit: 'mm', format: 'a4', orientation: 'portrait',
                compressPDF: true,
            },
            pagebreak: {
                mode: '',
                before: '.beforeClass',
                after: ['#after1', '#after2'],
                avoid: '.avoid'
            }
        };

        html2pdf().set(opt).from(element).save();

        setTimeout(() => {

            setLoading(false);
            butt.innerText = 'Criar +1';

        }, 3000);

    }

    return (
        <Container>
            <Aside>
                <NavBar>
                    <ComeBackDiv
                        className='flex'
                    >
                        <ComeBackButton

                            className='defaultButton blueButton button'
                            onClick={() => {
                                setFilteredContracts(undefined)
                                setContract(null)
                                setView('table')
                            }}>
                            <SubdirectoryArrowLeftIcon />
                        </ComeBackButton>

                        <ComeBackButton

                            className='defaultButton blueButton button'
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}>
                            <ArrowUpwardIcon />
                        </ComeBackButton>
                    </ComeBackDiv>

                    <span className="view flex">
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
                        {
                            view === 'template' &&
                            <Button
                                id='createDoc'
                                className='defaultButton blueButton'
                                disabled={loading}
                                onClick={() => render()}

                            >
                                Criar documento
                            </Button>
                        }

                        <Button
                            className='defaultButton blueButton'
                        >
                            <SureSendModal
                                data={"Autentique"}
                                text={personalText.autentique} />
                        </Button>
                        <Button
                            className='defaultButton blueButton'
                        >
                            <SureSendModal
                                data={"Conta Azul"}
                                text={personalText.contaAzul} />
                        </Button>



                    </span>

                </NavBar>


                <InputsData>
                    {
                        keys.map((res, index) => (
                            <label key={index}>
                                <p>{res} :</p>

                                <InputRegister
                                    disabled={true}
                                    width="100%"
                                    field={res}
                                    label={filteredContracts[res]}
                                    fn={[]}
                                />
                            </label>
                        ))}
                </InputsData>

            </Aside>


            <Main>
                {
                    view === 'table' ?
                        <section
                            className='box'
                        >

                            <div
                                className='container flex'
                            >

                                <ContainerData>
                                    <h3> CONTRATANTE (ALUNO OU RESPONSÁVEL LEGAL)</h3>

                                    <table>
                                        <tbody>

                                            <tr className='contrast'>
                                                <td className='bolder'>Descrição</td>
                                                <td className='bolder'>Dados</td>
                                            </tr>
                                            <tr>
                                                <td>Nome</td>
                                                <td>{filteredContracts["Nome do responsável"]}</td>
                                            </tr>
                                            <tr>
                                                <td>Data de nascimento</td>
                                                <td>{filteredContracts["Data de nascimento do  responsável"]}</td>
                                            </tr>
                                            <tr>
                                                <td>CPF</td>
                                                <td>{filteredContracts["CPF"]}</td>
                                            </tr>
                                            <tr>
                                                <td>E-mail</td>
                                                <td>{filteredContracts.Email}</td>
                                            </tr>
                                            <tr>
                                                <td>Telefone</td>
                                                <td>{filteredContracts.CelularResponsavel}</td>
                                            </tr>

                                            <tr>
                                                <td>Endereço</td>
                                                <td> {filteredContracts["Endereco"]}</td>
                                            </tr>
                                            <tr>
                                                <td>Número</td>
                                                <td> {filteredContracts["Número"]}</td>
                                            </tr>
                                            <tr>
                                                <td>Complemento</td>
                                                <td> {filteredContracts["Complemento"]}</td>
                                            </tr>
                                            <tr>
                                                <td>Bairro</td>
                                                <td> {filteredContracts["Bairro"]}</td>
                                            </tr>
                                            <tr>
                                                <td>Cidade</td>
                                                <td> {filteredContracts["Cidade"]}</td>
                                            </tr>
                                            <tr>
                                                <td>Uf</td>
                                                <td> {filteredContracts["Uf"]}</td>
                                            </tr>
                                            <tr>
                                                <td>CEP</td>
                                                <td> {filteredContracts["CEP"]}</td>
                                            </tr>
                                            <tr>
                                                <td>Profissão</td>
                                                <td> {filteredContracts["Profissão"]}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </ContainerData>

                                <ContainerData>
                                    <h3>QUADRO DE INFORMAÇÕES DA MATRÍCULA</h3>


                                    <table>
                                        <thead>
                                            <tr className='contrast'>

                                                <td>Descrição</td>
                                                <td>Dados</td>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td >Aluno</td>
                                                <td >{filteredContracts["Nome do aluno (se não for responsável próprio))"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Data de nascimento</td>
                                                <td >{filteredContracts["Data de nascimento do aluno"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Curso</td>
                                                <td >{filteredContracts["Curso"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Categoria do curso</td>
                                                <td >{filteredContracts["Classe"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Subcategoria do curso</td>
                                                <td >{filteredContracts["Subclasse"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Tipo de ensino</td>
                                                <td >{filteredContracts["Formato de Aula"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Carga horária total</td>
                                                <td >{filteredContracts["Carga horário do curso"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Calendário didático</td>
                                                <td >As aulas serão realizadas conforme o calendário didático estipulado</td>
                                            </tr>
                                            <tr>
                                                <td >Data da matrícula</td>
                                                <td >{new Date().toLocaleDateString('pt-BR')}</td>
                                            </tr>
                                            <tr>
                                                <td >Tipo de contrato</td>
                                                <td >{filteredContracts["Tipo de plano"]}</td>
                                            </tr>
                                            <tr>
                                                <td >Código do contrato</td>
                                                <td >{filteredContracts["Nº do contrato"]}</td>
                                            </tr>

                                            <tr>
                                                <td >Tipo de assinatura</td>
                                                <td >Online</td>
                                            </tr>
                                            <tr>
                                                <td >Unidade</td>
                                                <td >{filteredContracts["Unidade"]}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </ContainerData>


                            </div>
                            <div
                                className='container'
                            >

                                <ContainerData>

                                    <h3 className='headers'>Tabela 1 - Descrição dos serviços contratados</h3>
                                    <table>
                                        <thead className='contrast'>
                                            <tr>
                                                <td>Descrição do serviço</td>
                                                <td>Valor bruto</td>
                                                <td>Total de desconto condicional(R$)</td>
                                                <td>Número de parcelas</td>
                                                <td>Forma de pagamento</td>
                                                <td>Valor total líquido (R$)</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td >{filteredContracts["service"]}</td>
                                                <td >{changeCurrency(filteredContracts["valorCurso"])}</td>
                                                <td >{changeCurrency(paymentParcels["descount"])}</td>
                                                <td >{filteredContracts["Número de parcelas do curso"]}</td>
                                                <td >{filteredContracts["Forma de pagamento da parcela"]}</td>
                                                <td >{changeCurrency(paymentParcels["total"] - paymentParcels["descount"])}</td>
                                            </tr>


                                        </tbody>

                                    </table>
                                </ContainerData>

                                {
                                    camp.parcel !== undefined &&

                                    <ContainerData>
                                        <h3> Campanha</h3>

                                        <table>
                                            <thead className='contrast'>
                                                <tr>
                                                    <td>Nome</td>
                                                    <td>Valor</td>
                                                    <td>Alvo</td>
                                                    <td>N° de parcelas</td>
                                                    <td>Tipo de desconto</td>
                                                    <td>Descrição</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td >{camp.parcel.name}</td>
                                                    <td >{camp.parcel.value}</td>
                                                    <td >{camp.parcel.for}</td>
                                                    <td >{camp.parcel.affectedParcels}</td>
                                                    <td >{camp.parcel.descountType}</td>
                                                    <td >{camp.parcel.description}</td>
                                                </tr>

                                            </tbody>

                                        </table>
                                    </ContainerData>

                                }

                                <ContainerData>
                                    <h3 className='headers'>Tabela 2 - Detalhamento das parcelas</h3>
                                    <table>
                                        <thead className='contrast'>
                                            <tr>
                                                <td>Parcela</td>
                                                <td>Vencimento</td>
                                                <td>Valor bruto</td>
                                                <td>Desconto por parcelas</td>
                                                <td>Valor líquido (R$)</td>
                                            </tr>
                                        </thead>
                                        {
                                            camp.parcel ?
                                                <tbody>
                                                    {
                                                        paymentParcels.parcels.map((res, idx) => (
                                                            <tr key={idx}>
                                                                <td>{idx + 1}</td>
                                                                <td>{dateCalculator(filteredContracts["Data de Vencimento da Primeira Parcela"], idx)}</td>
                                                                <td>{changeCurrency(paymentParcels.total / paymentParcels.parcels.length)}</td>
                                                                <td>{changeCurrency(res.descount)}</td>

                                                                {
                                                                    idx + 1 > camp?.parcel?.affectedParcels ?
                                                                        <td>{changeCurrency(res.valor - res.descount)}</td> :
                                                                        <td>{changeCurrency(res.valor)}</td>
                                                                }
                                                            </tr>
                                                        ))
                                                    }
                                                    <tr>
                                                    </tr>
                                                </tbody> :
                                                <tbody>
                                                    {
                                                        paymentParcels.parcels.map((res, idx) => (
                                                            <tr key={idx}>
                                                                <td>{idx + 1}</td>
                                                                <td>{dateCalculator(filteredContracts["Data de Vencimento da Primeira Parcela"], idx)}</td>
                                                                <td>{changeCurrency(paymentParcels.total / paymentParcels.parcels.length)}</td>
                                                                <td>{changeCurrency(paymentParcels.descountForPontuality)}</td>
                                                                <td>{changeCurrency(res.valor - paymentParcels.descountForPontuality)}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                    <tr>
                                                    </tr>
                                                </tbody>
                                        }

                                    </table>
                                </ContainerData>
                            </div>


                            <div
                                className='container'
                            >
                                <ContainerData>
                                    <h3 className='headers'>Tabela 1 - Descrição dos Materiais didáticos</h3>
                                    <table>
                                        <thead className='contrast'>
                                            <tr>
                                                <td>Descrição do material</td>
                                                <td>Valor bruto (R$)</td>
                                                <td>Total de desconto condicional(R$)</td>
                                                <td>Número de parcelas</td>
                                                <td>Forma de pagamento</td>
                                                <td>Valor total líquido (R$)</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredContracts["products"] &&
                                                filteredContracts["products"].map((res) => (
                                                    <tr key={res.id}>
                                                        <td>{res.name}</td>
                                                        <td>{changeCurrency(res.priceSale)}</td>
                                                        <td>{changeCurrency(material?.materials.find(r => r.valor === res.priceSale).descount)}</td>
                                                        <td>{filteredContracts["Quantidade de parcelas MD"]}</td>
                                                        <td>{filteredContracts["Forma de pagamento do MD"]}</td>
                                                        <td>{changeCurrency(res.priceSale - material?.materials.find(r => r.valor === res.priceSale).descount)}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        {
                                            filteredContracts["products"].length > 0 &&
                                            <tfoot className='contrast'>
                                                <tr>

                                                    <td>TOTAL</td>
                                                    <td>{changeCurrency(material?.total)}</td>
                                                    <td>{changeCurrency(material?.descount)}</td>
                                                    <td>{filteredContracts["Quantidade de parcelas MD"]}</td>
                                                    <td>{filteredContracts["Forma de pagamento do MD"]}</td>
                                                    <td>{changeCurrency(material?.total - parseFloat(material?.descount))}</td>
                                                </tr>
                                            </tfoot>
                                        }

                                    </table>
                                </ContainerData>
                                {
                                    camp.material !== undefined &&
                                    <ContainerData>
                                        <h3> Campanha</h3>

                                        <table>
                                            <thead>
                                                <tr>
                                                    <td>Nome</td>
                                                    <td>Valor</td>
                                                    <td>Alvo</td>
                                                    <td>N° de parcelas</td>
                                                    <td>Tipo de desconto</td>
                                                    <td>Descrição</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td >{camp.material.name}</td>
                                                    <td >{camp.material.value}</td>
                                                    <td >{camp.material.for}</td>
                                                    <td >{camp.material.affectedParcels}</td>
                                                    <td >{camp.material.descountType}</td>
                                                    <td >{camp.material.description}</td>
                                                </tr>

                                            </tbody>

                                        </table>
                                    </ContainerData>
                                }



                                <ContainerData>
                                    <h3 className='headers'>Tabela 2 - Detalhamento das parcelas</h3>
                                    <table>
                                        <thead className='contrast'>
                                            <tr>
                                                <td>Parcela</td>
                                                <td>Vencimento</td>
                                                <td>Valor bruto</td>
                                                <td>Valor líquido (R$)</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredContracts["material"] &&
                                                filteredContracts["material"].parcels.map((res, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{dateCalculator(filteredContracts["Data de pagamento MD"], idx)}</td>
                                                        <td>{changeCurrency(material?.total / filteredContracts["Quantidade de parcelas MD"])}</td>
                                                        <td>{changeCurrency(res.valor)}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>

                                            </tr>

                                        </tbody>

                                    </table>
                                </ContainerData>

                            </div>




                            <div
                                className='container'
                            >

                                <ContainerData>
                                    <h3 className='headers'>Tabela 1 - Descrição da Taxa de matrícula</h3>


                                    <table>
                                        <thead className='contrast'>
                                            <tr>
                                                <td>Nome</td>
                                                <td>Valor</td>
                                                <td>Total de desconto(R$)</td>
                                                <td>N° de parcelas</td>
                                                <td>Forma de pagamento</td>
                                                <td>Valor líquido</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td >Taxa de matrícula</td>
                                                <td >R$ 350,00</td>
                                                <td >{changeCurrency(filteredContracts['tax']?.descount)}</td>
                                                <td >{filteredContracts['Quantidade de parcelas TM ']}</td>
                                                <td >{filteredContracts['Forma de pagamento TM']}</td>
                                                <td >{changeCurrency(filteredContracts['tax']?.total)}</td>

                                            </tr>

                                        </tbody>

                                    </table>
                                </ContainerData>

                                {
                                    camp.tax !== undefined &&
                                    <ContainerData>
                                        <h3> Campanha</h3>

                                        <table>
                                            <thead className='contrast'>
                                                <tr>
                                                    <td>Nome</td>
                                                    <td>Valor</td>
                                                    <td>Alvo</td>
                                                    <td>N° de parcelas</td>
                                                    <td>Tipo de desconto</td>
                                                    <td>Descrição</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td >{camp.tax.name}</td>
                                                    <td >{camp.tax.value}</td>
                                                    <td >{camp.tax.for}</td>
                                                    <td >{camp.tax.affectedParcels}</td>
                                                    <td >{camp.tax.descountType}</td>
                                                    <td >{camp.tax.description}</td>
                                                </tr>

                                            </tbody>

                                        </table>
                                    </ContainerData>

                                }


                                <ContainerData>
                                    <h3 className='headers'>Tabela 2 - Detalhamento das parcelas</h3>
                                    <table>
                                        <thead className='contrast'>
                                            <tr>
                                                <td>Parcela</td>
                                                <td>Vencimento</td>
                                                <td>Valor bruto</td>
                                                <td>Valor líquido (R$)</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tax?.taxes.map((res, idx) => (
                                                    <tr key={idx}>
                                                        <td>{idx + 1}</td>
                                                        <td>{dateCalculator(filteredContracts["Data de pagamento TM"], idx)}</td>
                                                        <td>{(tax?.total / tax.taxes.length)?.toLocaleString('pt-BR', { style: 'currency', currency: "brl" })}</td>
                                                        <td>{(tax?.total / tax.taxes.length)?.toLocaleString('pt-BR', { style: 'currency', currency: "brl" })}</td>
                                                    </tr>
                                                ))
                                            }
                                            <tr>

                                            </tr>


                                        </tbody>

                                    </table>
                                </ContainerData>
                            </div>

                        </section>

                        :
                        <div ref={content} >
                            {
                                filteredContracts !== undefined &&
                                <div style={{ display: 'grid', gap: "2rem" }}>

                                    <PDFFile id='content'
                                        data={filteredContracts}
                                        parcel={paymentParcels}
                                        campaign={camp}
                                    />

                                </div>
                            }
                        </div>
                }
            </Main>
        </Container >
    )
}
