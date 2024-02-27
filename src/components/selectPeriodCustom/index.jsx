import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useData } from '../../hooks/dataContext';
import { useUser } from '../../hooks/userContext';
import { CloserClick, PositionedMenu } from '../source.jsx';
import { Checked, Container, Icon, ListOpt, Options, SelectButton } from './styles';

export const SelectPeriodCustom = (periods) => {
    const { setPeriodRange, periodFilter, setPeriodFilter, periodRange, setTake, setSkip } = useUser()
    const { setTypeFilter, setCustomizableArray } = useData()


    const [label, setLabel] = React.useState(periodRange)

    const handleCheck = async (label) => {

        setTypeFilter([])
        setCustomizableArray([])


        setTake(10)
        setSkip(0)

        setPeriodFilter(false)
        setLabel(label)
        setPeriodRange(label)
    }

    return (
        <>
            <CloserClick
                open={periodFilter}
                fn={setPeriodFilter} opacity={.01}
            />
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
                                <span className="label" onClick={() => handleCheck(period?.name)}>
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
        </>
    )
}
