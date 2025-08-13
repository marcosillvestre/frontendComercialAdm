import { useState } from 'react';
import { CloserClick } from '../../source.jsx';
import { Container, ListOpt, Options, SelectButton } from './styles.jsx';

export const UniqueSelect = (parameters) => {

    const [label, setLabel] = useState(parameters.label)
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

                <div id="category-select">
                    <SelectButton id="select-button"
                        style={{
                            border: `.5px solid ${parameters.border}`,
                            backgroundColor: `${parameters.color}`
                        }}
                        onClick={() => setOpen(!open)}
                        noOptions={open && !parameters.option}
                    >
                        <p id="selected-value">
                            {label}
                        </p>

                    </SelectButton>
                </div>


                <ListOpt
                    open={open}
                    style={{
                        minWidth: `${parameters.width}`,
                    }}
                >
                    {
                        parameters.option &&
                        parameters.option?.map((data, idx) => (
                            data.name === label ? "" :
                                <Options
                                    className="option"
                                    key={idx}
                                >


                                    <span
                                        className="label"
                                        onClick={() => {
                                            setLabel(data.name)
                                            handleCheck({
                                                value: data.value === undefined ?
                                                    data?.name :
                                                    data.value,
                                                field: parameters?.field
                                            })
                                        }
                                        }>

                                        <p>{data?.name}</p>
                                    </span>


                                </Options>
                        ))
                    }
                </ListOpt>

            </Container >

        </>
    )
}
