import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useUser } from '../../hooks/userContext';
import { PositionedMenu } from '../source.jsx';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

export const UnhandleInput = (periods) => {
    const { openPeriodRange, setOpenPeriodRange, setPeriodRange } = useUser()
    const [label, setLabel] = React.useState(`${periods.opt[0]?.name}`)


    const handleCheck = (label, input) => {
        setLabel(label)
        input !== true && setPeriodRange(label)
    }

    return (
        <Container>

            <div id="category-select">

                <label htmlFor=""> Período personalizado:</label>

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
                        <Options className="option" key={period?.name} >
                            <span style={{ width: "100%" }} className="label" onClick={() => handleCheck(period?.name, period?.undleLabel, period?.destiny)}>
                                {
                                    period.customizable === undefined ? <p>{period?.name}</p> :
                                        <PositionedMenu style={{ width: "100%" }} name={period?.name} />
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
