import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import businessRules from '../../../app/utils/Rules/options.jsx';
import { useOrders } from '../../../hooks/orders/ordersContext.hook.jsx';
import { CustomDateMenuOrders } from '../../customDateMenu/filteringMenu.Orders';
import { CloserClick } from '../../source.jsx';
import { Container, Icon, ListOpt, Options, SelectButton } from './styles.jsx';

export const SelectOrders = (parameters) => {

    const { types } = businessRules
    const [label, setLabel] = useState(types[parameters.label] || parameters.label)
    const [open, setOpen] = useState(false)

    const {
        setInitialDate, setEndDate, setTypeFilter, handleInput
    } = useOrders()


    const handleCheck = async (label) => {

        const { value } = label

        !isNaN(value) && setInitialDate(null)
        !isNaN(value) && setEndDate(null)


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

    const handleFilterRangeDate = async () => {
        setTypeFilter([])

        await handleInput(label)
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
                                                <CustomDateMenuOrders props={{
                                                    label: data.name,
                                                    date: true,
                                                }}
                                                    fn={handleFilterRangeDate}
                                                    where="period"
                                                />
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
