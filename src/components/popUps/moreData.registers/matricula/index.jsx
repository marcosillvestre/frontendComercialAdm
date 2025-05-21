import { Typography } from '@mui/material';
// import { treatingDates } from '../../../../app/utils/functions/getDates';
import businessRules from '../../../../app/utils/Rules/options.jsx';
import { useRegister } from '../../../../hooks/registers/registersContext.hook';
import { DateSelect } from '../../../selects/DateSelect/index.jsx';
import { UniqueSelect } from '../../../selects/UniqueSelect';
import { ContainerPopUpData } from '../styles';
export const Matricula = () => {

    const { register, editRegister, setEditRegister, updateRegister, setUpdateRegister } = useRegister()

    const { nonEspecificOpt, comissionStatusOpt } = businessRules

    const subtitle = {
        "assinaturaContratoStatus": "Status da assinatura de contrato",
        "taxaMatriculaStatus": "Status da taxa de matrícula",
        "pagamentoPrimeiraParcelaStatus": "Status do pagamento da primeira parcela",
        "materialDidaticoStatus": "Status do pagamento do material didático",
        "primeiraAulaStatus": "Status de presença na primeira aula",
        "comissaoStatus": "Status da comissão",
        "aprovacaoADM": "Aprovação do administrador",
        "aprovacaoDirecao": "Aprovação da direção",
        "documentos": "Status dos documentos",

        "diretorResponsavel": "Diretor responsável",
        "admResponsavel": "Administrador responsável",
        "dataMatricula": "Data da matrícula",
        "dataValidacao": "Data de validação",
        "dataComissionamento": "Data de comissionamento",
        "dataPagamentoTaxaMatricula": "Data de pagamento da taxa de matrícula",
        "dataPagamentoPrimeiraParcela": "Data de pagamento da primeira parcela",
        "dataPagamentoMaterialDidatico": "Data de pagamento do material didático",
    }

    const options = {
        "assinaturaContratoStatus": nonEspecificOpt,
        "taxaMatriculaStatus": nonEspecificOpt,
        "pagamentoPrimeiraParcelaStatus": nonEspecificOpt,
        "materialDidaticoStatus": nonEspecificOpt,
        "primeiraAulaStatus": nonEspecificOpt,
        "comissaoStatus": comissionStatusOpt,
        "aprovacaoADM": nonEspecificOpt,
        "aprovacaoDirecao": nonEspecificOpt,
        "documentos": nonEspecificOpt,
    }

    const keys = Object.keys(subtitle)


    const Changer = async (key, value) => {

        setEditRegister({
            ...editRegister,
            [key]: value
        })

        setUpdateRegister({
            ...updateRegister,
            [key]: value
        })

    }

    return (
        <ContainerPopUpData>

            {
                register &&
                keys.map((key, index) => (
                    <label htmlFor="" key={index}>
                        <Typography variant="h7" component="h3">
                            {subtitle[key]}:
                        </Typography>

                        <div
                            className='input'
                        >
                            {
                                subtitle[key].includes("Data") ?
                                    <DateSelect
                                        label={register[key]}
                                        width="100%"
                                        field={key}
                                        fn={[Changer]}
                                    />
                                    :
                                    <UniqueSelect
                                        width="100%"
                                        field={key}
                                        label={register[key]}
                                        option={options[key]}
                                        fn={[Changer]}
                                    />
                            }


                        </div>


                    </label>
                ))
            }

        </ContainerPopUpData>
    )
}
