
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const ServiceContext = createContext({})

export const ServicesProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { userData } = useUser()
    const [Service, setService] = useState({
        active: true
    })
    const [editService, setEditService] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [orderFor, setOrderFor] = useState("asc")
    const [query, setQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState([])

    const [queryService, setQueryService] = useState({ services: [], total: 0 })

    const resetDataService = () => {
        setEditService(null);
        setService(null);
    }

    const queriesService = async () => {

        const url = query ?
            `/servico-query` : `/servicos`

        const response = await URI.post(url, {
            take,
            skip,
            orderBy,
            query,
            orderFor,
            typeFilter
        })
        return response.data
    }

    const serviceQuery = useQuery({
        queryFn: () => queriesService(),
        queryKey: ["service", take, skip, orderBy, query, orderFor, JSON.stringify(typeFilter)],
    })


    useLayoutEffect(() => {

        const gatherData = async () => {

            const { data } = serviceQuery
            const { services, total } = data


            setQueryService({ services, total })
        }

        if (serviceQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, query, serviceQuery.isSuccess, orderFor, JSON.stringify(typeFilter)])




    const sendData = async (body) => {
        const response = await toast.promise(
            URI.post(`/servico`, body),
            {
                pending: 'Conferindo os dados',
                success: 'Serviço criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createService = useMutation({
        mutationFn: (e) => sendData(e),
        onSuccess: (data,) => {

            queryClient.setQueryData(
                ["service", take, skip, orderBy, query, orderFor, JSON.stringify(typeFilter)],
                (oldData) => {

                    return setQueryService({
                        services: [
                            data,
                            ...oldData.services,
                        ],
                        total: oldData.total + 1
                    })
                }
            )
        },
        onError: (error) => {

            const { response } = error

            console.log(response)
            "message" in response.data && alert(response.data.message)
        }
    })

    ///////////////////////// create
    const editData = async (body) => {

        const response = await toast.promise(
            URI.put(`/servicos/${body.id}`, body),
            {
                pending: 'Conferindo os dados',
                success: 'serviço editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateService = useMutation({
        mutationFn: (e) => editData(e),
        onSuccess: (data, variables) => {

            queryClient.setQueryData(
                ["service", take, skip, orderBy, query, orderFor, JSON.stringify(typeFilter)],
                (oldData) => {
                    const { total, services } = oldData;
                    const filtered = services.filter(res => res.id !== variables.id)

                    return setQueryService({
                        services: [
                            data,
                            ...filtered,
                        ],
                        total: total + 1
                    })
                }
            )
        },
        onError: (error) => {

            const { response } = error

            "message" in response.data && alert(response.data.message)
        }
    })
    ///////////////////////// edit






    const queryServicesTotals = async () => {

        const response = await URI.
            get(`/servicos-totais`)

        return response.data
    }

    const serviceTotalsQuery = useQuery({
        queryFn: () => queryServicesTotals(),
        queryKey: ["services"],
    })

    ///////////////////////// get



    const deleteServiceData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/servicos/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Produto deletado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteService = useMutation({
        mutationFn: (e) => deleteServiceData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["service", take, skip, orderBy, query, orderFor, JSON.stringify(typeFilter)],
                (oldData) => {

                    const { services, total } = oldData;

                    return setQueryService({
                        services: services.filter(res => res.id !== variables),
                        total: total - 1
                    })

                }
            )
        },
        onError: (error) => {

            const { response } = error

            console.log(response)
            "message" in response.data && alert(response.data.message)
        }
    })


    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }

    return (
        <ServiceContext.Provider value={{
            createService,

            Service, setService,

            serviceQuery,
            editService, setEditService,
            mutateService,

            take, setTake,
            skip, setSkip,

            orderBy, setOrderBy,
            orderFor, setOrderFor,

            setQuery,

            queryService,

            serviceTotalsQuery,

            deleteService,

            resetDataService,

            removeFilter,
            typeFilter,
            setTypeFilter,
        }}>

            {children}

        </ServiceContext.Provider>
    )

}

export const useService = () => {
    const context = useContext(ServiceContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

ServicesProvider.propTypes = {
    children: Proptypes.node
}