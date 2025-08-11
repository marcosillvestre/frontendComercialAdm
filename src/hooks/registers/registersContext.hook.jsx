
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import { paths } from "../../app/constants/paths.js"
import businessRules from '../../app/utils/Rules/options.jsx'
import { pickingDate } from "../../app/utils/functions/getDates.jsx"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const RegisterContext = createContext({})

export const RegistersProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { predeterminedPeriods } = businessRules

    const [editRegister, setEditRegister] = useState(null);
    const [updateRegister, setUpdateRegister] = useState(null);

    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [orderBy, setOrderBy] = useState("created_at")
    const [orderFor, setOrderFor] = useState("asc")
    const [query, setQuery] = useState("")
    const [search, setSearch] = useState(predeterminedPeriods[0].name)
    const [typeFilter, setTypeFilter] = useState([])
    const [selectedInitialDate, setSelectedInitialDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [registerId, setRegisterId] = useState(null);
    const [register, setRegister] = useState(null);

    const [queryRegister, setQueryRegister] = useState({ registers: [], total: 0 })


    const { userData, logOut } = useUser()

    const querieRegister = async () => {
        let url = `/registro-unico/${registerId}`

        const response = await URI.get(url)
        return response.data
    }

    const queryOnlyRegister = useQuery({
        queryFn: () => querieRegister(),
        queryKey: ["RegisterOnly", registerId],
        enabled: userData?.name !== undefined &&
            userData.role !== undefined &&
            registerId !== null

    })

    useLayoutEffect(() => {

        const gatherData = async () => {

            const { data } = queryOnlyRegister
            const { register } = data


            setRegister(register)
        }

        if (queryOnlyRegister.isSuccess) gatherData()

    }, [
        queryOnlyRegister.isSuccess, registerId
    ])

    ////
    const queriesRegister = async () => {
        let url = query ?
            `/registro-query` : `/registro`

        const dates = search !== "Período personalizado" ? await pickingDate(search) :
            `${selectedInitialDate}~${selectedEndDate}`


        const response = await URI.post(url, {
            role: userData.role,
            name: userData.name,

            dates,
            take,
            skip,
            orderFor,
            orderBy,
            query,
            typeFilter

        })
        return response.data
    }

    const RegisterQuery = useQuery({
        queryFn: () => queriesRegister(),
        queryKey: [
            "Register", search, take, skip,
            orderBy, query, orderFor, JSON.stringify(typeFilter)
        ],
        enabled: userData?.name !== undefined && userData.role !== undefined

    })

    useLayoutEffect(() => {

        const gatherData = async () => {

            const { data, error } = RegisterQuery;

            if (error && error?.response?.data.error === 'token invalid') {
                window.location.href = paths.home.path;
                alert("Faça login novamente, seu acesso expirou");
                logOut();

                return;
            }

            const { registers, total } = data;

            setQueryRegister({ registers, total })
        }

        if (RegisterQuery.isSuccess || RegisterQuery.isError) gatherData()

    }, [
        RegisterQuery.isSuccess, take, skip, RegisterQuery.isError,
        orderFor, query, orderBy, JSON.stringify(typeFilter), search
    ])


    const deleteRegisterData = async (id) => {
        const responsible = userData.name

        const response = await toast.promise(
            URI.delete(`/registro/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'serviço deletado com sucesso',
                error: 'Algo deu errado'
            }
        )

        return response.data
    }

    const deleteRegister = useMutation({
        mutationFn: (e) => deleteRegisterData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                [
                    "Register", search, take, skip,
                    orderBy, query, orderFor, JSON.stringify(typeFilter)
                ],
                (oldData) => {

                    return setQueryRegister({
                        Register:
                            oldData.Register.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })
                }
            )
        }
    })

    ////


    const editData = async (body) => {
        const response = await toast.promise(
            URI.put(`/registros/${body.id}`, {
                ...body,
                responsible: {
                    name: userData.name,
                    role: userData.role
                }
            }),
            {
                pending: 'Conferindo os dados',
                success: 'Negociação editado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateRegister = useMutation({
        mutationFn: (e) => editData(e),
        onSuccess: (_, variables) => {

            queryClient.setQueryData(
                [
                    "Register", search, take, skip,
                    orderBy, query, orderFor, JSON.stringify(typeFilter)
                ],
                (oldData) => {
                    const { id, registerUpdate, files } = variables;

                    setRegister({ ...registerUpdate, files });
                    setUpdateRegister(null);

                    return setQueryRegister({
                        registers: [
                            registerUpdate,
                            ...oldData.registers.filter(
                                res => res.id !== id
                            ),
                        ],
                        total: oldData.total
                    })
                }
            )
        }
    })



    const updateCustomFields = async (id) => {

        const { files, ...rest } = register;

        const data = {
            ...rest,
            ...editRegister
        }



        mutateRegister.mutateAsync({
            id,
            registerUpdate: data,
            updates: updateRegister,
            files
        })
    }

    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }


    ///////////////////////////////////////////////////////////////////////////


    //////////////////
    // const sendData = async (body) => {
    //     const response = await toast.promise(
    //         URI.post(`/registro`, body),
    //         {
    //             pending: 'Conferindo os dados',
    //             success: 'serviço criado com sucesso',
    //             error: 'Algo deu errado aqui'
    //         }
    //     )
    //     return response.data
    // }

    // const createRegister = useMutation({
    //     mutationFn: (e) => sendData(e),
    //     onSuccess: (_, variables) => {


    //         queryClient.setQueryData(
    //             ["Register", take, skip, orderBy, query, orderFor],
    //             (oldData) => {

    //                 return setQueryRegister({
    //                     Register: [
    //                         {
    //                             ...variables,
    //                             id: crypto.randomUUID(),
    //                             created_at: new Date()
    //                         },
    //                         ...oldData.Register,
    //                     ],
    //                     total: oldData.total + 1
    //                 })
    //             }
    //         )
    //     }
    // })

    ///////////////////////// create




    //////////


    return (
        <RegisterContext.Provider value={{
            // createRegister,

            register, setRegister,

            RegisterQuery,
            editRegister, setEditRegister,
            mutateRegister,

            take, setTake,
            skip, setSkip,

            orderBy, setOrderBy,
            orderFor, setOrderFor,

            setQuery,

            queryRegister,

            deleteRegister,

            selectedInitialDate, setSelectedInitialDate,
            selectedEndDate, setSelectedEndDate,

            setSearch,


            setRegisterId,
            queryOnlyRegister,

            removeFilter,
            typeFilter,
            setTypeFilter,

            updateCustomFields,

            updateRegister, setUpdateRegister
        }}>

            {children}

        </RegisterContext.Provider>
    )

}

export const useRegister = () => {
    const context = useContext(RegisterContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

RegistersProvider.propTypes = {
    children: Proptypes.node
}