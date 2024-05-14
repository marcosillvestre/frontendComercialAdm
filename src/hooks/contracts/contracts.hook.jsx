
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const ContractsHook = createContext({})
export const Contracts = ({ children }) => {

    const { headers } = useUser()
    const [contractData, setContractData] = useState([])
    const [multiSelectOptions, setMultiSelectOptions] = useState([])

    const queryClient = useQueryClient()

    const sendData = async () => {

        console.log(contractData)

        const response = await toast.promise(
            URI.post("http://localhost:7070/novos-contratos", contractData, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Novo contrato criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createContracts = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries([""]) ///// alterar esse cara pra mexer no main data
        }
    })







    return (
        <ContractsHook.Provider value={{
            contractData,
            createContracts,
            setContractData,
            multiSelectOptions, setMultiSelectOptions,

        }}>

            {children}

        </ContractsHook.Provider>
    )
}

export const useContractsHook = () => {
    const context = useContext(ContractsHook)

    if (!context) {
        throw new Error("user most be used with ContractsHook")
    }

    return context
}

Contracts.propTypes = {
    children: Proptypes.node
}