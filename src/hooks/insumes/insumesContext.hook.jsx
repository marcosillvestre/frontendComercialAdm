
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const InsumeContext = createContext({})

export const InsumeProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers } = useUser()
    const [Insume, setInsume] = useState()
    const [editInsume, setEditInsume] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)

    const sendData = async () => {
        const response = await toast.promise(
            URI.post(`https://stagetests-684hi.ondigitalocean.app/insumo`, Insume),
            {
                pending: 'Conferindo os dados',
                success: 'insumo criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createInsume = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["Insume"])
        }
    })
    ///////////////////////// create
    const editData = async () => {
        const response = await toast.promise(
            URI.put(`https://stagetests-684hi.ondigitalocean.app/insumo/${editInsume.id}`, editInsume),
            {
                pending: 'Conferindo os dados',
                success: 'insumo criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateInsume = useMutation({
        mutationFn: () => editData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["Insume"])
        }
    })
    ///////////////////////// edit

    const productInsume = async () => {
        const response = await URI.get(`https://stagetests-684hi.ondigitalocean.app/insumo?take=${take}&skip=${skip}&category=Product`)
        return response.data
    }

    const productQuery = useQuery({
        queryFn: () => productInsume(),
        queryKey: ["product"],
        enabled: !headers.Authorization.includes("undefined")
    })


    useEffect(() => {
        productQuery.refetch()

    }, [take, skip])

    const serviceInsume = async () => {
        const response = await URI.get(`https://stagetests-684hi.ondigitalocean.app/insumo?take=${take}&skip=${skip}&category=Service`)
        return response.data
    }

    const serviceQuery = useQuery({
        queryFn: () => serviceInsume(),
        queryKey: ["service"],
        enabled: !headers.Authorization.includes("undefined")
    })


    useEffect(() => {
        serviceQuery.refetch()

    }, [take, skip])


    const queryInsume = async () => {
        const response = await URI.get(`http://localhost:7070/insumos`)
        return response.data
    }

    const InsumeQuery = useQuery({
        queryFn: () => queryInsume(),
        queryKey: ["serviceAll"],
        enabled: !headers.Authorization.includes("undefined")
    })


    useEffect(() => {
        InsumeQuery.refetch()

    }, [take, skip])

    ///////////////////////// get





    return (
        <InsumeContext.Provider value={{
            createInsume,

            Insume, setInsume,
            productQuery,
            serviceQuery,
            editInsume, setEditInsume,
            mutateInsume,

            take, setTake,
            skip, setSkip,

            InsumeQuery
        }}>

            {children}

        </InsumeContext.Provider>
    )

}

export const useInsume = () => {
    const context = useContext(InsumeContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

InsumeProvider.propTypes = {
    children: Proptypes.node
}