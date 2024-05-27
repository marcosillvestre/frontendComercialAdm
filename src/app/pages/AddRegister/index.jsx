// import React from 'react'

import { Select } from '../../../components/source.jsx'
import { Container } from "./styles"

// const data = {
//     'select':
//         <select>
//             <option value="volvo">Volvo</option>
//         </select>,
//     'input': <input />,

// }

import business from '../../utils/Rules/options.jsx'

const { } = business
export const AddNewRegister = () => {
    return (
        <Container>
            <div>AddNewRegister</div>
            <Select
                options={"opt"}
                label={"label"}
                fn={["fn1", "fn2"]}
            />
        </Container>
    )
} 
