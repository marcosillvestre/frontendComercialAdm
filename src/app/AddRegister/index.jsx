// import React from 'react'

const data = {
    'select':
        <select>
            <option value="volvo">Volvo</option>
        </select>,
    'input': <input />,

}


const AddNewRegister = () => {
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

export default AddNewRegister