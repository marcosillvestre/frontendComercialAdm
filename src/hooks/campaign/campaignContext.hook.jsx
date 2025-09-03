
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useLayoutEffect, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const CampaignContext = createContext({})

export const CampaignProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { userData } = useUser()
    const [campaign, setCampaign] = useState({
        status: true
    })

    const [editCampaign, setEditCampaign] = useState(null)

    const sendData = async () => {
        const response = await toast.promise(
            URI.post("/campanha", campaign),
            {
                pending: 'Conferindo os dados',
                success: 'Campanha criada com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const createCampaign = useMutation({
        mutationFn: () => sendData(),
        onSuccess: (data) => {
            queryClient.setQueryData(
                ["campaign", take, skip, orderFor, orderBy, JSON.stringify(typeFilter)],
                (oldData) => {
                    const { total, campaigns } = oldData;

                    return setCampaignQueries({
                        campaigns: [
                            data,
                            ...campaigns,
                        ],
                        total: total + 1
                    })
                }

            )
        },
        onError: (error) => {

            const { response } = error

            console.log(response)
            "message" in response.data && alert(response.data.message)
        }
    })
    ///////////////////////// create

    const editData = async () => {
        const response = await toast.promise(
            URI.put(`/campanha/${editCampaign.id}`, editCampaign),
            {
                pending: 'Conferindo os dados',
                success: 'Campanha editada com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateCampaign = useMutation({
        mutationFn: () => editData(),
        onSuccess: (data) => {
            queryClient.setQueryData(
                ["campaign", take, skip, orderFor, orderBy, JSON.stringify(typeFilter)],
                (oldData) => {
                    const { total, campaigns } = oldData;

                    const filtered = campaigns.filter(res => res.id !== data.id)

                    return setCampaignQueries({
                        campaigns: [
                            data,
                            ...filtered,
                        ],
                        total
                    })
                }

            )
        },
        onError: (error) => {

            const { response } = error

            console.log(response)
            "message" in response.data && alert(response.data.message)
        }
    })
    ///////////////////////// edit


    const [take, setTake] = useState(10);
    const [skip, setSkip] = useState(0);
    const [orderFor, setOrderFor] = useState('asc');
    const [orderBy, setOrderBy] = useState('value');

    const [campaignQueries, setCampaignQueries] = useState({ campaigns: [], total: 0 });
    const [typeFilter, setTypeFilter] = useState([])

    const queryCampaign = async () => {
        const response = await URI.post("/campanhas", {
            take,
            skip,
            orderFor,
            orderBy,
            typeFilter
        })
        return response.data
    }

    const campaignQuery = useQuery({
        queryFn: () => queryCampaign(),
        queryKey: ["campaign", take, skip, orderFor, orderBy, JSON.stringify(typeFilter)],

    })


    useLayoutEffect(() => {
        const gatherData = async () => {

            const { data } = campaignQuery
            const { campaigns, total } = data

            setCampaignQueries({ campaigns, total })
        }

        if (campaignQuery.isSuccess) gatherData()

    }, [take, skip, orderBy, orderFor, campaignQuery.isSuccess, JSON.stringify(typeFilter)])

    ///////////////////////// get


    const deleteCampaignData = async (id) => {

        const responsible = userData.name
        const response = await toast.promise(
            URI.delete(`/campanha/${id}?responsible=${responsible}`),
            {
                pending: 'Conferindo os dados',
                success: 'Campanha deletada com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const deleteCampaign = useMutation({
        mutationFn: (e) => deleteCampaignData(e),
        onSuccess: (_, variables) => {


            queryClient.setQueryData(
                ["campaign", take, skip, orderFor, orderBy, JSON.stringify(typeFilter)],
                (oldData) => {

                    const { campaigns, total } = oldData;

                    return setCampaignQueries({
                        campaigns: campaigns.filter(res => res.id !== variables),
                        total: total - 1
                    })

                }
            )
        }
    })


    const queryCampaignsTotals = async () => {

        const response = await URI.
            get(`/campanhas-totais`)

        return response.data
    }

    const campaignsTotalsQuery = useQuery({
        queryFn: () => queryCampaignsTotals(),
        queryKey: ["campaign"]
    })



    const removeFilter = (data) => {
        const filtered = typeFilter.filter(res => res.id !== data.id)

        return setTypeFilter(filtered)
    }

    return (
        <CampaignContext.Provider value={{
            createCampaign,

            campaign, setCampaign,
            campaignQuery,

            editCampaign, setEditCampaign,

            mutateCampaign,

            deleteCampaign,

            take, setTake,
            skip, setSkip,
            orderFor, setOrderFor,
            orderBy, setOrderBy,

            campaignQueries,
            removeFilter,
            typeFilter, setTypeFilter,

            campaignsTotalsQuery

        }}>

            {children}

        </CampaignContext.Provider>
    )

}

export const useCampaign = () => {
    const context = useContext(CampaignContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

CampaignProvider.propTypes = {
    children: Proptypes.node
}