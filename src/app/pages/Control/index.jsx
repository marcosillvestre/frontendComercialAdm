
import { memo, useState } from 'react';
import { Container, Header } from './styles';



import {
    Select
} from '../../../components/source.jsx';



import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { InputSearcher } from '../../../components/inputs/input.search/index.jsx';
import { RegisterMoreFilters } from '../../../components/multiFilters/moreFilters.registers/index.jsx';
import TableMainData from '../../../components/tables/tableData2/index.jsx';
import { useRegister } from '../../../hooks/registers/registersContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';

export const ListFiltered = () => {


    const { setSearch, setQuery, query, typeFilter, setTypeFilter,
        selectedInitialDate, selectedEndDate, } = useRegister();

    const [searcher, setSearcher] = useState('')


    const handleResetFilter = () => {
        setTypeFilter([])
    }


    const handleCheck = async (label) => setSearch(label);

    const handleInput = (_, data) => {

        if (!data) setQuery('')
        setSearcher(data)
    }


    return (
        <Container>
            <nav
                className='over-nav label-outside'
            >
                <h3>Validação de Matrículas</h3>

            </nav>

            <Header  >
                <nav className='inside-header'>

                    <label htmlFor="select">
                        <p className='label-outside'>Período</p>
                        <Select
                            id="select"
                            label={businessRules.predeterminedPeriods[0].name}
                            option={businessRules.predeterminedPeriods}
                            width="13rem"
                            fn={[handleCheck]}
                        />
                        {
                            selectedInitialDate &&
                            `${selectedInitialDate !== null ? new Date(selectedInitialDate).toLocaleDateString() : ""} ~ ${selectedEndDate !== null ? new Date(selectedEndDate).toLocaleDateString() : ""}`
                        }
                    </label>

                    <form className="box-search">
                        <p className='label-outside'>Pesquisar no período</p>
                        <div className='flex'>
                            <InputSearcher
                                label={query}
                                field=''
                                fn={[handleInput]}
                                width='15rem'
                                border='transparent'
                                color='#dfe6f1'
                            />

                            <button
                                type='submit'
                                className='search-button'
                                onClick={(e) => {
                                    setQuery(searcher)
                                    e.preventDefault()
                                }}>
                                <SearchIcon />
                            </button>
                        </div>

                    </form>

                    <RegisterMoreFilters />

                    {
                        typeFilter?.length > 0 &&
                        <div>
                            <button
                                className='defaultButton redButton create-button'
                                onClick={() => handleResetFilter()}
                            >
                                Limpar filtros
                            </button>
                        </div>
                    }
                </nav>


            </Header>


            <TableMainData />

        </Container>
    )
}

export const Control = memo(ListFiltered)

ListFiltered.propTypes = {
    location: PropTypes.object
}