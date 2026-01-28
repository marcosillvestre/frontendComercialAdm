import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputSearcher } from '../../../../components/inputs/input.search'
import { ServicesMoreFilters } from '../../../../components/multiFilters/moreFilters.services'
import { ServicesTable } from '../../../../components/tables/servicesTable'
import { useService } from '../../../../hooks/services/servicesContext.hook'
import { useUser } from '../../../../hooks/userContext'
import { Container, Header } from './styles'

export function Services() {
    const [searcher, setSearcher] = useState('');
    const { setTypeSidebar, setOpenSidebar, } = useUser();
    const { setQuery, query, resetDataService, typeFilter, setTypeFilter } = useService();

    const resetData = () => {
        resetDataService();

    }

    const handleResetFilter = () => {
        setTypeFilter([])
    }

    const handleInput = (_, data) => {
        if (!data) setQuery('')
        setSearcher(data)
    }
    return (
        <Container>
            <nav className='nav'>
                <span>
                    <Link
                        to="/config"
                    >
                        <ArrowUpwardIcon />
                    </Link>
                    <h3>Configurações - Serviços</h3>
                </span>

                <button
                    className='defaultButton blueButton create-button'

                    onClick={() => {
                        setTypeSidebar(7)
                        setOpenSidebar(true);

                        resetData()
                    }
                    }>
                    Criar novo serviço
                </button>
            </nav>
            <Header>
                <nav className='inside-header'>

                    <form action=""
                        className='flex'
                    >
                        <label htmlFor="">

                            <p className='label-outside'>Pesquisar por serviços</p>
                            <InputSearcher
                                label={query}
                                field=''
                                fn={[handleInput]}
                                width='15rem'
                                border='transparent'
                                color='#dfe6f1'
                            />

                        </label>

                        <button
                            type="submit"
                            onClick={(e) => {
                                setQuery(searcher)
                                e.preventDefault()

                            }}
                        >
                            <SearchIcon />
                        </button>
                    </form>

                    <ServicesMoreFilters />

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

            <ServicesTable />


        </Container>
    )
}
