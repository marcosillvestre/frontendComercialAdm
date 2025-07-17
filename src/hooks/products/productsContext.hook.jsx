
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
    const [editProduct, setEditProduct] = useState(null)
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [orderFor, setOrderFor] = useState("asc")

    const [query, setQuery] = useState("")

    const [queryProducts, setQueryProducts] = useState({ products: [], total: 0 })
    const [view, setView] = useState('produtos');


    const resetDataProduct = () => {
        setEditProduct(null);
        setProduct(null);
    }

    const queriesProduct = async () => {

        const response = await URI.post(`http://localhost:7070/produtos`, {
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



    const sendData = async (body) => {
        const response = await toast.promise(
            URI.post(`http://localhost:7070/produto`, body),
            {
                pending: 'Conferindo os dados',
                success: 'produto criado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createProduct = useMutation({
        mutationFn: (e) => sendData(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                ["product", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryProducts({
                        products: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.products,
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
            URI.put(`http://localhost:7070/produtos/${body.id}`, body),
            {
                pending: 'Conferindo os dados',
                success: 'produto editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateProduct = useMutation({
        mutationFn: (e) => editData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["product", take, skip, orderBy, query, orderFor],
                (oldData) => {
                    const { total, products } = oldData;
                    const filtered = products.filter(res => res.id !== variables.id)

                    return setQueryProducts({
                        products: [
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



    const queryProductsTotals = async () => {

        const response = await URI.
            get(`http://localhost:7070/produtos-totais`)

        return response.data
    }

    const productsTotalsQuery = useQuery({
        queryFn: () => queryProductsTotals(),
        queryKey: ["products"],

    })


    const deleteProductData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`http://localhost:7070/produtos/${id}?responsible=${responsible}`),
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

                    const { products, total } = oldData;

                    return setQueryProducts({
                        products: products.filter(res => res.id !== variables),
                        total: total - 1
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

            deleteProduct,

            view, setView,

            resetDataProduct

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