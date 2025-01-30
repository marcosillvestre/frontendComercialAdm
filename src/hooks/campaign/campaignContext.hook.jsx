
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { toast } from "react-toastify"
import URI from "../../app/utils/utils"
import { useUser } from "../userContext"

const CampaignContext = createContext({})

export const CampaignProvider = ({ children }) => {

    const queryClient = useQueryClient()
    const { headers } = useUser()
    const [campaign, setCampaign] = useState()
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
        onSuccess: () => {
            queryClient.invalidateQueries(["Campaign"])
        }
    })
    ///////////////////////// create

    const editData = async () => {
        const response = await toast.promise(
            URI.put(`/campanha/${editCampaign.id}`, editCampaign),
            {
                pending: 'Conferindo os dados',
                success: 'Campanha criada com sucesso',
                error: 'Algo deu errado'
            }
        )
        return response.data
    }

    const mutateCampaign = useMutation({
        mutationFn: () => editData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["Campaign"])
        }
    })
    ///////////////////////// edit

    const queryCampaign = async () => {
        const response = await URI.get("/campanha")
        return response.data
    }

    const campaignQuery = useQuery({
        queryFn: () => queryCampaign(),
        queryKey: ["Campaign"],
        enabled: !headers.Authorization.includes("undefined")
    })
    ///////////////////////// get



    return (
        <CampaignContext.Provider value={{
            createCampaign,

            campaign, setCampaign,
            campaignQuery,

            editCampaign, setEditCampaign,

            mutateCampaign,

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