import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import businessRules from '../../../app/utils/Rules/options.jsx';
import { useUser } from '../../../hooks/userContext.jsx';
import { CloserClick, PositionedMenu } from '../../source.jsx';
import { Container, Icon, ListOpt, Options, SelectButton } from './styles.jsx';

export const Select = (parameters) => {

    const { types } = businessRules
    const [label, setLabel] = useState(types[parameters.label] || parameters.label)
    const [open, setOpen] = useState(false)
    const { setSelectedInitialDate, setSelectedEndDate } = useUser()




    const handleCheck = async (label) => {

        const { field, value, order } = label

        !isNaN(value) && setSelectedInitialDate(null)
        !isNaN(value) && setSelectedEndDate(null)

        parameters.where === 'create' ?
            engineFunctions(field, value, order || "") :
            engineFunctions(value)

        setOpen(false)
    }

    const engineFunctions = (values, secValue, thirdValue) => {
        parameters.fn.map(res => {

            new Promise(resolve => {
                resolve(res(values, types[secValue] || secValue, thirdValue))
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
                    minWidth: `${parameters.width}`,
                }}
            >

                <div id="category-select">
                    <SelectButton id="select-button"
                        onClick={() => setOpen(!open)}
                    >
                        <p id="selected-value"> {label}</p>
                        <Icon id="chevrons" open={open}>
                            <i className='icon'>
                                <KeyboardArrowDownIcon />
                            </i>
                        </Icon>
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
                                    {
                                        data.customizable === undefined ?
                                            <span
                                                className="label"
                                                onClick={() => {
                                                    setLabel(data.name)
                                                    handleCheck({
                                                        value: data.value === undefined ? data?.name : data.value,
                                                        field: parameters?.field ? parameters?.field : "",
                                                        order: parameters?.order
                                                    })
                                                }
                                                }>

                                                <p>{data?.name}</p>
                                            </span>
                                            :
                                            <span onClick={() => setLabel("Período personalizado")}>
                                                <PositionedMenu name={data?.name} />
                                            </span>
                                    }
                                </Options>
                        ))
                    }
                </ListOpt>

            </Container >

        </>
    )
}
