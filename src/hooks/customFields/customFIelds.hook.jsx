
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const CustomFieldsHook = createContext({})
export const CustomFields = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers, userData } = useUser()

    const [queryCustomField, setQueryCustomField] = useState({ customFields: [], total: 0 })
    const [customFieldsTotals, setCustomFieldsTotals] = useState({ customFields: [], total: 0 })
    const [orderBy, setOrderBy] = useState('order')
    const [orderFor, setOrderFor] = useState('asc')
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0);

    const [customFields, setCustomFields] = useState()
    const [editCustomField, setEditCustomField] = useState(null)

    const queryCustomFields = async () => {
        const response = await
            URI.post("/campos-personalizados", {
                orderBy,
                orderFor,
                skip,
                take
            })
        return response.data
    }

    const CustomFieldsQuery = useQuery({
        queryFn: () => queryCustomFields(),
        queryKey: ["custom", take, skip, orderBy, orderFor],
        enabled: !headers.Authorization.includes("undefined")
    })

    const queryCustomFieldsTotals = async () => {
        const response = await
            URI.get("/campos-personalizados-totais")
        return response.data
    }

    const totals = useQuery({
        queryFn: () => queryCustomFieldsTotals(),
        queryKey: ["custom-total"],
        enabled: !headers.Authorization.includes("undefined")
    })




    useLayoutEffect(() => {

        const gatherData = async () => {

            const { data } = totals
            const { customFields, total } = data


            setCustomFieldsTotals({ customFields, total })
        }

        if (totals.isSuccess) gatherData()

    }, [totals.isSuccess])


    useLayoutEffect(() => {

        const gatherData = async () => {

            const { data } = CustomFieldsQuery
            const { customFields, total } = data


            setQueryCustomField({ customFields, total })
        }

        if (CustomFieldsQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, customFieldsTotals.isSuccess, orderFor])




    const sendData = async (body) => {

        const response = await toast.promise(
            URI.post("/campo-personalizado", body),
            {
                pending: 'Conferindo os dados',
                success: 'Campo criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createCustomField = useMutation({
        mutationFn: (e) => sendData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["custom", take, skip, orderBy, orderFor],
                (oldData) => {

                    return setQueryCustomField({
                        customFields: [
                            {
                                ...variables,
                                order: oldData.total + 1,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.customFields,
                        ],
                        total: oldData.total + 1
                    })
                }
            )
        }
    })



    const editData = async (body) => {
        const response = await toast.promise(
            URI.put(`/campos-personalizados/${editCustomField.id}`, body),
            {
                pending: 'Conferindo os dados',
                success: 'Campo editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateCustomField = useMutation({
        mutationFn: (e) => editData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["custom", take, skip, orderBy, orderFor],
                (oldData) => {

                    return setQueryCustomField({
                        customFields: [
                            variables,
                            ...oldData.customFields.filter(res => res.id !== variables.id)

                        ],
                        total: oldData.total
                    })

                }
            )
        }
    })




    const deleteCustomFieldData = async (id) => {
        const responsible = userData.name

        const response = await toast.promise(
            URI.delete(`/campo-personalizado/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'serviço deletado com sucesso',
                error: 'Algo deu errado'
            }
        )

        return response.data
    }

    const deleteCustomField = useMutation({
        mutationFn: (e) => deleteCustomFieldData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["custom", take, skip, orderBy, orderFor],
                (oldData) => {

                    return setQueryCustomField({
                        customField:
                            oldData.customField.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })
                }
            )
        }
    })




    return (
        <CustomFieldsHook.Provider value={{
            createCustomField,
            customFields, setCustomFields,
            CustomFieldsQuery,

            queryCustomField, setQueryCustomField,

            orderFor,
            orderBy,
            setOrderBy,
            setOrderFor,
            setSkip,
            take,
            setTake,

            deleteCustomField,

            editCustomField, setEditCustomField,

            mutateCustomField,

            customFieldsTotals
        }}>

            {children}

        </CustomFieldsHook.Provider>
    )

}

export const useCustomFields = () => {
    const context = useContext(CustomFieldsHook)

    if (!context) {
        throw new Error("user most be used with CustomFieldsHook")
    }

    return context
}

CustomFields.propTypes = {
    children: Proptypes.node
}