

const comissionStatusOpt = [
    "Pendente",
    "Não aprovado",
    "Pré-aprovado",
    "Comissionado",
    "Aprovado",
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
    { name: "Período personalizado", customizable: true },
]

const customizablePeriods = [
    { name: "Data de matrícula", undleLabel: true },
    { name: "Data de validação", undleLabel: true }
]


const roles = [
    { label: "Direção", value: "direcao" },
    { label: "Comercial", value: "comercial" },
    { label: "Gerencia", value: "gerencia" },
    { label: "Administrativo", value: "administrativo" },
    { label: "Pedagógico", value: "pedagogico" },
]

export default {
    arrayQuantityChanges, predeterminedPeriods, customizablePeriods,
    comissionStatusOpt, coursesOpt, backgroundOpt, nonEspecificOpt,
    roles

}