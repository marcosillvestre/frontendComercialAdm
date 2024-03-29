

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

export default {
    arrayQuantityChanges,
    comissionStatusOpt, coursesOpt, backgroundOpt, nonEspecificOpt

}