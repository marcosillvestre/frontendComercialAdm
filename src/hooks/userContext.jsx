import { createContext, useContext, useEffect, useMemo, useState } from "react"


import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"
import { useData } from "./dataContext.jsx"

import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'


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
    const [periodRange, setPeriodRange] = useState('Últimos 7 dias')
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPeriodRange, setOpenPeriodRange] = useState(false)

    const [selectedInitialDate, setSelectedInitialDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [unHandleLabel, setUnHandleLabel] = useState("Data de matrícula")

    const { typeFilter, setTypeFilter } = useData()

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
            // await axios.get('http://localhost:7070/unidades', { headers })
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
                if (err?.response?.data?.error.includes('token')) {
                    window.location.href = "/"
                    logOut()
                    alert("Sessão expirada")
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

    const body = {
        "range": periodRange,
        "types": typeSearch[unHandleLabel],
        "role": userData.role,
        "name": userData.name,
        "unity": userData.unity,
    }

    useEffect(() => {
        pushData()
    }, [periodRange])

    // axios.post('http://localhost:7070/periodo', body, { headers })

    async function pushData(searchType) {
        setTypeFilter([])
        selectedInitialDate === null && setSelectedInitialDate(new Date('2022-01-02'))
        selectedEndDate === null && setSelectedEndDate(new Date())

        body["dates"] = searchType === true ? `${selectedInitialDate}~${selectedEndDate}` : ""

        try {
            body.name !== undefined &&
                await URI.post('/periodo', body, { headers })
                    .then(res => {
                        setFiltered(res?.data.data.deals)
                    })
        }
        catch (err) {
            if (err?.response?.data?.error.includes('token')) {
                window.location.href = "/"
                logOut()
                alert("Sessão expirada")
            }
        }
    }

    // await axios.post('http://localhost:7070/periodo', body, { headers })

    const resetFilter = async (filter) => {
        // selectedInitialDate === null && setSelectedInitialDate(new Date('2022-05-12'))
        // selectedEndDate === null && setSelectedEndDate(new Date())

        body["dates"] = `${selectedInitialDate}~${selectedEndDate}`
        try {
            await URI.post('/periodo', body, { headers })
                .then(res => {
                    typeFilter.length <= 1 && setFiltered(res?.data.data.deals)
                    typeFilter.length === 2 && setFiltered(res?.data.data.deals.filter(res => res[typeFilter[0].key] === typeFilter[0].value))
                    typeFilter.length === 3 && setFiltered(res?.data.data.deals.filter(res => res[typeFilter[0].key] === typeFilter[0].value && res[typeFilter[1].key] === typeFilter[1].value))
                })
            setTypeFilter(typeFilter.filter(res => res !== filter))
        }
        catch (err) {
            if (err?.response?.data?.error.includes('token')) {
                window.location.href = "/"
                logOut()
                alert("Sessão expirada")
            }
        }
    }

    const queryCache = useQueryClient();

    const [label, setLabel] = useState("Selecione")


    const bodyComission = {
        range: label,
        dates: label === "Período personalizado" ? `${selectedInitialDate}~${selectedEndDate}` : ""
    }

    const [cell, setCell] = useState([])


    const mutation = useMutation({
        mutationFn: () => {
            return axios.post('http://localhost:7070/comissao', bodyComission, { headers }).then(res => res.data.data)
        },
        onSuccess: (data) => {
            setCell(data.deals)
            queryCache.invalidateQueries({ queryKey: ['todos'] })
        },
        onError: (err) => console.log(err)
    })

    useEffect(() => {
        headers.Authorization.includes("undefined") === false && mutation.mutate()

    }, [label])


    const [periodFilter, setPeriodFilter] = useState(false)


    return (
        <UserContext.Provider value={{
            contracts, setContracts, sellers, periodRange, setPeriodRange, periodFilter, setPeriodFilter,
            users, headers, putInfo, userData, anchorEl, setAnchorEl, handleClose, cell, setCell,
            logOut, fetchData, setFetchData, setUsers, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts, setLabel, label,
            selectedEndDate, setSelectedEndDate, resetFilter, unity, body, mutation,
            openPeriodRange, setOpenPeriodRange, unHandleLabel, setUnHandleLabel,
            pushData
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