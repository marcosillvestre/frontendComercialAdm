
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const ProductsContext = createContext({})

export const ProductsProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { userData } = useUser()

    const [Product, setProduct] = useState({
        status: true
    })
    const [editProduct, setEditProduct] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [orderFor, setOrderFor] = useState("asc")

    const [query, setQuery] = useState("")

    const [queryProducts, setQueryProducts] = useState({ products: [], total: 0 })


    const queriesProduct = async () => {

        const response = await URI.post(`/produtos`, {
            take,
            skip,
            orderBy,
            orderFor,
            query,
        })

        return response.data
    }

    const productQuery = useQuery({
        queryFn: () => queriesProduct(),
        queryKey: ["product", take, skip, orderBy, query, orderFor],
    })


    useLayoutEffect(() => {
        const gatherData = async () => {

            const { data } = productQuery
            const { products, total } = data


            setQueryProducts({ products, total })
        }

        if (productQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, query, orderFor, productQuery.isSuccess])



    const sendData = async () => {
        const response = await toast.promise(
            URI.post(`/produto`, Product),
            {
                pending: 'Conferindo os dados',
                success: 'produto criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createProduct = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["product"])
        }
    })
    ///////////////////////// create



    const editData = async () => {
        const response = await toast.promise(
            URI.put(`/produtos/${editProduct.id}`, editProduct),
            {
                pending: 'Conferindo os dados',
                success: 'produto editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateProduct = useMutation({
        mutationFn: () => editData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["product"])
        }
    })
    ///////////////////////// edit


    //////////////////// get



    const queryProductsTotals = async () => {

        const response = await URI.
            get(`/produtos-totais`)

        return response.data
    }

    const productsTotalsQuery = useQuery({
        queryFn: () => queryProductsTotals(),
        queryKey: ["products"],

    })


    const deleteProductData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/produtos/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Produto deletado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteProduct = useMutation({
        mutationFn: (e) => deleteProductData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["product", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryProducts({
                        products: oldData.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })

                }
            )
        }
    })




    return (
        <ProductsContext.Provider value={{
            createProduct,
            productsTotalsQuery,
            Product, setProduct,
            productQuery,
            editProduct, setEditProduct,
            mutateProduct,

            take, setTake,
            skip, setSkip,

            setOrderBy, orderBy,
            orderFor, setOrderFor,

            setQuery,
            queryProducts,

            deleteProduct

        }}>

            {children}

        </ProductsContext.Provider>
    )

}

export const useProduct = () => {
    const context = useContext(ProductsContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

ProductsProvider.propTypes = {
    children: Proptypes.node
}