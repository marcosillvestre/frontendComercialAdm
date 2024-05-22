import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import businessRules from '../../app/utils/Rules/options.jsx';
import { CloserClick, PositionedMenu } from '../source.jsx';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

export const Select = (parameters) => {

    const { types } = businessRules
    const [label, setLabel] = useState(types[parameters.label] || parameters.label)
    const [open, setOpen] = useState(false)

    const handleCheck = async (label) => {

        setLabel(label.value)

        parameters.where === 'create' ?
            engineFunctions(label.field, label.value, label.order || "") :
            engineFunctions(label.value)

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
                fn={setOpen} opacity={.01}
            />
            <Container
                style={{
                    width: `${parameters.width}`,
                }}
            >

                <div id="category-select">
                    <SelectButton id="select-button"
                        onClick={() => setOpen(!open)}
                    >
                        <p id="selected-value"> {label}</p>
                        <Icon id="chevrons" open={open}>
                            <i className='icon'> <KeyboardArrowDownIcon /></i>
                        </Icon>
                    </SelectButton>
                </div>


                <ListOpt
                    open={open}
                    style={{
                        width: `${parameters.width}`,
                    }}
                >
                    {
                        parameters.option?.map((data, idx) => (
                            data.name === label ? "" :
                                <Options className="option" key={idx}  >
                                    {
                                        data.customizable === undefined ?
                                            <span
                                                className="label"
                                                onClick={() => handleCheck({
                                                    value: data?.name,
                                                    field: parameters?.field ? parameters?.field : "",
                                                    order: parameters?.order
                                                })}>

                                                <p>{data?.name}</p>
                                            </span>
                                            :
                                            <PositionedMenu name={data?.name} />
                                    }
                                    <Checked className='icon'><DoneIcon /></Checked>
                                </Options>
                        ))
                    }
                </ListOpt>
            </Container >
        </>
    )
}
