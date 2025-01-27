
import { useQuery } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { getDate } from "../../app/utils/functions/getDates.jsx"
import businessRules from '../../app/utils/Rules/options.jsx'
import URI from "../../app/utils/utils.jsx"
import { useUser } from "../userContext.jsx"



const ComissionContext = createContext({})
export const ComissionProvider = ({ children }) => {

    const { selectedInitialDate, selectedEndDate, headers, userData } = useUser()

    const [label, setLabel] = useState(businessRules.predeterminedPeriods[0].name)


    const bodyComission = {
        range: label,
    }





    const comissionData = async () => {

        bodyComission['dates'] = await getDate(bodyComission.range)

        if (selectedInitialDate !== null && selectedEndDate !== null) {
            bodyComission['range'] = "Personalizado"
            bodyComission['dates'] = `${selectedInitialDate}~${selectedEndDate}`
        }

        const response = await URI.get(`https://stagetests-684hi.ondigitalocean.app/comissao?range=${bodyComission.range}&dates=${bodyComission.dates}`).then(res => res.data.data)
        return response
    }



    const { isPending: comissionPending, isSuccess: comissionSuccess, data: comissionQueried } = useQuery({
        queryFn: () => comissionData(),
        queryKey: [bodyComission],
        enabled: !headers.Authorization.includes("undefined")
    })



    const admRoles = () => {
        return userData.role !== 'comercial' ?
            comissionQueried.deals :
            comissionQueried.deals.filter(res => res.owner.toLowerCase().includes(userData.name.toLowerCase()))
    }

    const comissionQuery = comissionSuccess && admRoles()

    return (
        <ComissionContext.Provider value={{
            setLabel,
            comissionQuery,
            comissionPending,
            comissionSuccess,
            label,

        }}>

            {children}

        </ComissionContext.Provider>
    )

}

export const useComission = () => {
    const context = useContext(ComissionContext)

    if (!context) {
        throw new Error("user most be used with Users")
    }

    return context
}

ComissionProvider.propTypes = {
    children: Proptypes.node
}