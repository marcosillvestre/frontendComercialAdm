import { createContext, useContext, useEffect, useMemo, useState } from "react"


import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"
import { useData } from "./dataContext.jsx"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import { toast } from "react-toastify"


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
    const [periodRange, setPeriodRange] = useState('Selecione')
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


    useEffect(() => {
        const unities = async () => {
            await URI.get('/unidades', { headers })
                .then(res => setUnity(res.data))
        }
        unities()

    }, [headers])




    ////////////////////////////////////
    useEffect(() => {
        const bool = headers.Authorization.includes('undefined')
        if (fetchData === undefined && bool === false) {
            data()
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

    const queryCache = useQueryClient();

    const [allData, setAllData] = useState([])

    const mutationControlData = useMutation({
        mutationFn: () => {
            return URI.post('/periodo', body, { headers }).then(res => res.data)
        },
        onSuccess: (data) => {
            setAllData(data.data.deals)
            setFiltered(data.data.deals)
        },
        onError: (err) => console.log(err)
    })

    useEffect(() => {
        if (headers.Authorization.includes("undefined") === false && body.range !== 'Selecione' && body.range !== "Período personalizado") {
            mutationControlData.mutate()
        }
        if (body.range === "Período personalizado" && selectedInitialDate || selectedEndDate !== null) {
            mutationControlData.mutate()
        }

    }, [periodRange, skip, take])


    class resetFiltering {
        filterWithJustOne(res, types) {
            return res.filter(res => res[types[0].key] === types[0].value)

        }
        filterWithTwo(res, types) {
            return res.filter(res => res[types[0].key] === types[0].value
                && res[types[1].key] === types[1].value)

        }
        filterWithTree(res, types) {
            return res.filter(res => res[types[0].key] === types[0].value &&
                res[types[1].key] === types[1].value &&
                res[types[2].key] === types[2].value)

        }
    }

    let filteringClass = new resetFiltering;


    const possibilities = [filteringClass.filterWithJustOne, filteringClass.filterWithTwo, filteringClass.filterWithTree]

    const { data } = mutationControlData

    const resetFilter = async (filter) => {
        let types = (typeFilter.filter(res => res !== filter))
        const index = typeFilter.length - 2

        typeFilter.length === 1 || filter === undefined ? setFiltered(data?.data.deals)
            : setFiltered(possibilities[index](data?.data.deals, types))
    }


    const [label, setLabel] = useState("Selecione")

    const bodyComission = {
        range: label,
        dates: label === "Período personalizado" ? `${selectedInitialDate}~${selectedEndDate}` : ""
    }

    const [cell, setCell] = useState([])

    const mutation = useMutation({
        mutationFn: () => {
            return URI.post('/comissao', bodyComission, { headers }).then(res => res.data.data)
        },
        onSuccess: (data) => {
            setCell(data.deals)
            queryCache.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (err) => err
    })

    useEffect(() => {
        headers.Authorization.includes("undefined") === false && body.range !== 'Selecione' && mutation.mutate()
    }, [label])


    const [periodFilter, setPeriodFilter] = useState(false)





    async function SenderDirector(area, target, id, value) {
        const day = new Date()
        const currentDay = day.toLocaleDateString()

        const directorValidationBody = {
            "area": area,
            "value": area !== 'observacao' ? target : value,
            "day": target !== "Ok" ? "" : currentDay,
            "responsible": { "name": userData.name, "role": userData.role }
        }

        await toast.promise(
            axios.put(`http://localhost:7070/controle/${id}`,
                // URI.put(`/controle/${id}`,
                directorValidationBody
                , { headers }),
            {
                success: 'Atualizado com sucesso',
                pending: 'Conferindo os dados',
                error: 'Alguma coisa deu errado'
            }
        )
    }

    async function Sender(area, e, id, value) {
        await toast.promise(
            URI.put(`/controle/${id}`,
                {
                    "area": area,
                    "value": area !== 'observacao' ? e : value,
                    "responsible": userData.name
                }, { headers }),
            {
                pending: 'Conferindo os dados',
                success: 'Atualizado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
    }


    const [historic, setHistoric] = useState()
    const HistoricData = useMutation({
        mutationFn: () => {
            return URI.post('/periodo', body, { headers }).then(res => res.data)
            //  axios.get('http://localhost:7070/historico', { headers }).then(res => res.data)
        },
        onSuccess: (data) => {
            setHistoric(data)
        },
        onError: (err) => console.log(err)
    })



    return (
        <UserContext.Provider value={{
            contracts, setContracts, sellers, periodRange, setPeriodRange, periodFilter, setPeriodFilter,
            users, headers, putInfo, userData, anchorEl, setAnchorEl, handleClose, cell, setCell,
            logOut, fetchData, setFetchData, setUsers, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts, setLabel, label,
            selectedEndDate, setSelectedEndDate, resetFilter, unity, body, mutation,
            openPeriodRange, setOpenPeriodRange, unHandleLabel, setUnHandleLabel,
            mutationControlData, take, skip, setTake,
            setSkip, allData,
            SenderDirector, Sender,
            HistoricData, historic
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