
import { useQuery } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import businessRules from '../../app/utils/Rules/options.jsx'
import URI from "../../app/utils/utils.jsx"
import { useUser } from "../userContext.jsx"



const ComissionContext = createContext({})
export const ComissionProvider = ({ children }) => {

    const { selectedInitialDate, selectedEndDate, headers } = useUser()

    const [label, setLabel] = useState(businessRules.predeterminedPeriods[0].name)


    const bodyComission = {
        range: label,
        dates: label === "Período personalizado" ? `${selectedInitialDate}~${selectedEndDate}` : ""
    }



    const comissionData = async () => {

        const response = await URI.get(`/comissao?range=${bodyComission.range}&dates=${bodyComission.dates}`).then(res => res.data.data)
        return response
    }
    const comissionQuery = useQuery({
        queryFn: () => comissionData(),
        queryKey: [bodyComission],
        enabled: !headers.Authorization.includes("undefined")
    })


    return (
        <ComissionContext.Provider value={{
            setLabel,
            comissionQuery
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