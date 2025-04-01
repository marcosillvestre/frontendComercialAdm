
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import businessRules from '../../app/utils/Rules/options.jsx'
import URI from "../../app/utils/utils"

const RequestsContext = createContext({})

export const RequestsProvider = ({ children }) => {
    const { predeterminedPeriods } = businessRules

    const queryClient = useQueryClient()

    const [Requests, setRequests] = useState()
    const [editRequest, setEditRequest] = useState(null)
    const [queryRequest, setQueryRequest] = useState([])
    const [typeFilter, setTypeFilter] = useState([])

    const [query, setQuery] = useState()

    const [initialDate, setInitialDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [search, setSearch] = useState(predeterminedPeriods[0].name)

    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)


    const [orderFor, setOrderFor] = useState("desc")
    const [orderBy, setOrderBy] = useState("created_at")
    const [dateType, setDateType] = useState("created_at")

    const [body, setBody] = useState()


    const recibo = useRef()


    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }
    const pickingDate = (range) => {

        const now = new Date();

        const LastMonth = () => `${new Date(now.getFullYear(), now.getMonth() - 1, 1)}~${new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)}`;
        const TwoMonths = () => `${new Date(now.getFullYear(), now.getMonth() - 2, 1)}~${new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999)}`;
        const ThisMonth = () => `${new Date(now.getFullYear(), now.getMonth(), 1)}~${new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)}`;

        const Custom = () => `${initialDate}~${new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))}`;

        const SevenDays = () => {
            const date = new Date()
            date.setDate(date.getDate() - 7)
            return `${date.toDateString()}~${now}`
        }

        const All = () => {
            const date = new Date()
            date.setDate(date.getDate() - 10000)
            return `${date.toDateString()}~${now.setUTCHours(23, 59, 59, 999)}`
        }

        const ThisYear = () => {
            const date = new Date();
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            return `${firstDayOfYear.toDateString()}~${now.setUTCHours(23, 59, 59, 999)}`
        }



        const settledPeriod = {
            "Mês passado": LastMonth(),
            "Mês retrasado": TwoMonths(),
            "Este mês": ThisMonth(),
            "Período personalizado": Custom(),
            "Últimos 7 dias": SevenDays(),
            "Este ano": ThisYear(),
            "Todo período": All(),
        }

        return settledPeriod[range]
    }


    const queryRequests = async () => {
        const dates = await pickingDate(search)
        //  :
        //     `${initialDate}~${endDate}`

        const url = query ?
            `/requisicao-query` :
            `/requisicao`

        const response = await URI.post(url, {
            dates,
            take,
            skip,
            orderBy,
            orderFor,
            dateType,
            typeFilter,
            query,
        })

        return response.data
    }

    const RequestsQuery = useQuery({
        queryFn: () => queryRequests(),
        queryKey: [
            search, "Requests", skip, take, query,
            JSON.stringify(typeFilter), orderBy, orderFor
        ],
        // staleTime: 1000 * 60 * 5, // 5 minutos sem refazer a requisição
        // cacheTime: 1000 * 60 * 10
    })


    const updateCacheData = (id) => {
        queryClient.setQueryData(
            [
                "Requests", skip, take, query,
                JSON.stringify(typeFilter), orderBy, orderFor
            ],
            oldData => {
                return {
                    Requests: oldData.requests.filter(res => res.id !== id),
                    total: oldData.total - 1
                }
            }
        )

        if (id) {

            const { total, requests } = queryRequest
            const wout = requests.filter(q => q.id !== id)

            setQueryRequest({ requests: wout, total: total - 1 })
        }

        RequestsQuery.refetch()
    }


    useLayoutEffect(() => {
        const gatherData = async () => {


            const { data } = RequestsQuery

            const { request, total } = data

            setQueryRequest({ request, total })
        }

        if (RequestsQuery.isSuccess) gatherData()

    }, [
        take, skip, RequestsQuery.data, query,
        typeFilter.length, orderFor, orderBy,
        search
    ])




    const newRequest = async (body) => {

        const newSup = new Promise((resolve, reject) => {

            URI.post("/nova-requisicao", body)
                .then(response => resolve(response))
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err.response.data.message)
                })

        })

        toast.promise(
            newSup,
            {
                pending: "Enviando dados...",
                success: "requisicao cadastrado com sucesso!",
                error: `Erro ao cadastrar`,
            }
        )
    }

    const createRequest = useMutation({
        mutationFn: (e) => newRequest(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                [
                    "Requests", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor
                ],
                (oldData) => {
                    return {
                        Requests: [
                            ...oldData.requests,
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            }],
                        total: oldData.total + 1
                    }
                }
            )

        }
    })




    const RequestUpdate = async (body) => {

        const newSup = new Promise((resolve, reject) => {

            URI.put(`/requisicao/${body.id}`, body)
                .then(response => resolve(response))
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err.response.data.message)
                })

        })

        toast.promise(
            newSup,
            {
                pending: "Enviando dados...",
                success: "requisicao editado com sucesso!",
                error: `Erro ao cadastrar`,
            }
        )
    }

    const updateRequest = useMutation({
        mutationFn: (e) => RequestUpdate(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                [
                    "Requests", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor
                ],
                (oldData) => {

                    return {
                        Requests: [
                            oldData.Requests.filter(r => r.id !== variables.id),
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            }],
                        total: oldData.total
                    }
                }
            )

        }
    })


    async function handleInput(params) {
        if (search === params) return RequestsQuery.refetch()
        if (params !== "Período personalizado") {
            setInitialDate(null)
            setEndDate(null)
        }

        setSearch(params)

    }

    return (
        <RequestsContext.Provider value={{
            Requests, setRequests,
            handleInput,
            RequestsQuery,
            updateRequest,
            recibo,
            createRequest,

            setInitialDate,
            endDate, setEndDate,

            query,

            queryClient,
            queryRequest, setQueryRequest,

            setTake, setSkip, take,
            setOrderFor, setOrderBy, setDateType, setQuery,


            typeFilter, setTypeFilter,
            removeFilter,

            orderBy,
            orderFor,

            body, setBody,

            updateCacheData,

            editRequest, setEditRequest,
            search, setSearch
        }}>

            {children}

        </RequestsContext.Provider>
    )

}

export const useRequests = () => {
    const context = useContext(RequestsContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

RequestsProvider.propTypes = {
    children: Proptypes.node
}