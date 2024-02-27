// import React from 'react'
import { Container } from './styles'

export const CloserClick = (data) => {
    return <Container
        open={data.open}
        onClick={() => data.fn(false)}
        style={{ opacity: data.opacity }}
    />


}
