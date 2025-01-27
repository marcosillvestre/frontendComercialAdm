import { useState } from 'react';
import { CloserClick } from '../../source.jsx';
import { Container, SelectButton } from './styles.jsx';

export const DateSelect = (parameters) => {

    const [open, setOpen] = useState(false)


    const handleCheck = async (label) => {

        const { field, value } = label
        engineFunctions(field, value)
        setOpen(false)
    }

    const engineFunctions = (key, value) => {
        parameters.fn.map(res => {

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
                    minWidth: `${parameters.width}`
                }}
            >

                <label id="category-select" htmlFor="category">
                    <SelectButton
                        type="date"
                        defaultValue={parameters.label && parameters.label.split("T")[0]}
                        onChange={(e) => handleCheck({
                            value: e.target.value,
                            field: parameters?.field
                        })}

                        style={{
                            border: `.5px solid ${parameters.border}`,
                            backgroundColor: `${parameters.color}`
                        }}
                        onClick={() => setOpen(!open)}
                    >
                    </SelectButton>

                </label>



            </Container >

        </>
    )
}
