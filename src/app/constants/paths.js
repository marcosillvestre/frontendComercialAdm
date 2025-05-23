
const general = ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico', 'recepcao']
const high = ['direcao', 'gerencia']
const mid = ['administrativo', 'direcao', 'gerencia', 'pedagogico']
const low = ['administrativo', 'direcao', 'gerencia', 'comercial']


export const paths = {
    home: {
        path: "/",
        access: general
    },
    campaign: {
        path: "/campanhas",
        access: low
    },
    supliers: {
        path: "/fornecedores",
        access: low
    },
    billingRule: {
        path: "/regua-de-cobranca",
        access: low
    },
    products: {
        path: "/produtos",
        access: low
    },
    services: {
        path: "/servicos",
        access: low
    },

    taskManager: {
        path: "/tarefas",
        access: high
    },

    configCustomFields: {
        path: "/campos-personalizados",
        access: mid
    },


    control: {
        path: "/controle-comercial/",
        access: general
    },


    nestedControl: {
        path: "/controle-comercial/:query",
        access: mid
    },



    comissionalControl: {
        path: "/controle-comissional",
        access: low
    },

    newPass: {
        path: "/nova-senha",
        access: general
    },

    redefinePass: {
        path: "/redefinir-senha",
        access: general
    },

    config: {
        path: "/config",
        access: high
    },

    users: {
        path: "/config/cadastro",
        access: high
    },

    signContracts: {
        path: "/contratos-por-assinar",
        access: general
    },

    orders: {
        path: "/pedidos",
        access: mid
    },
    historicOrders: {
        path: "/historico-pedidos",
        access: mid
    },

    nestedOrder: {
        path: "/pedidos/invoice",
        access: mid
    },

}