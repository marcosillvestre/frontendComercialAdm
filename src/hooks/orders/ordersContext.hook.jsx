
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { pickingDate } from "../../app/utils/functions/getDates.jsx"
import businessRules from '../../app/utils/Rules/options.jsx'
import URI from "../../app/utils/utils"
import { useUser } from "../userContext.jsx"

const OrdersContext = createContext({})

export const OrdersProvider = ({ children }) => {
    const { predeterminedPeriods } = businessRules

    const queryClient = useQueryClient()
    const [orders, setOrders] = useState([])
    const [queryOrder, setQueryOrder] = useState([])
    const [typeFilter, setTypeFilter] = useState([])

    const [checkData, setCheckData] = useState([])

    const [initialDate, setInitialDate] = useState(null)
    const [endDate, setEndDate] = useState(null)


    const [filterInitialDate, setFilteringInitialDate] = useState(null)
    const [filterEndDate, setFilteringEndDate] = useState(null)

    const [search, setSearch] = useState(predeterminedPeriods[0].name)
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)


    const [orderFor, setOrderFor] = useState("desc")
    const [orderBy, setOrderBy] = useState("created_at")

    const [dateType, setDateType] = useState("created_at")
    const [query, setQuery] = useState(undefined)

    const [checked, setChecked] = useState(false)

    const { userData } = useUser()


    const recibo = useRef()



    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }

    const queryOrders = async () => {

        const dates = search !== "Período personalizado" ? await pickingDate(search) :
            `${initialDate}~${endDate}`

        const url = query ?
            `/pedidos-query` : `/pedidos`

        const response = await URI.post(url, {
            dates,
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

    const ordersQuery = useQuery({
        queryFn: () => queryOrders(),
        queryKey: [
            search, "orders", skip, take, query,
            JSON.stringify(typeFilter), orderBy, orderFor
        ],
        // staleTime: 1000 * 60 * 5, // 5 minutos sem refazer a requisição
        // cacheTime: 1000 * 60 * 10
    })

    useLayoutEffect(() => {
        const gatherData = async () => {


            const { data } = ordersQuery
            const { order, count } = data

            setQueryOrder({ order, count })
        }


        if (ordersQuery.isSuccess) gatherData()

    }, [
        search, take, skip, ordersQuery.isSuccess, query,
        typeFilter.length, orderFor, orderBy
    ])


    const multiUpdate = async (e) => {
        const promise = new Promise((resolve, reject) => {
            URI.put("/multi-pedidos", e)
                .then(response => resolve(response))
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err.response.data.message)
                })

        })

        await toast.promise(
            promise,
            {
                pending: 'Editando o pedido',
                success: 'Editado com sucesso',
                error: "Erro ao editar, confira os dados"
            })
    }

    const mutationMultiUpdate = useMutation({
        mutationFn: (e) => multiUpdate(e),
        onSuccess: (_, variable) => {
            queryClient.setQueryData(
                [search, "orders", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor],
                (oldData) => {
                    const { order, count } = oldData
                    const { ids, where, what } = variable

                    const newData = order.map(order => {
                        if (!ids.includes(order.id)) return order; // Mantém os pedidos que não precisam ser atualizados
                        const dateTypes = {
                            delivery: {
                                status: 'ENTREGUE',
                                "withdraw": new Date(),
                                logistic: [...order['logistic'], {
                                    stage: "ENTREGUE",
                                    active: true,
                                    date: new Date(),
                                    user: userData.name

                                }]
                            },
                            arrived: {
                                status: 'CHEGOU',
                                "arrivingDate": new Date(),
                                logistic: [...order['logistic'], {
                                    stage: "CHEGOU",
                                    active: true,
                                    date: new Date(),
                                    user: userData.name

                                }]
                            },
                            available: {
                                status: 'CANCELADO',
                                logistic: [...order['logistic'], {
                                    stage: "CANCELADO",
                                    active: true,
                                    date: new Date(),
                                    user: userData.name

                                }]
                            },
                            status: {
                                [where]: what,
                                logistic: [...order['logistic'], {
                                    stage: what,
                                    active: true,
                                    date: new Date(),
                                    user: userData.name

                                }]
                            },
                            signed: {
                                signed: true,
                            },
                        }

                        const toBeUpdated = dateTypes[where] ?? { [where]: what }

                        return {
                            ...order,
                            ...toBeUpdated
                        };
                    });

                    const arrayUpdated = {
                        order: newData,
                        count
                    }

                    setQueryOrder(arrayUpdated)

                    return arrayUpdated
                }
            )
        }
    })




    async function handleInput(params) {
        if (search === params) return ordersQuery.refetch()
        if (params !== "Período personalizado") {
            setInitialDate(null)
            setEndDate(null)
        }

        setSearch(params)
    }

    const updateOrder = async (body) => {

        const response = new Promise((resolve, reject) => {
            URI.put("/pedidos", body)
                .then(response => resolve(response))
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err.response.data.message)
                })

        })

        toast.promise(
            response,
            {
                pending: 'Editando o pedido',
                success: 'Editado com sucesso',
                error: "Erro ao editar, confira os dados"
            })

        return response.data
    }

    const updateLink = useMutation({
        mutationFn: (e) => updateOrder(e),
        onSuccess: (_, variable) => {
            queryClient.setQueryData(
                [search, "orders", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor],
                (oldData) => {
                    const { order, count } = oldData
                    const { id } = variable

                    const newData = order.filter(res => res.id !== id).concat(variable)
                    return { order: newData, count }


                })

        }
    })





    return (
        <OrdersContext.Provider value={{
            orders, setOrders,
            ordersQuery,

            recibo,

            updateLink,

            search, setSearch,

            initialDate, setInitialDate,
            endDate, setEndDate,

            query,

            queryClient,
            handleInput,
            queryOrder, setQueryOrder,

            setTake, setSkip, take,
            setOrderFor, setOrderBy, setDateType, setQuery,

            checked, setChecked,

            typeFilter, setTypeFilter,
            removeFilter,

            filterInitialDate, setFilteringInitialDate,
            filterEndDate, setFilteringEndDate,

            orderBy,
            orderFor,

            checkData, setCheckData,


            mutationMultiUpdate,

        }}>

            {children}

        </OrdersContext.Provider>
    )

}

export const useOrders = () => {
    const context = useContext(OrdersContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

OrdersProvider.propTypes = {
    children: Proptypes.node
}