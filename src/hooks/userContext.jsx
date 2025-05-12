

import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { paths } from '../app/constants/paths.js'
import businessRules from '../app/utils/Rules/options.jsx'

import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { pickingDate } from '../app/utils/functions/getDates.jsx'

const UserContext = createContext({})
export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState({})

    const [fetchData, setFetchData] = useState()
    const [filtered, setFiltered] = useState([])
    const [contracts, setContracts] = useState([])

    const [filteredContracts, setFilteredContracts] = useState()

    const queryClient = useQueryClient()

    const { predeterminedPeriods } = businessRules

    const [anchorEl, setAnchorEl] = useState(null);
    const [openPeriodRange, setOpenPeriodRange] = useState(false)

    const [selectedInitialDate, setSelectedInitialDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [unHandleLabel, setUnHandleLabel] = useState("Data de matrícula")

    const [typeFilter, setTypeFilter] = useState([])


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



    const [take, setTake] = useState(10)
    const [skip, setSkip] = useState(0)
    const [query, setQuery] = useState('')

    const [orderFor, setOrderFor] = useState('desc')
    const [orderBy, setOrderBy] = useState('created_at')


    const [search, setSearch] = useState(predeterminedPeriods[0].name)


    const [allData, setAllData] = useState([])


    const indexPeriod = async () => {
        const dates = search !== "Período personalizado" ? await pickingDate(search) :
            `${selectedInitialDate}~${selectedInitialDate}`


        let url = query ? `/registro-query` : `/registro`


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


    const mutationControlData = useQuery({
        queryFn: () => indexPeriod(),
        queryKey: [search, take, skip, orderFor, query, orderBy, JSON.stringify(typeFilter)],
        enabled: userData.name !== undefined && userData.role !== undefined
    })

    if (mutationControlData.error &&
        mutationControlData.error?.response?.data.error === 'token invalid') {
        window.location.href = paths.home.path
        alert("Faça login novamente, seu acesso expirou")
        logOut()
    }


    useLayoutEffect(() => {
        const gatherData = async () => {
            const { data } = mutationControlData


            setFiltered(data)
            setAllData(data)
        }

        if (mutationControlData.isSuccess) gatherData()

    }, [
        // periodRange, skip, take,
        mutationControlData.isSuccess,
        take, skip, orderFor, query, orderBy,
        JSON.stringify(typeFilter), search
    ])

    const deleteCampaignData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/controle/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Registro deletado com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteCampaign = useMutation({
        mutationFn: (e) => deleteCampaignData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                [[search, take, skip, orderFor, query, orderBy, JSON.stringify(typeFilter)]],
                (oldData) => {

                    return setFiltered({
                        deals: oldData.deals.filter(res => res.id !== variables),
                        total: oldData.total - 1
                    })

                }
            )
        }
    })










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
                    area,
                    value,
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

    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }

    return (
        <UserContext.Provider value={{
            contracts, setContracts, periodFilter, setPeriodFilter,
            headers, putInfo,
            userData,

            anchorEl, setAnchorEl, handleClose,
            logOut, fetchData, setFetchData, selectedInitialDate, setSelectedInitialDate,
            filtered, setFiltered, filteredContracts, setFilteredContracts,
            selectedEndDate, setSelectedEndDate, resetFilter,
            openPeriodRange, setOpenPeriodRange, unHandleLabel, setUnHandleLabel,
            mutationControlData, take, skip, setTake,
            setSkip, allData,
            Sender,
            UpdateCustomFields,
            historic, refetchHistoric, isPendingHistoric, historicSuccess, setHistoricTake, historicTake,
            openSidebar, setOpenSidebar,
            typeSidebar, setTypeSidebar,

            query, setQuery,
            setSearch,
            typeFilter, setTypeFilter, removeFilter,

            orderBy, setOrderBy, orderFor, setOrderFor,

            deleteCampaign
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