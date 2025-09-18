// import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { CloserClick } from '../../source.jsx';
import { Container, Icon, ListOpt, Options, SearchNav, SelectButton } from './styles.jsx';

export const MultiSelect = (parameters) => {

    const [open, setOpen] = useState(false)
    const { field, related, fn, width, option } = parameters
    const [options, setOptions] = useState(option);

    const [selected, setSelected] = useState(related)

    const handleFunction = () => {
        setOpen(!open)

        open && fn(field, selected);
    }

    const remover = (value) => {
        const filtered = selected.filter(res => res.name !== value);
        setSelected(filtered);
    }


    return (
        <>
            <CloserClick
                open={open}
                fn={handleFunction}
                opacity={.01}
                dontClose={true}
            />

            <Container
                style={{
                    maxWidth: `${width}`,
                }}
            >

                <div id="category-select">

                    <SelectButton id="select-button"
                        onClick={() => setOpen(true)}
                        noOptions={open && !option}
                    >
                        <div className='flex multi-values'>
                            {
                                selected?.length > 0 &&
                                selected.map((res, index) => (
                                    <div title={res.name} key={index}
                                        id='selected-value'
                                        className='flex'
                                        onClick={() => remover(res.name)}
                                    >
                                        <p>{res.name.slice(0, 15)}...</p>
                                        <CloseIcon />

                                    </div>
                                ))
                            }
                        </div>

                        <Icon id="chevrons" open={open}>
                            <i className='icon'>
                                <KeyboardArrowDownIcon />
                            </i>
                        </Icon>

                    </SelectButton>
                </div>


                <ListOpt
                    open={option && open}
                    style={{
                        minWidth: `${width}`,
                    }}
                >
                    <SearchNav>
                        <SearchIcon />
                        <input type="text"
                            onChange={(e) => {
                                if (e.target.value === '') return setOptions(option);

                                const filtered = option.filter(res => res.name.toLowerCase()
                                    .includes(e.target.value.toLowerCase()));

                                setOptions(filtered)
                            }}
                        />

                    </SearchNav>
                    <section className="mid-container">
                        {
                            options &&
                            options?.map((data, idx) => (

                                <Options
                                    className="option"
                                    title={data?.name}
                                    key={idx}
                                    selected={selected?.find(res => res.name === data.name)}
                                    onClick={() => {
                                        selected.find(res => res.name === data.name) ?
                                            remover(data.name) :
                                            setSelected(res => [...res, data])
                                    }
                                    }
                                >
                                    {
                                        <span
                                            className="label"
                                        >
                                            <p>{data?.name}</p>
                                            <CloseIcon />
                                        </span>

                                    }
                                </Options>
                            ))
                        }

                    </section>
                </ListOpt>

            </Container >
        </>
    )
}
