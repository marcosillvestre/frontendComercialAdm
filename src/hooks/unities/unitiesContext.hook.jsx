
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const UnitiesContext = createContext({})

export const UnitiesProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers } = useUser()
    const [unity, setUnity] = useState()

    const sendData = async () => {
        const response = await toast.promise(
            URI.post("/unidades", unity, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Usuário criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createUnities = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["unities"])
        }
    })


    const queryUnities = async () => {
        const response = await URI.get("/unidades", { headers })
        return response.data
    }

    const unityQuery = useQuery({
        queryFn: () => queryUnities(),
        queryKey: ["unities"],
        enabled: !headers.Authorization.includes("undefined")
    })


    return (
        <UnitiesContext.Provider value={{
            createUnities,

            unity, setUnity,
            unityQuery
        }}>

            {children}

        </UnitiesContext.Provider>
    )

}

export const useUnities = () => {
    const context = useContext(UnitiesContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

UnitiesProvider.propTypes = {
    children: Proptypes.node
}