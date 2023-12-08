import Proptypes from 'prop-types'
import { createContext, useContext, useState } from 'react'


const idContext = createContext({})


export const DataProvider = ({ children }) => {

    const [typeFilter, setTypeFilter] = useState([])
    const [rangeNamePeriodFilter, setRangeNamePeriodFilter] = useState([])

    const [customizableArray, setCustomizableArray] = useState([])



    const handleCustomizableData = (e, data) => {

        const { name, checked, value } = e.target;

        if (name === "allSelect") {
            let tempContract = data.map((contract, position) => { return { contract, isChecked: checked, position }; });
            setCustomizableArray(tempContract);
        }

        if (name !== "allSelect") {

            let thereIs = customizableArray.filter(response => response?.contract === name)

            if (thereIs.length === 0) {
                setCustomizableArray(res => [...res, { "contract": name, "isChecked": checked, "position": customizableArray.length }])
            }

            if (thereIs.length !== 0) {
                const newArr = [...customizableArray]

                newArr[parseInt(value)].isChecked = checked

                setCustomizableArray(newArr)
            }

        }

    }

    const [qntAlet, setQntAlt] = useState([])

    return (
        <idContext.Provider value={{
            setTypeFilter, typeFilter,
            rangeNamePeriodFilter, setRangeNamePeriodFilter,
            customizableArray, setCustomizableArray,
            handleCustomizableData,
            qntAlet, setQntAlt
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