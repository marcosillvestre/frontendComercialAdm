

import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"
import { useData } from "./dataContext.jsx"

import { useQuery } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { paths } from '../app/constants/paths.js'
import businessRules from '../app/utils/Rules/options.jsx'

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const UserContext = createContext({})
export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({})

    const [fetchData, setFetchData] = useState()
    const [filtered, setFiltered] = useState([])
    const [contracts, setContracts] = useState([])
    const [filteredContracts, setFilteredContracts] = useState()
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
                redirect(paths.home)
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
        const response = await
            URI.get(`/periodo?range=${periodRange}&role=${body.role}&name=${body.name}&unity=${body.unity}&dates=${body.dates}&types=${body.types}&skip=${body.skip}&take=${body.take}`)
        return response?.data
    }


    const mutationControlData = useQuery({
        queryFn: () => indexPeriod(),
        queryKey: [body],
        staleTime: 0,
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
            ),
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
                },),
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
                return URI.get('/historico',).then(res => res.data)
                // return axios.get('http://localhost:7070/historico', ).then(res => res.data)
            }
        },
        queryKey: ["historic"],
        onError: (err) => console.log(err)
    })



    const [openSidebar, setOpenSidebar] = useState(false);
    const [typeSidebar, setTypeSidebar] = useState(0)

    return (
        <UserContext.Provider value={{
            contracts, setContracts, periodRange, setPeriodRange, periodFilter, setPeriodFilter,
            headers, putInfo, userData, anchorEl, setAnchorEl, handleClose,
            logOut, fetchData, setFetchData, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts,
            selectedEndDate, setSelectedEndDate, resetFilter, body,
            openPeriodRange, setOpenPeriodRange, unHandleLabel, setUnHandleLabel,
            mutationControlData, take, skip, setTake,
            setSkip, allData,
            SenderDirector, Sender,
            historic, refetchHistoric, isPendingHistoric,
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