
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const KitsContext = createContext({})

export const KitsProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { userData } = useUser()

    const [Kits, setKits] = useState({
        status: true
    })
    const [editKits, setEditKits] = useState(null)
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [orderFor, setOrderFor] = useState("asc")

    const [query, setQuery] = useState("")

    const [queryKits, setQueryKits] = useState({ kits: [], total: 0 })

    const resetDataKits = () => {
        setEditKits(null);
        setKits(null);
    }
    const queriesKits = async () => {

        const response = await URI.post(`/kits`, {
            take,
            skip,
            orderBy,
            orderFor,
            query,
        })

        return response.data
    }

    const kitsQuery = useQuery({
        queryFn: () => queriesKits(),
        queryKey: ["kits", take, skip, orderBy, query, orderFor],
    })



    useLayoutEffect(() => {
        const gatherData = async () => {

            const { data } = kitsQuery
            const { kits, total } = data


            setQueryKits({ kits, total })
        }

        if (kitsQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, query, orderFor, kitsQuery.isSuccess])



    const sendData = async (body) => {
        const response = await toast.promise(
            URI.post(`/kit`, body),
            {
                pending: 'Conferindo os dados',
                success: 'Kit criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createKits = useMutation({
        mutationFn: (e) => sendData(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                ["kits", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryKits({
                        kits: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.kits,
                        ],
                        total: oldData.total + 1
                    })
                }
            )
        },
        onError: (error) => {

            const { response } = error

            "message" in response.data && alert(response.data.message)
            console.log(response)
        }
    })
    ///////////////////////// create



    const editData = async (body) => {
        const response = await toast.promise(
            URI.put(`/kits/${body.id}`, body),
            {
                pending: 'Conferindo os dados',
                success: 'Kit editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateKits = useMutation({
        mutationFn: (e) => editData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["kits", take, skip, orderBy, query, orderFor],
                (oldData) => {
                    const { total, kits } = oldData;
                    const filtered = kits.filter(res => res.id !== variables.id)

                    return setQueryKits({
                        kits: [
                            { ...variables },
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
            console.log(response)
        }
    })
    ///////////////////////// edit


    //////////////////// get



    const queryKitsTotals = async () => {

        const response = await URI.
            get(`/kits-totais`)

        return response.data
    }

    const KitsTotalsQuery = useQuery({
        queryFn: () => queryKitsTotals(),
        queryKey: ["kits"],

    })


    const deleteKitsData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/kits/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Kit deletado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteKits = useMutation({
        mutationFn: (e) => deleteKitsData(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                ["kits", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    const { kits, total } = oldData;

                    return setQueryKits({
                        kits: kits.filter(res => res.id !== variables),
                        total: total - 1
                    })

                }
            )
        }
    })




    return (
        <KitsContext.Provider value={{
            createKits,
            KitsTotalsQuery,
            Kits, setKits,
            kitsQuery,
            editKits, setEditKits,
            mutateKits,

            take, setTake,
            skip, setSkip,

            setOrderBy, orderBy,
            orderFor, setOrderFor,

            setQuery,
            queryKits,

            deleteKits,

            resetDataKits

        }}>

            {children}

        </KitsContext.Provider>
    )

}

export const useKits = () => {
    const context = useContext(KitsContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

KitsProvider.propTypes = {
    children: Proptypes.node
}