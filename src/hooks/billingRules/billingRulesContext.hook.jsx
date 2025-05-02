
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const BillingContext = createContext({})

export const BillingsProvider = ({ children }) => {

    const queryClient = useQueryClient()

    const [Billing, setBilling] = useState({
        status: true
    })
    const [editBilling, setEditBilling] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("created_at")
    const [orderFor, setOrderFor] = useState("asc")
    const [query, setQuery] = useState("")

    const [queryBilling, setQueryBilling] = useState({ Billings: [], total: 0 })

    const { userData } = useUser()

    const queriesBilling = async () => {
        const response = await URI.post(`/reguas`, {
            take,
            skip,
            orderBy,
            query,
            orderFor
        })
        return response.data
    }

    const BillingQuery = useQuery({
        queryFn: () => queriesBilling(),
        queryKey: ["Billing", take, skip, orderBy, query, orderFor],
    })

    useLayoutEffect(() => {

        const gatherData = async () => {

            const { data } = BillingQuery
            const { billing, total } = data


            setQueryBilling({ billing, total })
        }

        if (BillingQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, query, BillingQuery.isSuccess, orderFor])






    const sendData = async (body) => {
        const response = await toast.promise(
            URI.post(`/regua`, body),
            {
                pending: 'Conferindo os dados',
                success: 'serviço criado com sucesso',
                error: 'Algo deu errado aqui'
            }
        )
        return response.data
    }

    const createBilling = useMutation({
        mutationFn: (e) => sendData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["Billing", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryBilling({
                        billing: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.billing,
                        ],
                        total: oldData.total + 1
                    })
                }
            )
        }
    })

    ///////////////////////// create
    const editData = async () => {
        const response = await toast.promise(
            URI.put(`/reguas/${editBilling.id}`, editBilling),
            {
                pending: 'Conferindo os dados',
                success: 'serviço editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateBilling = useMutation({
        mutationFn: () => editData(),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["Billing", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryBilling({
                        billing: [
                            variables,
                            ...oldData.billing.filter(res => res.id !== variables.id),
                        ],
                        total: oldData.total
                    })
                }
            )
        }
    })




    const deleteBillingData = async (id) => {
        const responsible = userData.name

        const response = await toast.promise(
            URI.delete(`/reguas/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'serviço deletado com sucesso',
                error: 'Algo deu errado'
            }
        )

        return response.data
    }

    const deleteBilling = useMutation({
        mutationFn: (e) => deleteBillingData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["Billing", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryBilling({
                        billing:
                            oldData.billing.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })
                }
            )
        }
    })



    return (
        <BillingContext.Provider value={{
            createBilling,

            Billing, setBilling,

            BillingQuery,
            editBilling, setEditBilling,
            mutateBilling,

            take, setTake,
            skip, setSkip,

            orderBy, setOrderBy,
            orderFor, setOrderFor,

            setQuery,

            queryBilling,

            deleteBilling
        }}>

            {children}

        </BillingContext.Provider>
    )

}

export const useBilling = () => {
    const context = useContext(BillingContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

BillingsProvider.propTypes = {
    children: Proptypes.node
}