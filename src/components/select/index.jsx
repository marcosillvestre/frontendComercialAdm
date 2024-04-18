import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useData } from '../../hooks/dataContext';
import { useUser } from '../../hooks/userContext';
import { CloserClick } from '../source.jsx';
import { Container, Icon, ListOpt, SelectButton } from './styles';

export const Select = (parameters) => {
    const { setPeriodRange, periodFilter, setPeriodFilter, setTake, setSkip } = useUser()
    const { setTypeFilter, setCustomizableArray } = useData()



    console.log(parameters)

    const [label, setLabel] = React.useState()

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
                    // onClick={() => parameters.periods?.opt[0]?.undleLabel === undefined && setPeriodFilter(!periodFilter)}
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
                        // parameters.periods.opt?.map(period => (
                        //     period.name === periodRange ? "" :
                        //         <Options className="option" key={period?.name}  >
                        //             {
                        //                 period.customizable === undefined ?
                        //                     <span className="label" onClick={() => handleCheck(period?.name)}>
                        //                         <p>{period?.name}</p>
                        //                     </span>
                        //                     :
                        //                     <PositionedMenu name={period?.name} />
                        //             }
                        //             <Checked className='icon-right'><DoneIcon /></Checked>
                        //         </Options>
                        // ))
                    }
                </ListOpt>
            </Container >
        </>
    )
}
