
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

    const [contract, setContract] = useState()


    const { userData, setFilteredContracts } = useUser()
    const queryCache = useQueryClient();

    const signData = async () => {
        const response = await URI.get(`http://localhost:7070/contrato/${sign}?take=${take}&skip=${skip}`)

        return response.data
    }


    const contractsForSign = useQuery({
        queryFn: () => signData(),
        queryKey: [sign, skip, take],
        enabled: userData.role !== undefined,
        retry: false
    })


    const signAContract = async () => {
        if (!contract) return ""
        const response = await URI.get(`http://localhost:7070/matricula/${contract}`)
        return response.data
    }

    const queryContract = useQuery({
        queryFn: () => signAContract(),
        queryKey: [contract],
        enabled: contract !== undefined,
        staleTime: 0
    })

    const { isSuccess, data } = queryContract


    useEffect(() => {
        queryContract.refetch()

        if (isSuccess) {
            setFilteredContracts(data.contract)
        }
    }, [contract, isSuccess])


    useEffect(() => {
        contractsForSign.refetch()

        if (contractsForSign.data) {
            const { data: { contracts } } = contractsForSign

            const filteredBySellers = contracts.filter(res => res?.seller.toLowerCase().includes(userData.name.toLowerCase()))

            setContractOptions(userData.role === "comercial" ? filteredBySellers : contracts)
            setAllContracts(userData.role === "comercial" ? filteredBySellers : contracts)
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

            contract, setContract,
            queryContract

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