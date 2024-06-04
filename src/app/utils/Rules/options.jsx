

const comissionStatusOpt = [
    { name: "Pendente" },
    { name: "Não aprovado" },
    { name: "Pré-aprovado" },
    { name: "Comissionado" },
    { name: "Aprovado" }
]
const coursesOpt = [
    "Inglês",
    "Espanol",
    "Tecnologia",
]
const backgroundOpt = [
    "Novo aluno",
    "Ex-aluno",
    "Aluno vigente",
    "Rematrícula"
]
const nonEspecificOpt = [
    "Pendente",
    "Ok",
    "Não"
]

const arrayQuantityChanges = [
    {
        label: "Status de comissionamento",
        type: "tipoMatricula",
        options: comissionStatusOpt,
        permission: ['direcao', 'administrativo', 'gerencia'],
    },
    {
        label: "Curso",
        type: "curso",
        options: coursesOpt,
        permission: ['direcao', 'administrativo', 'gerencia', 'comercial'],
    },
    {
        label: "Background",
        type: "background",
        options: backgroundOpt,
        permission: ['direcao', 'administrativo', 'gerencia', 'comercial'],
    },
    {
        label: "Status da direção",
        type: "aprovacaoDirecao",
        options: nonEspecificOpt,
        permission: ['direcao'],
    },
    {
        label: "Aprovação ADM.",
        type: "aprovacaoADM",
        options: nonEspecificOpt,
        permission: ['administrativo'],
    },
]


const predeterminedPeriods = [
    { name: "Este mês" },
    { name: "Últimos 7 dias" },
    { name: "Mês passado" },
    { name: "Mês retrasado" },
    { name: "Todo período" },
    { name: "Personalizado", customizable: true },
]

const customizablePeriods = [
    { name: "Data de matrícula", undleLabel: true },
    { name: "Data de validação", undleLabel: true }
]


const roles = [
    { name: "Direção", value: "direcao" },
    { name: "Comercial", value: "comercial" },
    { name: "Gerencia", value: "gerencia" },
    { name: "Administrativo", value: "administrativo" },
    { name: "Pedagógico", value: "pedagogico" },
]

const fields = {
    "tipoMatricula": "Status de comissionamento",
    "tmStatus": "Taxa de matricula",
    "ppStatus": "Primeira parcela",
    "mdStatus": "Material didatico",
    "acStatus": "Assinatura de contrato",
    "paStatus": "Primeira aula",
    "aprovacaoADM": "Aprovação do adm",
    "observacao": "Observação",
    "curso": "Curso",
    "aprovacaoDirecao": "Aprovação do diretor",
    "unidade": "Unidade",
    "background": "Background",
    "mdData": "Data de pagamento do Material Didático",
    "ppData": "Data de pagamento da Primeira Parcela",
    "tmData": "Data de pagamento da Taxa de Matrícula",
    "owner": "Consultor",
}


const types = {
    String: "Texto",
    "Texto": "String",

    Number: "Número",
    "Número": "Number",

    Date: "Data",
    "Data": "Date",
    Select: "Seleção única",
    "Seleção única": "Select",
    MultiSelect: "Multi-Select",
    "Multi-Select": "MultiSelect",
    "Sim": true,
    "Não": false,
    true: "Sim",
    false: "Não",
}

export default {
    types,
    arrayQuantityChanges, predeterminedPeriods, customizablePeriods,
    comissionStatusOpt, coursesOpt, backgroundOpt, nonEspecificOpt,
    roles, fields
}