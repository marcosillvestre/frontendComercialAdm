import { useState } from 'react';
import businessRules from '../../../app/utils/Rules/options.jsx';
import { CloserClick } from '../../source.jsx';
import { Container, ListOpt, Options, SelectButton } from './styles.jsx';

export const UniqueSelect = (parameters) => {

    const { types } = businessRules
    const [label, setLabel] = useState(types[parameters.label] || parameters.label)
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
                                                value: data.value === undefined ? data?.name : data.value,
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
