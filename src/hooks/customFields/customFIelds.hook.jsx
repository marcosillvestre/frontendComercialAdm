
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const CustomFieldsHook = createContext({})
export const CustomFields = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers } = useUser()

    const [customFields, setCustomFields] = useState([])
    const [options, setOptions] = useState([])
    const [multiSelectOptions, setMultiSelectOptions] = useState([])

    const sendData = async () => {
        const response = await toast.promise(
            URI.post("http://localhost:7070/campos-personalizados", { "options": options, "for": "deal", ...customFields }, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Enviado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
        return response.data
    }

    const createCustomFIeld = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["custom"])
        }
    })

    return (
        <CustomFieldsHook.Provider value={{
            createCustomFIeld,
            options, setOptions,
            multiSelectOptions, setMultiSelectOptions,
            customFields, setCustomFields
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