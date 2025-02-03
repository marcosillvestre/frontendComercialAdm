

import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"
import { useData } from "./dataContext.jsx"

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { paths } from '../app/constants/paths.js'
import businessRules from '../app/utils/Rules/options.jsx'

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { getDate } from '../app/utils/functions/getDates.jsx'

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

    const queryCache = useQueryClient();


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
    const [queryParam, setQueryParam] = useState({ param: "", value: "", path: "" })


    const body = {
        "range": periodRange,
        "types": typeSearch[unHandleLabel],
        "role": userData.role,
        "name": userData.name,
        "unity": userData.unity,
        "take": take,
        "skip": skip,
        "orderBy": "created_at"
    }



    const [allData, setAllData] = useState([])


    const indexPeriod = async () => {
        body['dates'] = await getDate(body.range)

        if (selectedInitialDate !== null && selectedEndDate !== null) {
            body['range'] = "Personalizado"
            body['dates'] = `${selectedInitialDate && selectedInitialDate}~${selectedEndDate && selectedEndDate}`

        }


        let query = `/query?param=${queryParam.param}&value=${queryParam.value}&dates=${await getDate(body.range)}&name=${body.name}&role=${body.role}&orderBy=${body.orderBy}&path=${queryParam.path}`
        let period = `/registro?range=${body.range}&role=${body.role}&name=${body.name}&unity=${body.unity}&dates=${body.dates}&skip=${body.skip}&take=${body.take}&orderBy=${body.orderBy}`

        const response = await
            URI.get(queryParam.value !== '' ? query : period)
        return response?.data
    }



    const mutationControlData = useQuery({
        queryFn: () => indexPeriod(),
        queryKey: [body, queryParam],
        enabled: !headers.Authorization.includes("undefined"),
        retry: false
    })

    if (mutationControlData.error &&
        mutationControlData.error.response.data.error === 'token invalid') {
        window.location.href = paths.home.path
        alert("Faça login novamente, seu acesso expirou")
        logOut()
    }

    const invalidateYourQuery = (query) => {
        const querys = {
            "register": queryCache.invalidateQueries([body, queryParam]),
            "custom": queryCache.invalidateQueries(["custom"])

        }

        querys[query]
    }

    useLayoutEffect(() => {

        queryCache.invalidateQueries([body, queryParam])
        if (mutationControlData.isSuccess) {
            const { data } = mutationControlData
            setFiltered(data.deals)
            setAllData(data.deals)
        }

    }, [
        periodRange, skip, take,
        mutationControlData.isSuccess, queryParam,
        typeFilter.length
    ])



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



    async function UpdateCustomFields(key, id, area, value, cf) {
        cf[area] = value
        Sender(key, id, cf, area)
    }

    async function Sender(area, id, value, key) {
        await toast.promise(
            // axios.put(`/controle/${id}`,
            URI.put(`/registro/${id}`,
                {
                    key,
                    "area": area,
                    "value": value,
                    "responsible": { "name": userData.name, "role": userData.role }
                }),
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


    const [material, setmaterial] = useState()
    const [tax, settax] = useState()



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
            // SenderDirector, 
            Sender,
            UpdateCustomFields,
            historic, refetchHistoric, isPendingHistoric, historicSuccess, setHistoricTake, historicTake,
            openSidebar, setOpenSidebar,
            typeSidebar, setTypeSidebar,
            setQueryParam,

            material, setmaterial,
            tax, settax,
            invalidateYourQuery
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