
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import businessRules from '../../app/utils/Rules/options.jsx'
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const OrdersContext = createContext({})

export const OrdersProvider = ({ children }) => {
    const { predeterminedPeriods } = businessRules

    const queryClient = useQueryClient()
    const { headers } = useUser()
    const [orders, setOrders] = useState()
    const [queryOrder, setQueryOrder] = useState([])

    const [initialDate, setInitialDate] = useState()
    const [endDate, setEndDate] = useState()

    const [search, setSearch] = useState(predeterminedPeriods[0].name)


    const recibo = useRef()

    const updateData = async (e) => {

        const response = await toast.promise(
            URI.put("/pedidos", e, { headers: headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Pedido editado com sucesso',
                error: 'Algo deu errado'
            }
        )
            .catch(err => console.log(err))

        return response
    }

    const updateOrders = useMutation({
        mutationFn: (e) => updateData(e),
        onSuccess: () => {
            queryClient.invalidateQueries([search, "orders"])
        }
    })


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



    const queryOrders = async () => {
        const response = await URI.get(`/pedidos?dates=${await pickingDate(search)}`)

        return response.data
    }

    const ordersQuery = useQuery({
        queryFn: () => queryOrders(),
        queryKey: [search, "orders"],
        retry: false

    })

    useEffect(() => {

        if (ordersQuery.isSuccess) {
            const { data } = ordersQuery
            setQueryOrder(data)
        }

    }, [search, ordersQuery])


    async function handleInput(params) {
        queryClient.invalidateQueries([search, "orders"])

        setSearch(params)

    }



    const updateOrder = async (body) => {
        await toast.promise(
            URI.put("/linkpedido", body),
            {
                pending: 'Editando o pedido',
                success: 'Editado com sucesso',
                error: "Erro ao editar, confira os dados"
            })

    }

    const updateLink = useMutation({
        mutationFn: (e) => updateOrder(e),
        onSuccess: () => {
            queryClient.invalidateQueries([search, "orders"])
        }
    })


    return (
        <OrdersContext.Provider value={{
            updateOrders,

            orders, setOrders,

            ordersQuery,

            recibo,

            updateLink,

            search, setSearch,

            setInitialDate,
            setEndDate,
            queryClient,
            handleInput,
            queryOrder, setQueryOrder
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