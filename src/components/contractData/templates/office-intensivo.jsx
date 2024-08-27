
import PropTypes from 'prop-types';
import { Container } from './styles.jsx';

const OfficeIntensivo = ({ data }) => {


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
                    <tr><h5>Nome: {data.name}</h5></tr>
                    <tr>
                        <td><h5>RG: {data.rg}</h5></td>
                        <td><h5>E-mail: {data.email}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>Data de Nascimento: {data.DatadeNascdoResp}</h5></td>
                        <td><h5>Telefone: {data.CelularResponsavel}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>RUA/AV: {data.EnderecoResponsavel}</h5></td>
                        <td><h5>Nº: {data.NumeroEnderecoResponsavel}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>COMPL: {data.complemento}</h5></td>
                        <td><h5>BAIRRO: {data.bairro}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>CIDADE: {data.cidade}</h5></td>
                        <td><h5>UF: {data.estado}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>CEP: {data.cep}</h5></td>
                        <td><h5>Estado Civil: {data.estadoCivil}</h5></td>
                    </tr>
                    <tr>
                        <td><h5>Profissão: {data.profissao}</h5></td>
                        <td><h5>CPF: {data.cpf}</h5></td>
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
                <h5>DATA DE NASCIMENTO: {data.nascimentoAluno}</h5>

                <p>
                    Dessa forma, já qualificados, aceitam e os seguintes termos e
                    condições abaixo:
                </p>

                <table>
                    <tr>
                        <td>
                            <h5>Curso: {data.curso}</h5>
                        </td>
                        <td>
                            <h5>Formato: {data.formato}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Tipo: {data.tipoModalidade}</h5>
                        </td>
                        <td>
                            <h5>Classe de curso: {data.classe}</h5>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h5>Subclasse de curso: {data.subclasse}</h5>
                        </td>
                    </tr>
                </table>
                <br />
                <hr />
                <br />
                <p>
                    A carga horária contratada tem o total de {
                        data.cargaHoraria
                    } horas-aulas. Sendo o curso ministrado em
                    1 módulo, que terá a duração estipulada dentro do calendário
                    didático para o cumprimento da carga horária.
                    De acordo com
                    o planejamento didático, as aulas têm previsão para início
                    no dia {data.paDATA}, sujeito à alteração mediante aviso
                    prévio.
                </p>
                <br />
                <hr />
                <br />
                <strong> SOBRE VALOR E DESCONTOS </strong>
                <p>
                    O valor total da carga horária contratada é de R${data.valorCurso}
                    , que será dividido e pago em {
                        data.numeroParcelas
                    } parcelas cada qual com o vencimento para o dia {
                        data.diaVenvimento} de cada mês, sendo o vencimento
                    da primeira parcela na data {
                        data.dataPrimeiraParcelaMensalidade
                    } e, a última, no dia {data.dataUltimaParcelaMensalidade}.
                </p>
                <p>
                    A CONTRATADA por iniciativa própria oferecerá ao CONTRATANTE,
                    descontos nas mensalidades totalizando o valor de
                    R${data.descontoTotal}. Observando que o valor de
                    cada parcela será de R${data.valorParcela}, a(s) {
                        data.parcelasAfetadas} primeira(s)
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
                    2.1: O objeto do presente contrato é a prestação de serviço educacional de língua estrangeira e tecnologia, pela CONTRATADA ao CONTRATANTE, ou a terceiros que sejam determinados na matrícula. O presente contrato se resume na execução da prestação de serviços, por parte da CONTRATADA ao CONTRATANTE, através do cumprimento da carga horária estipulada, sejam elas na modalidade presencial, online ou híbrida, conforme estipulado anteriormente. <br />
                    2.2: Ao firmarem este contrato, o CONTRATANTE concorda em submeter às regras atinentes ao objeto, declarando que tem, portanto, conhecimento da abrangência das relações pactuadas.
                </p>

                <br />
                <hr />
                <br />
                <strong>3. DO CURSO E MODALIDADE: </strong>
                <p>
                    <br />
                    3.1: O calendário didático será entregue em até 10 dias após a primeira aula.
                    <br />
                    3.2: Os cursos na modalidade em turma, deverão contar com o número mínimo de 05(cinco) alunos e o máximo de 10(dez) alunos para dar início às aulas.
                    <br />
                    3.3: Caso haja falta de quórum de alunos matriculados para o início do curso na data prevista, fica a CONTRATADA autorizada a prorrogar a data de início do cumprimento da carga horária contratada, independente do formato, modalidade ou classe, quantas vezes forem necessárias, por um prazo de até 2 (dois) meses, contado a partir da data de início prevista, para o atingimento do referido quórum, ou para, então, não atingido este, cancelamento unilateral do contrato a realização do início das aulas.

                </p>

                <br />
                <hr />
                <br />
                <strong>4. DA OBRIGAÇÃO DA CONTRATADA: </strong>
                <p>4.1: A CONTRATADA se obriga à prestação de serviço educacional, no ensino do curso assinalado em campo descrito e selecionado no QUADRO DE RESUMO deste instrumento, através de aulas presenciais, online ou a distância, considerando a natureza do conteúdo, característica, peculiaridade e demais atividades que o ensino exigir, buscando inclusive, aperfeiçoar a relação de quantidade de alunos por classe.
                    <br />4.2: Após a conclusão da carga horária e aprovação de cada módulo, o CONTRATANTE poderá solicitar o envio online de seu certificado de conclusão, sem custos adicionais. Caso o CONTRATANTE queira uma versão impressa do devido certificado, pelo mesmo deverá ser pago antecipadamente o custo de emissão no valor de R$ 25,00 (vinte e cinco reais) por cada via solicitada. Custos adicionais de envio deverão ser custeados pelo solicitante.
                    <br />4.2.1: Para que o certificado de conclusão do módulo possa ser emitido, o CONTRATANTE deverá ter uma frequência mínima de 75% (setenta e cinco por cento) das aulas e ter cumprido os critérios avaliativos internos impostos pela instituição CONTRATADA. É ressaltado que o certificado somente será emitido mediante avaliação feita pela Coordenação Pedagógica da Escola de Idiomas American Way.
                    <br />4.3: A emissão do certificado deverá ser feita após cumprimento de carga horária e confirmação de inexistência de débitos em aberto por parte do CONTRATANTE.

                    <br /><strong>4.4. As cláusulas 4.5 a 4.10 trata-se exclusivamente de serviços prestados por meio de PARCEIROS.</strong>
                    <br />4.5. American Way possui parceria firmada com algumas empresas e instituições, sendo estas parcerias com o fim de benefício mútuo, de forma onerosa ou não, das quais, quando houver, serão devidamente identificadas abaixo e de forma abreviada no campo “UNIDADE” no QUADRO RESUMO deste instrumento.
                    <br />4.6. Parceiro Golfinho Azul: O Parceiro identificado de forma abreviada por “CEGA” no campo “UNIDADE” refere-se à parceria estabelecida com a Cega - Centro De Educacao Golfinho Azul, sediada em Rua Ceara, Nº 207, bairro Ouro Negro, Ibirité, MG, CEP 32400-001, sob o CNPJ 14.016.453/0001-10.
                    <br />4.7: A CONTRATADA reserva o direito de oferecer aulas presenciais através de PARCEIROS, utilizando-se da infraestrutura e espaço cedido, desobrigando-se de arcar com qualquer responsabilidade quanto ao imóvel, tais como manutenção, despesas fixas e administrativas do mesmo. A mesma também não se responsabiliza pela descontinuação da prestação de serviços por motivo causado diretamente ou indiretamente por ação do(s) PARCEIRO(S).
                </p>

                <br />
                <hr />
                <br />
                <strong>5. DA GESTÃO DO CURSO:</strong>
                <p>
                    <br />5.1: O planejamento pedagógico do curso é de inteira responsabilidade da CONTRATADA, bem como a coordenação da prestação dos serviços, incluindo, mas não se limitando à determinação do calendário escolar, definição de datas para provas e avaliações, fixação de carga horária, designação e contratação de professores, cooperativas e empresas especializadas na prestação de serviços educacionais, organização de classes e agrupamento de alunos, orientação didática pedagógica, além de outras providências que os serviços e atividades docentes do curso exigir, a seu exclusivo critério, sem qualquer ingerência do CONTRATANTE.

                    <br />5.2: A CONTRATADA poderá, a qualquer tempo e a seu exclusivo critério, remanejar ou fundir turmas já formadas e/ou em andamento, sem a obrigatoriedade de  pertencerem ao mesmo módulo. Em caso de fechamento da turma em que o CONTRATANTE está matriculado, por decisão da CONTRATADA, não será cobrada a taxa de cancelamento, possibilitando a realocação do CONTRATANTE para outra turma, sem qualquer custo adicional.
                    <br />5.3: A CONTRATADA poderá, a qualquer momento, orientar o CONTRATANTE a migrar de horário e/ou turma, a fim de manter a proposta pedagógica – o que não necessariamente haverá obrigatoriedade e/ou incidência de valores adicionais.
                    <br />5.4: O aluno terá direito a suporte pedagógico via WhatsApp  por até 30 dias após a finalização do curso para a resolução de possíveis dúvidas que possam surgir durante esse período.
                </p>

                <br />
                <hr />
                <br />

                <strong> 6. DO PAGAMENTO:</strong>
                <p>
                    <br />6.1: Pelos serviços educacionais referidos neste contrato, os valores estão preenchidos no resumo deste documento, sendo de inteira responsabilidade do CONTRATANTE realizar os pagamentos no prazo estipulado, seguindo o prazo de duração.
                    <br />6.2: O CONTRATANTE terá a opção de solicitar a forma de pagamento das mensalidades, a que se refere no resumo deste documento, no momento da assinatura deste contrato, sendo elas: boleto bancário, cartão de crédito via link ou PIX cobrança (copia e cola/Qr Code).
                    <br />6.3: Em caso do não recebimento do boleto bancário, link para pagamento via cartão de crédito ou PIX cobrança (copia e cola/Qr Code), fica o CONTRATANTE  obrigado a entrar em contato com o setor Financeiro da CONTRATADA, para receber instruções, por e-mail, ou canal de comunicação oficial (com registro de comunicação por escrito), para realizar a retirada no site ou portal indicado pela CONTRATADA, ou o envio pela mesma, eximindo a CONTRATADA de qualquer responsabilidade, desde que a mesma se manifeste em até 3 (três) dias, após o recebimento da solicitação do CONTRATANTE, sendo de obrigação do mesmo manter registros para comprovar a comunicação, ressaltando que o CONTRATANTE não será isentado de PENALIDADE por atraso de pagamento em virtude do não recebimento do boleto bancário, link para pagamento via cartão de crédito ou PIX cobrança (copia e cola/Qr Code).
                    <br />6.4: A infrequência do ALUNO/CONTRATANTE não exime o pagamento das parcelas mensais.
                    <br />6.5: Caso algum desconto seja concedido e o CONTRATANTE opte pelo pagamento via boleto bancário, fica a cargo do mesmo comunicar à agência bancária sobre o desconto no boleto, ficando a CONTRATADA isenta de responsabilidade e dever de ressarcimento caso o CONTRATANTE não se atente a tal fato.
                    <br />6.6: Aos pagamentos efetuados após a data do vencimento, incidirão multa de 2% (dois por cento) e juros de mora de 0,033% ao dia, de forma automática e atualização monetária.
                    <br />6.6.1: Após 30 (trinta) dias corridos com o débito em aberto, sem comprovação de quitação do valor integral do mesmo, a CONTRATADA terá o direito, incondicional, sem obrigação de enviar aviso prévio ao CONTRATANTE, a tomar as providências legais de cobranças, até mesmo, incluir o nome do CONTRATANTE em cadastros de proteção ao crédito, como SERASA EXPERIAN e similares.
                </p>

                <br />
                <hr />
                <br />
                <strong> 7. RENOVAÇÃO E CONCLUSÃO DO CONTRATO</strong>
                <p>
                    <br />7.1: Fica expressamente convencionado que a atividade principal que determina a obrigação de prestação de serviço, justificando o fim do vínculo, é o cumprimento da CARGA HORÁRIA, especificada no resumo deste documento, sendo esse o fator qualificativo determinante, dispensando quaisquer outros critérios que caracterizam, e até mesmo, qualificam, a prestação de serviço realizada pela CONTRATADA – planejamento do módulo, plano de lições, atividades extracurriculares, aproveitamento do aluno, certificado de conclusão, execução do conteúdo proposto e/ou até mesmo, o prazo contratual.

                    <br />7.2: Após cumprimento da CARGA HORÁRIA contratada, é acordado entre as partes que a CONTRATADA terá o direito expresso de realizar quaisquer cobranças, na ausência de comunicação por escrito ou via email entre as partes que manifeste interesse na descontinuação da prestação de serviços – tal comunicação vinda por qualquer uma das partes e que deve ser realizada com pelo menos, 30 (Trinta) dias de antecedência.
                </p>

                <br />
                <hr />
                <br />
                <strong> 8. DESISTÊNCIA, RESCISÃO E TÉRMINO DO CONTRATO:</strong>

                <p>
                    <br />8.1: É de entendimento mútuo entre as partes que o término do CONTRATO será efetuado, de fato, na INEXISTÊNCIA de débitos EM ABERTO por parte do CONTRATANTE, mediante o RECIBO DE QUITAÇÃO. Sendo assim, a) vencimento do prazo contratual, b) cumprimento de carga horária e/ou c) abandono de curso não são critérios válidos para o término de contrato, por si só.
                    <br />8.2: A titularidade deste contrato é intransferível e insubstituível, e só poderá ser feita, como caso de EXCEÇÃO, em comum acordo entre as partes, devidamente assinado por ambos, através de um aditamento a este.
                    <br />8.3: No tocante ao exercício do direito de desistência o mesmo terá a presente regulamentação:
                    <br />8.3.1: Em caso de assinatura deste contrato de forma online para a realização de aulas presenciais, online ou híbridas o prazo para desistência é de 7 dias contados a partir do início das aulas.
                    <br />8.3.2: Em caso de assinatura presencial na sede da contratada seja para a modalidade presencial, online ou híbrida o prazo de desistência é de 7 dias contados a partir do início das aulas .
                    <br />8.3.3: Em caso de desistência após os prazos estipulados acima, não haverá devolução de valores de pagamentos já efetuados.
                    <br />8.4: O pedido de cancelamento/desistência/rescisão da matrícula deverá ser formalizado por escrito durante reunião presencial em uma das unidades com a Coordenação Pedagógica, a ser marcada pelo CONTRATANTE com antecedência mínima de 30 (trinta) dias, contados a partir do vencimento da última parcela paga, observadas as disposições legais. Em caso de aluno que faça o curso exclusivamente online, a reunião poderá ser realizada via videochamada.
                    <br />8.5: Em se tratando de abandono das aulas da carga horária contratada, a CONTRATADA é autorizada a tomar quaisquer medidas cabíveis para recebimento dos devidos valores acrescidos de juros e correção monetária, e, medidas judiciais em prol do recebimento de eventuais valores. Os honorários e despesas processuais ficarão sob a responsabilidade do CONTRATANTE.
                    <br />8.6: A CONTRATADA pode de imediato, rescindir o presente instrumento, independente de aviso ou notificação, em caso de descumprimento de qualquer dos itens expostos neste contrato, por parte do CONTRATANTE, ou por indisciplina do mesmo.
                    <br />8.7: O não pagamento da mensalidade no vencimento dará permissão à CONTRATADA impedir a renovação da matrícula para o módulo seguinte, não isentando o CONTRATANTE da obrigação de quitação dos débitos existentes.
                    <br />8.8: O contrato se consumará após a conclusão de todas as aulas contratadas e a confirmação de quitação de quaisquer débitos pendentes pelas partes envolvidas.
                </p>

                <br />
                <hr />
                <br />
                <strong> 9. DA CONCORDÂNCIA E ASSINATURA DO CONTRATO
                </strong>
                <p>
                    <br />9.1: O CONTRATANTE e a CONTRATADA declaram expressamente neste ato que foram informados e cientificados sobre a forma, procedimento e validade da assinatura física ou eletrônica, reconhecendo e concordando com a legalidade da mesma, seus métodos e mecanismos de autenticação bem como pela sua utilização.
                    <br />9.1.1: Em caso de assinatura virtual, O CONTRATANTE concorda, ainda, em utilizar a plataforma/sistema escolhida pela CONTRATADA, ClickSign, ou outra congênere para a realização da assinatura eletrônica do presente contrato e, considerando que a referida plataforma utiliza assinatura eletrônica de caráter meramente ilustrativo, não correspondendo à representação gráfica da assinatura física das partes; o CONTRATANTE desde já aceita e confirma a autenticidade de sua assinatura virtual, realizada por meio eletrônico, cuja autenticidade também é garantida pela chave criptográfica gerada no envio do contrato assinado.
                    <br />9.2: Da mesma forma o CONTRATANTE e a CONTRATADA declaram para os devidos fins de direito, sob as penas da lei, que as contas/endereços de e-mail informados no preenchimento das fichas de cadastros competentes são verdadeiras e autênticas, ficando as partes cientes que a falsidade dessa declaração configura crime previsto no Código Penal Brasileiro passível de autuação na forma da lei, bem como, podendo ser enquadrado como má-fé contratual.
                    <br />9.3: Por fim, as partes reconhecem e comprometem-se a respeitar a autenticidade do contrato, das assinaturas nele inseridas, a forma de aposição das mesmas no presente documento (pela aprovação, aceitação e confirmação), renunciando expressamente neste ato qualquer contestação quanto a autenticidade, forma e os meios pelos quais o contrato foi formalizado, comprometendo-se a cumprir todos os termos do contrato assinado, reconhecendo e aceitando como fiel e verdadeiras as assinaturas realizadas de maneira eletrônica ou presencialmente quanto o meio utilizado para a obtenção das mesmas neste instrumento.
                </p>

                <br />
                <hr />
                <br />
                <strong> 10. DAS DISPOSIÇÕES GERAIS:  </strong>

                <p>
                    <br />10.1: O CONTRATANTE autoriza neste ato a publicação, transmissão e distribuição de textos, obras, trabalhos literários e artísticos, sons, imagens, vídeo, fotografias e outros meios produzidos pelo aluno em razão da execução do presente contrato, bem como, cede, gratuitamente, para todos os efeitos legais, os respectivos direitos autorais, podendo figurar, individualmente ou coletivamente, independente de nova autorização, nos materiais publicitários divulgados pela instituição CONTRATADA, através das diversas modalidades de mídia existentes, observando-se sempre a moral e os bons costumes.
                    <br />10.2: Os casos não previstos neste instrumento serão regulados em conformidade com o disposto no Código Civil Brasileiro e legislações afins.
                    <br />10.3: Nenhum acordo verbal prevalecerá em detrimento das cláusulas deste documento.
                    <br />10.4 : Este contrato pode ser alterado/prorrogado por meio de aditivo contratual devidamente assinado entre as partes.
                </p>


                <br />
                <hr />
                <br />
                <strong>  11. DO FORO:</strong>

                <p>
                    <br />11.1: As partes elegem o foro da comarca de Betim/MG, para dirimir quaisquer litígios relativos ao presente instrumento.
                    <br />11.2: E assim ajustados e contratados, firmam o presente instrumento em 02 (duas) vias de igual teor e forma, na presença de 02 (duas) testemunhas que também assinam, para que se produzam todos os efeitos legais.
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

export default OfficeIntensivo


OfficeIntensivo.propTypes = {
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
        classe: PropTypes.string,
        subclasse: PropTypes.string,
        cargaHoraria: PropTypes.string,
        paDATA: PropTypes.string,
        valorParcela: PropTypes.string,
        numeroParcelas: PropTypes.string,
        diaVenvimento: PropTypes.string,
        dataPrimeiraParcelaMensalidade: PropTypes.string,
        dataUltimaParcelaMensalidade: PropTypes.string,
        descontoTotal: PropTypes.string,
        descontoPorParcela: PropTypes.string,

        parcelasAfetadas: PropTypes.string,
        descontoPrimeirasParcelas: PropTypes.string,
        demaisParcelas: PropTypes.string,
        descontoDemaisParcelas: PropTypes.string,
    })
}