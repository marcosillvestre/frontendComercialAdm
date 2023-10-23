import Proptypes from 'prop-types'
import { createContext, useContext, useState } from 'react'


const idContext = createContext({})


export const DataProvider = ({ children }) => {
    const [typeFilter, setTypeFilter] = useState([])
    const [rangeNamePeriodFilter, setRangeNamePeriodFilter] = useState([])

    return (
        <idContext.Provider value={{
            setTypeFilter, typeFilter,
            rangeNamePeriodFilter, setRangeNamePeriodFilter
        }}>

            {children}

        </idContext.Provider>
    )
}

export const useData = () => {
    const context = useContext(idContext)

    if (!context) {
        throw new Error("user most be used with UserContext")
    }

    return context
}
DataProvider.propTypes = {
    children: Proptypes.node
}