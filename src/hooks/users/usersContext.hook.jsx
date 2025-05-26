
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const UsersContext = createContext({})
export const UsersProvider = ({ children }) => {
    const { setTypeSidebar, setOpenSidebar, userData } = useUser()

    const queryClient = useQueryClient()

    const [Users, setUsers] = useState()
    const [editUser, setEditUser] = useState(null)
    const [queryUser, setQueryUser] = useState([])

    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)

    const [orderFor, setOrderFor] = useState("desc")
    const [orderBy, setOrderBy] = useState("name")



    const queryUsers = async () => {
        const response = await URI.post("/usuarios", {
            take,
            skip,
            orderFor,
            orderBy,
        })

        return response.data
    }

    const UsersQuery = useQuery({
        queryFn: () => queryUsers(),
        queryKey: ["users", take, skip, orderFor, orderBy],
        // enabled: !headers.Authorization.includes("undefined")
    })



    useLayoutEffect(() => {
        const gatherData = async () => {


            const { data } = UsersQuery
            const { users, total } = data

            setQueryUser({ users, total })
        }

        if (UsersQuery.isSuccess) gatherData()

    }, [
        take, skip, UsersQuery.data, orderFor, orderBy,
    ])


    const UserCreate = async (body) => {
        const newUser = new Promise((resolve, reject) => {

            URI.post(`/cadastro`, body)
                .then(response => resolve(response))
                .catch(err => {
                    alert(err.response.data.message)
                    reject(err.response.data.message)
                })

        })

        const response = await toast.promise(
            newUser,
            {
                pending: 'Conferindo os dados',
                success: 'Usuário criado com sucesso',
                error: 'Algo deu errado'
            }
        )

        return response.data
    }

    const createUsers = useMutation({
        mutationFn: (e) => UserCreate(e),
        onSuccess: (_, variables) => {
            // setTypeSidebar(0)
            // setOpenSidebar(false);

            queryClient.setQueryData(
                ["users", take, skip, orderFor, orderBy],
                (oldData) => {

                    return setQueryUser({
                        users: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.users,
                        ],
                        total: oldData.total + 1
                    })
                }
            )
        }


    })


    const UserUpdate = async (body) => {

        const response = await toast.promise(
            URI.put("/usuarios", body),
            {
                pending: 'Conferindo os dados',
                success: 'Usuário editado com sucesso',
                error: 'Algo deu errado'
            }
        )
            .catch(res => {
                return alert(res.response.data.message)
            })

        return response.data
    }

    const updateUser = useMutation({
        mutationFn: (e) => UserUpdate(e),

        onSuccess: (_, variables) => {
            setTypeSidebar(0)
            setOpenSidebar(false);

            queryClient.setQueryData(
                ["users", take, skip, orderFor, orderBy],
                (oldData) => {

                    return setQueryUser({
                        users: [
                            {
                                ...variables,
                                id: crypto.randomUUID(),
                                created_at: new Date()
                            },
                            ...oldData.users.filter(r => r.id !== editUser.id),
                        ],
                        total: oldData.total
                    })
                }
            )

        }
    })


    const deleteUserData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/usuarios/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Usuário deletado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteUser = useMutation({
        mutationFn: (e) => deleteUserData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["users", take, skip, orderFor, orderBy],
                (oldData) => {

                    return setQueryUser({
                        users: oldData.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })

                }
            )
        }
    })





    return (
        <UsersContext.Provider value={{
            createUsers,
            UsersQuery,
            // person,
            // setPerson,
            // multiUnities, setMultiUnities,
            updateUser,

            take,
            setTake,
            setSkip,
            setOrderFor,
            setOrderBy,
            orderBy,
            orderFor,

            Users, setUsers,
            editUser, setEditUser,
            queryUser, setQueryUser,

            deleteUser
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