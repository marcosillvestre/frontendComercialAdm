import Proptypes from 'prop-types'
import { createContext, useContext, useState } from 'react'



const idContext = createContext({})

export const IdProvider = ({ children }) => {
    const [id, setId] = useState({})
    const [alteration, setAlteration] = useState({})
    const [field, setField] = useState({})

    return (
        <idContext.Provider value={{ field, setField, id, setId, setAlteration, alteration }}>

            {children}

        </idContext.Provider>
    )
}

export const useId = () => {
    const context = useContext(idContext)

    if (!context) {
        throw new Error("user most be used with UserContext")
    }

    return context
}
IdProvider.propTypes = {
    children: Proptypes.node
}