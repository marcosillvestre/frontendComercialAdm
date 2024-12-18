

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
                redirect(paths.home.path)
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
    const [queryParam, setQueryParam] = useState({ param: "", value: "" })


    const body = {
        "range": periodRange,
        "types": typeSearch[unHandleLabel],
        "role": userData.role,
        "name": userData.name,
        "unity": userData.unity,
        "take": take,
        "skip": skip,
    }



    const [allData, setAllData] = useState([])

    const getDate = (range) => {

        const now = new Date();

        const LastMonth = () => `${new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)}`;
        const TwoMonths = () => `${new Date(now.getFullYear(), now.getMonth() - 2, 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999)}`;
        const ThisMonth = () => `${new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)}`;

        const Custom = () => `${selectedInitialDate}~${selectedEndDate}`;
        const SevenDays = () => {
            const date = new Date()
            date.setDate(date.getDate() - 7)
            return `${date.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
        }

        const All = () => {
            const date = new Date()
            date.setDate(date.getDate() - 10000)
            return `${date.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
        }

        const ThisYear = () => {
            const date = new Date();
            const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
            return `${firstDayOfYear.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
        }



        const settledPeriod = {
            "Mês passado": LastMonth(),
            "Mês retrasado": TwoMonths(),
            "Este mês": ThisMonth(),
            "Personalizado": Custom(),
            "Últimos 7 dias": SevenDays(),
            "Este ano": ThisYear(),
            "Todo período": All(),
        }

        return settledPeriod[range]
    }



    const indexPeriod = async () => {
        body['dates'] = await getDate(body.range)
        if (selectedInitialDate !== null && selectedEndDate !== null) {
            body['range'] = "Personalizado"
        }


        let query = `/query?param=${queryParam.param}&value=${queryParam.value}&range=${await getDate(body.range)}&name=${body.name}&role=${body.role}`
        let period = `/periodo?range=${body.range}&role=${body.role}&name=${body.name}&unity=${body.unity}&dates=${body.dates}&skip=${body.skip}&take=${body.take}`

        const response = await
            URI.get(queryParam.value !== '' ? query : period)
        return response?.data
    }



    const mutationControlData = useQuery({
        queryFn: () => indexPeriod(),
        queryKey: [body, queryParam.value],
        enabled: !headers.Authorization.includes("undefined"),
        retry: false
    })

    if (mutationControlData.error &&
        mutationControlData.error.response.data.error === 'token invalid') {
        window.location.href = paths.home.path
        alert("Faça login novamente, seu acesso expirou")
        logOut()
    }

    useEffect(() => {
        if (headers.Authorization.includes("undefined") === false
            && body.range !== "Período personalizado") {
            mutationControlData.refetch()
        }
        if (body.range === "Período personalizado" &&
            selectedInitialDate !== null && selectedEndDate !== null) {
            mutationControlData.refetch()
        }
        if (mutationControlData.isSuccess) {
            const { data } = mutationControlData
            setFiltered(data.deals)
            setAllData(data.deals)
        }

    }, [periodRange, skip, take, mutationControlData.isSuccess, queryParam])


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
            contracts, setContracts, periodRange, setPeriodRange, periodFilter, setPeriodFilter,
            headers, putInfo,
            userData,

            anchorEl, setAnchorEl, handleClose,
            logOut, fetchData, setFetchData, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts,
            selectedEndDate, setSelectedEndDate, resetFilter, body,
            openPeriodRange, setOpenPeriodRange, unHandleLabel, setUnHandleLabel,
            mutationControlData, take, skip, setTake,
            setSkip, allData,
            SenderDirector, Sender,
            historic, refetchHistoric, isPendingHistoric, historicSuccess, setHistoricTake, historicTake,
            openSidebar, setOpenSidebar,
            typeSidebar, setTypeSidebar,
            setQueryParam,

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