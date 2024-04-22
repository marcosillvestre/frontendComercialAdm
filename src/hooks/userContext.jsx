import { createContext, useContext, useEffect, useMemo, useState } from "react"


import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"
import { useData } from "./dataContext.jsx"

import { useQuery } from '@tanstack/react-query'
import { toast } from "react-toastify"
import businessRules from '../app/utils/Rules/options.jsx'


const UserContext = createContext({})
export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({})

    const [fetchData, setFetchData] = useState()
    const [users, setUsers] = useState([])
    const [filtered, setFiltered] = useState([])
    const [contracts, setContracts] = useState([])
    const [unity, setUnity] = useState([])
    const [filteredContracts, setFilteredContracts] = useState()
    const [sellers, setSeller] = useState()
    const [periodRange, setPeriodRange] = useState(businessRules.predeterminedPeriods[0].name)

    const [anchorEl, setAnchorEl] = useState(null);
    const [openPeriodRange, setOpenPeriodRange] = useState(false)

    const [selectedInitialDate, setSelectedInitialDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [unHandleLabel, setUnHandleLabel] = useState("Data de matrícula")

    const { typeFilter } = useData()



    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const loadUserData = async () => {
            const clientInfo = await localStorage.getItem('userData')
            if (clientInfo) {
                setUserData(JSON.parse(clientInfo))
            }
            if (!clientInfo) {
                redirect("/")
            }
        }
        loadUserData()

    }, [])



    const headers = useMemo(() => {
        return {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${userData?.token}`
        }
    }, [userData?.token])



    ////////////////////////////////////
    useEffect(() => {


        const unities = async () => {
            await URI.get('/unidades', { headers })
                .then(res => setUnity(res.data))
        }
        async function data() {
            try {
                await URI.get('/controle', { headers })
                    .then(async info => {
                        setFetchData(info.data)
                    })
            }
            catch (err) {
                if (err.response.data.error === 'token invalid') {
                    window.location.href = "/"
                    alert("Faça login novamente, seu acesso expirou")
                    logOut()
                }
            }
        }

        const bool = headers.Authorization.includes('undefined')
        if (fetchData === undefined && bool === false) {
            data()
            unities()
        }

    }, [fetchData, headers])
    /////////////////////////////////////

    const putInfo = async (userInfos) => {
        setUserData(userInfos)
        await localStorage.setItem('userData', JSON.stringify(userInfos))
    }


    const logOut = async () => {
        await localStorage.removeItem('userData')
    }


    const bool = headers.Authorization
    let splited = bool.split(" ")

    const getData = async () => {
        await URI.get('/users', { headers })
            .then(res => {
                setUsers(res.data)
                setSeller(res.data?.filter(role =>
                    role.role === 'comercial' || role.role === 'gerencia'))

            }).catch((err) => (err))
    }

    splited[1] !== undefined && users.length === 0 && getData()


    const typeSearch = {
        "Data de matrícula": "dataMatricula",
        "Data de validação": "dataValidacao"
    }

    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)

    const body = {
        "range": periodRange,
        "types": typeSearch[unHandleLabel],
        "role": userData.role,
        "name": userData.name,
        "unity": userData.unity,
        "take": take,
        "skip": skip
    }


    body["dates"] = `${selectedInitialDate}~${selectedEndDate}`


    const [allData, setAllData] = useState([])

    const indexPeriod = async () => {
        const response = await URI.get(`/periodo?range=${periodRange}&role=${body.role}&name=${body.name}&unity=${body.unity}&dates=${body.dates}&types=${body.types}&skip=${body.skip}&take=${body.take}`, { headers })
        return response?.data
    }


    const mutationControlData = useQuery({
        queryFn: () => indexPeriod(),
        queryKey: [body],
        enabled: !headers.Authorization.includes("undefined")
    })



    useEffect(() => {
        if (headers.Authorization.includes("undefined") === false
            && body.range !== "Período personalizado") {
            mutationControlData.refetch()
        }
        if (body.range === "Período personalizado" && selectedInitialDate || selectedEndDate !== null) {
            mutationControlData.refetch()
        }
        if (mutationControlData.isSuccess) {
            setFiltered(mutationControlData.data.deals)
            setAllData(mutationControlData.data.deals)
        }

    }, [periodRange, skip, take, mutationControlData.isSuccess])



    const decreaseFilters = (types) => {

        const twoFilters = () => {
            return allData.filter(res => res[types[0].key].includes(types[0].value) && res[types[1].key].includes(types[1].value))
        }

        const oneFilter = () => {
            return allData.filter(res => res[types[0].key].toLowerCase().includes(types[0].value.toLowerCase()))
        }

        setFiltered(types.length === 2 ? twoFilters() : oneFilter())
    }

    const resetFilter = async (filter) => {
        let types = typeFilter.filter(res => res !== filter)

        typeFilter.length === 1 || filter === undefined ?
            setFiltered(allData) :
            decreaseFilters(types)
    }






    const [label, setLabel] = useState(businessRules.predeterminedPeriods[0].name)

    const bodyComission = {
        range: label,
        dates: label === "Período personalizado" ? `${selectedInitialDate}~${selectedEndDate}` : ""
    }

    const [cell, setCell] = useState([])

    const comissionData = async () => {
        const response = await URI.get(`http://localhost:7070/comissao?range=${bodyComission.range}&dates=${bodyComission.dates}`, { headers }).then(res => res.data.data)
        return response
    }
    const comissionQuery = useQuery({
        queryFn: () => comissionData(),
        queryKey: [bodyComission],
        enabled: !headers.Authorization.includes("undefined")
    })



    useEffect(() => {
        headers.Authorization.includes("undefined") === false && comissionQuery.refetch()

        comissionQuery.isSuccess && setCell(comissionQuery.data.deals)
    }, [label, comissionQuery.isSuccess])


    const [periodFilter, setPeriodFilter] = useState(false)


    async function SenderDirector(area, target, id, value) {
        const day = new Date()
        const currentDay = day.toLocaleDateString()

        await toast.promise(
            // axios.put(`http://localhost:7070/controle/${id}`,
            URI.put(`/controle/${id}`,
                {
                    "area": area,
                    "value": area !== 'observacao' ? target : value,
                    "day": target !== "Ok" ? "" : currentDay,
                    "responsible": { "name": userData.name, "role": userData.role }
                }
                , { headers }),
            {
                success: 'Atualizado com sucesso',
                pending: 'Conferindo os dados',
                error: 'Alguma coisa deu errado'
            }
        )
    }

    async function Sender(area, target, id, value) {
        const day = new Date()
        const currentDay = day.toLocaleDateString()

        await toast.promise(
            URI.put(`/controle/${id}`,
                {
                    "area": area,
                    "value": area !== 'observacao' ? target : value,
                    "day": target !== "Ok" ? "" : currentDay,
                    "responsible": { "name": userData.name, "role": userData.role }
                }, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }


    const { data: historic, refetch: refetchHistoric, isPending: isPendingHistoric } = useQuery({
        queryFn: () => {
            if (headers.Authorization.includes("undefined") === false) {
                return URI.get('/historico', { headers }).then(res => res.data)
                // return axios.get('http://localhost:7070/historico', { headers }).then(res => res.data)
            }
        },
        queryKey: ["historic"],
        onError: (err) => console.log(err)
    })



    return (
        <UserContext.Provider value={{
            contracts, setContracts, sellers, periodRange, setPeriodRange, periodFilter, setPeriodFilter,
            users, headers, putInfo, userData, anchorEl, setAnchorEl, handleClose, cell, setCell,
            logOut, fetchData, setFetchData, setUsers, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts, setLabel, label,
            selectedEndDate, setSelectedEndDate, resetFilter, unity, body, comissionQuery,
            openPeriodRange, setOpenPeriodRange, unHandleLabel, setUnHandleLabel,
            mutationControlData, take, skip, setTake,
            setSkip, allData,
            SenderDirector, Sender,
            historic, refetchHistoric, isPendingHistoric
        }}>

            {children}

        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("user most be used with UserContext")
    }

    return context
}
UserProvider.propTypes = {
    children: Proptypes.node
}