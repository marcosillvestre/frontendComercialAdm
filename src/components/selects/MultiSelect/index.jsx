import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { Container, Icon, ListOpt, Options, SelectButton } from './styles.jsx';

export const MultiSelect = (parameters) => {

    const { related, fn, width, option } = parameters

    const [selected, setSelected] = useState(related)

    const handleFunction = () => {
        setOpen(!open)

        fn("related", selected)
    }

    const [open, setOpen] = useState(false)

    return (
        <>


            <Container
                style={{
                    minWidth: `${width}`,
                }}
            >

                <div id="category-select">
                    <SelectButton id="select-button"
                        onClick={() => handleFunction()}
                    >
                        <p id="selected-value"> {selected?.length} itens</p>
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
                        minWidth: `${width}`,
                    }}
                >
                    {
                        option?.map((data, idx) => (

                            <Options
                                className="option"
                                key={idx}
                                selected={selected.find(res => res.id === data.id)}
                                onClick={() => {
                                    selected.find(res => res.id === data.id) ?
                                        setSelected(selected.filter(res => res.id !== data.id)) :
                                        setSelected(res => [...res, {
                                            id: data.id,
                                            name: data.name,

                                        }])
                                }
                                }
                            >
                                {
                                    <span
                                        className="label"
                                    >

                                        {data?.name}
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
