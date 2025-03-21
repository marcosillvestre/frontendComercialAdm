
import PropTypes from 'prop-types';
import { Container } from './styles.jsx';

const StandardPromo = ({ data }) => {
    return (
        <Container id="content">
            <div>
                <h4>
                    QUADRO RESUMO DO CONTRATO DE PRESTAÇÃO DE SERVIÇO EDUCACIONAL
                </h4>

                <h4>CURSO DE IDIOMAS E TECNOLOGIA</h4>
                <h5>CONTRATO Nº: {data.contrato}</h5>
                <h5>DATA DA MATRÍCULA: {data.dataMatricula}</h5>
                <h5>TIPO DE CONTRATO: {data.tipoModalidade}</h5>
                <h5>UNIDADE: {data.unidade}</h5>
                <h5>TIPO DE ASSINATURA: {data.acFormato}</h5>
                <h5>DA QUALIFICAÇÃO DAS PARTES</h5>

                <p>
                    Pelo presente instrumento particular, que fazem entre si de um
                    lado a parte denominadas como
                    <strong>
                        “CONTRATANTE/ALUNO ou CONTRATANTE/RESPONSÁVEL LEGAL”
                    </strong>, abaixo qualificado:
                </p>

                <table>
                    <tr>
                        <h3>Nome: {data.name}</h3>

                    </tr>
                    <tr>
                        <td>
                            <h3>RG: {data.rg}</h3>
                        </td>
                        <td>
                            <h3>E-mail: {data.email}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Data de Nascimento: {data.DatadeNascdoResp}</h3>
                        </td>
                        <td>
                            <h3>Telefone: {data.CelularResponsavel}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>RUA/AV: {data.EnderecoResponsavel}</h3>
                        </td>
                        <td>
                            <h3>Nº: {data.NumeroEnderecoResponsavel}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>COMPL: {data.complemento}</h3>
                        </td>
                        <td>
                            <h3>BAIRRO: {data.bairro}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>CIDADE: {data.cidade}</h3>
                        </td>
                        <td>
                            <h3>UF: {data.estado}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>CEP: {data.cep}</h3>
                        </td>
                        <td>
                            <h3>Estado Civil: {data.estadoCivil}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Profissão: {data.profissao}</h3>
                        </td>
                        <td>
                            <h3>CPF: {data.cpf}</h3>
                        </td>
                    </tr>
                </table>
                <br />
                <hr />
                <br />

                <p>
                    E do outro lado como <strong>“CONTRATADA”</strong> a pessoa
                    jurídica:
                </p>
                <p>
                    <strong>
                        AMERICAN WAY ESCOLA DE IDIOMAS BETIM LTDA - Tel.:
                        (3593-3961)
                    </strong>
                    inscrita no CNPJ: 18.953.641/0001-26, com sede no endereço: Rua
                    Japurá, 341, Santa Cruz, Betim/MG, CEP: 32.667.358, responsável
                    pela(s) unidade(s) abreviadas por “PTB” e “Golfinho Azul”
                </p>
                <p>
                    <strong>
                        AMERICAN WAY ESCOLA DE IDIOMAS LTDA - Tel.: (3360-6963)
                    </strong>
                    inscrita no CNPJ: 42.387.487/0001-57, com sede no endereço:
                    Avenida Amazonas, 1209, Centro, Betim/MG, CEP: 32600-325,
                    responsável pela(s) unidade(s) abreviadas por “Centro” e “IBAE”.
                </p>
                <br />

                <p>
                    O presente contrato terá como
                    <strong> ALUNO: {data.nomeAluno}</strong>
                </p>
                <h3>DATA DE NASCIMENTO: {data.nascimentoAluno}</h3>

                <p>
                    Dessa forma, já qualificados, aceitam e os seguintes termos e
                    condições abaixo:
                </p>

                <table>
                    <tr>
                        <td>
                            <h3>Curso: {data.curso}</h3>
                        </td>
                        <td>
                            <h3>Formato: {data.formato}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Tipo: {data.tipoModalidade}</h3>
                        </td>
                        <td>
                            <h3>Classe de curso: {data.classe}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h3>Subclasse de curso: {data.subclasse}</h3>
                        </td>
                    </tr>
                </table>
                <br />
                <hr />
                <br />

                <p>
                    A carga horária contratada tem o total de {data.cargaHoraria}
                    horas-aulas. O curso Standard One - Standard é ministrado em
                    1 módulo que será realizado dentro do calendário didático
                    estipulado para o cumprimento da carga horária. De acordo
                    com o planejamento didático, as aulas têm previsão para
                    início no dia {data.paDATA}, sujeito à alteração mediante aviso prévio.
                </p>
                <br />
                <hr />
                <br />

                <strong> SOBRE VALOR E DESCONTOS </strong>
                <p>
                    O valor total da carga horária contratada é de R${data.valorCurso}
                    , que será dividido e pago em {data.numeroParcelas}
                    parcelas cada qual com o vencimento para o dia
                    {data.diaVenvimento.split("/")[0]} de cada mês, sendo o vencimento
                    da primeira parcela na data {data.dataPrimeiraParcelaMensalidade
                    } e, a última, no dia {data.dataUltimaParcelaMensalidade}.
                </p>
                <p>
                    A CONTRATADA por iniciativa própria oferecerá ao CONTRATANTE,
                    descontos nas mensalidades totalizando o valor de
                    R${data.descontoTotal}. Observando que o valor de
                    cada parcela será de R${data.valorParcela}, a(s)
                    {data.parcelasAfetadas} primeira(s)
                    parcela(s) receberá(aõ) o desconto de
                    R${data.descontoPrimeirasParcelas} e as
                    {data.demaisParcelas}  demais parcelas
                    (caso houver) receberão  o desconto de
                    R${data.descontoDemaisParcelas} caso o pagamento seja
                    realizado até a data de vencimento optado pelo CONTRATANTE.
                    Aos pagamentos efetuados após a data de vencimento,
                    o CONTRATANTE perderá o desconto por pontualidade
                    no mês de atraso do desconto aplicado, somado aos
                    itens da cláusula 7.9.

                </p>
                <br />
                <hr />
                <br />

                <strong>2. DO OBJETO: </strong>
                <p>

                    <br />
                    2.1: O objeto do presente contrato é a prestação de serviço
                    educacional de língua estrangeira e tecnologia, pela
                    CONTRATADA ao CONTRATANTE, ou a terceiros que sejam
                    determinados na matrícula. O presente contrato se resume na
                    execução da prestação de serviços, por parte da CONTRATADA
                    ao CONTRATANTE, através do cumprimento da carga horária
                    estipulada, sejam elas na modalidade presencial, online ou
                    híbrida, conforme estipulado anteriormente.
                    <br />
                    2.2: Ao firmarem
                    este contrato, o CONTRATANTE concorda em submeter às regras
                    atinentes ao objeto, declarando que tem, portanto,
                    conhecimento da abrangência das relações pactuadas.
                </p>
                <br />
                <hr />
                <br />

                <strong>3. DO CURSO E MODALIDADE: </strong>
                <p>

                    <br />
                    3.1: O calendário didático será entregue em até 10 dias após
                    a primeira aula.
                    <br />
                    3.2: Os cursos na modalidade em turma,
                    deverão contar com o número mínimo de 06(seis) alunos e o
                    máximo de 10(dez) alunos para dar início às aulas.
                    <br />
                    3.3: Caso
                    haja falta de quórum de alunos matriculados para o início do
                    curso na data prevista, fica a CONTRATADA autorizada a
                    prorrogar a data de início do cumprimento da carga horária
                    contratada, independente do formato, modalidade ou classe,
                    quantas vezes forem necessárias, por um prazo de até 2
                    (dois) meses, contado a partir da data de início prevista,
                    para o atingimento do referido quórum, ou para, então, não
                    atingido este, cancelamento unilateral do contrato a
                    realização do início das aulas.
                </p>
                <br />
                <hr />
                <br />

                <strong>4. DA OBRIGAÇÃO DA CONTRATADA: </strong>
                <p>

                    <br />
                    4.1: A CONTRATADA se obriga à prestação de serviço
                    educacional, no ensino do curso assinalado em campo descrito
                    e selecionado no QUADRO DE RESUMO deste instrumento, através
                    de aulas presenciais, online ou a distância, considerando a
                    natureza do conteúdo, característica, peculiaridade e demais
                    atividades que o ensino exigir, buscando inclusive,
                    aperfeiçoar a relação de quantidade de alunos por classe.

                    <br />
                    4.2: Após a conclusão da carga horária e aprovação de cada
                    módulo, o CONTRATANTE poderá solicitar o envio online de seu
                    certificado de conclusão, sem custos adicionais. Caso o
                    CONTRATANTE queira uma versão impressa do devido
                    certificado, pelo mesmo deverá ser pago antecipadamente o
                    custo de emissão no valor de R$ 25,00 (vinte e cinco reais)
                    por cada via solicitada. Custos adicionais de envio deverão
                    ser custeados pelo solicitante.
                    <br />
                    4.2.1: Para que o
                    certificado de conclusão do módulo possa ser emitido, o
                    CONTRATANTE deverá ter uma frequência mínima de 75% (setenta
                    e cinco por cento) das aulas e ter cumprido os critérios
                    avaliativos internos impostos pela instituição CONTRATADA. É
                    ressaltado que o certificado somente será emitido mediante
                    avaliação feita pela Coordenação Pedagógica da Escola de
                    Idiomas American Way.
                    <br />
                    4.3: A emissão do certificado deverá
                    ser feita após cumprimento de carga horária e confirmação de
                    inexistência de débitos em aberto por parte do CONTRATANTE.

                    <br />
                    4.4. As cláusulas <strong  > 4.5 a 4.10 trata-se exclusivamente de serviços prestados
                        por meio de PARCEIROS.
                    </strong>

                    <br />
                    4.5. American Way possui parceria firmada com algumas
                    empresas e instituições, sendo estas parcerias com o fim de
                    benefício mútuo, de forma onerosa ou não, das quais, quando
                    houver, serão devidamente identificadas abaixo e de forma
                    abreviada no campo “UNIDADE” no QUADRO RESUMO deste
                    instrumento.
                    <br />
                    4.6. Parceiro Golfinho Azul: O Parceiro
                    identificado de forma abreviada por “CEGA” no campo
                    “UNIDADE” refere-se à parceria estabelecida com a Cega -
                    Centro De Educacao Golfinho Azul, sediada em Rua Ceara, Nº
                    207, bairro Ouro Negro, Ibirité, MG, CEP 32400-001, sob o
                    CNPJ 14.016.453/0001-10.
                    <br />
                    4.7: A CONTRATADA reserva o direito
                    de oferecer aulas presenciais através de PARCEIROS,
                    utilizando-se da infraestrutura e espaço cedido,
                    desobrigando-se de arcar com qualquer responsabilidade
                    quanto ao imóvel, tais como manutenção, despesas fixas e
                    administrativas do mesmo. A mesma também não se
                    responsabiliza pela descontinuação da prestação de serviços
                    por motivo causado diretamente ou indiretamente por ação
                    do(s) PARCEIRO(S).
                </p>
                <br />
                <hr />
                <br />

                <strong>5. DA GESTÃO DO CURSO:</strong>
                <p>

                    <br />
                    5.1: O planejamento pedagógico do curso é de inteira
                    responsabilidade da CONTRATADA, bem como a coordenação da
                    prestação dos serviços, incluindo, mas não se limitando à
                    determinação do calendário escolar, definição de datas para
                    provas e avaliações, fixação de carga horária, designação e
                    contratação de professores, cooperativas e empresas
                    especializadas na prestação de serviços educacionais,
                    organização de classes e agrupamento de alunos, orientação
                    didática pedagógica, além de outras providências que os
                    serviços e atividades docentes do curso exigir, a seu
                    exclusivo critério, sem qualquer ingerência do CONTRATANTE.

                    <br />
                    5.2: A CONTRATADA poderá, a qualquer tempo e a seu exclusivo
                    critério, remanejar ou fundir turmas já formadas e/ou em
                    andamento, sem a obrigatoriedade de pertencerem ao mesmo
                    módulo. Em caso de fechamento da turma em que o CONTRATANTE
                    está matriculado, por decisão da CONTRATADA, não será
                    cobrada a taxa de cancelamento, possibilitando a realocação
                    do CONTRATANTE para outra turma, sem qualquer custo
                    adicional.
                    <br />
                    5.3: A CONTRATADA poderá, a qualquer momento,
                    orientar o CONTRATANTE a migrar de horário e/ou turma, a fim
                    de manter a proposta pedagógica – o que não necessariamente
                    haverá obrigatoriedade e/ou incidência de valores
                    adicionais.
                    <br />
                    5.4: O aluno terá direito a monitoria, durante o
                    cumprimento da carga horária contratada, sendo condicionadas
                    a obrigatoriedade de solicitação e aprovação pela
                    Coordenação Pedagógica da CONTRATADA, cabendo ainda
                    ressaltar que a monitoria não tem a duração obrigatória de
                    60 min.
                </p>
                <br />
                <hr />
                <br />

                <strong> 6. DA FREQUÊNCIA, HORÁRIO E REPOSIÇÃO: </strong>
                <p>

                    <br />
                    6.1 Haverá um prazo de tolerância de atraso de até 15
                    (quinze) minutos contados a partir do início da aula, tanto
                    na modalidade online ou presencial. Após este período, o
                    ALUNO/CONTRATANTE poderá solicitar uma aula de reposição.

                    <br />
                    6.1.1 O CONTRATANTE terá o direito a 5 (cinco) reposições
                    gratuitas durante o período de cumprimento da carga horária
                    contratada, sejam essas reposições motivadas e imotivadas,
                    incluindo as da cláusula anterior e também os casos de
                    apresentação de atestado médico, sem custo. Ultrapassando
                    esse limite, a sexta aula de reposição e outras serão
                    cobrados o valor de R$ 35,00 (trinta e cinco reais) por cada
                    aula. Em caso de falta, o CONTRATANTE tem o direito à
                    remarcação da aula sem custos adicionais, desde que a falta
                    seja comunicada com o mínimo de 24 (vinte e quatro) horas de
                    antecedência.
                    <br />
                    6.1.2: A remarcação da aula de reposição
                    cancelada seguindo os critérios mencionados na cláusula

                    <br />
                    6.1.1 observará os horários disponíveis da CONTRATADA.Em
                    caso de perda das avaliações periódicas o CONTRATANTE,
                    submeterá aos critérios estabelecidos pela CONTRATADA para a
                    reposição, tais como, agendamento prévio, horário
                    disponível, entre outras.
                </p>
                <br />
                <hr />
                <br />

                <strong> 7. DO PAGAMENTO E MATRÍCULA: </strong>
                <p>

                    <br />
                    7.1: Pelos serviços educacionais referidos neste contrato,
                    os valores estão preenchidos no resumo deste documento,
                    sendo de inteira responsabilidade do CONTRATANTE realizar os
                    pagamentos no prazo estipulado, seguindo o prazo de duração.

                    <br />
                    7.2: A CONTRATADA reserva o direito de cobrar uma taxa de
                    adesão, denominada “TAXA DE MATRÍCULA”, no valor de até R$
                    350,00 (trezentos e cinquenta reais) no ato da matrícula,
                    destinada à remuneração de custos operacionais e
                    administrativos gerados a mesma. Podendo a CONTRATADA, por
                    mera liberdade, reduzir ou até mesmo isentar o CONTRATANTE
                    do valor mencionado na cláusula anterior.
                    <br />
                    7.3: O CONTRATANTE
                    terá a opção de solicitar a forma de pagamento das
                    mensalidades, a que se refere no resumo deste documento, no
                    momento da assinatura deste contrato, sendo elas: boleto
                    bancário, cartão de crédito/débito, pagamento em espécie,
                    transferência bancária ou PIX bancário.
                    <br />
                    7.4: No que tange ao
                    pagamento via boleto bancário, é de obrigação do
                    CONTRATANTE, caso não recebê-lo até o vencimento, entrar em
                    contato com o setor Financeiro da CONTRATADA, para receber
                    instruções, por e-mail, ou canal de comunicação oficial (com
                    registro de comunicação por escrito), para realizar a
                    retirada no site ou portal indicado pela CONTRATADA, ou o
                    envio pela mesma, eximindo a CONTRATADA de qualquer
                    responsabilidade, desde que a mesma se manifeste em até 3
                    (três) dias, após o recebimento da solicitação do
                    CONTRATANTE, sendo de obrigação do mesmo manter registros
                    para comprovar a comunicação, ressaltando que o CONTRATANTE
                    não será isentado de PENALIDADE por atraso de pagamento em
                    virtude do não recebimento do boleto bancário.
                    <br />
                    7.5: A
                    infrequência do ALUNO/CONTRATANTE não exime o pagamento das
                    parcelas mensais.
                    <br />
                    7.6: Caso algum desconto seja concedido e
                    o CONTRATANTE opte pelo pagamento via boleto bancário, fica
                    a cargo do mesmo comunicar à agência bancária sobre o
                    desconto no boleto, ficando a CONTRATADA isenta de
                    responsabilidade e dever de ressarcimento caso o CONTRATANTE
                    não se atente a tal fato.
                    <br />
                    7.7: O CONTRATANTE está ciente que
                    nos meses de janeiro, julho e dezembro haverá recesso
                    remunerado para a CONTRATADA, totalizando em até 08(oito)
                    semanas anualmente.
                    <br />
                    7.8: Aos pagamentos efetuados após a
                    data do vencimento, incidirão multa de 2% (dois por cento) e
                    juros de mora de 0,033% ao dia, de forma automática e
                    atualização monetária.
                    <br />
                    7.8.1: Após 30 (trinta) dias corridos
                    com o débito em aberto, sem comprovação de quitação do valor
                    integral do mesmo, a CONTRATADA terá o direito,
                    incondicional, sem obrigação de enviar aviso prévio ao
                    CONTRATANTE, a tomar as providências legais de cobranças,
                    até mesmo, incluir o nome do CONTRATANTE em cadastros de
                    proteção ao crédito, como SERASA EXPERIAN e similares.
                </p>
                <br />
                <hr />
                <br />

                <strong> 8. RENOVAÇÃO E CONCLUSÃO DO CONTRATO </strong>

                <p>

                    <br />
                    8.1: Fica expressamente convencionado que a atividade
                    principal que determina a obrigação de prestação de serviço,
                    justificando o fim do vínculo, é o cumprimento da CARGA
                    HORÁRIA, especificada no resumo deste documento, sendo esse
                    o fator qualificativo determinante, dispensando quaisquer
                    outros critérios que caracterizam, e até mesmo, qualificam,
                    a prestação de serviço realizada pela CONTRATADA –
                    planejamento do módulo, plano de lições, atividades
                    extracurriculares, aproveitamento do aluno, certificado de
                    conclusão, execução do conteúdo proposto e/ou até mesmo, o
                    prazo contratual.
                    <br />
                    8.2: Após cumprimento da CARGA HORÁRIA
                    contratada, é acordado entre as partes que a CONTRATADA terá
                    o direito expresso de realizar quaisquer cobranças, na
                    ausência de comunicação por escrito ou via email entre as
                    partes que manifeste interesse na descontinuação da
                    prestação de serviços – tal comunicação vinda por qualquer
                    uma das partes e que deve ser realizada com pelo menos, 30
                    (Trinta) dias de antecedência.
                </p>

                <br />
                <hr />
                <br />

                <strong>9. DESISTÊNCIA, RESCISÃO E TÉRMINO DO CONTRATO:
                </strong>

                <p>
                    <br />9.1: É de entendimento mútuo entre as partes que o término do CONTRATO será efetuado, de fato, na INEXISTÊNCIA de débitos EM ABERTO por parte do CONTRATANTE, mediante o RECIBO DE QUITAÇÃO. Sendo assim, a) vencimento do prazo contratual, b) cumprimento de carga horária e/ou c) abandono de curso não são critérios válidos para o término de contrato, por si só.
                    <br />9.2: A titularidade deste contrato é intransferível e insubstituível, e só poderá ser feita, como caso de EXCEÇÃO, em comum acordo entre as partes, devidamente assinado por ambos, através de um aditamento a este.
                    <br />9.3: No tocante ao exercício do direito de desistência antes do início das aulas o mesmo terá apresente regulamentação:
                    <br />9.3.1: Em caso de assinatura deste contrato de forma online para a realização de aulas presenciais, online ou híbridas o prazo para desistência é de 7 dias contados do ato da assinatura digital.
                    <br />9.3.2: Em caso de assinatura presencial na sede da contratada seja para a modalidade presencial, online ou híbrida o prazo de desistência é de 48 (quarenta e oito) horas antes do início das aulas.
                    <br />9.3.3: Em caso de desistência após os prazos estipulados acima, não haverá devolução de valores de pagamentos já efetuados.
                    <br />9.4: O pedido de cancelamento/desistência/rescisão da matrícula deverá ser formalizado por escrito durante reunião presencial em uma das unidades com a Coordenação Pedagógica, a ser marcada pelo CONTRATANTE com antecedência mínima de 30 (trinta) dias, contados a partir do vencimento da última parcela paga, observadas as disposições legais. Em caso de aluno que faça o curso exclusivamente online, a reunião poderá ser realizada via videochamada.
                    <br />9.5: Caso o cancelamento/desistência/rescisão da matrícula ocorra em até 90 dias após o início das aulas do módulo contratado, fica o CONTRATANTE obrigado a indenizar a CONTRATADA em multa correspondente a 10% (dez por cento) sobre o valor equivalente a carga horária restante. Em caso de cancelamento/desistência/rescisão ocorridas após 90 dias do início das aulas fica o CONTRATANTE isento da cobrança de multa  rescisória.
                    <br />9.6: O pedido de cancelamento/desistência/rescisão da matrícula deverá ser formalizado por escrito durante reunião presencial em uma das unidades com a Coordenação Pedagógica, a ser marcada pelo CONTRATANTE com antecedência mínima de 30 (trinta) dias da data de vencimento da parcela referente ao mês de saída do curso. Em caso de aluno que faça o curso exclusivamente online, a reunião poderá ser realizada via videochamada.
                    <br />9.7: Caso o aviso de cancelamento ocorra antes do prazo de 30 dias citados na cláusula anterior, serão devidos pelo CONTRATANTE a parcela referente ao mês de saída do aluno, além de multa rescisória caso o cancelamento ocorra dentro do prazo de 90 dias contados a partir do início das aulas mencionados na cláusula 9.3.
                    <br />9.8: A ausência do aviso de cancelamento/desistência/rescisão obrigará o CONTRATANTE ao pagamento de 01 parcela correspondente ao período de 30 dias da comunicação que deveria ter sido efetuada ao CONTRATANTE.
                    <br />9.9: Em se tratando de abandono das aulas da carga horária contratada, a CONTRATADA é autorizada a tomar quaisquer medidas cabíveis para recebimento dos devidos valores acrescidos de juros e correção monetária, e, medidas judiciais em prol do recebimento de eventuais valores. Os honorários e despesas processuais ficarão sob a responsabilidade do CONTRATANTE.
                    <br />9.10: A CONTRATADA pode de imediato, rescindir o presente instrumento, independente de aviso ou notificação, em caso de descumprimento de qualquer dos itens expostos neste contrato, por parte do CONTRATANTE, ou por indisciplina do mesmo.
                    <br />9.11: O não pagamento da mensalidade no vencimento dará permissão à CONTRATADA impedir a renovação da matrícula para o módulo seguinte, não isentando o CONTRATANTE da obrigação de quitação dos débitos existentes.
                    <br />9.12: O contrato se consumará após a conclusão de todas as aulas contratadas e a confirmação de quitação de quaisquer débitos pendentes pelas partes envolvidas.

                </p>

                <br />
                <hr />
                <br />

                <strong> 10. DO MATERIAL DIDÁTICO: </strong>

                <p>

                    <br />
                    10.1 É de responsabilidade do CONTRATANTE adquirir e por
                    vezes disponibilizado para compra o material didático
                    sugerido pela CONTRATADA para que o aluno acompanhe as
                    aulas.
                    <br />
                    10.2: O material pode ser adquirido através de uma
                    unidade física da American Way ou através de um revendedor
                    autorizado pela Editora/Fabricante. Ficando a CONTRATANTE
                    obrigada a respeitar todos os direitos de propriedade
                    intelectual relacionados ao material didático registrados na
                    legislação atual, inclusive direitos autorais, sob pena de
                    responsabilização civil e criminal.
                    <br />
                    10.3 Na condição do
                    material ser adquirido por meio da contratada, o pagamento
                    poderá ser efetuado à vista, via PIX, uma vez no boleto ou
                    no cartão de débito ou crédito. O material poderá ser
                    parcelado em duas a 6 vezes sem restrição no cartão de
                    crédito. O material também poderá ser parcelado no boleto
                    entre 2 a 6 vezes mediante aprovação do setor financeiro
                    através de consulta prévia nos órgãos de proteção ao
                    crédito.
                    <br />
                    10.3.1 O material didático será entregue à
                    CONTRATANTE após a comprovação do pagamento da primeira
                    parcela do mesmo.
                </p>

                <br />
                <hr />
                <br />

                <strong>11. DA CONCORD NCIA E ASSINATURA DO CONTRATO </strong>

                <p>

                    <br />
                    11.1: O CONTRATANTE e a CONTRATADA declaram expressamente
                    neste ato que foram informados e cientificados sobre a
                    forma, procedimento e validade da assinatura física ou
                    eletrônica, reconhecendo e concordando com a legalidade da
                    mesma, seus métodos e mecanismos de autenticação bem como
                    pela sua utilização.
                    <br />
                    11.1.1: Em caso de assinatura virtual,
                    O CONTRATANTE concorda, ainda, em utilizar a
                    plataforma/sistema escolhida pela CONTRATADA, ClickSign, ou
                    outra congênere para a realização da assinatura eletrônica
                    do presente contrato e, considerando que a referida
                    plataforma utiliza assinatura eletrônica de caráter
                    meramente ilustrativo, não correspondendo à representação
                    gráfica da assinatura física das partes; o CONTRATANTE
                    desde já aceita e confirma a autenticidade de sua assinatura
                    virtual, realizada por meio eletrônico, cuja autenticidade
                    também é garantida pela chave criptográfica gerada no envio
                    do contrato assinado.
                    <br />
                    11.2: Da mesma forma o CONTRATANTE e a
                    CONTRATADA declaram para os devidos fins de direito, sob as
                    penas da lei, que as contas/endereços de e-mail informados
                    no preenchimento das fichas de cadastros competentes são
                    verdadeiras e autênticas, ficando as partes cientes que a
                    falsidade dessa declaração configura crime previsto no
                    Código Penal Brasileiro passível de autuação na forma da
                    lei, bem como, podendo ser enquadrado como má-fé contratual.

                    <br />
                    11.3: Por fim, as partes reconhecem e comprometem-se a
                    respeitar a autenticidade do contrato, das assinaturas nele
                    inseridas, a forma de aposição das mesmas no presente
                    documento (pela aprovação, aceitação e confirmação),
                    renunciando expressamente neste ato qualquer contestação
                    quanto a autenticidade, forma e os meios pelos quais o
                    contrato foi formalizado, comprometendo-se a cumprir todos
                    os termos do contrato assinado, reconhecendo e aceitando
                    como fiel e verdadeiras as assinaturas realizadas de maneira
                    eletrônica ou presencialmente quanto o meio utilizado para a
                    obtenção das mesmas neste instrumento.
                </p>

                <br />
                <hr />
                <br />

                <strong>12. DAS DISPOSIÇÕES GERAIS: </strong>

                <p>

                    <br />
                    12.1: Findando o presente contrato, o mesmo será prorrogado
                    automaticamente, mediante aviso prévio ao contratante, por
                    endereço eletrônico ou canal de comunicação entre as partes,
                    devidamente documentado, de no mínimo 30 dias antecedentes
                    ao fim do prazo contratual, por mais 12 (doze) meses, por
                    meio de aditamento, anexado a este instrumento, sendo a
                    prorrogação isenta de fidelidade e/ou multa de
                    cancelamento/rescisão.
                    <br />
                    12.2: O CONTRATANTE está ciente que a
                    escola não se responsabiliza pela obtenção ou afins de
                    equipamentos requeridos e necessários para as aulas online,
                    como Internet Wi-Fi, 4G, 5G ou relacionados, fones de
                    ouvido, aparelhos eletrônicos ou quaisquer outros
                    instrumentos necessários para o acompanhamento e
                    aproveitamento das aulas virtuais.
                    <br />
                    12.3: O CONTRATANTE
                    autoriza neste ato a publicação, transmissão e distribuição
                    de textos, obras, trabalhos literários e artísticos, sons,
                    imagens, vídeo, fotografias e outros meios produzidos pelo
                    aluno em razão da execução do presente contrato, bem como,
                    cede, gratuitamente, para todos os efeitos legais, os
                    respectivos direitos autorais, podendo figurar,
                    individualmente ou coletivamente, independente de nova
                    autorização, nos materiais publicitários divulgados pela
                    instituição CONTRATADA, através das diversas modalidades de
                    mídia existentes, observando-se sempre a moral e os bons
                    costumes.
                    <br />
                    12.4: Os casos não previstos neste instrumento
                    serão regulados em conformidade com o disposto no Código
                    Civil Brasileiro e legislações afins.
                    <br />
                    12.5: Nenhum acordo
                    verbal prevalecerá em detrimento das cláusulas deste
                    documento.
                    <br />
                    12.6 : Este contrato pode ser alterado/prorrogado
                    por meio de aditivo contratual devidamente assinado entre as
                    partes.
                </p>

                <br />
                <hr />
                <br />

                <strong> 13. DO FORO: </strong>

                <p>

                    <br />
                    13.1: As partes elegem o foro da comarca de Betim/MG, para
                    dirimir quaisquer litígios relativos ao presente
                    instrumento.
                    <br />
                    13.2: E assim ajustados e contratados, firmam o
                    presente instrumento em 02 (duas) vias de igual teor e
                    forma, na presença de 02 (duas) testemunhas que também
                    assinam, para que se produzam todos os efeitos legais.
                </p>
            </div>

            <div className="sign" id="sign">
                <span className="sign-marker" id="sign-marker">
                    CONTRATANTE/ RESPONSÁVEL LEGAL
                </span>
                <span className="sign-marker" id="sign-marker"> CONTRATADA </span>
            </div>

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


        </Container>

    )
}

export default StandardPromo


StandardPromo.propTypes = {
    data: PropTypes.shape({
        acFormato: PropTypes.string,

        valorCurso: PropTypes.number,
        contrato: PropTypes.string,
        dataMatricula: PropTypes.string,
        formato: PropTypes.string,
        unidade: PropTypes.string,
        tipoModalidade: PropTypes.string,
        name: PropTypes.string,
        cpf: PropTypes.string,
        rg: PropTypes.string,
        email: PropTypes.string,
        DatadeNascdoResp: PropTypes.string,
        CelularResponsavel: PropTypes.string,
        EnderecoResponsavel: PropTypes.string,
        NumeroEnderecoResponsavel: PropTypes.string,
        complemento: PropTypes.string,
        bairro: PropTypes.string,
        cidade: PropTypes.string,
        estado: PropTypes.string,
        cep: PropTypes.string,
        estadoCivil: PropTypes.string,
        profissao: PropTypes.string,
        nomeAluno: PropTypes.string,
        nascimentoAluno: PropTypes.string,
        curso: PropTypes.string,
        cargaHoraria: PropTypes.string,
        paDATA: PropTypes.string,
        valorParcela: PropTypes.string,
        numeroParcelas: PropTypes.string,
        diaVenvimento: PropTypes.string,
        dataPrimeiraParcelaMensalidade: PropTypes.string,
        dataUltimaParcelaMensalidade: PropTypes.string,
        descontoTotal: PropTypes.string,
        descontoPorParcela: PropTypes.string,
        classe: PropTypes.string,
        subclasse: PropTypes.string,
        cargahoraria: PropTypes.string,

        parcelasAfetadas: PropTypes.string,
        descontoPrimeirasParcelas: PropTypes.string,
        demaisParcelas: PropTypes.string,
        descontoDemaisParcelas: PropTypes.string,
    })
}