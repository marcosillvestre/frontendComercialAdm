import { createContext, useContext, useEffect, useMemo, useState } from "react"


import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"


const UserContext = createContext({})


export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [fetchData, setFetchData] = useState()
    const [users, setUsers] = useState([])
    const [filtered, setFiltered] = useState([])
    const [contracts, setContracts] = useState([])
    const [filteredContracts, setFilteredContracts] = useState()
    const [sellers, setSeller] = useState()
    const [periodRange, setPeriodRange] = useState('Esta semana')
    const [anchorEl, setAnchorEl] = useState(null);

    const [selectedInitialDate, setSelectedInitialDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);



    const handleClose = () => {
        setAnchorEl(null);
    };


    const headers = useMemo(() => {
        return {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${userData?.token}`
        }
    }, [userData?.token])

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


    const period = {
        "Esta semana": 7,
        "Este mês": 30,
        "Mês passado": 60,
        "Últimos 3 meses": 90,
        "Este ano": 365,
        "Período personalizado": 0,
    }


    const currentDay = new Date()
    currentDay.setDate(currentDay.getDate() - period[periodRange])

    const time = currentDay.toLocaleDateString()
    const range = time.split("/")


    async function pushData() {
        const firstWeekGeneral = fetchData?.filter(res => {
            const date = res.dataMatricula.split("/")
            return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= new Date(`${range[2]}-${range[1]}-${range[0]}`)
        })
        const firstWeekSeller = fetchData?.filter(res => {
            const date = res.dataMatricula.split("/")
            return new Date(`${date[2]}-${date[1]}-${date[0]}`) >= new Date(`${range[2]}-${range[1]}-${range[0]}`) && res.owner.toLowerCase().includes(userData.name.toLowerCase())
        })


        userData.role === 'comercial' && setFiltered(firstWeekSeller)

        userData.role === 'direcao' || userData.role === 'administrativo' ? setFiltered(firstWeekGeneral) : ""

    }


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




    return (
        <UserContext.Provider value={{
            contracts, setContracts, sellers, periodRange, setPeriodRange, pushData,
            users, headers, putInfo, userData, anchorEl, setAnchorEl, handleClose,
            logOut, fetchData, setFetchData, setUsers, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts,
            selectedEndDate, setSelectedEndDate
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