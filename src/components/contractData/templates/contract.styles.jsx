import styled from 'styled-components'



export const File = styled.main`
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
#container1{
    border: 1px solid;
    padding: 1rem 3rem;
}
button{
width: 30%;

}
`
export const Container = styled.section`
font: var(--fsMid) 'Open Sans', sans-serif;
text-align: justify;
padding: 3rem 5rem;
min-height: 90dvh;
display: flex;
align-items: center;
/* border: 1px solid; */
div{
    width: 100%;
}
section,
tr,
td {
page-break-before: always;
border: 1px solid #000;
border-spacing: 0;
}
tr,td, section {
    border-radius: .2rem;
    padding: .3rem;
}
.headers{
    text-align: center;
    /* font-size: var(--fs); */
    /* margin: 2rem auto; */
}
.bolder{
    font-weight: bold;
}
section{
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
table {
margin: 5px auto;
width: 100%;
}
.contrast{
    background-color: #e7e7e7;
}
.sign {
display: flex;
margin: 2em auto;
gap: 2rem;
width: 100%;
justify-content: space-around;
}
.sign-marker {
width: 50%;
border-top: 1px solid #222;
margin: 2rem 0;
text-align: center;
}
.field-sign {
padding: 1rem;
}
.editable{
    padding: 3px;
    border: 1px solid #222;
}

/* .avoid{
page-break-inside: avoid;
}
.beforeClass {
page-break-before: always;
} */

`


//     < Container
// imageId = { 1}
// id = "content1"
// title = 'Multipage - page 1'
//     >

//     <div>
//         <h4 className='headers'>
//             QUADRO RESUMO DO CONTRATO DE PRESTAÇÃO DE SERVIÇO EDUCACIONAL E AQUISIÇÃO DO MATERIAL DIDÁTICO

//         </h4>

//         <h3 className='headers'>
//             Qualificação das partes
//         </h3>

//         <section>
//             <p className='headers'>
//                 CONTRATANTE (ALUNO OU RESPONSÁVEL LEGAL)

//             </p>
//             <table>

//                 <tbody>

//                     <tr>
//                         <td className='bolder'>Descrição</td>
//                         <td className='bolder'>Dados</td>
//                     </tr>
//                     <tr>
//                         <td>CPF</td>
//                         <td>{data["CPF"]}</td>
//                     </tr>
//                     <tr>
//                         <td>E-mail</td>
//                         <td>{data.Email}</td>
//                     </tr>
//                     <tr>
//                         <td>Telefone</td>
//                         <td>{data.CelularResponsavel}</td>
//                     </tr>

//                     <tr>
//                         <td>Endereço</td>
//                         <td> {data["Endereco"]}</td>
//                     </tr>
//                     <tr>
//                         <td>Complemento</td>
//                         <td> {data["Complemento"]}</td>
//                     </tr>
//                     <tr>
//                         <td>Bairro</td>
//                         <td> {data["Bairro"]}</td>
//                     </tr>
//                     <tr>
//                         <td>Cidade</td>
//                         <td> {data["Cidade"]}</td>
//                     </tr>
//                     <tr>
//                         <td>Uf</td>
//                         <td> {data["Uf"]}</td>
//                     </tr>
//                     <tr>
//                         <td>CEP</td>
//                         <td> {data["CEP"]}</td>
//                     </tr>
//                     <tr>
//                         <td>Profissão</td>
//                         <td> {data["Profissão"]}</td>
//                     </tr>
//                 </tbody>

//             </table>
//         </section>

//         <br />
//         <hr />
//         <br />
//         <section>
//             <p className='headers'>CONTRATADA</p>
//             <table>
//                 <thead>
//                     <tr>
//                         <td>Razão social</td>
//                         <td>Telefone</td>
//                         <td>CPNJ</td>
//                         <td>Endereço</td>
//                         <td>CEP</td>
//                         <td>Unidade responsável</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td >AMERICAN WAY ESCOLA DE IDIOMAS BETIM LTDA</td>
//                         <td >(31) 3593-3961</td>
//                         <td >18.953.641/0001-26</td>
//                         <td >Rua Japurá, 341, Santa Cruz, Betim/MG</td>
//                         <td >32.667-358</td>
//                         <td >Unidade PTB</td>
//                     </tr>
//                     <tr>
//                         <td >AMERICAN WAY ESCOLA DE IDIOMAS CENTRO LTDA</td>
//                         <td >(31) 3360-6963</td>
//                         <td >42.387.487/0001-57</td>
//                         <td >Avenida Amazonas, 1209, Centro, Betim/MG</td>
//                         <td >32.600-325</td>
//                         <td >Unidade Centro</td>
//                     </tr>

//                 </tbody>

//             </table>
//         </section>
//         <br />
//         <hr />
//         <br />

//         <p>
//             Neste ato, representadas pelo REPRESENTANTE LEGAL: Victor Henrique Manhaes de Souza, CPF: 09160852607.
//             Este documento estabelece os termos e condições do contrato de prestação de serviços educacionais e aquisição de material didático,
//             estando as partes cientes e de comum acordo com suas disposições.

//         </p>
//         {/* //////////////// */}

//         <section>
//             <p className='headers'>QUADRO DE INFORMAÇÕES DA MATRÍCULA</p>
//             <table>
//                 <thead>
//                     <tr>
//                         <td>Descrição</td>
//                         <td>Dados</td>

//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td >Aluno</td>
//                         <td >{data["Nome do aluno"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Data de nascimento</td>
//                         <td >{data["Data de nascimento do aluno"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Curso</td>
//                         <td >{data["Curso"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Categoria do curso</td>
//                         <td >{data["Classe"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Subcategoria do curso</td>
//                         <td >{data["Subclasse"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Tipo de ensino</td>
//                         <td >{data["Formato de Aula"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Calendário didático</td>
//                         <td >As aulas serão realizadas conforme o calendário didático estipulado</td>
//                     </tr>
//                     <tr>
//                         <td >Data da matrícula</td>
//                         <td >{data["Data de emissão da venda"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Tipo de contrato</td>
//                         <td >{data["Tipo de plano"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Código do contrato</td>
//                         <td >{data["Nº do contrato"]}</td>
//                     </tr>

//                     <tr>
//                         <td >Tipo de assinatura</td>
//                         <td >{data["Tipo de assinatura"]}</td>
//                     </tr>
//                     <tr>
//                         <td >Unidade</td>
//                         <td >{data["Unidade"]}</td>
//                     </tr>
//                 </tbody>

//             </table>
//         </section>

//     </div>
//                 </Container >

//     < Container
// imageId = { 2}
// id = "content2"
// title = 'Multipage - page 2'

//     >

//     <div>
//         <strong> SOBRE VALOR E DESCONTOS </strong>
//         <br />
//         <strong>1. Quadro de carga horária contratada </strong>

//         <section>
//             <p className='headers'>Tabela 1 - Descrição dos serviços contratados</p>
//             <table>
//                 <thead className='contrast'>
//                     <tr>
//                         <td>Descrição do serviço</td>
//                         <td>Valor bruto</td>
//                         <td>Total de desconto condicional(R$)</td>
//                         <td>Número de parcelas</td>
//                         <td>Forma de pagamento</td>
//                         <td>Valor total líquido (R$)</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td >{data["service"]}</td>
//                         <td >{data["valorCurso"]}</td>
//                         <td >{parcel["descount"]}</td>
//                         <td >{data["Número de parcelas"]}</td>
//                         <td >{data["Forma de pagamento da parcela"]}</td>
//                         <td >{parcel["total"]}</td>
//                     </tr>


//                 </tbody>

//             </table>
//         </section>

//         <br />
//         <hr />
//         <br />

//         <section>
//             <p className='headers'>Tabela 2 - Detalhamento das parcelas</p>
//             <table>
//                 <thead className='contrast'>
//                     <tr>
//                         <td>Parcela</td>
//                         <td>Vencimento</td>
//                         <td>Valor bruto</td>
//                         <td>Desconto por parcelas</td>
//                         <td>Valor líquido (R$)</td>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         parcel.parcels.map((res, idx) => (
//                             <tr key={idx}>
//                                 <td>{idx + 1}</td>
//                                 <td>{dateCalculator(idx)}</td>
//                                 <td>{parcel.total / parcel.parcels.length}</td>
//                                 <td>{parcel.descount}</td>
//                                 <td>{res.valor}</td>
//                             </tr>
//                         ))
//                     }
//                     <tr>

//                     </tr>


//                 </tbody>

//             </table>
//         </section>
//         <strong>1.1 - Condições de Pagamento</strong>
//         <p>
//             O valor total do curso está descrito na <strong>Tabela 1</strong>, na coluna <strong>&quot;Valor Bruto&quot;</strong>, e será pago em parcelas conforme indicado na coluna <strong>&quot;Número de Parcelas&quot;</strong>. Para pagamentos efetuados dentro do prazo de vencimento descrito na <strong>Tabela 2</strong>, coluna <strong>&quot;Vencimento&quot;</strong>, ou realizados através da forma de pagamento especificada na <strong>Tabela 1</strong>, coluna <strong>&quot;Forma de Pagamento&quot;</strong>, será concedido o desconto indicado na <strong>Tabela 2</strong>, coluna <strong>&quot;Desconto por Parcela&quot;</strong>. Dessa forma, o valor final a ser pago por parcela corresponderá ao valor descrito na <strong>Tabela 2</strong>, coluna <strong>&quot;Valor Líquido&quot;</strong>, desde que atendidas as seguintes condições:
//         </p>
//         <br />
//         <ul>
//             <li>Pagamento dentro do prazo de vencimento estipulado.</li>
//             <li>Utilização da forma de pagamento escolhida</li>
//         </ul>

//         <br />
//         <strong>1.2 - Perda do Desconto</strong>
//         <p>
//             Pagamentos efetuados <strong>após a data de vencimento</strong> ou realizados por meio de uma forma de pagamento diferente da especificada na <strong>Tabela 1</strong> resultarão na <strong>perda do desconto condicional, obrigando o CONTRATANTE ao pagamento do valor integral da parcela, conforme descrito na coluna &quot;Valor Bruto&quot; da Tabela 2</strong>. Além disso, haverá incidência de multa e juros, conforme descrito na cláusula seguinte.
//         </p>

//         <br />
//         <strong>1.3 - Multa e Juros</strong>
//         <p>
//             Para pagamentos efetuados após a data de vencimento, serão aplicados automaticamente:
//         </p>
//         <br />
//         <ul>
//             <li><strong> Multa de 2%</strong> (dois por cento) sobre o valor da parcela em atraso.</li>
//             <li><strong>Juros de mora de 0,33% ao dia </strong> sobre o valor devido</li>
//         </ul>
//         <br />

//         <strong>1.4 - Cobrança por Atraso</strong>

//         <p>
//             <strong>O CLIENTE está ciente de que, após 5 (cinco) dias de atraso</strong> , a empresa <strong>AMAIS Cobrança,</strong> contratada de forma terceirizada pela <strong>CONTRATADA</strong>, poderá assumir a cobrança, realizar contatos e ter acesso aos dados do <strong>CONTRATANTE </strong> para adotar as medidas cabíveis à recuperação do valor devido.
//         </p>
//         <br />

//         <strong>1.5 - Obrigação de Pagamento</strong>
//         <p>
//             <strong>
//                 A ausência ou infrequência do ALUNO/CONTRATANTE nas atividades contratadas não o exime do pagamento das parcelas mensais, mantendo-se a obrigação de quitação integral do valor contratado.
//             </strong>
//         </p>
//         <br />
//         <strong>1.6 - Aplicação de Descontos em Boleto Bancário</strong>
//         <p>
//             <strong>
//                 Caso o CONTRATANTE opte pelo pagamento via Boleto bancário, Pix cobrança ou Crédito via link, será de sua exclusiva responsabilidade comunicar à instituição bancária sobre a aplicação de descontos concedidos. A CONTRATADA não se responsabiliza por eventuais cobranças integrais devido à ausência dessa comunicação, nem será obrigada a realizar o ressarcimento.
//             </strong>
//         </p>
//         <br />
//     </div>
//                 </Container >

//                 <Container
//                     imageId={3}
//                     id="content3"
//                     title='Multipage - page 3'
//                 >
//                     <div>

//                         <strong>1.7 - Recesso Remunerado</strong>
//                         <p>
//                             <strong>
//                                 O CONTRATANTE está ciente de que nos meses de janeiro, julho e dezembro haverá recesso remunerado para a CONTRATADA, totalizando até seis (06) semanas
//                             </strong> anualmente, sem prejuízo da obrigação de pagamento das mensalidades.
//                         </p>
//                         <br />
//                         <strong>1.8 - Cobrança e Inscrição em Órgãos de Proteção ao Crédito</strong>
//                         <p>
//                             Caso o débito permaneça em aberto por <strong>
//                                 30 (trinta) dias corridos, sem comprovação de quitação integral, a CONTRATADA terá o direito, sem necessidade de aviso prévio, de adotar as medidas legais cabíveis para cobrança, incluindo a inscrição do nome do CONTRATANTE em cadastros de proteção ao crédito, como SERASA EXPERIAN
//                             </strong> e entidades similares.
//                         </p>
//                         <br />
//                         <strong>1.9 - O CONTRATANTE é beneficiário da Campanha/Convênio &quot;Nome da Campanha&quot;, a qual determina que &quot;Descrição da campanha&quot;.</strong>
//                         <p>
//                             Caso o débito permaneça em aberto por <strong>
//                                 30 (trinta) dias corridos, sem comprovação de quitação integral, a CONTRATADA terá o direito, sem necessidade de aviso prévio, de adotar as medidas legais cabíveis para cobrança, incluindo a inscrição do nome do CONTRATANTE em cadastros de proteção ao crédito, como SERASA EXPERIAN
//                             </strong> e entidades similares.
//                         </p>
//                         <br />




//                         <section>
//                             <p className='headers'>Tabela 1 - Descrição dos Materiais didáticos</p>
//                             <table>
//                                 <thead className='contrast'>
//                                     <tr>
//                                         <td>Descrição do material</td>
//                                         <td>Valor bruto (R$)</td>
//                                         <td>Total de desconto condicional(R$)</td>
//                                         <td>Número de parcelas</td>
//                                         <td>Forma de pagamento</td>
//                                         <td>Valor total líquido (R$)</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {
//                                         data["products"] &&
//                                         data["products"].map(res => (
//                                             <tr key={res.id}>
//                                                 <td>{res.name}</td>
//                                                 <td>{res.price_selling}</td>
//                                                 <td>{(res.price_selling - res[paymentMethodsForMaterials[data["Forma de pagamento do MD"]]]).toFixed(2)}</td>
//                                                 <td>{data["Quantidade de parcelas MD"]}</td>
//                                                 <td>{data["Forma de pagamento do MD"]}</td>
//                                                 <td>{res[paymentMethodsForMaterials[data["Forma de pagamento do MD"]]]}</td>
//                                             </tr>
//                                         ))
//                                     }

//                                 </tbody>

//                             </table>
//                         </section>

//                         <br />
//                         <hr />
//                         <br />

//                         <section>
//                             <p className='headers'>Tabela 2 - Detalhamento das parcelas</p>
//                             <table>
//                                 <thead className='contrast'>
//                                     <tr>
//                                         <td>Parcela</td>
//                                         <td>Vencimento</td>
//                                         <td>Valor bruto</td>
//                                         <td>Valor líquido (R$)</td>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {
//                                         data["material"] &&
//                                         data["material"].materials.map((res, idx) => (
//                                             <tr key={idx}>
//                                                 <td>{idx + 1}</td>
//                                                 <td>{dateCalculator(idx)}</td>
//                                                 <td>{data["material"].total}</td>
//                                                 <td>{res.valor}</td>
//                                             </tr>
//                                         ))
//                                     }
//                                     <tr>

//                                     </tr>


//                                 </tbody>

//                             </table>
//                         </section>


//                         <strong>2.1 - O CONTRATANTE poderá adquirir o material didático diretamente da CONTRATADA ou em um revendedor autorizado pela Editora/Fabricante, devendo respeitar todos os direitos de propriedade intelectual aplicáveis, incluindo, mas não se limitando, aos direitos autorais, conforme previsto na legislação vigente. A CONTRATADA não poderá ser responsabilizada por fraudes, erros ou golpes oriundos de compras realizadas fora de seus canais oficiais.</strong>
//                         <br />
//                         <br />
//                         <strong>2.2 - A entrega do material didático será efetuada em até 10 (dez) dias úteis após a comprovação do pagamento da primeira parcela. O prazo poderá ser alterado por razões de força maior ou caso fortuito, conforme disposto no Código de Defesa do Consumidor.</strong>
//                         <br />
//                         <br />

//                         <strong>2.3 - Natureza e Independência da Contratação</strong>
//                         <p>
//                             <strong>Os materiais didáticos listados na Tabela 1 são fornecidos como produtos independentes e não se vinculam à prestação de quaisquer outros serviços educacionais contratados. Sendo assim, o CONTRATANTE declara estar ciente de que a aquisição dos materiais se enquadra nas disposições do Código de Defesa do Consumidor para compras de produtos.</strong>
//                         </p>
//                         <br />

//                         <strong>2.4 - Condições de Pagamento e Concessão de Descontos</strong>
//                         <p>
//                             <strong>
//                                 O CONTRATANTE se compromete a pagar o valor total descrito na Tabela 1, coluna &quot;Valor Bruto&quot;, que terá um desconto, conforme descrito na coluna &quot;Desconto Condicional&quot;, condicionado à forma de pagamento escolhida, descrita na coluna &quot;Forma de pagamento&quot;, . Esse desconto será aplicado apenas se as parcelas forem quitadas até a data de vencimento indicada na Tabela 2, coluna &quot;Vencimento&quot;.
//                                 O valor bruto de cada parcela está descrito na Tabela 2, coluna &quot;Valor Bruto&quot;, e o valor líquido da parcela com desconto condicional está especificado na coluna &quot;Valor Líquido da Parcela&quot;. O desconto somente será concedido mediante o cumprimento integral das condições estabelecidas neste contrato, sendo fatores essenciais para sua concessão:
//                             </strong>
//                         </p>
//                         <br />

//                     </div>
//                 </Container>

//                 <Container
//                     imageId={4}
//                     id="content4"
//                     title='Multipage - page 4'
//                 >
//                     <div>
//                         <ul>
//                             <li><strong>A quitação pontual das parcelas dentro das datas de vencimento;</strong></li>
//                             <li><strong>A forma de pagamento previamente acordada no ato da contratação.</strong></li>
//                         </ul>

//                         <br />
//                         <strong> Caso o pagamento não seja realizado dentro do prazo estipulado ou seja efetuado por meio de uma forma de pagamento diversa da acordada, o desconto não será aplicado, e o CONTRATANTE será obrigado a quitar o valor integral de cada parcela, conforme o montante bruto estabelecido na Tabela 2.</strong>
//                         <br />
//                         <br />

//                         <strong>2.5 - Alteração da Forma de Pagamento</strong>
//                         <p><strong>O CONTRATANTE declara-se ciente de que qualquer alteração na forma de pagamento poderá implicar ajustes nos valores totais e nas parcelas, de acordo com a nova modalidade escolhida.</strong></p>
//                         <br />
//                         <strong>2.6 - Penalidades por Atraso no Pagamento</strong>
//                         <p><strong>Caso o pagamento seja realizado após a data de vencimento estipulada, o CONTRATANTE perderá o direito ao desconto condicional e deverá arcar com o valor bruto da(s) parcela(s), acrescido de multa moratória de 2% sobre o valor em atraso e juros de mora de 0,33% ao dia sobre o saldo devedor.</strong></p>
//                         <br />
//                         <strong>2.7 - Irrevogabilidade da Compra</strong>
//                         <p><strong>Após o recebimento do material didático, o CONTRATANTE reconhece que nenhuma circunstância o eximirá da obrigação de quitação integral do valor devido. Observando que, a CONTRATADA não aceitará devoluções ou cancelamentos após a entrega do material.</strong></p>
//                         <br />
//                         <strong>2.8 - Inadimplência e Negativação</strong>
//                         <p>
//                             <strong>O não pagamento integral ou parcial do material didático até a data de vencimento acarretará a inclusão do CPF do CONTRATANTE nos órgãos de proteção ao crédito, tais como SERASA EXPERIAN, após 10 (dez) dias de inadimplência.
//                             </strong>
//                         </p>
//                         <br />
//                         <strong>2.9 - Cobrança Extrajudicial</strong>
//                         <p>
//                             <strong>Após cinco (5) dias de atraso, a empresa terceirizada AMAIS Cobrança, contratada pela CONTRATADA, assumirá a cobrança e realizará contatos diretos com o CONTRATANTE para a recuperação do crédito devido. Dessa forma, a referida empresa terá direito de acesso aos dados pessoais do cliente e às informações da negociação realizada junto à CONTRATADA</strong>
//                         </p>
//                         <br />

//                         <strong>2.10 - Cancelamento da Compra e Reembolso</strong>
//                         <p>
//                             <strong>O CONTRATANTE poderá cancelar a compra e solicitar reembolso apenas se o material didático ainda não tiver sido retirado. Após a retirada, não será possível solicitar cancelamento ou estorno de valores.</strong>
//                         </p>
//                         <br />
//                         <strong>2.11 - Reajuste de Preços</strong>
//                         <p>
//                             A <strong>CONTRATADA </strong>reserva-se o direito de reajustar os valores dos materiais didáticos apenas em caso de inadimplência do <strong>CONTRATANTE,</strong> conforme as condições estabelecidas neste contrato.
//                         </p>
//                         <br />
//                         <strong>3.0 - Taxa de Adesão</strong>
//                         <p>
//                             <strong>
//                                 A CONTRATADA reserva-se o direito de cobrar uma taxa de adesão, denominada &quot;TAXA DE MATRÍCULA&quot;, no valor de até R$ (valor integral da taxa de matrícula), a ser paga no ato da matrícula. Tal valor destina-se à cobertura de custos operacionais e administrativos relacionados ao processo de adesão. A CONTRATADA poderá conceder um desconto condicional de R$ (valor numérico do desconto), resultando em um valor líquido final a ser pago de R$ (valor líquido da taxa de matrícula), desde que atendidas as condições estabelecidas no contrato, incluindo a forma de pagamento escolhida e o cumprimento do prazo de quitação.
//                                 <br />
//                                 <br />
//                                 &quot;O CONTRATANTE é beneficiário da Campanha/Convênio &quot;Nome da Campanha&quot;, a qual determina que &quot;Descrição da campanha&quot;.&quot;

//                             </strong>
//                         </p>
//                         <br />
//                         <br />
//                         <strong>4. OBRIGAÇÕES DA CONTRATADA</strong>
//                         <br />
//                         <br />
//                         <strong>4.1 A CONTRATADA compromete-se a prestar serviços educacionais para o curso selecionado no QUADRO DE RESUMO deste contrato, por meio de aulas presenciais, online ou híbridas, conforme a metodologia adotada e necessidades do ensino.</strong>
//                         <br />
//                         <br />
//                         <strong>4.2 Após a conclusão da carga horária e aprovação nos critérios avaliativos, o CONTRATANTE poderá solicitar, sem custos adicionais, a emissão do certificado de conclusão em formato digital ou físico.</strong>
//                         <br />
//                         <br />
//                         <strong>4.2.1 O certificado será emitido somente se o CONTRATANTE atingir a frequência mínima de 75% (setenta e cinco por cento) das aulas e atender aos critérios avaliativos internos, sob análise da Coordenação Pedagógica da CONTRATADA.</strong>
//                         <br />
//                         <br />

//                         <strong>4.3 A emissão do certificado está condicionada à regularização de quaisquer pendências financeiras junto à CONTRATADA.</strong>
//                         <br />
//                         <br />
//                         <strong>4.4 Os cursos na modalidade em turma deverão ter um mínimo de 6 (seis) alunos matriculados para o início das aulas.</strong>
//                         <br />
//                         <br />
//                         <strong>4.5 Caso não haja quórum mínimo de alunos matriculados para o início do curso na data prevista, a CONTRATADA poderá prorrogar o início das aulas, independentemente do formato, modalidade ou classe, quantas vezes forem necessárias, por um período máximo de 2 (dois) meses, contados a partir da data originalmente prevista. Se, ao final desse prazo, o quórum mínimo não for atingido, a CONTRATADA ou o CONTRATANTE poderá cancelar unilateralmente o contrato, sem ônus e não iniciar as aulas.</strong>
//                         <br />
//                         <br />
//                         <strong>5. GESTÃO DO CURSO</strong>
//                         <br />
//                         <br />
//                         <strong>5.1 O planejamento pedagógico, calendário acadêmico, definição de carga horária, designação de professores e organização das turmas são de competência exclusiva da CONTRATADA, sem ingerência do CONTRATANTE.</strong>
//                         <br />
//                         <br />
//                         <strong>5.2 A CONTRATADA poderá, a seu critério, remanejar ou fundir turmas, bem como transferir o CONTRATANTE para outra turma sem custos adicionais, caso a sua classe original seja descontinuada.</strong>
//                         <br />
//                         <br />

//                     </div>
//                 </Container>

//                 <Container
//                     imageId={5}
//                     id="content5"
//                     title='Multipage - page 5'
//                 >
//                     <div>
//                         <strong>5.3 A CONTRATADA poderá solicitar a mudança de horário e/ou turma do CONTRATANTE para garantir a adequação à proposta pedagógica, sem obrigatoriedade de cobrança adicional ou concessão de descontos.</strong>
//                         <br />
//                         <br />
//                         <strong>5.4 O CONTRATANTE poderá solicitar monitoria durante a carga horária contratada, sujeita à avaliação e aprovação da Coordenação Pedagógica, que determinará a duração e frequência.</strong>
//                         <br />
//                         <br />
//                         <strong>6. FREQUÊNCIA, HORÁRIO E REPOSIÇÃO</strong>
//                         <br />
//                         <br />
//                         <strong>6.1 MODALIDADE “EM GRUPO”: As regras a seguir aplicam-se exclusivamente aos alunos matriculados na modalidade “Em grupo”.</strong>
//                         <br />
//                         <br />
//                         <strong>6.1.1 O CONTRATANTE terá uma tolerância de 20 (vinte) minutos para atrasos no início das aulas, tanto online quanto presenciais. Após esse período, poderá solicitar reposição.</strong>
//                         <br />
//                         <br />
//                         <strong>6.1.2 O CONTRATANTE tem direito a até 5 (cinco) reposições gratuitas dentro da carga horária contratada. A partir da 6ª (sexta), será cobrada uma taxa de R$ 45,00 (quarenta e cinco reais) por aula adicional. A falta deve ser comunicada com pelo menos 24 (vinte e quatro) horas de antecedência para garantir a remarcação sem custos.</strong>
//                         <br />
//                         <br />
//                         <strong>6.1.3 As reposições seguirão os horários disponíveis da CONTRATADA. Em caso de perda de avaliações, o CONTRATANTE deverá atender aos critérios estabelecidos pela CONTRATADA para a nova aplicação.</strong>
//                         <br />
//                         <br />
//                         <strong>6.1.4 A CONTRATADA definirá, no ato da matrícula, dias e horários fixos para a realização das aulas, denominados “HORÁRIOS PREESTABELECIDOS”.</strong>
//                         <br />
//                         <br />
//                         <strong>6.2 MODALIDADES “INDIVIDUAL”, “DUPLA” E “TRIO”: As regras a seguir aplicam-se exclusivamente aos alunos matriculados nas modalidades “Individual”, “Dupla” e “Trio”.</strong>
//                         <br />
//                         <br />
//                         <strong>6.2.1 O ALUNO/CONTRATANTE poderá remarcar até 2 (duas) aulas mensais sem custo, desde que informe a ausência com pelo menos 5 (cinco) horas de antecedência. Caso contrário, perderá o direito à remarcação.</strong>
//                         <br />
//                         <br />
//                         <strong>6.2.2 A aula perdida poderá ser remarcada dentro de 3 (três) dias. Após esse prazo, não será possível reagendá-la.</strong>
//                         <br />
//                         <br />
//                         <strong>6.2.3 Para aulas não preestabelecidas ou remarcadas, o ALUNO/CONTRATANTE estará sujeito à disponibilidade de horários, profissionais e estrutura da CONTRATADA.</strong>
//                         <br />
//                         <br />
//                         <strong>6.2.4 Caso o ALUNO/CONTRATANTE cancele uma aula já remarcada, não terá direito a novo agendamento.</strong>
//                         <br />
//                         <br />
//                         <strong>7. RENOVAÇÃO E CONCLUSÃO DO CONTRATO</strong>
//                         <br />
//                         <br />
//                         <strong>7.1 O contrato será considerado concluído após o cumprimento da CARGA HORÁRIA CONTRATADA, sendo este o critério determinante para o encerramento do vínculo.</strong>
//                         <br />
//                         <br />
//                         <strong>7.2 Caso o CONTRATANTE continue frequentando as aulas após o fim da carga horária contratada, sem manifestação formal de cancelamento, a CONTRATADA poderá cobrar mensalidades reajustadas em até 10% (dez por cento) sobre o valor bruto da parcela, sendo necessário aviso prévio mínimo de 30 (trinta) dias para a rescisão.</strong>
//                         <br />
//                         <br />
//                         <strong>8. DESISTÊNCIA, RESCISÃO E TÉRMINO DO CONTRATO</strong>
//                         <br />
//                         <br />
//                         <strong>8.1 O término do contrato ocorrerá apenas após a quitação integral de débitos, formalizada por recibo de quitação, sendo insuficientes para a rescisão o vencimento do prazo contratual, a conclusão da carga horária ou o abandono do curso.</strong>
//                         <br />
//                         <br />
//                         <strong>8.2 A titularidade deste contrato é intransferível, salvo exceções acordadas entre as partes por meio de aditivo contratual assinado.</strong>
//                         <br />
//                         <br />
//                         <strong>8.3 O direito de desistência segue as diretrizes do Código de Defesa do Consumidor:</strong>
//                         <br />
//                         <ul>
//                             <li><b>Assinatura online: prazo de 7 (sete) dias a partir da assinatura digital;</b></li>
//                             <li><b>Assinatura presencial: prazo de 48 (quarenta e oito) horas antes do início das aulas;</b></li>
//                             <li><b>Após esses prazos, não haverá devolução de valores pagos.</b></li>
//                         </ul>
//                         <br />
//                         <br />
//                         <strong>8.4 O cancelamento deve ser solicitado por escrito e formalizado por reunião presencial na sede da CONTRATADA ou, no caso de cursos online, via reunião por videoconferência, com aviso prévio mínimo de 30 (trinta) dias.</strong>
//                         <br />
//                         <br />
//                         <strong>8.5 Caso o cancelamento ocorra após o início das aulas, o CONTRATANTE deverá pagar multa de 10% (dez por cento) sobre o valor proporcional da carga horária restante.</strong>
//                         <br />
//                         <br />
//                         <strong>8.6 Em caso de abandono do curso, a CONTRATADA poderá adotar medidas legais para cobrança dos valores devidos, incluindo juros e correção monetária.</strong>
//                         <br />
//                         <br />
//                         <strong>8.9 A CONTRATADA poderá rescindir o contrato imediatamente em caso de inadimplência ou força maior que impeça a prestação dos serviços.</strong>
//                         <br />
//                         <br />
//                         <strong>8.10 O não pagamento da mensalidade permitirá à CONTRATADA negar a renovação da matrícula.</strong>
//                         <br />
//                         <br />
//                         <strong>10. CONCORDÂNCIA E ASSINATURA DO CONTRATO</strong>
//                         <br />
//                         <br />
//                     </div>
//                 </Container>

//                 <Container
//                     imageId={6}
//                     id="content6"
//                     title='Multipage - page 6'
//                 >
//                     <div>
//                         <strong>11.1 O CONTRATANTE e a CONTRATADA reconhecem a validade da assinatura eletrônica via Aautentique, meio similar ou física e seus mecanismos de autenticação.</strong>
//                         <br />
//                         <br />
//                         <strong>10.2 O CONTRATANTE concorda em utilizar a plataforma indicada pela CONTRATADA, como Autentique ou similar, cuja autenticidade é garantida por chave criptográfica.</strong>
//                         <br />
//                         <br />
//                         <strong>10.2 O CONTRATANTE e a CONTRATADA confirmam a veracidade das informações fornecidas, estando cientes de que a falsidade dessas informações pode configurar crime nos termos do Código Penal Brasileiro.</strong>
//                         <br />
//                         <br />
//                         <strong>10.3 As partes reconhecem a validade do contrato e comprometem-se a cumprir integralmente seus termos.</strong>
//                         <br />
//                         <br />
//                         <strong>11. DISPOSIÇÕES GERAIS</strong>
//                         <br />
//                         <br />
//                         <strong>11.2 A CONTRATADA não se responsabiliza pela obtenção de equipamentos necessários para aulas online, como internet, fones de ouvido e dispositivos eletrônicos.</strong>
//                         <br />
//                         <br />
//                         <strong>11.3 O CONTRATANTE autoriza neste ato, de forma vitalícia, a veiculação de imagens, vídeos e materiais acadêmicos produzidos durante o curso para fins institucionais e publicitários, observando-se sempre a moral e os bons costumes, a fim de preservar o uso positivo da imagem do cedente.</strong>
//                         <br />
//                         <br />
//                         <strong>11.4 Os casos omissos serão regidos pelo Código Civil Brasileiro.</strong>
//                         <br />
//                         <br />
//                         <strong>12. FORO</strong>
//                         <br />
//                         <br />
//                         <strong>12.1 Fica eleito o foro da comarca de Betim/MG para a resolução de quaisquer litígios oriundos deste contrato, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</strong>

//                     </div>
//                     <div className="sign" id="sign">
//                         <span className="sign-marker" id="sign-marker">
//                             CONTRATANTE/ RESPONSÁVEL LEGAL
//                         </span>
//                         <span className="sign-marker" id="sign-marker"> CONTRATADA </span>
//                     </div>

//                     <table>
//                         <tr>
//                             <td className="field-sign">Testemunha 1:</td>
//                             <td className="field-sign">Testemunha 2:</td>
//                         </tr>
//                         <tr>
//                             <td className="field-sign">Nome:</td>
//                             <td className="field-sign">Nome:</td>
//                         </tr>
//                         <tr>
//                             <td className="field-sign">CPF:</td>
//                             <td className="field-sign">CPF:</td>
//                         </tr>
//                         <tr>
//                             <td className="field-sign">Assinatura:</td>
//                             <td className="field-sign">Assinatura:</td>
//                         </tr>
//                     </table>
//                 </Container >