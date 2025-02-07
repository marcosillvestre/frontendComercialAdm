
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const ServiceContext = createContext({})

export const ServicesProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers } = useUser()

    const [Service, setService] = useState()
    const [editService, setEditService] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [query, setQuery] = useState("")

    const sendData = async () => {
        const response = await toast.promise(
            URI.post(`/servicos`, Service),
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

    const queryService = async () => {
        const response = await URI.
            get(`/servicos?take=${take}&skip=${skip}&orderBy=${orderBy}&query=${query}`)
        return response.data
    }

    const serviceQuery = useQuery({
        queryFn: () => queryService(),
        queryKey: ["service"],
        enabled: !headers.Authorization.includes("undefined")
    })

    useEffect(() => {
        serviceQuery.refetch()

    }, [take, skip, orderBy, query])


    ///////////////////////// get




    return (
        <ServiceContext.Provider value={{
            createService,

            Service, setService,

            serviceQuery,
            editService, setEditService,
            mutateService,

            take, setTake,
            skip, setSkip,

            setOrderBy,
            setQuery
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