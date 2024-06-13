// import React from 'react'
import { useUser } from '../../hooks/userContext'
import { Container } from './styles'

export const CloserClick = (data) => {
    const { setTypeSidebar } = useUser()
    return <Container
        open={data.open}
        onClick={() => {
            !data.dontClose && setTypeSidebar(0)
            data.fn(false)
        }}
        style={{ opacity: data.opacity }}
    />


}
