import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useUser } from '../../hooks/userContext';
import PositionedMenu from '../filteringMenu';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

const UnhandleInput = (periods) => {
    const { openPeriodRange, setOpenPeriodRange, setPeriodRange, setUnHandleLabel } = useUser()
    const [label, setLabel] = React.useState(`${periods.opt[0].name}`)


    const handleCheck = (label, input) => {
        setLabel(label)
        input !== true && setPeriodRange(label)
        input === true && setUnHandleLabel(label)

    }

    return (
        <Container>

            <div id="category-select">
                {periods.opt[0].undleLabel === true ?
                    <label htmlFor=""> Filtrar por:</label> :
                    <label htmlFor=""> Período personalizado:</label>
                }
                <SelectButton id="select-button" onClick={() => setOpenPeriodRange(!openPeriodRange)}>
                    <p id="selected-value"> {label}</p>

                    <Icon id="chevrons" open={openPeriodRange}>
                        <i className='icon-up' > <KeyboardArrowDownIcon /></i>
                        <i className='icon-down'> <KeyboardArrowDownIcon /></i>
                    </Icon>
                </SelectButton>
            </div>

            <ListOpt open={openPeriodRange}>

                {
                    periods.opt?.map(period => (
                        <Options className="option" key={period.name}  >
                            <span className="label" onClick={() => handleCheck(period.name, period.undleLabel)}>
                                {
                                    period.customizable === undefined ? <p>{period.name}</p> :
                                        <PositionedMenu name={period.name} />
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

export default UnhandleInput