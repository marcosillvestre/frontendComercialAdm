
import { useQuery } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext.jsx"

const SignContracts = createContext({})

export const SigningContracts = ({ children }) => {

    const [contractOptions, setContractOptions] = useState({ contracts: [], total: 0 })
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(1)

    const [contract, setContract] = useState()

    const [query, setQuery] = useState('')

    const [orderFor, setOrderFor] = useState("desc")
    const [orderBy, setOrderBy] = useState("created_at")

    const { userData, setFilteredContracts } = useUser()

    const [sign, setSign] = useState()
    const [queryFunnels, setQueryFunnels] = useState({ funnels: [], total: 0 });


    const funnelsData = async () => {
        const response = await URI.get(`/funis`)

        return response.data
    }


    const funnelsQuery = useQuery({
        queryFn: () => funnelsData(),
        queryKey: ['funnel'],
        enabled: userData?.role !== undefined,
        retry: false
    })


    useLayoutEffect(() => {
        const gatherData = async () => {

            const { data } = funnelsQuery;
            const { funnels, total } = data

            setQueryFunnels({ funnels, total })
        }

        if (funnelsQuery.isSuccess) gatherData()

    }, [funnelsQuery.isSuccess])



    const signData = async () => {

        const { data } = funnelsQuery;
        const { funnels, } = data

        const id = sign ? sign : funnels[0].value;

        const url = query ?
            `/contrato-query/${id}?take=${take}&skip=${skip}&name=${query}&orderFor=${orderFor}&orderBy=${orderBy}` :
            `/contrato/${id}?take=${take}&skip=${skip}&orderFor=${orderFor}&orderBy=${orderBy}`

        const response = await URI.get(url);

        return response.data
    }

    const contractsForSign = useQuery({
        queryFn: () => signData(),
        queryKey: [query, sign, skip, take, orderFor, orderBy],
        enabled: funnelsQuery.isSuccess,
    })

    useLayoutEffect(() => {

        const gatherData = async () => {
            const { data } = contractsForSign;
            const { contracts, total } = data;


            const filteredBySellers = contracts.filter(res => res?.seller.toLowerCase()
                .includes(userData.name.toLowerCase()))

            setContractOptions(userData.role === "comercial" ?
                { contracts: filteredBySellers, total } :
                { contracts, total })
        }

        if (contractsForSign.isSuccess) gatherData()

    }, [query, take, skip, contractsForSign.isSuccess, orderFor, orderBy])






    const signAContract = async () => {
        if (!contract) return ""
        const response = await URI.get(`/matricula/${contract}`)
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




    return (
        <SignContracts.Provider value={{
            contractsForSign,
            contractOptions,
            setContractOptions,
            setSign,
            sign,
            take, setTake,
            skip, setSkip,

            contract, setContract,
            queryContract,
            queryFunnels,
            funnelsQuery,

            setQuery,
            query,

            orderFor, setOrderFor,
            orderBy, setOrderBy
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