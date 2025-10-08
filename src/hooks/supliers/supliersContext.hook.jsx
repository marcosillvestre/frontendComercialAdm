
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const SupliersContext = createContext({})

export const SupliersProvider = ({ children }) => {

    const queryClient = useQueryClient()

    const { userData } = useUser()
    const [Supliers, setSupliers] = useState()
    const [editSuplier, setEditSuplier] = useState(null)
    const [querySuplier, setQuerySuplier] = useState([])
    const [typeFilter, setTypeFilter] = useState([])

    const [query, setQuery] = useState()

    const [endDate, setEndDate] = useState(null)

    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)


    const [orderFor, setOrderFor] = useState("desc")
    const [orderBy, setOrderBy] = useState("created_at")

    const [body, setBody] = useState()


    const recibo = useRef()


    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }


    const querySupliers = async () => {

        const url = query ? `/fornecedor-query` : `/fornecedor`

        const response = await URI.post(url, {
            take,
            skip,
            orderBy,
            orderFor,
            typeFilter,
            query,
        })

        return response.data
    }

    const SupliersQuery = useQuery({
        queryFn: () => querySupliers(),
        queryKey: [
            "Supliers", skip, take, query,
            JSON.stringify(typeFilter), orderBy, orderFor
        ],
        // staleTime: 1000 * 60 * 5, // 5 minutos sem refazer a requisição
        // cacheTime: 1000 * 60 * 10
    })





    useLayoutEffect(() => {
        const gatherData = async () => {


            const { data } = SupliersQuery
            const { supliers, total } = data

            setQuerySuplier({ supliers, total })
        }

        if (SupliersQuery.isSuccess) gatherData()

    }, [
        take, skip, SupliersQuery.data, query,
        typeFilter.length, orderFor, orderBy,
    ])




    const newSuplier = async (body) => {

        const newSup = new Promise((resolve, reject) => {

            URI.post("/novo-fornecedor", body)
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
                success: "Fornecedor cadastrado com sucesso!",
                error: `Erro ao cadastrar`,
            }
        )
    }

    const createSuplier = useMutation({
        mutationFn: (e) => newSuplier(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                [
                    "Supliers", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor
                ],
                (oldData) => {
                    return {
                        supliers: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.supliers,
                        ],
                        total: oldData.total + 1
                    }
                }
            )

        }
    })




    const suplierUpdate = async (body) => {
        const newSup = new Promise((resolve, reject) => {

            URI.put(`/fornecedor/${editSuplier.id}`, body)
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
                success: "Fornecedor editado com sucesso!",
                error: `Erro ao cadastrar`,
            }
        )
    }

    const updateSuplier = useMutation({
        mutationFn: (e) => suplierUpdate(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                [
                    "Supliers", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor
                ],
                (oldData) => {

                    return {
                        supliers: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.supliers.filter(r => r.id !== editSuplier.id),
                        ],
                        total: oldData.total
                    }
                }
            )

        }
    })




    const getAllSupliers = async () => {

        const response = await URI.get(`/fornecedor-totais`)

        return response.data
    }

    const allSupliers = useQuery({
        queryFn: () => getAllSupliers(),
        queryKey: [
            "AllSupliers"
        ],
        staleTime: 1000 * 60 * 5, // 5 minutos sem refazer a requisição
        cacheTime: 1000 * 60 * 10
    })



    const deleteSuplierData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/fornecedor/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Fornecedor deletado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteSuplier = useMutation({
        mutationFn: (e) => deleteSuplierData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                [
                    "Supliers", skip, take, query,
                    JSON.stringify(typeFilter), orderBy, orderFor
                ],
                (oldData) => {

                    return setQuerySuplier({
                        supliers: oldData.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })

                }
            )
        }
    })





    return (
        <SupliersContext.Provider value={{
            allSupliers,
            Supliers, setSupliers,
            SupliersQuery,
            updateSuplier,
            recibo,
            createSuplier,

            endDate, setEndDate,

            queryClient,
            querySuplier, setQuerySuplier,

            setTake, setSkip, take,
            setOrderFor, setOrderBy,
            setQuery, query,


            typeFilter, setTypeFilter,
            removeFilter,

            orderBy,
            orderFor,

            body, setBody,


            editSuplier, setEditSuplier,

            deleteSuplier
        }}>

            {children}

        </SupliersContext.Provider>
    )

}

export const useSupliers = () => {
    const context = useContext(SupliersContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

SupliersProvider.propTypes = {
    children: Proptypes.node
}