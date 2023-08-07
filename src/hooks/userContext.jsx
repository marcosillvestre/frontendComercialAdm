import { createContext, useContext, useEffect, useMemo, useState } from "react"


import Proptypes from 'prop-types'
import { redirect } from "react-router-dom"
import URI from "../app/utils/utils.jsx"


const UserContext = createContext({})


export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [fetchData, setFetchData] = useState()
    const [users, setUsers] = useState([])
    const [filtered, setFiltered] = useState([])
    const [contracts, setContracts] = useState([])

    const putInfo = async (userInfos) => {
        setUserData(userInfos)
        await localStorage.setItem('userData', JSON.stringify(userInfos))
    }

    const logOut = async () => {
        await localStorage.removeItem('userData')

    }
    const headers = useMemo(() => {
        return {
            'Content-Type': "application/json",
            "Authorization": `Bearer ${userData?.token}`
        }
    }, [userData?.token])

    useEffect(() => {
        if (users.length === 0) {
            getData()
        }
        async function getData() {

            await URI.get('/users', { headers })
                .then(res => {
                    setUsers(res.data)
                }).catch(err => err)
        }
    }, [headers, userData.token, users])


    useEffect(() => {
        if (fetchData === undefined) {
            data()
        }
        async function data() {
            await URI.get('/controle', { headers })
                .then(async info => {
                    setFetchData(info.data)
                }).catch(err => {
                    if (err.status === 401) {
                        throw new alert("Sessão expirada")
                    }
                })
        }
    }, [fetchData, headers])



    useEffect(() => {
        const loadUserData = async () => {
            const clientInfo = await localStorage.getItem('userData')
            if (clientInfo) {
                setUserData(JSON.parse(clientInfo))
            }
            if (!clientInfo) {
                redirect("/")
            }
        }
        loadUserData()
    }, [])


    return (
        <UserContext.Provider value={{
            contracts, setContracts,
            users, headers, putInfo, userData,
            logOut, fetchData, setFetchData, setUsers,
            filtered, setFiltered
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