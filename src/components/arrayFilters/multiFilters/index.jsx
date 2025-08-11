import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

import { Container, FilterContainer } from './styles';

export const MultiFilters = ({ data }) => {
    const { removeFilter, types, setType } = data;

    return (
        <Container active={types.length > 0}>
            {
                types &&
                types.map((res, index) => (
                    <FilterContainer key={index}
                        className='flex'
                    >
                        <div className='flex'
                            onClick={() => removeFilter(res)}
                        >
                            <p>{res.label}</p>
                            <CloseIcon />
                        </div>
                        {
                            res.options ?
                                <select type="text"
                                    defaultValue={res.value}
                                    onChange={(e) => {


                                        setType([
                                            ...types.filter(f => f.id !== res.id),
                                            {
                                                id: new Date().setUTCHours(0),
                                                key: res.key,
                                                value: e.target.value,
                                                label: res.label,
                                                options: res.options,
                                                customField: res.customField
                                            }
                                        ])
                                    }}
                                >
                                    {
                                        res.options.map((opt, ind) => (
                                            <option
                                                key={ind}
                                                value={opt.value ?? opt.name}
                                            >
                                                {opt.name}
                                            </option>
                                        ))
                                    }
                                </select> :
                                <span className='flex'>
                                    <p>Entre</p>
                                    {new Date(res.value.split("~")[0]).toLocaleDateString()} e {new Date(res.value.split("~")[1]).toLocaleDateString()}
                                </span>
                        }

                    </FilterContainer>
                ))
            }
        </Container>
    )
}

MultiFilters.propTypes = {
    data: PropTypes.shape({
        removeFilter: PropTypes.func,
        types: PropTypes.array,
        setType: PropTypes.func,

    }).isRequired,
};