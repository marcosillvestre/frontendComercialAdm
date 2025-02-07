
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from "react"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext.jsx"

const SignContracts = createContext({})

export const SigningContracts = ({ children }) => {

    const [sign, setSign] = useState("Funil-de-Vendas-PTB")
    const [contractOptions, setContractOptions] = useState([])
    const [allContracts, setAllContracts] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(1)

    const { userData } = useUser()
    const queryCache = useQueryClient();

    const signData = async () => {
        const response = await URI.get(`/contrato/${sign}?take=${take}&skip=${skip}`)

        return response.data
    }




    const contractsForSign = useQuery({
        queryFn: () => signData(),
        queryKey: [sign, skip, take],
        enabled: userData.role !== undefined,
        retry: false


    })

    useEffect(() => {
        contractsForSign.refetch()

        if (contractsForSign.isSuccess) {
            const { data } = contractsForSign

            const filteredBySellers = data.contracts.filter(res => res.vendedor.toLowerCase()
                .includes(userData.name.toLowerCase()))

            setContractOptions(userData.role === "comercial" ? filteredBySellers : data.contracts)
            setAllContracts(userData.role === "comercial" ? filteredBySellers : data.contracts)
        }

        queryCache.invalidateQueries([sign, skip, take])

    }, [take, skip, contractsForSign.isSuccess])


    return (
        <SignContracts.Provider value={{
            contractsForSign,
            contractOptions,
            setContractOptions,
            setSign,
            sign,
            allContracts,

            take, setTake,
            skip, setSkip,



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