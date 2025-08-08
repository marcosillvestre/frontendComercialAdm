
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
        active: true
    })
    const [editProduct, setEditProduct] = useState(null)
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [orderFor, setOrderFor] = useState("asc")

    const [query, setQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState([])

    const [queryProducts, setQueryProducts] = useState({ products: [], total: 0 })
    const [view, setView] = useState('produtos');


    const resetDataProduct = () => {
        setEditProduct(null);
        setProduct(null);
    }

    const queriesProduct = async () => {

        let url = query ?
            `/produto-query` : `/produtos`

        const response = await URI.post(url, {
            take,
            skip,
            orderBy,
            orderFor,
            query,
            typeFilter
        })

        return response.data
    }

    const productQuery = useQuery({
        queryFn: () => queriesProduct(),
        queryKey: ["product", take, skip, orderBy, query, orderFor, JSON.stringify(typeFilter)],
    })


    useLayoutEffect(() => {
        const gatherData = async () => {

            const { data } = productQuery
            const { products, total } = data

            setQueryProducts({ products, total })
        }

        if (productQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, query, orderFor, productQuery.isSuccess, JSON.stringify(typeFilter)])



    const sendData = async (body) => {
        const response = await toast.promise(
            URI.post(`/produto`, body),
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
        onSuccess: (data,) => {

            queryClient.setQueryData(
                ["product", take, skip, orderBy, query, orderFor],
                (oldData) => {

                    return setQueryProducts({
                        products: [
                            data,
                            ...oldData.products,
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
            URI.put(`/produtos/${body.id}`, body),
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

                    const { products, total } = oldData;

                    return setQueryProducts({
                        products: products.filter(res => res.id !== variables),
                        total: total - 1
                    })

                }
            )
        }
    })


    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }

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

            resetDataProduct,

            typeFilter, setTypeFilter,
            removeFilter

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