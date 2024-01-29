
import PropTypes from 'prop-types';
import { Container } from './styles.jsx';

const Standard = ({ data }) => {
    // vendedor: 'Aracelly Gois',
    // contrato: 'P-24012024-1',
    // dataMatricula: '25/01/2024',
    // classe: 'Fluency Way - Class',
    // unidade: 'PTB',
    // tipoModalidade: 'Em grupo',
    // name: 'Erica Gomes Duarte',
    // rg: '3777849',
    // cpf: '71482555620',
    // DatadeNascdoResp: '09/11/1965',
    // CelularResponsavel: '+553197044930',
    // EnderecoResponsavel: 'Piracicaba',
    // NumeroEnderecoResponsavel: '320',
    // complemento: 'A',
    // bairro: 'Cruzeiro',
    // cidade: 'Betim',
    // estado: 'MG',
    // cep: '32661346',
    // estadoCivil: 'Divorciada',
    // profissao: 'Aposentada',
    // nomeAluno: 'Bernardo Costa Soares',
    // nascimentoAluno: '22/05/2015',
    // formato: 'Presencial',
    // subclasse: 'Kids',
    // cargaHoraria: '170',
    // paDATA: '25/01/2024',
    // valorMensalidade: '237,00',
    // numeroParcelas: '24',
    // diaVenvimento: '15/02/2024',
    // dataPrimeiraParcelaMensalidade: '15/02/2024',
    // dataUltimaParcelaMensalidade: '15/01/2026',
    // descontoTotal: '576,00',
    // descontoPorParcela: '24,00',
    // valorParcela: '237,00',
    // curso: 'Inglês',
    // valorCurso: 5688

    console.log(data)
    return (
        <Container id="content">
            <h2>
                QUADRO RESUMO DO CONTRATO DE PRESTAÇÃO DE SERVIÇO EDUCACIONAL
            </h2>

            <h2>CURSO DE IDIOMAS E TECNOLOGIA</h2>
            <h3>CONTRATO Nº: {data.contrato}</h3>
            <h3>DATA DA MATRÍCULA: {data.dataMatricula}</h3>
            <h3>TIPO DE CONTRATO: {data.formato}</h3>
            <h3>UNIDADE: {data.unidade}</h3>
            <h3>TIPO DE ASSINATURA: {data.tipoModalidade}</h3>
            <h2>DA QUALIFICAÇÃO DAS PARTES</h2>

            <p>
                Pelo presente instrumento particular, que fazem entre si de um
                lado a parte denominadas como
                <strong>
                    “CONTRATANTE/ALUNO ou CONTRATANTE/RESPONSÁVEL LEGAL”
                </strong>, abaixo qualificado:
            </p>

            <table>
                <tr>
                    <td>
                        <h3>Nome: {data.name}</h3>
                    </td>
                    <td>
                        <h3>CPF: {data.cpf}</h3>
                    </td>
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
                </tr>
            </table>

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
                responsável pela(s) unidade(s) abreviadas por “Centro”, “Aliança
                Eterna/IBAE” e “YES”
            </p>

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

        </Container>

    )
}

export default Standard


Standard.propTypes = {
    data: PropTypes.shape({
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
    })
}