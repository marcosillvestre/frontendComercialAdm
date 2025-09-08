import PropTypes from 'prop-types';
import { Container, DateInput, SelectButton } from './styles.jsx';

export const DateSelect = ({ fn, width, label, border, color, field, disabled }) => {



    const handleCheck = async (label) => {

        const { field, value } = label
        engineFunctions(field, value)
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
            <Container
                style={{
                    minWidth: `${width}`
                }}
            >


                <SelectButton>
                    <DateInput
                        id="selected-value"
                        disabled={disabled}
                        type="date"
                        defaultValue={label && label.split("T")[0]}
                        onChange={(e) => handleCheck({
                            value: e.target.value,
                            field: field
                        })}

                        style={{
                            border: `.5px solid ${border}`,
                            backgroundColor: `${color}`
                        }}
                    />
                </SelectButton>
            </Container >

        </>
    )
}

DateSelect.propTypes = {
    label: PropTypes.string,
    field: PropTypes.string,
    fn: PropTypes.func,
    width: PropTypes.width,
    border: PropTypes.string,
    color: PropTypes.string,
    option: PropTypes.string,
    disabled: PropTypes.bool,

}