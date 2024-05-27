
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const CustomFieldsHook = createContext({})
export const CustomFields = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers, setTypeSidebar, setOpenSidebar } = useUser()

    const [customFields, setCustomFields] = useState()
    const [options, setOptions] = useState([])


    const sendData = async () => {
        const response = await toast.promise(
            URI.post("http://localhost:7070/campos-personalizados", { "options": options, "for": "deal", ...customFields }),
            {
                pending: 'Conferindo os dados',
                success: 'Campo criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createCustomFIeld = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["custom"])
            setTypeSidebar(0)
            setOpenSidebar(false);
        }
    })



    const queryCustomFields = async () => {
        const response = await URI.get("http://localhost:7070/campos-personalizados")
        return response.data
    }

    const customFieldsQuery = useQuery({
        queryFn: () => queryCustomFields(),
        queryKey: ["custom"],
        enabled: !headers.Authorization.includes("undefined")
    })

    const cfSrted = customFieldsQuery.data !== undefined ? customFieldsQuery.data.sort((a, b) => a.order - b.order) : false

    return (
        <CustomFieldsHook.Provider value={{
            createCustomFIeld,
            options, setOptions,
            customFields, setCustomFields,
            cfSrted, customFieldsQuery
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