import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useUser } from '../../hooks/userContext';
import { CloserClick } from '../closeClick';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';
export const SelectFilterBy = (periods) => {
    const { openPeriodRange, setOpenPeriodRange, setUnHandleLabel } = useUser()

    const [label, setLabel] = React.useState(`${periods.opt[0]?.name}`)


    const handleCheck = (label) => {
        setOpenPeriodRange(false)
        setLabel(label)
        setUnHandleLabel(label)
    }

    return (
        <>
            <CloserClick
                open={openPeriodRange}
                fn={setOpenPeriodRange} opacity={.01}
            />

            <Container>

                <div id="category-select">
                    <label htmlFor=""> Filtrar por:</label>

                    <SelectButton id="select-button"
                        onClick={() => periods?.opt[0]?.undleLabel === true &&
                            setOpenPeriodRange(!openPeriodRange)}
                    >
                        <p id="selected-value"> {label}</p>

                        <Icon id="chevrons" open={openPeriodRange}             >
                            <i className='icon' > <KeyboardArrowDownIcon /></i>
                        </Icon>
                    </SelectButton>
                </div>


                <ListOpt open={openPeriodRange} >

                    {
                        periods.opt?.map(period => (
                            <Options className="option" key={period?.name}  >
                                <span className="label" onClick={() => handleCheck(period?.name)}>

                                    <p>{period?.name}</p>

                                </span>
                                <Checked className='icon-right'><DoneIcon /></Checked>
                            </Options>
                        ))
                    }
                </ListOpt>
            </Container >
        </>

    )
}
