import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import businessRules from '../../app/utils/Rules/options.jsx';
// import { useData } from '../../hooks/dataContext';
// import { useUser } from '../../hooks/userContext';
import { CloserClick, PositionedMenu } from '../source.jsx';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

export const Select = (parameters) => {
    // const { setPeriodRange, periodFilter, setPeriodFilter, setTake, setSkip } = useUser()
    // const { setTypeFilter, setCustomizableArray } = useData()

    const { types } = businessRules



    const [label, setLabel] = useState(types[parameters.label])
    const [open, setOpen] = useState(false)

    const handleCheck = async (label) => {

        // setTypeFilter([])
        // setCustomizableArray([])

        // setTake(10)
        // setSkip(0)

        // setClicked(label)
        // setPeriodFilter(false)
        // setPeriodRange(label)


        setLabel(label.value)

        parameters.where === 'customField' || parameters.where === 'newContract' ?
            engineFunctions(label.field, label.value) : engineFunctions(label)

        setOpen(false)
    }


    const engineFunctions = (values, secValue) => {
        parameters.fn.map(res => {

            new Promise(resolve => {
                resolve(res(values, types[secValue] ? types[secValue] : secValue))
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


                <ListOpt open={open}>
                    {
                        parameters.option?.map((period, index) => (
                            period.name === label ? "" :
                                <Options className="option" key={index}  >
                                    {
                                        period.customizable === undefined ?
                                            <span
                                                className="label"
                                                onClick={() => handleCheck({
                                                    field: parameters.field ? parameters.field : "",
                                                    value: period?.name
                                                })}>

                                                <p>{period?.name}</p>
                                            </span>
                                            :
                                            <PositionedMenu name={period?.name} />
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
