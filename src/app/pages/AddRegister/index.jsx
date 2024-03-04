// import React from 'react'

import { Container } from "./styles"

const data = {
    'select':
        <select>
            <option value="volvo">Volvo</option>
        </select>,
    'input': <input />,

}


export const AddNewRegister = () => {
    return (
        <Container>
            <div>AddNewRegister</div>
            {data['select']}
            {
                data['input']
            }
        </Container>
    )
} 
