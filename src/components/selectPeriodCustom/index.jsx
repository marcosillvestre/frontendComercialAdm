import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useUser } from '../../hooks/userContext';
import PositionedMenu from '../filteringMenu';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

const SelectPeriodCustom = (periods) => {
    const { setPeriodRange, setUnHandleLabel, periodFilter, setPeriodFilter, periodRange, mutationControlData } = useUser()

    const [label, setLabel] = React.useState(periodRange)


    const handleCheck = async (label, input) => {
        await mutationControlData.mutate()

        setPeriodFilter(false)

        setLabel(label)
        input !== true && setPeriodRange(label)
        input === true && setUnHandleLabel(label)
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