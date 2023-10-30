import { createContext, useContext, useEffect, useMemo, useState } from "react"


import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"
import { useData } from "./dataContext.jsx"

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
    const [periodRange, setPeriodRange] = useState('Esta semana')
    const [anchorEl, setAnchorEl] = useState(null);
    const [openPeriodRange, setOpenPeriodRange] = useState(false)

    const [selectedInitialDate, setSelectedInitialDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [unHandleLabel, setUnHandleLabel] = useState("Data de matrícula")

    const { typeFilter, setTypeFilter } = useData()

    const handleClose = () => setAnchorEl(null);

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


    if (selectedInitialDate === null) {
        setSelectedInitialDate(new Date('2022-01-01'))
    }
    if (selectedEndDate === null) {
        setSelectedEndDate(new Date())
    }

    const typeSearch = {
        "Data de matrícula": "dataMatricula",
        "Data de validação": "dataValidacao"
    }

    const body = {
        "range": periodRange,
        "role": userData.role,
        "name": userData.name,
        "unity": userData.unity,
        "types": typeSearch[unHandleLabel]
    }

    async function pushData(searchType) {
        setTypeFilter([])

        body["dates"] = searchType === true ? `${selectedInitialDate}~${selectedEndDate}` : ""
        body.name !== undefined &&
            await URI.post('/periodo', body, { headers })
                .then(res => {
                    setFiltered(res?.data.data.deals)
                })
    }


    const resetFilter = async (filter) => {
        body.name !== undefined &&
            await URI.post('/periodo', body, { headers })
                .then(res => {
                    typeFilter.length <= 1 && setFiltered(res?.data.data.deals)
                    typeFilter.length === 2 && setFiltered(res?.data.data.deals.filter(res => res[typeFilter[0].key] === typeFilter[0].value))
                    typeFilter.length === 3 && setFiltered(res?.data.data.deals.filter(res => res[typeFilter[0].key] === typeFilter[0].value && res[typeFilter[1].key] === typeFilter[1].value))
                })
        setTypeFilter(typeFilter.filter(res => res !== filter))
    }

    return (
        <UserContext.Provider value={{
            contracts, setContracts, sellers, periodRange, setPeriodRange,
            users, headers, putInfo, userData, anchorEl, setAnchorEl, handleClose,
            logOut, fetchData, setFetchData, setUsers, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts,
            selectedEndDate, setSelectedEndDate, resetFilter, unity, body,
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