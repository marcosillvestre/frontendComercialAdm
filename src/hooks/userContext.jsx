

import Proptypes from 'prop-types'
import URI from "../app/utils/utils.jsx"

import { useQuery } from '@tanstack/react-query'
import { paths } from '../app/constants/paths.js'

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const UserContext = createContext({})
export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({})

    const [fetchData, setFetchData] = useState()
    const [filtered, setFiltered] = useState([])
    const [contracts, setContracts] = useState([])

    const [filteredContracts, setFilteredContracts] = useState()


    const [anchorEl, setAnchorEl] = useState(null);
    const [openPeriodRange, setOpenPeriodRange] = useState(false)

    const [selectedInitialDate, setSelectedInitialDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [unHandleLabel, setUnHandleLabel] = useState("Data de matrícula")



    const handleClose = () => setAnchorEl(null);

    useEffect(() => {
        const loadUserData = async () => {
            const clientInfo = await localStorage.getItem('userData')
            if (clientInfo) {
                setUserData(JSON.parse(clientInfo))
            }
            if (!clientInfo) {

                window.location.href = paths.home.path
            }
        }
        loadUserData()

    }, [])


    const putInfo = async (userInfos) => {
        setUserData(userInfos)
        await localStorage.setItem('userData', JSON.stringify(userInfos))
    }


    const logOut = async () => {
        await localStorage.removeItem('userData')
    }


    const headers = useMemo(() => {
        return {
            "Authorization": `Bearer ${userData?.token}`
        }
    }, [userData?.token])




    const [periodFilter, setPeriodFilter] = useState(false)




    const [historicTake, setHistoricTake] = useState(10)
    const queryHistoric = async () => {
        const response = await URI.get(`/historico?take=${historicTake}`)
        return response?.data
    }


    const {
        data: historic,
        refetch: refetchHistoric,
        isPending: isPendingHistoric,
        isSuccess: historicSuccess } = useQuery({
            queryFn: () => queryHistoric(),
            queryKey: ["historic", historicTake],
            onError: (err) => console.log(err)
        })


    const [openSidebar, setOpenSidebar] = useState(false);
    const [typeSidebar, setTypeSidebar] = useState(0)


    return (
        <UserContext.Provider value={{
            contracts, setContracts, periodFilter, setPeriodFilter,
            headers, putInfo,
            userData,

            anchorEl, setAnchorEl, handleClose,
            logOut, fetchData, setFetchData, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts,
            selectedEndDate, setSelectedEndDate,
            openPeriodRange, setOpenPeriodRange, unHandleLabel, setUnHandleLabel,
            historic, refetchHistoric, isPendingHistoric, historicSuccess, setHistoricTake, historicTake,
            openSidebar, setOpenSidebar,
            typeSidebar, setTypeSidebar,
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