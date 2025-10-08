import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Container, SelectButton } from './styles.jsx';

export const InputSearcher = ({ label, fn, width, border, color, field, disabled }) => {

    const [placeHolder, setPlaceHolder] = useState(label);

    useEffect(() => { setPlaceHolder(label) }, [label]);

    const handleCheck = async (label) => {

        const { field, value } = label
        engineFunctions(field, value)
        setPlaceHolder(value)
    }

    const engineFunctions = (key, value) => {
        fn.map(res => {

            new Promise(resolve => {
                resolve(res(key, value))
            })
        })
    }

    const resetData = () => {
        setPlaceHolder('');
        handleCheck({
            field,
            value: ''
        })
    }

    return (
        <>
            <Container
                style={{
                    minWidth: `${width}`
                }}

            >

                <div id="category-select">
                    <SelectButton id="select-button"
                        disabled={disabled}
                        style={{
                            border: `.5px solid ${border}`,
                            backgroundColor: `${color}`
                        }}
                    >
                        <input
                            disabled={disabled}
                            type='text'
                            id="selected-value"
                            placeholder='pesquisar..'
                            value={placeHolder}
                            onChange={(e) => {
                                handleCheck({
                                    field,
                                    value: e.target.value
                                })
                            }}
                        />
                        {
                            placeHolder &&
                            <span onClick={resetData}>
                                <CancelIcon />
                            </span>
                        }
                    </SelectButton>
                </div>


            </Container >

        </>
    )
}

InputSearcher.propTypes = {
    label: PropTypes.string,
    field: PropTypes.string,
    fn: PropTypes.func,
    width: PropTypes.string,
    border: PropTypes.string,
    color: PropTypes.string,
    option: PropTypes.string,
    disabled: PropTypes.bool,
}