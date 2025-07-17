
import { memo, useState } from 'react';
import { Container, Header, InputSearch } from './styles';



import {
    Select
} from '../../../components/source.jsx';



import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { RegisterMoreFilters } from '../../../components/multiFilters/moreFilters.registers/index.jsx';
import TableMainData from '../../../components/tables/tableData2/index.jsx';
import { useRegister } from '../../../hooks/registers/registersContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';

export const ListFiltered = () => {


    const { setSearch, setQuery, typeFilter, setTypeFilter,
        selectedInitialDate, selectedEndDate, } = useRegister()

    const [searcher, setSearcher] = useState('')


    const handleResetFilter = () => {
        setTypeFilter([])
    }


    const handleCheck = async (label) => {

        setSearch(label)
    }


    return (
        <Container>
            <nav
                className='over-nav'
            >
                <h3>Validação de Matrículas</h3>

            </nav>

            <Header  >
                <nav className='inside-header'>

                    <label htmlFor="select">
                        <p>Período</p>
                        <Select
                            id="select"
                            label={businessRules.predeterminedPeriods[0].name}
                            option={businessRules.predeterminedPeriods}
                            width="100%"
                            fn={[handleCheck]}
                        />
                        {
                            selectedInitialDate &&
                            `${selectedInitialDate !== null ? new Date(selectedInitialDate).toLocaleDateString() : ""} ~ ${selectedEndDate !== null ? new Date(selectedEndDate).toLocaleDateString() : ""}`
                        }
                    </label>

                    <form className="box-search">
                        <p>Pesquisar no período</p>
                        <InputSearch
                            type="text"
                            placeholder='Pesquisar..'
                            className='filter inputSearch'
                            list='list'
                            onChange={(e) => {
                                setSearcher(e.target.value)
                                if (e.target.value === "") return setQuery(null)

                            }}
                        />

                        <button
                            type='submit'
                            onClick={(e) => {
                                setQuery(searcher)
                                e.preventDefault()
                            }}>
                            <SearchIcon />
                        </button>


                    </form>



                    {/* <CustomizedMenus /> */}

                    <RegisterMoreFilters />

                    {
                        typeFilter?.length > 0 &&
                        <div>
                            <button
                                className='defaultButton redButton'
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