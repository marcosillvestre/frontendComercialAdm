
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const CategorieProductsContext = createContext({})

export const CategorieProductsProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { userData } = useUser()

    const [CategorieProducts, setCategorieProducts] = useState({
        status: true
    })
    const [editCategorieProducts, setEditCategorieProducts] = useState(null)
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [orderFor, setOrderFor] = useState("asc")

    const [query, setQuery] = useState("")

    const [queryCategorieProducts, setQueryCategorieProducts] = useState({ categorieProducts: [], total: 0 })


    const resetDataCategorieProduct = () => {
        setEditCategorieProducts(null);
        setCategorieProducts(null);
    }

    const queriesCategorieProducts = async () => {

        const response = await URI.post(`/categorias`, {
            take,
            skip,
            orderBy,
            orderFor,
            query,
        })

        return response.data
    }

    const categoryQuery = useQuery({
        queryFn: () => queriesCategorieProducts(),
        queryKey: ["categorieProducts", take, skip, orderBy, query, orderFor],
    })


    useLayoutEffect(() => {
        const gatherData = async () => {

            const { data } = categoryQuery
            const { categorie, total } = data


            setQueryCategorieProducts({ categorie, total })
        }

        if (categoryQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, query, orderFor, categoryQuery.isSuccess])



    const sendData = async (body) => {
        const response = await toast.promise(
            URI.post(`/categoria`, body),
            {
                pending: 'Conferindo os dados',
                success: 'Categoria criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createCategorieProducts = useMutation({
        mutationFn: (e) => sendData(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                ["categorieProducts", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryCategorieProducts({
                        categorie: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.categorie,
                        ],
                        total: oldData.total + 1
                    })
                }
            )
        },
        onError: (error) => {

            const { response } = error

            "message" in response.data && alert(response.data.message)
        }
    })
    ///////////////////////// create



    const editData = async (body) => {
        const response = await toast.promise(
            URI.put(`/categoria/${body.id}`, body),
            {
                pending: 'Conferindo os dados',
                success: 'Categoria de produto editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateCategorieProducts = useMutation({
        mutationFn: (e) => editData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["categorieProducts", take, skip, orderBy, query, orderFor],
                (oldData) => {
                    const { total, categorie } = oldData;
                    const filtered = categorie.filter(res => res.id !== variables.id)

                    return setQueryCategorieProducts({
                        categorie: [
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
        }
    })
    ///////////////////////// edit


    //////////////////// get



    const queryCategorieProductsTotals = async () => {

        const response = await URI.
            get(`/categorias-totais`)

        return response.data
    }

    const CategorieProductsTotalsQuery = useQuery({
        queryFn: () => queryCategorieProductsTotals(),
        queryKey: ["categorieProducts"],
        initialData: [{ categorie: [], total: 0 }],

    })


    const deleteCategorieProductsData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/categoria/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Produto deletado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteCategorieProducts = useMutation({
        mutationFn: (e) => deleteCategorieProductsData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["categorieProducts", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    const { categorie, total } = oldData;

                    return setQueryCategorieProducts({
                        categorie: categorie.filter(res => res.id !== variables),
                        total: total - 1
                    })

                }
            )
        }
    })



    return (
        <CategorieProductsContext.Provider value={{
            createCategorieProducts,
            CategorieProductsTotalsQuery,
            CategorieProducts, setCategorieProducts,
            categoryQuery,
            editCategorieProducts, setEditCategorieProducts,
            mutateCategorieProducts,

            take, setTake,
            skip, setSkip,

            setOrderBy, orderBy,
            orderFor, setOrderFor,

            setQuery,
            queryCategorieProducts,

            deleteCategorieProducts,
            resetDataCategorieProduct

        }}>

            {children}

        </CategorieProductsContext.Provider>
    )

}

export const useCategorieProducts = () => {
    const context = useContext(CategorieProductsContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

CategorieProductsProvider.propTypes = {
    children: Proptypes.node
}