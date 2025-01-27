
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

    const signData = async () => {

        const { name, role } = await userData
        const response = await URI.get(`https://stagetests-684hi.ondigitalocean.app/contrato/${sign}`)
        const responseData = response.data


        if ("role" in userData) {
            const filteredBySellers = responseData.filter(res => res.vendedor.toLowerCase().includes(name.toLowerCase()))

            setContractOptions(role === "comercial" ? filteredBySellers : responseData)
            setAllContracts(role === "comercial" ? filteredBySellers : responseData)

        }

        return response.data
    }



    const contractsForSign = useQuery({
        queryFn: () => signData(),
        queryKey: [sign],
        enabled: userData.role !== undefined
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