import html2pdf from 'html2pdf.js';
import { useData } from '../../hooks/dataContext.jsx';
import { useUser } from '../../hooks/userContext';
import { Aside, Button, ComeBackButton, ComeBackDiv, Container, ContainerData, InputsData, Main, NavBar, SubContainer } from './styles';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';

import CloseIcon from '@mui/icons-material/Close';

import { useState } from 'react';
import { dateCalculator, parseDates, ReOrderDate } from '../../app/utils/functions/getDates.jsx';
import { changeCurrency, parseNumber } from '../../app/utils/functions/parseNumbers.jsx';
import businessRules from '../../app/utils/Rules/options.jsx';
import { useCampaign } from '../../hooks/campaign/campaignContext.hook.jsx';
import { useProduct } from '../../hooks/products/productsContext.hook.jsx';
import { useService } from '../../hooks/services/servicesContext.hook.jsx';
import { useSignContracts } from '../../hooks/signContracts/sign.hook.jsx';
import { InputRegister } from '../inputs/input.update.register/index.jsx';
import { ModalAutentique } from '../popUps/sendAutentiqueModal/index.jsx';
import { ContaAzulModal } from '../popUps/sendContaAzulModal/index.jsx';
import { DateSelect } from '../selects/DateSelect/index.jsx';
import { MultiSelect } from '../selects/MultiSelect/index.jsx';
import { UniqueSelect } from '../selects/UniqueSelect/index.jsx';
import { SwitchButtons } from '../switchButtons/index.jsx';
import { PDFFile } from './templates/contract.jsx';

export const ContractData = () => {
    const { filteredContracts, setFilteredContracts } = useUser();
    const { content, view, setView } = useData();
    const { descountTypes, goalTypes } = businessRules;
    const { productsTotalsQuery } = useProduct();
    const { serviceTotalsQuery } = useService();
    const { campaignsTotalsQuery } = useCampaign();
    const [camp, setcamp] = useState({})
    const { setContract } = useSignContracts()
    const [loading, setLoading] = useState(false)

    const { data: { products } } = productsTotalsQuery;
    const { data: { services } } = serviceTotalsQuery;
    const { data: { campaigns } } = campaignsTotalsQuery;
    const odd = [{ value: "qwerty789", name: 'Taxa de matrícula', priceSale: 350 }];



    const [serviceChoosed, setServiceChoosed] = useState();
    const [productChoosed, setProductChoosed] = useState();
    const [taxsChoosed, setTaxsChoosed] = useState();


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
        "Boleto": 0.1,
        "Boleto via outros bancos": 0.25,
        "Cartão de débito via outros bancos": 0.1,
        "Dinheiro": 0.25,
        "Pix cobrança": 0.1,
        "Transferência bancária": 0.1,
        "Sem pagamento": 0,
        "Isenção": 0,
        "Outros": 0.1,
        "Débito automático": 0.15,
        "Cartão de crédito via link": 0.125,
        "Cartão de crédito via outro bancos": 0.175,
        "Pix": 0.25,
    }



    const defineDescountValueForType = (value, descount, descountType) => {

        const types = {
            Percentage: (value * descount) / 100,
            Exchange: value - descount,
            Value: descount
        }

        return types[descountType]
    }


    const keys = Object.keys(filteredContracts)
        .filter(res => res !== 'id' && res !== 'service' && res !== 'newService' && res !== 'newProduct' && res !== 'newTax' && res !== 'tax' && res !== 'material' && res !== 'parcel' && res !== 'products' && res !== 'campaigns' && res !== 'services');

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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const reducer = (array, key) => {
        return array.reduce((acc, curr) => acc + parseFloat(curr[key]), 0)
    }

    const rounder = (value, quantityParcels) => {
        const account = value / quantityParcels;
        const rounded = Math.ceil(account * 100) / 100;

        return rounded
    }

    const [serviceEditable, setServiceEditable] = useState(true)
    const [taxEditable, setTaxEditable] = useState(true)

    const [containerService, setContainerService] = useState(false)
    const [containerProduct, setContainerProduct] = useState(false)
    const [containerTax, setContainerTax] = useState(false)


    const [productss, setProduct] = useState({
        sellected: filteredContracts["products"],
        fullPrice: reducer(filteredContracts['products'], 'priceSale'),
        price: reducer(filteredContracts['products'], 'priceSale') - (reducer(filteredContracts['products'], 'priceSale') * paymentMethodsForMaterials[filteredContracts["Forma de pagamento do MD"] ?? 1]).toFixed(2),
        descount: parseFloat(reducer(filteredContracts['products'], 'priceSale') * paymentMethodsForMaterials[filteredContracts["Forma de pagamento do MD"] ?? 1]).toFixed(2),
        campaign: '',
        parcels: parseNumber(filteredContracts["Quantidade de parcelas MD"]),
        payment_date: filteredContracts["Data de pagamento MD"] ? ReOrderDate(filteredContracts["Data de pagamento MD"]) : new Date().toISOString(),
        payment_type: paymentMethodsForMaterials[filteredContracts["Forma de pagamento do MD"]] ? filteredContracts["Forma de pagamento do MD"] : '',
    });

    const fullPriceService = filteredContracts["valorCurso"] ?? reducer(filteredContracts['services'], 'priceSale');

    const [servicess, setService] = useState({
        sellected: filteredContracts['services'],
        fullPrice: fullPriceService,
        price: fullPriceService - (fullPriceService * paymentMethodsForParcels[filteredContracts["Forma de pagamento da parcela"] ?? 1]).toFixed(2),
        descount: parseNumber(fullPriceService * paymentMethodsForParcels[filteredContracts["Forma de pagamento da parcela"] ?? 1]),
        campaign: '',
        parcels: parseNumber(filteredContracts["Número de parcelas do curso"]),
        payment_date: filteredContracts["Data de Vencimento da Primeira Parcela"] ? ReOrderDate(filteredContracts["Data de Vencimento da Primeira Parcela"]) : new Date().toISOString(),
        payment_type: paymentMethodsForParcels[filteredContracts["Forma de pagamento da parcela"]] ? filteredContracts["Forma de pagamento da parcela"] : '',
    });

    const [taxs, setTaxs] = useState({
        sellected: odd,
        fullPrice: 350,
        price: filteredContracts["Valor do Desconto na TM"] ? 350 - parseNumber(filteredContracts["Valor do Desconto na TM"]) : 350,
        descount: parseNumber(filteredContracts["Valor do Desconto na TM"]),
        campaign: '',
        parcels: parseNumber(filteredContracts["Quantidade de parcelas TM "]),
        payment_date: filteredContracts["Data de pagamento TM"] ? ReOrderDate(filteredContracts["Data de pagamento TM"]) : new Date().toISOString(),
        payment_type: filteredContracts["Forma de pagamento TM"] ?? '',
    });


    const handleProductsData = (key, value) => {

        if (key === 'payment_type') {
            const fullPrice = reducer(productss.sellected, 'priceSale');

            if (productss?.campaign) {

                const { value: campValue, descountType } = campaigns.find(camp => camp.id === productss?.campaign.id);
                let campaignDescount = defineDescountValueForType(fullPrice, campValue, descountType);

                return setProduct({
                    ...productss,
                    ...{
                        descount: campaignDescount,
                        price: (fullPrice - campaignDescount).toFixed(2),
                        fullPrice,
                        payment_type: value,

                    }
                })
            }

            return setProduct({
                ...productss,
                ...{
                    descount: (fullPrice * paymentMethodsForMaterials[value]).toFixed(2),
                    price: (fullPrice - (fullPrice * paymentMethodsForMaterials[value])).toFixed(2),
                    fullPrice,
                    payment_type: value,
                }
            })
        }

        const descountForPaymentMethod = paymentMethodsForMaterials[productss.payment_type]

        if (key === 'sellected') {
            const fullPrice = reducer(value, 'priceSale');

            if (productss?.campaign) {
                const { value: campValue, descountType } = campaigns.find(camp => camp.id === productss?.campaign.id);
                let campaignDescount = defineDescountValueForType(fullPrice, campValue, descountType);

                return setProduct({
                    ...productss,
                    ...{
                        sellected: value,
                        descount: campaignDescount,
                        price: (fullPrice - campaignDescount).toFixed(2),
                        fullPrice,
                    }
                })
            }

            return setProduct({
                ...productss,
                ...{
                    sellected: value,
                    descount: descountForPaymentMethod ?
                        parseFloat(fullPrice * descountForPaymentMethod).toFixed(2) :
                        0,
                    price: descountForPaymentMethod ?
                        parseFloat(fullPrice - (fullPrice * descountForPaymentMethod)).toFixed(2) :
                        fullPrice,
                    fullPrice,
                }
            })
        }

        if (key === 'campaign') {

            const campaign = campaigns.find(camp => camp.id === value);
            const fullPrice = reducer(productss?.sellected, 'priceSale');

            if (!campaign) {
                setcamp({ ...camp, ...{ product: undefined } })
                return setProduct({
                    ...productss,
                    ...{
                        descount: (fullPrice * descountForPaymentMethod).toFixed(2),
                        price: (fullPrice - (fullPrice * descountForPaymentMethod)).toFixed(2),
                        fullPrice,
                        campaign: ''
                    }
                })
            }
            setcamp({ ...camp, ...{ product: campaign } })
            const { value: campValue, descountType } = campaign;
            let campaignDescount = defineDescountValueForType(fullPrice, campValue, descountType)

            return setProduct({
                ...productss,
                campaign: value,
                price: (fullPrice - campaignDescount).toFixed(2),
                descount: campaignDescount
            })

        }

        return setProduct({
            ...productss,
            [key]: value
        })
    }

    const handleServiceData = async (key, value) => {

        if (key === 'payment_type') {
            const fullPrice = reducer(servicess.sellected, 'priceSale');

            if (servicess?.campaign) {

                const { value: campValue, descountType } = campaigns.find(camp => camp.id === servicess?.campaign.id);
                let campaignDescount = defineDescountValueForType(fullPrice, campValue, descountType);

                return setService({
                    ...servicess,
                    ...{
                        descount: campaignDescount,
                        price: (fullPrice - campaignDescount).toFixed(2),
                        payment_type: value,
                        fullPrice,
                    }
                })
            }

            return setService({
                ...servicess,
                ...{
                    descount: (fullPrice * paymentMethodsForParcels[value]).toFixed(2),
                    price: (fullPrice - (fullPrice * paymentMethodsForParcels[value])).toFixed(2),
                    payment_type: value,
                    fullPrice,
                }
            })
        }

        const descountForPaymentMethod = paymentMethodsForParcels[servicess.payment_type]

        if (key === 'sellected') {
            const service = services.filter(ser => ser.id === value);

            const fullPrice = reducer(service, 'priceSale');

            if (servicess?.campaign) {
                const { value: campValue, descountType } = campaigns.find(camp => camp.id === servicess?.campaign.id);
                let campaignDescount = defineDescountValueForType(fullPrice, campValue, descountType);

                return setService({
                    ...servicess,
                    ...{
                        sellected: service,
                        descount: campaignDescount,
                        price: (fullPrice - campaignDescount).toFixed(2),
                        fullPrice,
                    }
                })
            }

            return setService({
                ...servicess,
                ...{
                    sellected: service,
                    descount: descountForPaymentMethod ?
                        parseFloat(fullPrice * descountForPaymentMethod).toFixed(2) :
                        0,
                    price: descountForPaymentMethod ?
                        parseFloat(fullPrice - (fullPrice * descountForPaymentMethod)).toFixed(2) :
                        fullPrice,
                    fullPrice,
                }
            })
        }

        if (key === 'campaign') {
            const campaign = campaigns.find(camp => camp.id === value);
            const fullPrice = servicess?.fullPrice;
            const descount = parseFloat(fullPrice * descountForPaymentMethod).toFixed(2);

            if (!campaign) {
                setcamp({ ...camp, ...{ service: undefined } })
                return setService({
                    ...servicess,
                    ...{
                        descount: descount,
                        price: (fullPrice - descount),
                        fullPrice,
                        campaign: ''
                    }
                })
            }

            setcamp({ ...camp, ...{ service: campaign } });
            // const { value: campValue, descountType, affectedParcels } = campaign;

            // const parcelValue = fullPrice / servicess?.parcels;
            // const descountForValueType = await defineDescountValueForType(parcelValue, campValue, descountType);
            // let campaignDescount = (descountForValueType * affectedParcels).toFixed(2);

            ////////////

            return setService({
                ...servicess,
                campaign,
                price: (fullPrice - descount).toFixed(2),
                descount: parseFloat(descount)
            })

        }

        if (key === 'descount') {
            const fullPrice = servicess?.fullPrice;
            setcamp({ ...camp, ...{ service: undefined } })

            return setService({
                ...servicess,
                campaign: '',
                descount: value,
                price: (fullPrice - value).toFixed(2),
            })
        }

        if (key === 'fullPrice') {
            const descount = parseFloat(value * descountForPaymentMethod).toFixed(2)

            if (servicess?.campaign) {
                const { value: campValue, descountType } = campaigns.find(camp => camp.id === servicess?.campaign.id);
                let campaignDescount = defineDescountValueForType(value, campValue, descountType);

                return setService({
                    ...servicess,
                    campaign: '',
                    descount: campaignDescount,
                    price: parseFloat(value - campaignDescount),
                    fullPrice: value
                })
            }

            return setService({
                ...servicess,
                campaign: '',
                descount: descountForPaymentMethod ? descount : 0,
                price: parseFloat(value - parseFloat(value * descountForPaymentMethod).toFixed(2)),
                fullPrice: value
            })
        }


        return setService({
            ...servicess,
            [key]: value
        })
    }

    const handleTaxData = async (key, value) => {


        if (key === 'campaign') {

            const campaign = campaigns.find(camp => camp.id === value);
            const fullPrice = taxs?.fullPrice;

            if (!campaign) {
                setcamp({ ...camp, ...{ tax: undefined } });
                return setTaxs({
                    ...taxs,
                    ...{
                        descount: fullPrice,
                        price: fullPrice - taxs?.descount,
                        fullPrice,
                        campaign: ''
                    }
                })
            }
            setcamp({ ...camp, ...{ tax: campaign } });
            const { value: campValue, descountType, affectedParcels } = campaign;

            const parcelValue = fullPrice / servicess?.parcels;
            let campaignDescount = await defineDescountValueForType(parcelValue, campValue, descountType) * affectedParcels;

            return setTaxs({
                ...taxs,
                campaign,
                price: (fullPrice - campaignDescount).toFixed(2),
                descount: campaignDescount,

            })

        }

        if (key === 'descount') {
            const fullPrice = taxs?.fullPrice;

            return setTaxs({
                ...taxs,
                campaign: '',
                descount: value,
                price: (fullPrice - value).toFixed(2),
            })
        }

        if (key === 'fullPrice') {
            const descount = taxs?.descount

            if (taxs?.campaign) {
                const { value: campValue, descountType } = campaigns.find(camp => camp.id === productss?.campaign.id);
                let campaignDescount = defineDescountValueForType(value, campValue, descountType);

                return setTaxs({
                    ...taxs,
                    campaign: '',
                    descount: campaignDescount,
                    price: parseFloat(value - campaignDescount),
                    fullPrice: value
                })
            }

            return setTaxs({
                ...taxs,
                campaign: '',
                descount: descount,
                price: parseFloat(value - descount).toFixed(2),
                fullPrice: value
            })
        }


        return setTaxs({
            ...taxs,
            [key]: value
        })
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const parcelsMaker = async ({ fullValue, quantityParcels, campaign, price, payment_date }) => {
        const array = []

        const fullPriceRounded = await rounder(fullValue, quantityParcels);
        const priceRounded = await rounder(price, quantityParcels);


        if (!campaign) {
            for (let index = 0; index < quantityParcels; index++) {
                array.push({ valor: priceRounded, date: await dateCalculator(payment_date, index) })
            }

            return array
        }

        const { value, descountType, affectedParcels } = campaign;

        for (let index = 0; index < quantityParcels; index++) {

            let campaignDescount = await defineDescountValueForType(fullPriceRounded, value, descountType);
            let date = await dateCalculator(payment_date, index);

            index + 1 <= affectedParcels ?
                array.push({ valor: fullPriceRounded - campaignDescount, date }) :
                array.push({ valor: priceRounded, date })
        }

        return array;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const chooses = {
        "newService": setServiceChoosed,
        "newProduct": setProductChoosed,
        "newTax": setTaxsChoosed,
    }

    const sincValues = async (productsData, destiny) => {
        setLoading(true);
        const { sellected, fullPrice, price, descount,
            parcels, payment_date, payment_type, campaign } = productsData;


        const parcelsAffected = await parcelsMaker({
            campaign,
            fullValue: fullPrice,
            quantityParcels: parcels,
            price,
            payment_date
        });

        chooses[destiny](productsData);

        filteredContracts[destiny] = {
            campaign,
            data: sellected,
            parcels: parcelsAffected,
            quantity_parcels: parcels,
            total: fullPrice,
            descount,
            payment_date: await parseDates(payment_date),
            payment_type
        }
        setLoading(false);
    }

    const resetContractData = (where) => {
        chooses[where](null)
        filteredContracts[where] = {}
    }

    return (
        <Container>
            <Aside>
                <NavBar className='contrast'>
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

                        <SwitchButtons
                            data={{
                                fn: setView,
                                options: [
                                    "Tabela", "Contrato"
                                ],
                                optionActive: view,
                            }}
                        />
                    </span>

                    <span className='emmit flex' >
                        {
                            view === 'Contrato' &&
                            filteredContracts['newService'].total &&
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
                            <ModalAutentique />
                        </Button>
                        <Button
                            // disabled={}
                            className='defaultButton blueButton'
                        >
                            <ContaAzulModal />
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
                    view === 'Tabela' ?
                        <section
                            className='box'
                        >

                            <div
                                className='container flex div10'
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
                            {/* /// */}
                            <SubContainer
                                className='div20'
                                open={containerService}
                            >
                                <header className="flex nav header contrast"
                                    onClick={() => {
                                        setContainerService(!containerService)
                                        // setServiceChoosed(null)
                                    }}>
                                    <h3 className='headers'>
                                        Tabela 1 - Serviço para venda
                                    </h3>
                                    <button>
                                        <KeyboardArrowDownIcon />
                                    </button>

                                </header>

                                <div className='flex body'>

                                    <span className="flex sub-body">
                                        <label className='div1' htmlFor="">
                                            <p>Serviço</p>
                                            <UniqueSelect
                                                field='sellected'
                                                placeHolder={servicess?.sellected[0]?.name}
                                                option={services.map(serv => ({ value: serv.id, name: serv.name }))}
                                                fn={[handleServiceData]}
                                                nullable={true}

                                            />
                                        </label>

                                        <label className='div2' htmlFor="">
                                            <p>Forma de pagamento</p>
                                            <UniqueSelect
                                                placeHolder={servicess?.payment_type}
                                                fn={[handleServiceData]}
                                                option={[
                                                    { name: "Boleto" },
                                                    { name: "Boleto via outros bancos" },
                                                    { name: "Cartão de débito via outros bancos" },
                                                    { name: "Dinheiro" },
                                                    { name: "Pix cobrança" },
                                                    { name: "Transferência bancária" },
                                                    { name: "Sem pagamento" },
                                                    { name: "Isenção" },
                                                    { name: "Outros" },
                                                    { name: "Débito automático" },
                                                    { name: "Cartão de crédito via link" },
                                                    { name: "Cartão de crédito via outro bancos" },
                                                    { name: "Pix" },
                                                ]}
                                                field='payment_type'

                                            />
                                        </label>

                                        <label className='div3' htmlFor="">
                                            <p>Número de parcelas</p>
                                            <InputRegister
                                                label={servicess?.parcels}
                                                fn={[handleServiceData]}
                                                field='parcels'
                                                disabled={false}

                                            />
                                        </label>
                                        <label className='div4' htmlFor="">
                                            <p>Data de vencimento</p>
                                            <DateSelect
                                                label={servicess?.payment_date}
                                                field='payment_date'
                                                fn={[handleServiceData]}

                                            />


                                        </label>
                                        <label className='div5' htmlFor="">
                                            <p>Campanha</p>

                                            <UniqueSelect
                                                placeHolder={servicess?.campaign?.name}
                                                fn={[handleServiceData]}
                                                nullable={true}
                                                option={campaigns.filter(camp => camp.for === 'Parcel')
                                                    .map(camp => ({ value: camp.id, name: camp.name }))
                                                }
                                                field='campaign'
                                            />
                                        </label>

                                        <label className='div6' htmlFor="">
                                            <p>Valor bruto(R$)</p>
                                            <InputRegister
                                                label={servicess?.fullPrice}
                                                field='fullPrice'
                                                width='10rem'
                                                disabled={serviceEditable}
                                                fn={[handleServiceData]}
                                            // border='#f8ff74'
                                            />
                                        </label>

                                        <label className='div7' htmlFor="">
                                            <p>Desconto(R$)</p>
                                            <InputRegister
                                                width='10rem'
                                                label={servicess?.descount}
                                                fn={[handleServiceData]}
                                                disabled={serviceEditable}
                                                field='descount'
                                            // border='#74f1ff'

                                            />
                                        </label>

                                        <label className='div8' htmlFor="">
                                            <p>Valor líquido(R$)</p>

                                            <InputRegister
                                                label={servicess?.price}
                                                field='price'
                                                width='100%'
                                                disabled={true}
                                                fn={[handleServiceData]}
                                            // border='#a0ff74'

                                            />
                                        </label>

                                    </span>
                                    <span className="flex">

                                        <button
                                            className='confirm-button redButton defaultButton'
                                            onClick={() => setServiceEditable(!serviceEditable)}
                                        >
                                            editavel
                                        </button>

                                        <button
                                            className='confirm-button blueButton defaultButton'
                                            disabled={servicess?.payment_type === '' || servicess?.sellected.length === 0}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sincValues(servicess, 'newService');
                                            }}
                                        >
                                            Confirmar
                                        </button>
                                    </span>

                                </div>

                            </SubContainer>
                            {/* /// */}
                            {
                                serviceChoosed?.sellected &&
                                serviceChoosed?.sellected.length > 0 &&
                                <div
                                    className='container div30'
                                >

                                    <ContainerData>
                                        <nav className='nav header contrast'>

                                            <h3 className='headers'>Descrição dos serviços contratados</h3>
                                            <button
                                                onClick={() => resetContractData("newService")}
                                            >
                                                <CloseIcon />
                                            </button>
                                        </nav>
                                        <table>
                                            <thead className='contrast'>
                                                <tr>
                                                    <td>Descrição do serviço</td>
                                                    <td>Valor bruto</td>
                                                    <td>Total de desconto condicional(R$)</td>
                                                    <td>Valor total líquido (R$)</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td >{serviceChoosed?.sellected[0].name}</td>
                                                    <td >{changeCurrency(serviceChoosed?.fullPrice)}</td>
                                                    <td >{changeCurrency(
                                                        serviceChoosed?.campaign ?
                                                            0 :
                                                            serviceChoosed?.descount
                                                    )}</td>

                                                    <td >
                                                        {changeCurrency(serviceChoosed?.price)}
                                                    </td>
                                                </tr>


                                            </tbody>

                                        </table>

                                    </ContainerData>

                                    {
                                        camp?.service &&

                                        <ContainerData>
                                            <h3> Campanha</h3>

                                            <table>
                                                <thead className='contrast'>
                                                    <tr>
                                                        <td>Nome</td>
                                                        <td>Valor</td>
                                                        <td>Tipo de desconto</td>
                                                        <td>Alvo</td>
                                                        <td>N° de parcelas</td>
                                                        <td>Descrição</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td >{camp.service.name}</td>
                                                        <td >{camp.service.value}</td>
                                                        <td >{descountTypes[camp.service.descountType]}</td>
                                                        <td >{goalTypes[camp.service.for]}</td>
                                                        <td >{camp.service.affectedParcels}</td>
                                                        <td >{camp.service.description}</td>
                                                    </tr>

                                                </tbody>

                                            </table>
                                        </ContainerData>

                                    }
                                    <ContainerData>
                                        <h3 className='headers'>Detalhamento das parcelas</h3>
                                        <table>
                                            <thead className='contrast'>
                                                <td>Data de vencimento</td>
                                                <td>Número de parcelas</td>
                                                <td>Forma de pagamento</td>

                                            </thead>
                                            <tbody>
                                                <td >{dateCalculator(serviceChoosed?.payment_date, 0)}</td>
                                                <td >{serviceChoosed?.parcels}</td>
                                                <td >{serviceChoosed?.payment_type}</td>
                                            </tbody>
                                        </table>
                                        <br />
                                        <hr />
                                        <br />

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

                                                <tbody>
                                                    {
                                                        filteredContracts["newService"].parcels?.length > 0 &&
                                                        filteredContracts["newService"].parcels.map((res, idx) => (
                                                            <tr key={idx}>
                                                                <td>{idx + 1}</td>
                                                                <td>{res.date}</td>
                                                                <td>{changeCurrency(rounder(serviceChoosed?.fullPrice / serviceChoosed?.parcels, 1))}</td>
                                                                <td>{changeCurrency(rounder(serviceChoosed?.fullPrice / serviceChoosed?.parcels, 1) - res.valor)}</td>
                                                                <td>{changeCurrency(res.valor)}</td>

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
                            }
                            {/* /// */}
                            <SubContainer
                                className='div40'
                                open={containerProduct}
                            >
                                <header className="flex nav header contrast"
                                    onClick={() => {
                                        setContainerProduct(!containerProduct)
                                        // setProductChoosed(null)
                                    }}>

                                    <h3 className='headers'>
                                        Tabela 2 - Produtos para Venda
                                    </h3>
                                    <button>
                                        <KeyboardArrowDownIcon />
                                    </button>
                                </header>
                                <div className='flex body'>

                                    <span className="flex sub-body">
                                        <label className='div1' htmlFor="">
                                            <p>Produto</p>
                                            <MultiSelect
                                                field='sellected'
                                                related={productss?.sellected}
                                                option={products}
                                                fn={handleProductsData}
                                            />
                                        </label>

                                        <label className='div2' htmlFor="">
                                            <p>Forma de pagamento</p>
                                            <UniqueSelect
                                                placeHolder={productss?.payment_type}
                                                fn={[handleProductsData]}
                                                option={[
                                                    { name: "Boleto" },
                                                    { name: "Cartão de crédito via link" },
                                                    { name: "PIX - Pagamento Instantâneo" },
                                                    { name: "Sem pagamento" },
                                                    { name: "Isenção" },
                                                    { name: "Outros" },
                                                    { name: "Boleto via outros bancos" },
                                                    { name: "Cartão de crédito via outro bancos" },
                                                    { name: "Cartão de débito via outros bancos" },
                                                    { name: "Dinheiro" },
                                                    { name: "Pix" },
                                                    { name: "Pix cobrança" },
                                                    { name: "Transferência bancária" },
                                                ]}
                                                field='payment_type'

                                            />
                                        </label>

                                        <label className='div3' htmlFor="">
                                            <p>Número de parcelas</p>
                                            <InputRegister
                                                label={productss?.parcels}
                                                fn={[handleProductsData]}
                                                // width='16rem'
                                                field='parcels'
                                                disabled={false}

                                            />
                                        </label>
                                        <label className='div4' htmlFor="">
                                            <p>Data de vencimento</p>
                                            <DateSelect
                                                label={productss?.payment_date}
                                                field='payment_date'
                                                fn={[handleProductsData]}

                                            />


                                        </label>
                                        <label className='div5' htmlFor="">
                                            <p>Campanha </p>

                                            <UniqueSelect
                                                placeHolder={productss?.campaign?.name}
                                                fn={[handleProductsData]}
                                                field='campaign'
                                                nullable={true}
                                                option={campaigns.filter(camp => camp.for === 'Material')
                                                    .map(camp => ({ value: camp.id, name: camp.name }))
                                                }
                                            />
                                        </label>

                                        <label className='div6' htmlFor="">
                                            <p>Valor bruto(R$)</p>
                                            <InputRegister
                                                label={productss?.fullPrice}
                                                field='fullPrice'
                                                width='10rem'
                                                disabled={true}
                                                fn={[handleProductsData]}
                                            // border='#f8ff74'
                                            />
                                        </label>

                                        <label className='div7' htmlFor="">
                                            <p>Desconto(R$)</p>
                                            <InputRegister
                                                width='10rem'
                                                label={productss?.descount}
                                                fn={[handleProductsData]}
                                                disabled={true}
                                                field='descount'
                                            // border='#74f1ff'

                                            />
                                        </label>

                                        <label className='div8' htmlFor="">
                                            <p>Valor líquido(R$)</p>

                                            <InputRegister
                                                label={productss?.price}
                                                field='price'
                                                width='100%'
                                                disabled={true}
                                                fn={[handleProductsData]}
                                            // border='#a0ff74'

                                            />
                                        </label>

                                    </span>

                                    <span className="flex">

                                        <button
                                            disabled={productss?.payment_type === '' || productss?.sellected.length === 0}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sincValues(productss, 'newProduct');
                                            }}
                                            className='confirm-button blueButton defaultButton'
                                        >
                                            Confirmar
                                        </button>

                                    </span>

                                </div>

                            </SubContainer>
                            {/* /// */}

                            {
                                productChoosed?.sellected &&
                                productChoosed?.sellected.length > 0 &&
                                <div
                                    className='container div50'
                                >
                                    <ContainerData>
                                        <nav className='nav header contrast' >

                                            <h3 className='headers'>Descrição dos Produtos</h3>
                                            <button
                                                onClick={() => resetContractData('newProduct')}
                                            >
                                                <CloseIcon />
                                            </button>
                                        </nav>
                                        <table>
                                            <thead className='contrast'>
                                                <tr>
                                                    <td>Descrição do material</td>
                                                    <td>Valor bruto (R$)</td>
                                                    <td>Total de desconto condicional(R$)</td>
                                                    <td>Valor total líquido (R$)</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    productChoosed?.sellected &&
                                                    productChoosed?.sellected.map((res) => (
                                                        <tr key={res.id}>
                                                            <td>{res.name}</td>
                                                            <td>{changeCurrency(res.priceSale)}</td>
                                                            <td>{changeCurrency(
                                                                productChoosed?.campaign ?
                                                                    0 :
                                                                    res.priceSale * paymentMethodsForMaterials[productChoosed?.payment_type]
                                                            )}</td>

                                                            <td>{changeCurrency(
                                                                productChoosed?.campaign ?
                                                                    0 :
                                                                    res.priceSale - (res.priceSale * paymentMethodsForMaterials[productChoosed?.payment_type])
                                                            )}</td>

                                                        </tr>
                                                    ))
                                                }
                                            </tbody>

                                            <tfoot className='contrast'>
                                                <tr>
                                                    <td>TOTAL</td>
                                                    <td>{changeCurrency(productChoosed?.fullPrice)}</td>
                                                    <td>{changeCurrency(productChoosed?.descount)}</td>
                                                    <td>{changeCurrency(productChoosed?.fullPrice - parseFloat(productChoosed?.descount))}</td>
                                                </tr>
                                            </tfoot>
                                        </table>

                                    </ContainerData>
                                    {
                                        camp.product &&
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
                                                        <td >{camp.product.name}</td>
                                                        <td >{camp.product.value}</td>
                                                        <td >{camp.product.for}</td>
                                                        <td >{camp.product.affectedParcels}</td>
                                                        <td >{camp.product.descountType}</td>
                                                        <td title={camp.product.description}>{camp.material.description.slice(0, 60)}...</td>
                                                    </tr>

                                                </tbody>

                                            </table>
                                        </ContainerData>
                                    }


                                    <ContainerData>
                                        <h3 className='headers'>Detalhamento das parcelas</h3>
                                        <table>
                                            <thead className='contrast'>
                                                <td>Vencimento</td>
                                                <td>Número de parcelas</td>
                                                <td>Forma de pagamento</td>
                                            </thead>
                                            <tbody>
                                                <td>{dateCalculator(productChoosed?.payment_date, 0)}</td>
                                                <td>{productChoosed?.parcels}</td>
                                                <td>{productChoosed?.payment_type}</td>
                                            </tbody>

                                        </table>
                                        <br />
                                        <hr />
                                        <br />
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
                                                    filteredContracts["newProduct"].parcels?.length > 0 &&
                                                    filteredContracts["newProduct"].parcels.map((res, idx) => (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>{res.date}</td>
                                                            <td>{changeCurrency(rounder(productChoosed?.fullPrice / productChoosed?.parcels, 1))}</td>
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
                            }
                            {/* /// */}

                            <SubContainer
                                className='div60'
                                open={containerTax}
                            >
                                <header className="flex nav header contrast"
                                    onClick={() => {
                                        setContainerTax(!containerTax)
                                        // setTaxsChoosed(null)
                                    }}
                                >
                                    <h3 className='headers'>
                                        Tabela 3 - Produtos para Venda avulsa
                                    </h3>

                                    <button>
                                        <KeyboardArrowDownIcon />
                                    </button>
                                </header>
                                <div className='flex body'>

                                    <span className="flex sub-body">
                                        <label className='div1' htmlFor="">
                                            <p>Venda avulsa</p>
                                            <UniqueSelect
                                                field='sellected'
                                                placeHolder={taxs?.sellected[0]?.name}
                                                // option={}
                                                fn={[handleTaxData]}
                                                nullable={true}

                                            />
                                        </label>

                                        <label className='div2' htmlFor="">
                                            <p>Forma de pagamento</p>
                                            <UniqueSelect
                                                placeHolder={taxs?.payment_type}
                                                fn={[handleTaxData]}
                                                option={[
                                                    { name: "Boleto" },
                                                    { name: "Cartão de crédito via link" },
                                                    { name: "PIX - Pagamento Instantâneo" },
                                                    { name: "Sem pagamento" },
                                                    { name: "Isenção" },
                                                    { name: "Outros" },
                                                    { name: "Boleto via outros bancos" },
                                                    { name: "Cartão de crédito via outro bancos" },
                                                    { name: "Cartão de débito via outros bancos" },
                                                    { name: "Dinheiro" },
                                                    { name: "Pix" },
                                                    { name: "Pix cobrança" },
                                                    { name: "Transferência bancária" },
                                                ]}
                                                field='payment_type'

                                            />
                                        </label>

                                        <label className='div3' htmlFor="">
                                            <p>Número de parcelas</p>
                                            <InputRegister
                                                label={taxs?.parcels}
                                                fn={[handleTaxData]}
                                                field='parcels'
                                                disabled={false}

                                            />
                                        </label>
                                        <label className='div4' htmlFor="">
                                            <p>Data de vencimento</p>
                                            <DateSelect
                                                label={taxs?.payment_date}
                                                field='payment_date'
                                                fn={[handleTaxData]}

                                            />


                                        </label>
                                        <label className='div5' htmlFor="">
                                            <p>Campanha</p>

                                            <UniqueSelect
                                                placeHolder={taxs?.campaign?.name}
                                                fn={[handleTaxData]}
                                                nullable={true}
                                                option={campaigns.filter(camp => camp.for === 'Tax')
                                                    .map(camp => ({ value: camp.id, name: camp.name }))
                                                }
                                                field='campaign'
                                            />
                                        </label>

                                        <label className='div6' htmlFor="">
                                            <p>Valor bruto(R$)</p>
                                            <InputRegister
                                                label={taxs?.fullPrice}
                                                field='fullPrice'
                                                width='10rem'
                                                disabled={taxEditable}
                                                fn={[handleTaxData]}
                                            // border='#f8ff74'
                                            />
                                        </label>

                                        <label className='div7' htmlFor="">
                                            <p>Desconto(R$)</p>
                                            <InputRegister
                                                width='10rem'
                                                label={taxs?.descount}
                                                fn={[handleTaxData]}
                                                disabled={taxEditable}
                                                field='descount'
                                            // border='#74f1ff'

                                            />
                                        </label>

                                        <label className='div8' htmlFor="">
                                            <p>Valor líquido(R$)</p>

                                            <InputRegister
                                                label={taxs?.price}
                                                field='price'
                                                width='100%'
                                                disabled={true}
                                                fn={[handleTaxData]}
                                            // border='#a0ff74'

                                            />
                                        </label>

                                    </span>

                                    <span className='flex'>
                                        <button
                                            className='confirm-button redButton defaultButton'
                                            onClick={() => setTaxEditable(!taxEditable)}
                                        >
                                            editavel
                                        </button>

                                        <button
                                            disabled={taxs?.payment_type === '' || taxs?.sellected.length === 0}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sincValues(taxs, 'newTax');
                                            }}
                                            className='confirm-button blueButton defaultButton'
                                        >
                                            Confirmar
                                        </button>
                                    </span>


                                </div>

                            </SubContainer>
                            {/* /// */}
                            {
                                taxsChoosed?.sellected &&
                                taxsChoosed?.sellected.length > 0 &&
                                <div
                                    className='container div70'
                                >

                                    <ContainerData>
                                        <nav className='nav header contrast'>

                                            <h3 className='headers'>Descrição da Taxa de matrícula</h3>
                                            <button
                                                onClick={() => resetContractData('newTax')}
                                            >
                                                <CloseIcon />
                                            </button>
                                        </nav>

                                        <table>
                                            <thead className='contrast'>
                                                <tr>
                                                    <td>Nome</td>
                                                    <td>Valor</td>
                                                    <td>Total de desconto(R$)</td>

                                                    <td>Valor líquido</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td >Taxa de matrícula</td>
                                                    <td >{changeCurrency(taxs?.fullPrice)}</td>
                                                    <td >{changeCurrency(taxs?.descount)}</td>

                                                    <td >{changeCurrency(taxs.price)}</td>

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
                                                        <td >{goalTypes[camp.tax.for]}</td>
                                                        <td >{camp.tax.affectedParcels}</td>
                                                        <td >{descountTypes[camp.tax.descountType]}</td>
                                                        <td >{camp.tax.description}</td>
                                                    </tr>

                                                </tbody>

                                            </table>
                                        </ContainerData>

                                    }


                                    <ContainerData>
                                        <h3 className='headers'>Detalhamento das parcelas</h3>

                                        <table>
                                            <thead className='contrast'>
                                                <td>N° de parcelas</td>
                                                <td>Data de vencimento</td>
                                                <td>Forma de pagamento</td>
                                            </thead>
                                            <tbody>
                                                <td >{taxs?.parcels}</td>
                                                <td >{dateCalculator(taxs?.payment_date, 0)}</td>
                                                <td >{taxs?.payment_type}</td>
                                            </tbody>
                                        </table>
                                        <br />
                                        <hr />
                                        <br />
                                        <table>
                                            <thead className='contrast'>
                                                <tr>
                                                    <td>Parcela</td>
                                                    <td>Vencimento</td>
                                                    <td>Valor bruto</td>
                                                    <td>Valor líquido(R$)</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filteredContracts["newTax"].parcels?.length > 0 &&
                                                    filteredContracts["newTax"].parcels.map((res, idx) => (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>{res.date}</td>
                                                            <td>{changeCurrency(rounder(taxsChoosed?.fullPrice / taxsChoosed?.parcels, 1))}</td>
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
                            }

                        </section>

                        :
                        <div ref={content} >
                            {
                                filteredContracts !== undefined &&
                                <div style={{ display: 'grid', gap: "2rem" }}>

                                    <PDFFile id='content'
                                        data={filteredContracts}
                                        choosedData={{
                                            service: serviceChoosed,
                                            products: productChoosed,
                                            tax: taxsChoosed
                                        }}

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
