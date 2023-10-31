import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useUser } from '../../hooks/userContext';
import PositionedMenu from '../filteringMenu';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

const SelectPeriodCustom = (periods) => {
    const { setPeriodRange, setUnHandleLabel } = useUser()
    const [periodFilter, setPeriodFilter] = React.useState(false)

    const [label, setLabel] = React.useState(`${periods.opt[0]?.name}`)


    const handleCheck = (label, input) => {
        setLabel(label)
        input !== true && setPeriodRange(label)
        input === true && setUnHandleLabel(label)
        console.log(input)


    }

    return (
        <Container>

            <div id="category-select">


                <label htmlFor=""> Período personalizado:</label>

                <SelectButton id="select-button"
                    onClick={() => periods?.opt[0]?.undleLabel === undefined && setPeriodFilter(!periodFilter)}
                >
                    <p id="selected-value"> {label}</p>

                    <Icon id="chevrons" open={periodFilter}>
                        <i className='icon-up' > <KeyboardArrowDownIcon /></i>
                        <i className='icon-down'> <KeyboardArrowDownIcon /></i>
                    </Icon>
                </SelectButton>
            </div>


            <ListOpt open={periodFilter}>

                {
                    periods.opt?.map(period => (
                        <Options className="option" key={period?.name}  >
                            <span className="label" onClick={() => handleCheck(period?.name, period?.undleLabel)}>
                                {
                                    period.customizable === undefined ? <p>{period?.name}</p> :
                                        <PositionedMenu name={period?.name} />
                                }

                            </span>
                            <Checked className='icon-right'><DoneIcon /></Checked>
                        </Options>
                    ))
                }
            </ListOpt>
        </Container >
    )
}

export default SelectPeriodCustom