
import { useQuery } from "@tanstack/react-query"
import Proptypes from 'prop-types'
import { createContext, useContext, useState } from "react"
import { getDate } from "../../app/utils/functions/getDates.jsx"
import businessRules from '../../app/utils/Rules/options.jsx'
import URI from "../../app/utils/utils.jsx"
import { useRegister } from "../registers/registersContext.hook.jsx"
import { useUser } from "../userContext.jsx"



const ComissionContext = createContext({})
export const ComissionProvider = ({ children }) => {

    const { headers, userData } = useUser();
    const { selectedInitialDate, selectedEndDate } = useRegister()

    const [label, setLabel] = useState(businessRules.predeterminedPeriods[0].name)


    const bodyComission = {
        range: label,
    }

    const comissionData = async () => {

        if (!selectedInitialDate && !selectedEndDate) {
            bodyComission['range'] = "Personalizado"
            bodyComission['dates'] = `${selectedInitialDate}~${selectedEndDate}`
        }

        const response = await URI.post(`/comissao`,
            {
                dates: await getDate(label),
                responsible: userData
            }
        )

        return response.data
    }



    const comissionQuery = useQuery({
        queryFn: () => comissionData(),
        queryKey: [bodyComission],
        enabled: !headers.Authorization.includes("undefined")
    })



    return (
        <ComissionContext.Provider value={{
            setLabel,
            comissionQuery,
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