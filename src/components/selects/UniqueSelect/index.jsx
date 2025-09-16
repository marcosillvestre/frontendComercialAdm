import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CloserClick } from '../../source.jsx';
import { Container, Icon, ListOpt, Options, SearchNav, SelectButton } from './styles.jsx';

export const UniqueSelect = ({ placeHolder, fn, width, border, color, option, field, nullable }) => {

    const [label, setLabel] = useState(placeHolder);
    const [options, setOptions] = useState(option);
    const [open, setOpen] = useState(false);


    const handleCheck = async (label) => {

        const { field, value } = label
        engineFunctions(field, value)
        setOpen(false)
    }

    const engineFunctions = (key, value) => {
        fn.map(res => {

            new Promise(resolve => {
                resolve(res(key, value))
            })
        })
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
                    minWidth: `${width}`
                }}
            >

                <div id="category-select">
                    <SelectButton id="select-button"
                        style={{
                            border: `.5px solid ${border}`,
                            backgroundColor: `${color}`
                        }}
                        onClick={() => setOpen(!open)}
                        noOptions={open && !option}
                    >
                        <p id="selected-value">
                            {label}
                        </p>
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

                    <section className='mid-container'>
                        {
                            options &&
                            options?.map((data, idx) => (
                                <Options
                                    className="option"
                                    key={idx}
                                    title={data?.name}
                                    selected={label === data.name}
                                >

                                    <span
                                        className="label"
                                        onClick={() => {
                                            if (data.name === label && nullable) {
                                                setLabel('')
                                                return handleCheck({ value: '', field })
                                            }

                                            setLabel(data.name)
                                            handleCheck({ value: data?.value ?? data?.name, field })
                                        }
                                        }>

                                        <p>{data?.name}</p>
                                        <DoneIcon />

                                    </span>


                                </Options>
                            ))
                        }
                    </section>
                </ListOpt>

            </Container >
        </>
    )
}

UniqueSelect.propTypes = {
    placeHolder: PropTypes.string,
    field: PropTypes.string,
    fn: PropTypes.func,
    width: PropTypes.width,
    border: PropTypes.string,
    color: PropTypes.string,
    option: PropTypes.string,
    nullable: PropTypes.bool,
}