
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const UsersContext = createContext({})
export const UsersProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers, setTypeSidebar, setOpenSidebar, userData } = useUser()
    const [person, setPerson] = useState()
    const [multiUnities, setMultiUnities] = useState({ unity: [] })


    const sendData = async () => {
        if (multiUnities.unity === undefined) return
        const response = await toast.promise(
            // https://stagetests-684hi.ondigitalocean.app:7070
            URI.post("/cadastro", { ...person, unity: multiUnities.unity, responsible: userData.name }),
            {
                pending: 'Conferindo os dados',
                success: 'Usuário criado com sucesso',
                error: 'Algo deu errado'
            }
        )
            .catch(res => {
                return alert(res.response.data.message)
            })

        return response.data
    }

    const createUsers = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"])
            setTypeSidebar(0)
            setOpenSidebar(false);
        }
    })


    const queryUsers = async () => {
        const response = await URI.get("/users")
        return response.data
    }

    const UsersQuery = useQuery({
        queryFn: () => queryUsers(),
        queryKey: ["users"],
        enabled: !headers.Authorization.includes("undefined")
    })


    return (
        <UsersContext.Provider value={{
            createUsers,
            person,
            setPerson,
            UsersQuery,
            multiUnities, setMultiUnities
        }}>

            {children}

        </UsersContext.Provider>
    )

}

export const useUsers = () => {
    const context = useContext(UsersContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

UsersProvider.propTypes = {
    children: Proptypes.node
}