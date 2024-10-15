
import { useQuery } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext.jsx"

const SignContracts = createContext({})

export const SigningContracts = ({ children }) => {

    const [sign, setSign] = useState("Funil-de-Vendas-PTB")
    const [contractOptions, setContractOptions] = useState([])
    const [allContracts, setAllContracts] = useState()

    const { userData } = useUser()
    // const queryClient = useQueryClient()

    const signData = async () => {
        const response = await URI.get(`/contrato/${sign}`)

        const responseData = response.data

        if (userData.role === 'comercial') {
            const filteredBySellers = responseData.filter(res => res.vendedor.toLowerCase()
                .includes(userData.name.toLowerCase()))

            setContractOptions(filteredBySellers)
            setAllContracts(filteredBySellers)

        } else {
            setContractOptions(responseData)
            setAllContracts(responseData)

        }

        return response.data
    }



    const contractsForSign = useQuery({
        queryFn: () => signData(),
        queryKey: [sign],
    })



    return (
        <SignContracts.Provider value={{
            contractsForSign,
            contractOptions,
            setContractOptions,
            setSign,
            sign,
            allContracts

        }}>

            {children}

        </SignContracts.Provider>
    )
}

export const useSignContracts = () => {
    const context = useContext(SignContracts)

    if (!context) {
        throw new Error("user most be used with SignContracts")
    }

    return context
}

SigningContracts.propTypes = {
    children: Proptypes.node
}