
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"

const SupliersContext = createContext({})

export const SupliersProvider = ({ children }) => {

    const queryClient = useQueryClient()

    const [Supliers, setSupliers] = useState()
    const [editSuplier, setEditSuplier] = useState(null)
    const [querySuplier, setQuerySuplier] = useState([])
    const [typeFilter, setTypeFilter] = useState([])

    const [query, setQuery] = useState()
    // id: 'cm8na0tnv000f73rcpyboweir',
    // name: 'Marcos Viniciu',
    // docment: '02605441',
    // type: 'FISICO',
    // contacts: {
    //   email: 'Marcos.vinicius7170@gmail.com',
    //   telefone: '544444',
    //   whatsapp: '5',
    //   descricao: '555',
    //   orderEmail: '5555',
    //   comercialPhone: '31973375058'
    // },
    // address: {
    //   UF: 'Minas Gerais',
    //   Rua: 'Rua Formosa',
    //   cep: '32606-720',
    //   Bairro: 'Conjunto Habitacional Homero Gil',
    //   Cidade: 'Betim',
    //   numero: '215',
    //   complemento: 'casa'
    // },
    const [initialDate, setInitialDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)


    const [orderFor, setOrderFor] = useState("desc")
    const [orderBy, setOrderBy] = useState("created_at")
    const [dateType, setDateType] = useState("created_at")

    const [body, setBody] = useState()


    const recibo = useRef()

    // const pickingDate = (range) => {

    //     const now = new Date();

    //     const LastMonth = () => `${new Date(now.getFullYear(), now.getMonth() - 1, 1)}~${new Date(now.getFullYear(), now.getMonth(), 0)}`;
    //     const TwoMonths = () => `${new Date(now.getFullYear(), now.getMonth() - 2, 1)}~${new Date(now.getFullYear(), now.getMonth() - 1, 0)}`;
    //     const ThisMonth = () => `${new Date(now.getFullYear(), now.getMonth(), 1)}~${new Date(now.getFullYear(), now.getMonth() + 1, 0)}`;

    //     const Custom = () => `${initialDate}~${endDate}`;

    //     const SevenDays = () => {
    //         const date = new Date()
    //         date.setDate(date.getDate() - 7)
    //         return `${date.toDateString()}~${now}`
    //     }

    //     const All = () => {
    //         const date = new Date()
    //         date.setDate(date.getDate() - 10000)
    //         return `${date.toDateString()}~${now}`
    //     }

    //     const ThisYear = () => {
    //         const date = new Date();
    //         const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    //         return `${firstDayOfYear.toDateString()}~${now}`
    //     }



    //     const settledPeriod = {
    //         "Mês passado": LastMonth(),
    //         "Mês retrasado": TwoMonths(),
    //         "Este mês": ThisMonth(),
    //         "Personalizado": Custom(),
    //         "Últimos 7 dias": SevenDays(),
    //         "Este ano": ThisYear(),
    //         "Todo período": All(),
    //     }

    //     return settledPeriod[range]
    // }

    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }



    const querySupliers = async () => {

        const url = query ?
            `/fornecedor-query` :
            `/fornecedor`

        const response = await URI.post(url, {
            take,
            skip,
            orderBy,
            orderFor,
            dateType,
            typeFilter,
            query,
        })

        return response.data
    }

    const SupliersQuery = useQuery({
        queryFn: () => querySupliers(),
        queryKey: [
            "Supliers", skip, take, query,
            JSON.stringify(typeFilter), orderBy, orderFor
        ],
        // staleTime: 1000 * 60 * 5, // 5 minutos sem refazer a requisição
        // cacheTime: 1000 * 60 * 10
    })


    const updateCacheData = (id) => {
        queryClient.setQueryData(
            [
                "Supliers", skip, take, query,
                JSON.stringify(typeFilter), orderBy, orderFor
            ],
            oldData => {
                return {
                    supliers: oldData.supliers.filter(res => res.id !== id),
                    total: oldData.total - 1
                }
            }
        )

        if (id) {

            const { total, supliers } = querySuplier
            const wout = supliers.filter(q => q.id !== id)

            setQuerySuplier({ supliers: wout, total: total - 1 })
        }

        SupliersQuery.refetch()
    }


    useLayoutEffect(() => {
        const gatherData = async () => {


            const { data } = SupliersQuery
            const { supliers, total } = data

            setQuerySuplier({ supliers, total })
        }

        if (SupliersQuery.isSuccess) gatherData()

    }, [
        take, skip, SupliersQuery.data, query,
        typeFilter.length, orderFor, orderBy,
    ])




    const newSuplier = async (body) => {

        const newSup = new Promise((resolve, reject) => {

            URI.post("/novo-fornecedor", body)
                .then(response => resolve(response))
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err.response.data.message)
                })

        })

        toast.promise(
            newSup,
            {
                pending: "Enviando dados...",
                success: "Fornecedor cadastrado com sucesso!",
                error: `Erro ao cadastrar`,
            }
        )
    }

    const createSuplier = useMutation({
        mutationFn: (e) => newSuplier(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                [
                    "Supliers", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor
                ],
                (oldData) => {
                    return {
                        supliers: [
                            ...oldData.supliers,
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            }],
                        total: oldData.total + 1
                    }
                }
            )

        }
    })




    const suplierUpdate = async (body) => {

        const newSup = new Promise((resolve, reject) => {

            URI.put(`/fornecedor/${body.id}`, body)
                .then(response => resolve(response))
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err.response.data.message)
                })

        })

        toast.promise(
            newSup,
            {
                pending: "Enviando dados...",
                success: "Fornecedor editado com sucesso!",
                error: `Erro ao cadastrar`,
            }
        )
    }

    const updateSuplier = useMutation({
        mutationFn: (e) => suplierUpdate(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                [
                    "Supliers", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor
                ],
                (oldData) => {

                    return {
                        supliers: [
                            oldData.supliers.filter(r => r.id !== variables.id),
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            }],
                        total: oldData.total
                    }
                }
            )

        }
    })




    const getAllSupliers = async () => {

        const response = await URI.get(`/fornecedor-totais`)

        return response.data
    }

    const allSupliers = useQuery({
        queryFn: () => getAllSupliers(),
        queryKey: [
            "Supliers"
        ],
        // staleTime: 1000 * 60 * 5, // 5 minutos sem refazer a requisição
        // cacheTime: 1000 * 60 * 10
    })


    return (
        <SupliersContext.Provider value={{
            allSupliers,
            Supliers, setSupliers,
            SupliersQuery,
            updateSuplier,
            recibo,
            createSuplier,

            setInitialDate,
            endDate, setEndDate,

            query,

            queryClient,
            querySuplier, setQuerySuplier,

            setTake, setSkip, take,
            setOrderFor, setOrderBy, setDateType, setQuery,


            typeFilter, setTypeFilter,
            removeFilter,

            orderBy,
            orderFor,

            body, setBody,

            updateCacheData,

            editSuplier, setEditSuplier
        }}>

            {children}

        </SupliersContext.Provider>
    )

}

export const useSupliers = () => {
    const context = useContext(SupliersContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

SupliersProvider.propTypes = {
    children: Proptypes.node
}