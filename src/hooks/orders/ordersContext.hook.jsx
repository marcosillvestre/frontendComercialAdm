
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useRef, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const OrdersContext = createContext({})

export const OrdersProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers } = useUser()
    const [orders, setOrders] = useState()
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
            queryClient.invalidateQueries(["orders"])
        }
    })


    const queryOrders = async () => {
        const response = await URI.get("/pedidos")
        return response.data
    }

    const ordersQuery = useQuery({
        queryFn: () => queryOrders(),
        queryKey: ["orders"],
        enabled: !headers.Authorization.includes("undefined")
    })




    const updateOrder = async (body) => {

        await toast.promise(
            URI.put("/linkpedido", body),
            {
                pending: 'Enviando para o autentique',
                success: 'Enviado com sucesso',
                error: "Erro ao enviar, confira seus dados"
            })

    }

    const updateLink = useMutation({
        mutationFn: (e) => updateOrder(e),
        onSuccess: () => {
            queryClient.invalidateQueries(["orders"])
        }
    })


    return (
        <OrdersContext.Provider value={{
            updateOrders,

            orders, setOrders,
            ordersQuery,

            recibo,

            updateLink
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