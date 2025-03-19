
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import businessRules from '../../app/utils/Rules/options.jsx'
import URI from "../../app/utils/utils"

const OrdersContext = createContext({})

export const OrdersProvider = ({ children }) => {
    const { predeterminedPeriods } = businessRules
    const queryCache = useQueryClient();

    const queryClient = useQueryClient()
    const [orders, setOrders] = useState()
    const [queryOrder, setQueryOrder] = useState([])
    const [typeFilter, setTypeFilter] = useState([])

    const [checkData, setCheckData] = useState([])

    const [initialDate, setInitialDate] = useState(null)
    const [endDate, setEndDate] = useState(null)


    const [filterInitialDate, setFilteringInitialDate] = useState(null)
    const [filterEndDate, setFilteringEndDate] = useState(null)

    const [search, setSearch] = useState(predeterminedPeriods[0].name)

    const recibo = useRef()

    const pickingDate = (range) => {

        const now = new Date();

        const LastMonth = () => `${new Date(now.getFullYear(), now.getMonth() - 1, 1)}~${new Date(now.getFullYear(), now.getMonth(), 0)}`;
        const TwoMonths = () => `${new Date(now.getFullYear(), now.getMonth() - 2, 1)}~${new Date(now.getFullYear(), now.getMonth() - 1, 0)}`;
        const ThisMonth = () => `${new Date(now.getFullYear(), now.getMonth(), 1)}~${new Date(now.getFullYear(), now.getMonth() + 1, 0)}`;

        const Custom = () => `${initialDate}~${endDate}`;

        const SevenDays = () => {
            const date = new Date()
            date.setDate(date.getDate() - 7)
            return `${date.toDateString()}~${now}`
        }

        const All = () => {
            const date = new Date()
            date.setDate(date.getDate() - 10000)
            return `${date.toDateString()}~${now}`
        }

        const ThisYear = () => {
            const date = new Date();
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            return `${firstDayOfYear.toDateString()}~${now}`
        }



        const settledPeriod = {
            "Mês passado": LastMonth(),
            "Mês retrasado": TwoMonths(),
            "Este mês": ThisMonth(),
            "Personalizado": Custom(),
            "Últimos 7 dias": SevenDays(),
            "Este ano": ThisYear(),
            "Todo período": All(),
        }

        return settledPeriod[range]
    }



    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)


    const [orderFor, setOrderFor] = useState("asc")
    const [orderBy, setOrderBy] = useState("created_at")
    const [dateType, setDateType] = useState("created_at")
    const [query, setQuery] = useState(undefined)

    const [body, setBody] = useState()


    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }

    const queryOrders = async () => {

        const dates = search !== "Período personalizado" ? await pickingDate(search) :
            `${initialDate}~${endDate}`

        const url = query ? `http://localhost:7070/pedidos-query` :
            `http://localhost:7070/pedidos`

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
        queryKey: [search, "orders", skip, take, query, JSON.stringify(typeFilter), orderBy, orderFor],
        // staleTime: 1000 * 60 * 5, // 5 minutos sem refazer a requisição
        // cacheTime: 1000 * 60 * 10
    })


    useLayoutEffect(() => {
        const gatherData = async () => {


            const { data } = ordersQuery
            const { order, count } = data

            setQueryOrder({ order, count })
        }

        queryCache.invalidateQueries([search, "orders", skip, take, query, JSON.stringify(typeFilter), orderBy, orderFor])
        if (ordersQuery.isSuccess) gatherData()

    }, [search, take, skip, ordersQuery.isSuccess, query, typeFilter.length, orderFor, orderBy])


    const multiUpdate = async () => {

        await toast.promise(
            URI.put("http://localhost:7070/multi-pedidos", body),
            {
                pending: 'Editando o pedido',
                success: 'Editado com sucesso',
                error: "Erro ao editar, confira os dados"
            })
    }

    const mutationMultiUpdate = useMutation({
        mutationFn: (e) => multiUpdate(e),
        onSuccess: () => ordersQuery.refetch()
    })



    async function handleInput(params) {
        if (search === params) return ordersQuery.refetch()
        if (params !== "Personalizado") {
            setInitialDate(null)
            setEndDate(null)
        }

        setSearch(params)

        queryClient.invalidateQueries([search, "orders", skip, take, query, JSON.stringify(typeFilter), orderBy, orderFor])
    }

    const updateOrder = async (body) => {
        const response = await toast.promise(
            URI.put("http://localhost:7070/pedidos", body),
            {
                pending: 'Editando o pedido',
                success: 'Editado com sucesso',
                error: "Erro ao editar, confira os dados"
            })

        return response.data
    }

    const updateLink = useMutation({
        mutationFn: (e) => updateOrder(e),
        onSuccess: () => {
            // console.log(e)
            queryClient.invalidateQueries([search, "orders", skip, take, query, JSON.stringify(typeFilter), orderBy, orderFor])
        }
    })

    const [checked, setChecked] = useState(false)


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

            body, setBody,

            mutationMultiUpdate
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