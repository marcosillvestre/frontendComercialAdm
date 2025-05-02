
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
        status: true
    })
    const [editService, setEditService] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [orderFor, setOrderFor] = useState("asc")
    const [query, setQuery] = useState("")

    const [queryService, setQueryService] = useState({ services: [], total: 0 })



    const queriesService = async () => {
        const response = await URI.post(`/servicos`, {
            take,
            skip,
            orderBy,
            query,
            orderFor
        })
        return response.data
    }

    const serviceQuery = useQuery({
        queryFn: () => queriesService(),
        queryKey: ["service", take, skip, orderBy, query, orderFor],
    })

    useLayoutEffect(() => {

        const gatherData = async () => {

            const { data } = serviceQuery
            const { services, total } = data


            setQueryService({ services, total })
        }

        if (serviceQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, query, serviceQuery.isSuccess, orderFor])




    const sendData = async () => {
        const response = await toast.promise(
            URI.post(`/servico`, Service),
            {
                pending: 'Conferindo os dados',
                success: 'serviço criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createService = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["service"])
        }
    })

    ///////////////////////// create
    const editData = async () => {
        const response = await toast.promise(
            URI.put(`/servicos/${editService.id}`, editService),
            {
                pending: 'Conferindo os dados',
                success: 'serviço criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateService = useMutation({
        mutationFn: () => editData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["service"])
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
                ["service", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryService({
                        services: oldData.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })

                }
            )
        }
    })




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

            deleteService
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