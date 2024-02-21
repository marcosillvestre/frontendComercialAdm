// import React from 'react'

const data = {
    'select':
        <select>
            <option value="volvo">Volvo</option>
        </select>,
    'input': <input />,

}


export const AddNewRegister = () => {
    return (
        <>
            <div>AddNewRegister</div>
            {

                data['select']

            }
            {
                data['input']
            }
        </>
    )
} 
