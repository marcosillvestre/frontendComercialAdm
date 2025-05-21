import { useState } from 'react';
import { CloserClick } from '../../source.jsx';
import { Container, SelectButton } from './styles.jsx';

export const InputRegister = (parameters) => {

    const { label, fn, width, border, color, field } = parameters
    const [open, setOpen] = useState(false)

    const handleCheck = async (label) => {

        const { field, value } = label
        engineFunctions(field, value)
        setOpen(false)
    }

    const engineFunctions = (key, value) => {
        fn.map(res => {

            new Promise(resolve => {
                resolve(res(key, value))
            })
        })
    }


    return (
        <>
            <CloserClick
                open={open}
                fn={setOpen}
                opacity={.01}
                dontClose={true}
            />
            <Container
                style={{
                    minWidth: `${width}`
                }}
            >

                <div id="category-select">
                    <SelectButton id="select-button"
                        style={{
                            border: `.5px solid ${border}`,
                            backgroundColor: `${color}`
                        }}
                    >
                        <input
                            type='text'
                            id="selected-value"
                            defaultValue={label}
                            onChange={(e) => {
                                handleCheck({
                                    field,
                                    value: e.target.value
                                })
                            }}
                        />

                    </SelectButton>
                </div>


            </Container >

        </>
    )
}
