
const general = ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico', 'recepcao']
const high = ['direcao', 'gerencia']
const mid = ['administrativo', 'direcao', 'comercial', 'gerencia', 'pedagogico']
const low = ['administrativo', 'direcao', 'gerencia', 'comercial']


export const paths = {
    home: {
        path: "/",
        access: mid
    },

    configCustomFields: {
        path: "/campos-personalizados",
        access: high
    },


    control: {
        path: "/controle-comercial/",
        access: mid
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

    configRegister: {
        path: "/config/cadastro",
        access: high
    },

    signContracts: {
        path: "/contratos-por-assinar",
        access: general
    },

    orders: {
        path: "/pedidos",
        access: general
    },

    nestedOrder: {
        path: "/pedidos/invoice",
        access: general
    },

}