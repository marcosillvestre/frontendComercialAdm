import CloseIcon from '@mui/icons-material/Close';

import { useProduct } from '../../../hooks/products/productsContext.hook';
import { Container, FilterContainer } from './styles';

export const MultiFiltersProducts = () => {

    const { removeFilter, typeFilter, setTypeFilter } = useProduct();

    return (
        <Container active={typeFilter.length > 0}>
            {
                typeFilter &&
                typeFilter.map((res, index) => (
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


                                        setTypeFilter([
                                            ...typeFilter.filter(f => f.id !== res.id),
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
                                            <option key={ind} value={opt.name}>{opt.name}</option>
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

