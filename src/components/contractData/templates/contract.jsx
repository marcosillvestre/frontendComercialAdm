import html2pdf from 'html2pdf.js';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Container, File } from './contract.styles';

export const PDFFile = ({ data, parcel, campaign }) => {

    const [loading, setLoading] = useState(false)

    const dateCalculator = (date, index) => {
        const dateFormated = new Date(date.split('/').reverse().join('-'));
        dateFormated.setUTCHours(12)

        return index === 0 ? dateFormated.toLocaleDateString() :
            new Date(dateFormated.setMonth(dateFormated.getMonth() + index)).toLocaleDateString()
    }

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

    const render = () => {
        setLoading(true);
        const element = document.getElementById("container1");

        var opt = {
            margin: [0, 0.5, 0, 0],
            filename: `adesao-${data["Nome do responsável"]}+${data["id"]}`,

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

            setLoading(false)
        }, 3000);

    }


    const campaignTaxDescount = () => {
        if (!campaign.tax) return 0
        const value = campaign.tax.descountType === 'Percentage' ?
            350 - (350 * campaign.tax.value) : 350 - campaign.tax.value

        return value
    }
    const taxValue = 350 - campaignTaxDescount() - parseFloat(data["Valor do Desconto na Taxa de Matrícula"])


    return (
        <File>
            {
                loading === true ?
                    <button
                        className='defaultButton'

                    >

                        Carregando...
                    </button>
                    :
                    <button
                        className='defaultButton'
                        onClick={() => render()}
                    >

                        Criar documento
                    </button>

            }

            <div id="container1" >

                < Container
                    title='Página 1 do contrato'

                >

                    <div
                    >
                        <h4 className='headers'>
                            QUADRO RESUMO DO CONTRATO DE PRESTAÇÃO DE SERVIÇO EDUCACIONAL E AQUISIÇÃO DO MATERIAL DIDÁTICO

                        </h4>

                        <h3 className='headers'>
                            Qualificação das partes
                        </h3>

                        <section
                            className='avoid'
                        >
                            <p className='headers'>
                                CONTRATANTE (ALUNO OU RESPONSÁVEL LEGAL)

                            </p>
                            <table>

                                <tbody>

                                    <tr>
                                        <td className='bolder'>Descrição</td>
                                        <td className='bolder'>Dados</td>
                                    </tr>
                                    <tr>
                                        <td>Nome</td>
                                        <td>{data["Nome do responsável"]}</td>
                                    </tr>
                                    <tr>
                                        <td>CPF</td>
                                        <td>{data["CPF"]}</td>
                                    </tr>
                                    <tr>
                                        <td>E-mail</td>
                                        <td>{data.Email}</td>
                                    </tr>
                                    <tr>
                                        <td>Telefone</td>
                                        <td>{data.CelularResponsavel}</td>
                                    </tr>

                                    <tr>
                                        <td>Endereço</td>
                                        <td> {data["Endereco"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Número</td>
                                        <td> {data["Número"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Complemento</td>
                                        <td> {data["Complemento"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Bairro</td>
                                        <td> {data["Bairro"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Cidade</td>
                                        <td> {data["Cidade"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Uf</td>
                                        <td> {data["Uf"]}</td>
                                    </tr>
                                    <tr>
                                        <td>CEP</td>
                                        <td> {data["CEP"]}</td>
                                    </tr>
                                    <tr>
                                        <td>Profissão</td>
                                        <td> {data["Profissão"]}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </section>

                        <br />

                        <section
                            className='avoid'
                        >
                            <p className='headers'>CONTRATADA</p>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Razão social</td>
                                        <td>Telefone</td>
                                        <td>CPNJ</td>
                                        <td>Endereço</td>
                                        <td>CEP</td>
                                        <td>Unidade responsável</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >AMERICAN WAY ESCOLA DE IDIOMAS BETIM LTDA</td>
                                        <td >(31) 3593-3961</td>
                                        <td >18.953.641/0001-26</td>
                                        <td >Rua Japurá, 341, Santa Cruz, Betim/MG</td>
                                        <td >32.667-358</td>
                                        <td >Unidade PTB</td>
                                    </tr>
                                    <tr>
                                        <td >AMERICAN WAY ESCOLA DE IDIOMAS CENTRO LTDA</td>
                                        <td >(31) 3360-6963</td>
                                        <td >42.387.487/0001-57</td>
                                        <td >Avenida Amazonas, 1209, Centro, Betim/MG</td>
                                        <td >32.600-325</td>
                                        <td >Unidade Centro</td>
                                    </tr>

                                </tbody>

                            </table>
                        </section>
                    </div>
                </Container>

                <Container
                    className='beforeClass'
                    title='Página 2 do contrato'
                >
                    <div
                    >
                        <p >
                            Neste ato, representadas pelo REPRESENTANTE LEGAL: Victor Henrique Manhaes de Souza, CPF: 09160852607.
                            Este documento estabelece os termos e condições do contrato de prestação de serviços educacionais e aquisição de material didático,
                            estando as partes cientes e de comum acordo com suas disposições.

                        </p>


                        <section
                            className="avoid"

                        >
                            <p className='headers'>QUADRO DE INFORMAÇÕES DA MATRÍCULA</p>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Descrição</td>
                                        <td>Dados</td>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td >Aluno</td>
                                        <td >{data["Nome do aluno"]}</td>
                                    </tr>
                                    <tr>
                                        <td >Data de nascimento</td>
                                        <td >{data["Data de nascimento do aluno"]}</td>
                                    </tr>
                                    <tr>
                                        <td >Curso</td>
                                        <td >{data["Curso"]}</td>
                                    </tr>
                                    <tr>
                                        <td >Categoria do curso</td>
                                        <td >{data["Classe"]}</td>
                                    </tr>
                                    <tr>
                                        <td >Subcategoria do curso</td>
                                        <td >{data["Subclasse"]}</td>
                                    </tr>
                                    <tr>
                                        <td >Tipo de ensino</td>
                                        <td >{data["Formato de Aula"]}</td>
                                    </tr>
                                    <tr>
                                        <td >Carga horária total</td>
                                        <td >{data["Carga horário do curso"]}</td>
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
                                        <td >{data["Tipo de plano"]}</td>
                                    </tr>
                                    <tr>
                                        <td >Código do contrato</td>
                                        <td >{data["Nº do contrato"]}</td>
                                    </tr>

                                    <tr>
                                        <td >Tipo de assinatura</td>
                                        <td >Online</td>
                                    </tr>
                                    <tr>
                                        <td >Unidade</td>
                                        <td >{data["Unidade"]}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </section>

                    </div>
                </Container>

                <Container
                    className='beforeClass'
                    title='Página 3 do contrato'
                >
                    <div>

                        <strong> SOBRE VALOR E DESCONTOS </strong>
                        <br />
                        <strong>1. Quadro de carga horária contratada </strong>

                        <section
                            className='avoid'
                        >
                            <p className='headers'>Tabela 1 - Descrição dos serviços contratados</p>
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
                                        <td >{data["service"]}</td>
                                        <td >{(data["valorCurso"]).toFixed(2)}</td>
                                        <td >{parseFloat(parcel["descount"]).toFixed(2)}</td>
                                        <td >{data["Número de parcelas do curso"]}</td>
                                        <td >{data["Forma de pagamento da parcela"]}</td>
                                        <td >{(parcel["total"] - parcel["descount"]).toFixed(2)}</td>
                                    </tr>


                                </tbody>

                            </table>
                        </section>


                        <section
                            className='avoid'
                        >
                            <p className='headers'>Tabela 2 - Detalhamento das parcelas</p>
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
                                <tbody>
                                    {
                                        parcel.parcels.map((res, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{dateCalculator(data["Data de vencimento da primeira parcela"], idx)}</td>
                                                <td>{(parcel.total / parcel.parcels.length).toFixed(2)}</td>
                                                <td>{parseFloat(parcel.descountForPontuality).toFixed(2)}</td>
                                                <td>{(res.valor - parcel.descountForPontuality).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>

                                    </tr>


                                </tbody>

                            </table>
                        </section>



                    </div>
                </Container>

                <Container
                    className='beforeClass'
                    title='Página 4 do contrato'
                >
                    <div

                    >

                        <h4>1.1 - Condições de Pagamento</h4>
                        <p>
                            O valor total do curso está descrito na <strong>Tabela 1</strong>, na coluna <strong>&quot;Valor Bruto&quot;</strong>, e será pago em parcelas conforme indicado na coluna <strong>&quot;Número de Parcelas&quot;</strong>. Para pagamentos efetuados dentro do prazo de vencimento descrito na <strong>Tabela 2</strong>, coluna <strong>&quot;Vencimento&quot;</strong>, ou realizados através da forma de pagamento especificada na <strong>Tabela 1</strong>, coluna <strong>&quot;Forma de Pagamento&quot;</strong>, será concedido o desconto indicado na <strong>Tabela 2</strong>, coluna <strong>&quot;Desconto por Parcela&quot;</strong>. Dessa forma, o valor final a ser pago por parcela corresponderá ao valor descrito na <strong>Tabela 2</strong>, coluna <strong>&quot;Valor Líquido&quot;</strong>, desde que atendidas as seguintes condições:
                        </p>
                        <br />
                        <ul>
                            <li>Pagamento dentro do prazo de vencimento estipulado.</li>
                            <li>Utilização da forma de pagamento escolhida</li>
                        </ul>

                        <br />
                        <strong>1.2 - Perda do Desconto</strong>
                        <p>
                            Pagamentos efetuados <strong>após a data de vencimento</strong> ou realizados por meio de uma forma de pagamento diferente da especificada na <strong>Tabela 1</strong> resultarão na <strong>perda do desconto condicional, obrigando o CONTRATANTE ao pagamento do valor integral da parcela, conforme descrito na coluna &quot;Valor Bruto&quot; da Tabela 2</strong>. Além disso, haverá incidência de multa e juros, conforme descrito na cláusula seguinte.
                        </p>

                        <br />
                        <strong>1.3 - Multa e Juros</strong>
                        <p>
                            Para pagamentos efetuados após a data de vencimento, serão aplicados automaticamente:
                        </p>
                        <br />
                        <ul>
                            <li><strong> Multa de 2%</strong> (dois por cento) sobre o valor da parcela em atraso.</li>
                            <li><strong>Juros de mora de 0,33% ao dia </strong> sobre o valor devido</li>
                        </ul>
                        <strong>1.4 - Cobrança por Atraso</strong>

                        <p>
                            <strong>O CLIENTE está ciente de que, após 5 (cinco) dias de atraso</strong> , a empresa <strong>AMAIS Cobrança,</strong> contratada de forma terceirizada pela <strong>CONTRATADA</strong>, poderá assumir a cobrança, realizar contatos e ter acesso aos dados do <strong>CONTRATANTE </strong> para adotar as medidas cabíveis à recuperação do valor devido.
                        </p>
                        <br />

                        <strong>1.5 - Obrigação de Pagamento</strong>
                        <p>
                            <strong>
                                A ausência ou infrequência do ALUNO/CONTRATANTE nas atividades contratadas não o exime do pagamento das parcelas mensais, mantendo-se a obrigação de quitação integral do valor contratado.
                            </strong>
                        </p>
                        <h4>1.6 - Aplicação de Descontos em Boleto Bancário</h4>

                        <h4>
                            Caso o CONTRATANTE opte pelo pagamento via Boleto bancário, Pix cobrança ou Crédito via link, será de sua exclusiva responsabilidade comunicar à instituição bancária sobre a aplicação de descontos concedidos. A CONTRATADA não se responsabiliza por eventuais cobranças integrais devido à ausência dessa comunicação, nem será obrigada a realizar o ressarcimento.
                        </h4>

                    </div>
                </Container>

                <Container
                    className='beforeClass'
                    title='Página 5 do contrato'
                >
                    <div>

                        <h4>1.7 - Recesso Remunerado</h4>
                        <p>
                            <strong>
                                O CONTRATANTE está ciente de que nos meses de janeiro, julho e dezembro haverá recesso remunerado para a CONTRATADA, totalizando até seis (06) semanas
                            </strong> anualmente, sem prejuízo da obrigação de pagamento das mensalidades.
                        </p>
                        <strong>1.8 - Cobrança e Inscrição em Órgãos de Proteção ao Crédito</strong>

                        <br />
                        {
                            campaign.parcel &&
                            <>
                                <br />
                                <strong>1.9 - O CONTRATANTE é beneficiário da Campanha/Convênio &quot;{campaign.parcel.name}&quot;, a qual determina que &quot;{campaign.parcel.description}&quot;.</strong>
                            </>
                        }
                        <p>
                            Caso o débito permaneça em aberto por <strong>
                                30 (trinta) dias corridos, sem comprovação de quitação integral, a CONTRATADA terá o direito, sem necessidade de aviso prévio, de adotar as medidas legais cabíveis para cobrança, incluindo a inscrição do nome do CONTRATANTE em cadastros de proteção ao crédito, como SERASA EXPERIAN
                            </strong> e entidades similares.
                        </p>
                        <br />
                        <section
                            className='avoid'
                        >
                            <p className='headers'>Tabela 1 - Descrição dos Materiais didáticos</p>
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
                                        data["products"] &&
                                        data["products"].map((res) => (
                                            <tr key={res.id}>
                                                <td>{res.name}</td>
                                                <td>{(res.price_ticket).toFixed(2)}</td>
                                                <td>{(res.price_ticket - res[paymentMethodsForMaterials[data["Forma de pagamento do MD"]]]).toFixed(2)}</td>
                                                <td>{data["Quantidade de parcelas MD"]}</td>
                                                <td>{data["Forma de pagamento do MD"]}</td>
                                                <td>{(res[paymentMethodsForMaterials[data["Forma de pagamento do MD"]]].toFixed(2))}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                {
                                    data["products"].length > 0 &&
                                    <tfoot className='contrast'>
                                        <tr>
                                            <td>TOTAL</td>
                                            <td>{data['products'].reduce((acc, curr) => acc + curr.price_ticket, 0).toFixed(2)}</td>
                                            <td>{data['products'].reduce((acc, curr) => acc + curr.price_ticket - curr[paymentMethodsForMaterials[data["Forma de pagamento do MD"]]], 0).toFixed(2)}</td>
                                            <td>{data["Quantidade de parcelas MD"]}</td>
                                            <td>{data["Forma de pagamento do MD"]}</td>
                                            <td>{data['products'].reduce((acc, curr) => acc + curr[paymentMethodsForMaterials[data["Forma de pagamento do MD"]]], 0).toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                }

                            </table>
                        </section>

                        <br />

                        <section
                            className='avoid'
                        >
                            <p className='headers'>Tabela 2 - Detalhamento das parcelas</p>
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
                                        data["material"] &&
                                        data["material"].materials.map((res, idx) => (
                                            <tr key={idx}>
                                                <td>{idx + 1}</td>
                                                <td>{dateCalculator(data["Data de pagamento MD"], idx)}</td>
                                                <td>{(data['products'].reduce((acc, curr) => acc + curr.price_ticket, 0) / data['material'].materials.length).toFixed(2)}</td>
                                                <td>{((data['products'].reduce((acc, curr) => acc + curr[paymentMethodsForMaterials[data["Forma de pagamento do MD"]]], 0))
                                                    / data['material'].materials.length).toFixed(2)}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>

                                    </tr>

                                </tbody>

                            </table>
                        </section>



                    </div>
                </Container>

                <Container
                    className='beforeClass'
                    title='Página 5 do contrato'
                >
                    <div

                    >

                        <strong>2.1 - O CONTRATANTE poderá adquirir o material didático diretamente da CONTRATADA ou em um revendedor autorizado pela Editora/Fabricante, devendo respeitar todos os direitos de propriedade intelectual aplicáveis, incluindo, mas não se limitando, aos direitos autorais, conforme previsto na legislação vigente. A CONTRATADA não poderá ser responsabilizada por fraudes, erros ou golpes oriundos de compras realizadas fora de seus canais oficiais.</strong>
                        <br />
                        <strong>2.2 - A entrega do material didático será efetuada em até 10 (dez) dias úteis após a comprovação do pagamento da primeira parcela. O prazo poderá ser alterado por razões de força maior ou caso fortuito, conforme disposto no Código de Defesa do Consumidor.</strong>
                        <br />

                        <strong>2.3 - Natureza e Independência da Contratação</strong>
                        <p>
                            <strong>Os materiais didáticos listados na Tabela 1 são fornecidos como produtos independentes e não se vinculam à prestação de quaisquer outros serviços educacionais contratados. Sendo assim, o CONTRATANTE declara estar ciente de que a aquisição dos materiais se enquadra nas disposições do Código de Defesa do Consumidor para compras de produtos.</strong>
                        </p>

                        <strong>2.4 - Condições de Pagamento e Concessão de Descontos</strong>
                        <br />

                        <strong>
                            O CONTRATANTE se compromete a pagar o valor total descrito na Tabela 1, coluna &quot;Valor Bruto&quot;, que terá um desconto, conforme descrito na coluna &quot;Desconto Condicional&quot;, condicionado à forma de pagamento escolhida, descrita na coluna &quot;Forma de pagamento&quot;, . Esse desconto será aplicado apenas se as parcelas forem quitadas até a data de vencimento indicada na Tabela 2, coluna &quot;Vencimento&quot;.
                            O valor bruto de cada parcela está descrito na Tabela 2, coluna &quot;Valor Bruto&quot;, e o valor líquido da parcela com desconto condicional está especificado na coluna &quot;Valor Líquido da Parcela&quot;. O desconto somente será concedido mediante o cumprimento integral das condições estabelecidas neste contrato, sendo fatores essenciais para sua concessão:
                        </strong>
                        <br />

                        <ul>
                            <li><strong>A quitação pontual das parcelas dentro das datas de vencimento;</strong></li>
                            <li><strong>A forma de pagamento previamente acordada no ato da contratação.</strong></li>
                        </ul>
                        <h4> Caso o pagamento não seja realizado dentro do prazo estipulado ou seja efetuado por meio de uma forma de pagamento diversa da acordada, o desconto não será aplicado, e o CONTRATANTE será obrigado a quitar o valor integral de cada parcela, conforme o montante bruto estabelecido na Tabela 2.</h4>
                        <strong>2.5 - Alteração da Forma de Pagamento</strong>
                        <br />
                        <h4>O CONTRATANTE declara-se ciente de que qualquer alteração na forma de pagamento poderá implicar ajustes nos valores totais e nas parcelas, de acordo com a nova modalidade escolhida.</h4>

                    </div>
                </Container>

                <Container
                    className='beforeClass'
                    title='Página 6 do contrato'
                >
                    <div
                    >
                        <h4>2.6 - Penalidades por Atraso no Pagamento</h4>
                        <br />
                        <strong>Caso o pagamento seja realizado após a data de vencimento estipulada, o CONTRATANTE perderá o direito ao desconto condicional e deverá arcar com o valor bruto da(s) parcela(s), acrescido de multa moratória de 2% sobre o valor em atraso e juros de mora de 0,33% ao dia sobre o saldo devedor.</strong>
                        <br />
                        <strong>2.7 - Irrevogabilidade da Compra</strong>
                        <br />
                        <strong>Após o recebimento do material didático, o CONTRATANTE reconhece que nenhuma circunstância o eximirá da obrigação de quitação integral do valor devido. Observando que, a CONTRATADA não aceitará devoluções ou cancelamentos após a entrega do material.</strong>
                        <br />
                        <strong>2.8 - Inadimplência e Negativação</strong>
                        <br />
                        <strong>O não pagamento integral ou parcial do material didático até a data de vencimento acarretará a inclusão do CPF do CONTRATANTE nos órgãos de proteção ao crédito, tais como SERASA EXPERIAN, após trinta (30) dias de inadimplência.</strong>
                        <br />
                        <strong>2.9 - Cobrança Extrajudicial</strong>
                        <br />
                        <h4>Após cinco (5) dias de atraso, a empresa terceirizada AMAIS Cobrança, contratada pela CONTRATADA, assumirá a cobrança e realizará contatos diretos com o CONTRATANTE para a recuperação do crédito devido. Dessa forma, a referida empresa terá direito de acesso aos dados pessoais do cliente e às informações da negociação realizada junto à CONTRATADA</h4>

                        <h4>2.10 - Cancelamento da Compra e Reembolso</h4>
                        <h4
                        >O CONTRATANTE poderá cancelar a compra e solicitar reembolso apenas se o material didático ainda não tiver sido retirado. Após a retirada, não será possível solicitar cancelamento ou estorno de valores.
                        </h4>
                        <h4>2.11 - Reajuste de Preços</h4>

                        A <strong>CONTRATADA </strong>reserva-se o direito de reajustar os valores dos materiais didáticos apenas em caso de inadimplência do
                        <strong>CONTRATANTE,</strong> conforme as condições estabelecidas neste contrato.

                    </div>
                </Container>

                <Container
                    className='beforeClass'
                    title='Página 7 do contrato'
                >
                    <div
                    >

                        <h4>3.0 - Taxa de Adesão</h4>
                        <br />
                        <strong>
                            A CONTRATADA reserva-se o direito de cobrar uma taxa de adesão, denominada &quot;TAXA DE MATRÍCULA&quot;, no valor de até R$350,00, a ser paga no ato da matrícula. Tal valor destina-se à cobertura de custos operacionais e administrativos relacionados ao processo de adesão. A CONTRATADA poderá conceder um desconto condicional de R${data["Valor do Desconto na Taxa de Matrícula"]},
                            resultando em um valor líquido final a ser pago
                            de R${taxValue}, desde que atendidas as condições estabelecidas no contrato, incluindo a forma de pagamento escolhida e o cumprimento do prazo de quitação.

                        </strong>
                        <br />
                        {
                            campaign.tax &&
                            <>
                                <br />
                                <strong>
                                    &quot;O CONTRATANTE é beneficiário da Campanha/Convênio &quot;{campaign.tax.name}&quot;, a qual determina que &quot;{campaign.tax.description}&quot;.&quot;
                                </strong>
                                <br />
                            </>
                        }
                        <br />
                        <strong>4. OBRIGAÇÕES DA CONTRATADA</strong>
                        <br />
                        <strong>4.1 A CONTRATADA compromete-se a prestar serviços educacionais para o curso selecionado no QUADRO DE RESUMO deste contrato, por meio de aulas presenciais, online ou híbridas, conforme a metodologia adotada e necessidades do ensino.</strong>
                        <br />
                        <strong>4.2 Após a conclusão da carga horária e aprovação nos critérios avaliativos, o CONTRATANTE poderá solicitar, sem custos adicionais, a emissão do certificado de conclusão em formato digital ou físico.</strong>
                        <br />
                        <strong>4.2.1 O certificado será emitido somente se o CONTRATANTE atingir a frequência mínima de 75% (setenta e cinco por cento) das aulas e atender aos critérios avaliativos internos, sob análise da Coordenação Pedagógica da CONTRATADA.</strong>
                        <br />
                        <strong>4.3 A emissão do certificado está condicionada à regularização de quaisquer pendências financeiras junto à CONTRATADA.</strong>
                        <br />
                        <strong>4.4 Os cursos na modalidade em turma deverão ter um mínimo de 6 (seis) alunos matriculados para o início das aulas.</strong>
                        <br />
                        <strong
                        >4.5 Caso não haja quórum mínimo de alunos matriculados para o início do curso na data prevista, a CONTRATADA poderá prorrogar o início das aulas, independentemente do formato, modalidade ou classe, quantas vezes forem necessárias, por um período máximo de 2 (dois) meses, contados a partir da data originalmente prevista. Se, ao final desse prazo, o quórum mínimo não for atingido, a CONTRATADA ou o CONTRATANTE poderá cancelar unilateralmente o contrato, sem ônus e não iniciar as aulas.
                        </strong>
                        <h4>5. GESTÃO DO CURSO</h4>
                        <h4>5.1 O planejamento pedagógico, calendário acadêmico, definição de carga horária, designação de professores e organização das turmas são de competência exclusiva da CONTRATADA, sem ingerência do CONTRATANTE.</h4>

                        <h4>5.2 A CONTRATADA poderá, a seu critério, remanejar ou fundir turmas, bem como transferir o CONTRATANTE para outra turma sem custos adicionais, caso a sua classe original seja descontinuada.</h4>
                        <h4>5.3 A CONTRATADA poderá solicitar a mudança de horário e/ou turma do CONTRATANTE para garantir a adequação à proposta pedagógica, sem obrigatoriedade de cobrança adicional ou concessão de descontos.</h4>

                    </div>


                </Container>


                <Container
                    className='avoid'

                    title='Página 8 do contrato'
                >
                    <div

                    >

                        <strong>5.4 O CONTRATANTE poderá solicitar monitoria durante a carga horária contratada, sujeita à avaliação e aprovação da Coordenação Pedagógica, que determinará a duração e frequência.</strong>
                        <br />
                        <strong>6. FREQUÊNCIA, HORÁRIO E REPOSIÇÃO</strong>
                        <br />
                        <strong>6.1 MODALIDADE “EM GRUPO”: As regras a seguir aplicam-se exclusivamente aos alunos matriculados na modalidade “Em grupo”.</strong>
                        <br />
                        <strong>6.1.1 O CONTRATANTE terá uma tolerância de 20 (vinte) minutos para atrasos no início das aulas, tanto online quanto presenciais. Após esse período, poderá solicitar reposição.</strong>
                        <br />
                        <strong>6.1.2 O CONTRATANTE tem direito a até 5 (cinco) reposições gratuitas dentro da carga horária contratada. A partir da 6ª (sexta), será cobrada uma taxa de R$ 45,00 (quarenta e cinco reais) por aula adicional. A falta deve ser comunicada com pelo menos 24 (vinte e quatro) horas de antecedência para garantir a remarcação sem custos.</strong>
                        <br />
                        <strong>6.1.3 As reposições seguirão os horários disponíveis da CONTRATADA. Em caso de perda de avaliações, o CONTRATANTE deverá atender aos critérios estabelecidos pela CONTRATADA para a nova aplicação.</strong>
                        <br />
                        <strong>6.1.4 A CONTRATADA definirá, no ato da matrícula, dias e horários fixos para a realização das aulas, denominados “HORÁRIOS PREESTABELECIDOS”.</strong>
                        <br />
                        <strong>6.2 MODALIDADES “INDIVIDUAL”, “DUPLA” E “TRIO”: As regras a seguir aplicam-se exclusivamente aos alunos matriculados nas modalidades “Individual”, “Dupla” e “Trio”.</strong>
                        <br />
                        <strong>6.2.1 O ALUNO/CONTRATANTE poderá remarcar até 2 (duas) aulas mensais sem custo, desde que informe a ausência com pelo menos 5 (cinco) horas de antecedência. Caso contrário, perderá o direito à remarcação.</strong>
                        <br />
                        <h4>6.2.2 A aula perdida poderá ser remarcada dentro de 3 (três) dias. Após esse prazo, não será possível reagendá-la.</h4>
                        <h4>6.2.3 Para aulas não preestabelecidas ou remarcadas, o ALUNO/CONTRATANTE estará sujeito à disponibilidade de horários, profissionais e estrutura da CONTRATADA.</h4>
                        <h4>6.2.4 Caso o ALUNO/CONTRATANTE cancele uma aula já remarcada, não terá direito a novo agendamento.</h4>
                        <h4>7. RENOVAÇÃO E CONCLUSÃO DO CONTRATO</h4>

                        <h4> 7.1. O presente contrato firmado entre as partes, terá prazo determinado de doze meses iniciando da data da assinatura do presente instrumento observando carga horária especificada no preambulo do contrato, e uma vez cumprida a carga horário e cumprido o prazo contratual o presente contrato sem manifestação do CONTRATANTE será automaticamente transformado em contrato por tempo indeterminado, com início da vigência a partir da data de conclusão da carga horária estabelecida no contrato</h4>

                        <h4>7.2. Vencido o período de vigência contratual sem a expressa manifestação do CONTRATANTE para efetuar a rescisão do vínculo contratual ocorrerá a conversão do presente contrato para tempo indeterminado, para isso será necessário que o aluno tenha cumprido integralmente a carga horária acordada, conforme especificado no preambulo do presente contrato, não esteja em mora com as mensalidades e demais pagamentos como material didático, e cumpra as normas internas e regulamentos da escola.</h4>

                    </div>
                </Container >

                <Container
                    className='beforeClass'
                    title='Página 9 do contrato'
                >
                    <div>
                        <h4>7.3. Com a conversão, o aluno terá direito a continuar os estudos no curso contratado sem a necessidade de renovação contratual e sem limitação de tempo para a conclusão, obedecendo às condições e termos gerais estabelecidos pela instituição para alunos de curso contínuo incluindo reajustes nas mensalidades de até 10% anualmente.</h4>

                        <strong>7.4. Após a conversão, a rescisão do contrato poderá ser solicitada por qualquer das partes, respeitando o prazo de aviso prévio de 30 (trinta) dias.</strong>
                        <br />
                        <strong>8. DESISTÊNCIA, RESCISÃO E TÉRMINO DO CONTRATO</strong>
                        <br />
                        <strong>8.1 O término do contrato ocorrerá apenas após a quitação integral de débitos, formalizada por recibo de quitação, sendo insuficientes para a rescisão o vencimento do prazo contratual, a conclusão da carga horária ou o abandono do curso.</strong>
                        <br />
                        <strong>8.2 A titularidade deste contrato é intransferível, salvo exceções acordadas entre as partes por meio de aditivo contratual assinado.</strong>
                        <br />
                        <strong>
                            8.3 O direito de desistência segue as diretrizes do Código de Defesa do Consumidor:
                            Assinatura online: prazo de 7 (sete) dias a partir da assinatura digital;
                            Assinatura presencial: prazo de 48 (quarenta e oito) horas antes do início das aulas;
                            Após esses prazos, não haverá devolução de valores pagos.
                        </strong>
                        <br />
                        <strong>
                            8.4 O cancelamento deve ser solicitado por escrito e formalizado por reunião presencial na sede da CONTRATADA ou, no caso de cursos online, via reunião por videoconferência, com aviso prévio mínimo de 30 (trinta) dias.
                        </strong>
                        <br />
                        <strong>
                            8.5 Caso o cancelamento ocorra após o início das aulas, o CONTRATANTE deverá pagar multa de 10% (dez por cento) sobre o valor proporcional da carga horária restante,  não havendo o CONTRATANTE direito de reembolso.
                        </strong>
                        <br />
                        <strong>
                            8.6 Em caso de abandono do curso, a CONTRATADA poderá adotar medidas legais para cobrança dos valores devidos, incluindo juros e correção monetária.
                        </strong>
                        <br />
                        <strong>
                            8.9 A CONTRATADA poderá rescindir o contrato imediatamente em caso de inadimplência ou força maior que impeça a prestação dos serviços.
                        </strong>
                        <br />
                        <strong>
                            8.10 O não pagamento da mensalidade permitirá à CONTRATADA negar a renovação da matrícula.
                        </strong>
                        <br />
                        <strong>
                            8.11 Ocorrendo a manifestação escrita e expressa de desistência do contrato antes do início das aulas, nos prazos descrito acima o CONTRATANTE terá direito a reembolso dos valores pagos de matrícula, eventuais mensalidades adiantadas e material didático, observando a retenção de 20% do valor integral da matrícula por parte da CONTRATADA a título de custos administrativos.
                        </strong>
                        <br />
                        <strong>
                            9. TRATAMENTO DE DADOS PESSOAIS E LGPD
                        </strong>
                        <br />
                        <strong>
                            9.1 A CONTRATADA obriga-se a proteger os dados pessoais de que terão acesso em função deste contrato, bem como a cumprir todas as determinações da Lei 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD) e dos órgãos reguladores/fiscalizadores da matéria, atuando em perfeita conformidade com as políticas de proteção de dados pessoais existentes.
                        </strong>
                        <br />

                    </div>
                </Container >

                <Container
                    className='beforeClass'
                    title='Página 9 do contrato'
                >
                    <div>
                        <h4>
                            9.2 – Quando for o caso, deverá a CONTRATADA possibilitar o exercício dos direitos do titular dos dados pessoais, conforme legislação brasileira vigente, comprometendo-se a informá-lo sobre as regras, diretrizes e finalidades de tratamento de seus dados pessoais no âmbito da realização das atividades decorrentes deste contrato.
                        </h4>
                        <h4>
                            9.3 - A CONTRATADA deverá manter sigilo em relação aos dados pessoais tratados em virtude deste instrumento, garantindo que todos os seus empregados estejam comprometidos e sujeitos ao dever de confidencialidade, bem como devidamente instruídos e capacitados para o tratamento de dados pessoais.
                        </h4>
                        <br />
                        <strong>
                            9.3.1 - O dever de confidencialidade mantém-se ainda que a relação entre as partes venha a ser extinta, independentemente dos motivos que derem causa à sua extinção.
                        </strong>
                        <br />
                        <strong>
                            9.4 - Qualquer ocorrência de violação do sigilo dos dados deve ser imediatamente comunicada à outra parte, sendo que todas as apurações e medidas de contenção, incluindo aquelas especificadas na legislação competente acerca da matéria, devem ser tomadas, de forma imediata, a fim de minimizar danos.
                        </strong>
                        <br />
                        <strong>
                            9.5 - Os dados pessoais do CONTRATANTE, assim como das demais pessoas vinculadas à execução deste contrato, passarão a constar nas interfaces da CONTRATADA como forma de permitir o perfeito cumprimento deste objeto.
                        </strong>
                        <br />
                        <strong>
                            9.6 - A CONTRATANTE atuará em perfeita sintonia à proteção dos dados pessoais, sendo que todos os procedimentos necessários ao fiel cumprimento da Lei 13.709/2018 (Lei Geral de Proteção de Dados Pessoais - LGPD) estão dispostos na Deliberação da Mesa n° 2.766/2021.
                        </strong>
                        <br />

                        <strong>
                            10. CONCORDÂNCIA E ASSINATURA DO CONTRATO
                        </strong>
                        <br />

                        <strong>11.1 O CONTRATANTE e a CONTRATADA reconhecem a validade da assinatura eletrônica via Aautentique, meio similar ou física e seus mecanismos de autenticação.</strong>
                        <br />
                        <strong>10.2 O CONTRATANTE concorda em utilizar a plataforma indicada pela CONTRATADA, como Autentique ou similar, cuja autenticidade é garantida por chave criptográfica.</strong>
                        <br />
                        <strong>10.2 O CONTRATANTE e a CONTRATADA confirmam a veracidade das informações fornecidas, estando cientes de que a falsidade dessas informações pode configurar crime nos termos do Código Penal Brasileiro.</strong>
                        <br />
                        <strong>10.3 As partes reconhecem a validade do contrato e comprometem-se a cumprir integralmente seus termos.</strong>
                        <br />
                        <strong>11. DISPOSIÇÕES GERAIS</strong>
                        <br />
                        <strong>11.2 A CONTRATADA não se responsabiliza pela obtenção de equipamentos necessários para aulas online, como internet, fones de ouvido e dispositivos eletrônicos.</strong>
                        <h4>11.3 O CONTRATANTE autoriza neste ato, de forma vitalícia, a veiculação de imagens, vídeos e materiais acadêmicos produzidos durante o curso para fins institucionais e publicitários, observando-se sempre a moral e os bons costumes, a fim de preservar o uso positivo da imagem do cedente.</h4>

                    </div>
                </Container >

                <Container
                    className='beforeClass'
                    title='Página 9 do contrato'
                >
                    <div>

                        <h4>11.4 Os casos omissos serão regidos pelo Código Civil Brasileiro.</h4>
                        <strong>12. FORO</strong>
                        <br />
                        <strong>12.1 Fica eleito o foro da comarca de Betim/MG para a resolução de quaisquer litígios oriundos deste contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</strong>

                        <span className="sign" id="sign">
                            <span className="sign-marker" id="sign-marker">
                                CONTRATANTE/ RESPONSÁVEL LEGAL
                            </span>
                            <span className="sign-marker" id="sign-marker"> CONTRATADA </span>
                        </span>

                        {
                            data["Tipo de assinatura"] !== "Online" &&
                            <table>
                                <tr>
                                    <td className="field-sign">Testemunha 1:</td>
                                    <td className="field-sign">Testemunha 2:</td>
                                </tr>
                                <tr>
                                    <td className="field-sign">Nome:</td>
                                    <td className="field-sign">Nome:</td>
                                </tr>
                                <tr>
                                    <td className="field-sign">CPF:</td>
                                    <td className="field-sign">CPF:</td>
                                </tr>
                                <tr>
                                    <td className="field-sign">Assinatura:</td>
                                    <td className="field-sign">Assinatura:</td>
                                </tr>
                            </table>
                        }
                    </div>
                </Container >

            </div>
        </File>

    )
}


PDFFile.propTypes = {

    data: PropTypes.shape({
        Email: PropTypes.string,
        products: PropTypes.arrayOf({
            id: PropTypes.string,
            name: PropTypes.string,
            sku: PropTypes.string,
            color: PropTypes.string,
            status: PropTypes.bool,
            price_selling: PropTypes.number,
            price_ticket: PropTypes.number,
            price_card: PropTypes.number,
            price_cash: PropTypes.number,
            price_link: PropTypes.number,
            category: PropTypes.string,
            created_at: PropTypes.string,
            updated_at: PropTypes.string
        }),
        material: PropTypes.arrayOf({
            materials: PropTypes.array,
            total: PropTypes.string,
            descount: PropTypes.string,

        }),
        tax: PropTypes.arrayOf({
            materials: PropTypes.array,
            total: PropTypes.string,
            descount: PropTypes.string,

        }),
        CEP: PropTypes.string,
        Endereco: PropTypes.string,
        Complemento: PropTypes.string,
        Bairro: PropTypes.string,
        Cidade: PropTypes.string,
        Uf: PropTypes.string,

        "Nº do contrato": PropTypes.string,
        "Data de emissão da venda": PropTypes.string,
        "Tipo/ modalidade": PropTypes.string,
        id: PropTypes.string,
        promocao: PropTypes.string,
        vendedor: PropTypes.string,
        CelularResponsavel: PropTypes.string,
        email: PropTypes.string,
        valorCurso: PropTypes.number,
        service: PropTypes.string,
        'Nome do responsável': PropTypes.string,
        CPF: PropTypes.string,
        'RG responsável': PropTypes.string,
        'Data de nascimento do  responsável': PropTypes.string,
        'Estado civil responsável': PropTypes.string,
        'Profissão': PropTypes.string,
        'País': PropTypes.string,

        'Endereço': PropTypes.string,
        'Número': PropTypes.string,
        'Onde o voucher será aplicado?': PropTypes.string,
        'Valor de taxa de matrícula': PropTypes.string,
        'Valor de desconto na taxa de matrícula': PropTypes.string,
        'Tipo de Campanha / Convênio': PropTypes.array,
        'Valor do Desconto na Taxa de Matrícula': PropTypes.string,
        'Data de pagamento TM': PropTypes.string,
        'Quantidade de parcelas TM ': PropTypes.string,
        'Número de parcelas do curso': PropTypes.string,
        'Forma de pagamento da parcela': PropTypes.string,
        'Valor total da parcela': PropTypes.string,
        'Valor do desconto de pontualidade por parcela': PropTypes.string,
        'Tipo de pagamento': PropTypes.string,
        'Forma de pagamento TM': PropTypes.string,
        'Valor do desconto primeiras parcelas': PropTypes.string,
        ' Quantidade de demais parcelas': PropTypes.string,
        'Quantidade de primeiras parcelas com desconto': PropTypes.string,
        'Desconto total': PropTypes.string,
        'Valor do desconto demais parcelas': PropTypes.string,
        'Data de vencimento da última parcela': PropTypes.string,
        'Data de vencimento da primeira parcela': PropTypes.string,
        'Valor total do material didático': PropTypes.string,
        'Material didático': PropTypes.array,
        'Quantidade de parcelas MD': PropTypes.string,
        'Valor do desconto material didático': PropTypes.string,
        'Data de pagamento MD': PropTypes.string,
        'Forma de pagamento do MD': PropTypes.string,
        'Data de início do contrato': PropTypes.string,
        'Data de fim do contrato': PropTypes.string,
        'Nome do aluno': PropTypes.string,
        'Data de nascimento do aluno': PropTypes.string,
        'Background do Aluno': PropTypes.string,
        'Idade do Aluno': PropTypes.string,
        'Possui conhecimento no idioma?': PropTypes.string,
        'Precisa de nivelamento?': PropTypes.string,
        'Dia de aula': PropTypes.array,
        'Data da primeira aula': PropTypes.string,
        Professor: PropTypes.string,
        'Horário de Inicio': PropTypes.string,
        'Formato de Aula': PropTypes.string,
        'Horário de fim': PropTypes.string,
        'Tipo de plano': PropTypes.string,
        Curso: PropTypes.string,
        Unidade: PropTypes.string,
        Subclasse: PropTypes.string,
        Classe: PropTypes.string,
        'Carga horário do curso': PropTypes.string,
        'Tipo de assinatura': PropTypes.string,
        'Observações importantes para o financeiro:': PropTypes.string,
        Vendedor: PropTypes.string,
    }),
    parcel: PropTypes.arrayOf({
        parcels: PropTypes.array,
        total: PropTypes.number,
        descount: PropTypes.string,
        descountForPontuality: PropTypes.string
    }),
    campaign: PropTypes.shape({

        tax: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            affectedParcels: PropTypes.number,
            value: PropTypes.number,
            descountType: PropTypes.string,
            for: PropTypes.string,
            status: PropTypes.bool,
            created_at: PropTypes.string,
            updated_at: PropTypes.string
        }),
        parcel: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            affectedParcels: PropTypes.number,
            value: PropTypes.number,
            descountType: PropTypes.string,
            for: PropTypes.string,
            status: PropTypes.bool,
            created_at: PropTypes.string,
            updated_at: PropTypes.string
        }),
        material: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            description: PropTypes.string,
            affectedParcels: PropTypes.number,
            value: PropTypes.number,
            descountType: PropTypes.string,
            for: PropTypes.string,
            status: PropTypes.bool,
            created_at: PropTypes.string,
            updated_at: PropTypes.string
        }),

    })
}
// Contract.propTypes = {
//     data: PropTypes.shape({
//         Email: PropTypes.string,
//         products: PropTypes.arrayOf({
//             id: PropTypes.string,
//             name: PropTypes.string,
//             sku: PropTypes.string,
//             color: PropTypes.string,
//             status: PropTypes.bool,
//             price_selling: PropTypes.number,
//             price_ticket: PropTypes.number,
//             price_card: PropTypes.number,
//             price_cash: PropTypes.number,
//             price_link: PropTypes.number,
//             category: PropTypes.string,
//             created_at: PropTypes.string,
//             updated_at: PropTypes.string
//         }),
//         material: PropTypes.arrayOf({
//             materials: PropTypes.array,
//             total: PropTypes.string,
//             descount: PropTypes.string,

//         }),
//         CEP: PropTypes.string,
//         Endereco: PropTypes.string,
//         Complemento: PropTypes.string,
//         Bairro: PropTypes.string,
//         Cidade: PropTypes.string,
//         Uf: PropTypes.string,

//         "Nº do contrato": PropTypes.string,
//         "Data de emissão da venda": PropTypes.string,
//         "Tipo/ modalidade": PropTypes.string,
//         id: PropTypes.string,
//         promocao: PropTypes.string,
//         vendedor: PropTypes.string,
//         CelularResponsavel: PropTypes.string,
//         email: PropTypes.string,
//         valorCurso: PropTypes.number,
//         service: PropTypes.string,
//         'Nome do responsável': PropTypes.string,
//         CPF: PropTypes.string,
//         'RG responsável': PropTypes.string,
//         'Data de nascimento do  responsável': PropTypes.string,
//         'Estado civil responsável': PropTypes.string,
//         'Profissão': PropTypes.string,
//         'País': PropTypes.string,

//         'Endereço': PropTypes.string,
//         'Número': PropTypes.string,
//         'Onde o voucher será aplicado?': PropTypes.string,
//         'Valor de taxa de matrícula': PropTypes.string,
//         'Valor de desconto na taxa de matrícula': PropTypes.string,
//         'Tipo de Campanha / Convênio': PropTypes.array,
//         'Valor do Desconto na Taxa de Matrícula': PropTypes.string,
//         'Data de pagamento TM': PropTypes.string,
//         'Quantidade de parcelas TM ': PropTypes.string,
//         'Número de parcelas': PropTypes.string,
//         'Forma de pagamento da parcela': PropTypes.string,
//         'Valor total da parcela': PropTypes.string,
//         'Valor do desconto de pontualidade por parcela': PropTypes.string,
//         'Tipo de pagamento': PropTypes.string,
//         'Forma de pagamento TM': PropTypes.string,
//         'Valor do desconto primeiras parcelas': PropTypes.string,
//         ' Quantidade de demais parcelas': PropTypes.string,
//         'Quantidade de primeiras parcelas com desconto': PropTypes.string,
//         'Desconto total': PropTypes.string,
//         'Valor do desconto demais parcelas': PropTypes.string,
//         'Data de vencimento da última parcela': PropTypes.string,
//         'Data de vencimento da primeira parcela': PropTypes.string,
//         'Valor total do material didático': PropTypes.string,
//         'Material didático': PropTypes.array,
//         'Quantidade de parcelas MD': PropTypes.string,
//         'Valor do desconto material didático': PropTypes.string,
//         'Data de pagamento MD': PropTypes.string,
//         'Forma de pagamento do MD': PropTypes.string,
//         'Data de início do contrato': PropTypes.string,
//         'Data de fim do contrato': PropTypes.string,
//         'Nome do aluno': PropTypes.string,
//         'Data de nascimento do aluno': PropTypes.string,
//         'Background do Aluno': PropTypes.string,
//         'Idade do Aluno': PropTypes.string,
//         'Possui conhecimento no idioma?': PropTypes.string,
//         'Precisa de nivelamento?': PropTypes.string,
//         'Dia de aula': PropTypes.array,
//         'Data da primeira aula': PropTypes.string,
//         Professor: PropTypes.string,
//         'Horário de Inicio': PropTypes.string,
//         'Formato de Aula': PropTypes.string,
//         'Horário de fim': PropTypes.string,
//         'Tipo de plano': PropTypes.string,
//         Curso: PropTypes.string,
//         Unidade: PropTypes.string,
//         Subclasse: PropTypes.string,
//         Classe: PropTypes.string,
//         'Carga horário do curso': PropTypes.string,
//         'Tipo de assinatura': PropTypes.string,
//         'Observações importantes para o financeiro:': PropTypes.string,
//         Vendedor: PropTypes.string,
//     }),
//     parcel: PropTypes.arrayOf({
//         valor: PropTypes.string
//     }),
//     campaign: PropTypes.shape({

//         id: PropTypes.string,
//         name: PropTypes.string,
//         description: PropTypes.string,
//         affectedParcels: PropTypes.number,
//         value: PropTypes.number,
//         descountType: PropTypes.string,
//         for: PropTypes.string,
//         status: PropTypes.bool,
//         created_at: PropTypes.string,
//         updated_at: PropTypes.string
//     })
// }
