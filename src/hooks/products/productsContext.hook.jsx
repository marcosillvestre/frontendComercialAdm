
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const ProductsContext = createContext({})

export const ProductsProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers } = useUser()

    const [Product, setProduct] = useState()
    const [editProduct, setEditProduct] = useState()
    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("name")
    const [query, setQuery] = useState("")



    const sendData = async () => {
        const response = await toast.promise(
            URI.post(`/produtos`, Product),
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

    const queriesProduct = async () => {

        const response = await URI.
            get(`/produtos?take=${take}&skip=${skip}&orderBy=${orderBy}&query=${query}`)

        return response.data
    }

    const productQuery = useQuery({
        queryFn: () => queriesProduct(),
        queryKey: ["product"],
        enabled: !headers.Authorization.includes("undefined")
    })


    useEffect(() => {
        productQuery.refetch()

    }, [take, skip, orderBy, query])


    //////////////////// get


    return (
        <ProductsContext.Provider value={{
            createProduct,

            Product, setProduct,
            productQuery,
            editProduct, setEditProduct,
            mutateProduct,

            take, setTake,
            skip, setSkip,
            setOrderBy,
            setQuery,

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