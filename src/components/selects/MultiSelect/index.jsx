import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { Container, Icon, ListOpt, Options, SelectButton } from './styles.jsx';

export const MultiSelect = (parameters) => {

    const [open, setOpen] = useState(false)
    const { field, related, fn, width, option } = parameters

    const [selected, setSelected] = useState(related)

    const handleFunction = () => {
        setOpen(!open)

        open && fn(field, selected);
    }

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
                                selected={selected.find(res => res.name === data.name)}
                                onClick={() => {
                                    selected.find(res => res.name === data.name) ?
                                        setSelected(selected.filter(res => res.name !== data.name)) :
                                        setSelected(res => [...res, {
                                            name: data.name,
                                        }])
                                }
                                }
                            >
                                {
                                    <span
                                        className="label"
                                    >
                                        <p>{data?.name}</p>
                                        <DoneIcon />
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
